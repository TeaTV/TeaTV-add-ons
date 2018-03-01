const URL = {
    DOMAIN: `http://playdk.net`,
    SEARCH: (title, page=false) => {
        if( page != false ) return `http://playdk.net/page/${page}/?s=${title}`;
	    return `http://playdk.net/${title}`  
    }
};

class Playdk {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let htmlSearch  = await httpRequest.get(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));

        let $           = cheerio.load(htmlSearch);
        let page        = $('.pagination span').first().text();
        page = page.match(/of *([0-9]+)/i);
	    page = page != null ? +page[1] : 1;

        await this.getDetailUrl(page, this.state);
        return;
    }


    async getDetailUrl(page, state) {
        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        for( let val = 1; val <= page; val++ ) {

            let htmlCurrentPage = await httpRequest.get(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), page), {});
            let $             = cheerio.load(htmlCurrentPage.data);
            let item            = $('.search-page .result-item');
            let arrItem         = [];

            item.each( async function() {

                let hrefMovie = $(this).find('.image .thumbnail a').attr('href');
                let typeMovie = $(this).find('.image .thumbnail a span').text().trim().toLowerCase();
                let titleMovie = $(this).find('.details .title a').text();
                let yearMovie = $(this).find('.details .meta .year').text();
                titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                if( stringHelper.shallowCompare(title, titleMovie) ) {

                    if( type == 'movie' && typeMovie == 'movie' ) {

                        if( year == +yearMovie ) {
                            state.detailUrl = hrefMovie;
                            return;
                        }
                    } else if( type == 'tv' && typeMovie == 'tv' ) {

                        await this.getHrefEpisode(hrefMovie, state);
                        return;
                    }
                }
            });
        }
        
    }


    async getHrefEpisode(hrefMovie, state) {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let htmlEpisode = await httpRequest.get(hrefMovie);
        let $           = cheerio.load(htmlEpisode);
        let itemSeason  = $('#seasons .se-c');

        itemSeason.each(function() {

            let seasonMovie = $(this).find('.se-t').text().trim();

            if( +seasonMovie == season ) {

				let itemEpisode = $(this).find('.se-a .episodios li');

				if( itemEpisode.length > 0 ) {

					itemEpisode.each(function() {

						let hrefEpisode = $(this).find('.episodiotitle a').first().attr('href');
						let episodeMovies = $(this).find('.episodiotitle a').first().text();
						episodeMovies = episodeMovies.match(/episode *([0-9]+)/i);
						episodeMovies = episodeMovies != null ? +episodeMovies[1] : false;

						if( episodeMovies != false && +episodeMovies == episode ) {

                            state.detailUrl = hrefEpisode;
							return;
						}
					});
				}
			}
        });

        return false;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let detailUrl   = this.state.detailUrl;
        let hosts       = [];
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);
        let embeds = $('.metaframe.rptss');

        if( embeds.length > 0 ) {
    
            embeds.each(function () {
    
                let linkEmbed = $(this).attr('src');
                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "playdk"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            });
        }

        this.state.hosts = hosts;
    }

}

module.exports = async (libs, movieInfo, settings) => {

    const mytv = new Playdk({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await mytv.searchDetail();
    await mytv.getHostFromDetail();
    return mytv.state.hosts;
}
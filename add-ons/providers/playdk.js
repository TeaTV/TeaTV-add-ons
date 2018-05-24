const URL = {
    DOMAIN: `http://playdk.net`,
    SEARCH: (title) => {
	    return `http://playdk.net/?s=${title}`  
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
        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;
        let { getHrefEpisode }                                  = this;

        let detailUrl = false;
        let urlSearch = false;

        if( type == 'movie' ) {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + '+' +year;
        } else {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')); 
        }

        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);
        let itemSearch  = $('.search-page .result-item');
        
        itemSearch.each(function() {
           
            let hrefMovie   = $(this).find('.image .thumbnail a').attr('href');
            let typeMovie   = $(this).find('.image .thumbnail a span').text().trim().toLowerCase();
            let titleMovie  = $(this).find('.details .title a').text();
            let yearMovie   = $(this).find('.details .meta .year').text();
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();

            if( stringHelper.shallowCompare(title, titleMovie) )  {

                if( type == 'movie' && typeMovie == 'movie' )  {

                    if( +yearMovie == year ) {

                        detailUrl = hrefMovie;
                    }
                } else if( type == 'tv' && typeMovie == 'tv' ) {

                    detailUrl = hrefMovie;
                }
            }
        });


        if( type == 'tv' && detailUrl != false )  {

            let htmlEpisode = await httpRequest.getHTML(detailUrl);
            let $_2         = cheerio.load(htmlEpisode);
            let itemSeason  = $_2('#seasons .se-c'); 


            itemSeason.each(function() {

                let seasonMovie = $_2(this).find('.se-q .se-t').text().trim(); 

                if( +seasonMovie == season ) {

                    let itemEpisode = $_2(this).find('.se-a .episodios li');
                    
                    itemEpisode.each(function() {

                        let hrefEpisode     = $_2(this).find('.episodiotitle a').first().attr('href');
						let episodeMovies   = $_2(this).find('.episodiotitle a').first().text();
						episodeMovies       = episodeMovies.match(/episode *([0-9]+)/i);
                        episodeMovies       = episodeMovies != null ? +episodeMovies[1] : -1; 
                        
                        if( episodeMovies == episode ) {
                            detailUrl = hrefEpisode;
                        }
                    });
                }
            });
        }

        this.state.detailUrl = detailUrl;
        return;
        
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

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Playdk({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Playdk',
        is_link: 0,
        type: movieInfo.type,
        season: movieInfo.season,
        episode: movieInfo.episode,
        title: movieInfo.title,
        year: movieInfo.year
    };

    await source.searchDetail();

    if( !source.state.detailUrl ) {
        bodyPost.is_link = 0;
    } else {
        bodyPost.is_link = 1;
    }
    await source.getHostFromDetail();

    if( source.state.hosts.length == 0 ) {
        bodyPost.is_link = 0;
    } else {
        bodyPost.is_link = 1;
    }

    await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

    return source.state.hosts;
}

exports.testing = Playdk;
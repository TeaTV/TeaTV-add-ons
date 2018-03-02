const URL = {
   DOMAIN: 'http://www.seehd.pl',
   SEARCH: (title, page=false) => {

        if( page != false ) {
            return `http://www.seehd.pl/page/${page}/?s=${title}`;
        }
       return `http://www.seehd.pl/?s=${title}`;
   }
};

class Seehd {

    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let htmlSearch  = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));
        htmlSearch      = htmlSearch.data;
        let $           = cheerio.load(htmlSearch);
        let page        = $('.pagination-item').text();
        if( !page ) {
            page = 1;
        } else {
            page = page.match(/page *[0-9]* *of *([0-9]*)/i);
            page = page != null ? +page[1] : 1;
        }

        await this.getDetailUrl(page, this.state);

        return;
    }

    async getDetailUrl(page, state) {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        for( let i = 1; i <= page; i++ ) {

            let htmlSearch  = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), i));
            let $           = cheerio.load(htmlSearch.data);
            let itemPage    = $('.type-post');

            itemPage.each(function() {

                let hrefMovie   = $(this).find('div > div').attr('data-url');
                let titleMovie  = $(this).find('div > div > header.entry-header > h2 > a').text();
                titleMovie      = titleMovie.replace('Watch Online', '').trim();
                let yearMovie   = titleMovie.split(' ');
                yearMovie       = yearMovie.length > 0 ? yearMovie[yearMovie.length - 1] : 0;
                titleMovie      = titleMovie.replace(yearMovie, '').trim();    


                if( stringHelper.shallowCompare(title, titleMovie) ) {


                    if( type == 'movie' && year == +yearMovie ) {

                        state.detailUrl = hrefMovie;
                    } else if( type == 'tv' ) {

                        let seasonMovie = yearMovie.match(/S([0-9]+)/i);
                        seasonMovie = seasonMovie != null ? +seasonMovie[1]  : 0;
                        let episodeMovie = yearMovie.match(/E([0-9]+)/i);
                        episodeMovie = episodeMovie  != null ? +episodeMovie[1] : 0;

                        if( season == seasonMovie && episode == episodeMovie ) {
                            state.detailUrl = hrefMovie;
                            
                        }
                    }
                } 
            });

            return;
        }
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let detailUrl   = this.state.detailUrl;

        let htmlDetail  = await httpRequest.getCloudflare(this.state.detailUrl);
        htmlDetail      = htmlDetail.data;
        let $           = cheerio.load(htmlDetail);
        let itemEmbed   = $('.tabcontent');

        itemEmbed.each(function() {
            
            let linkEmbed = $(this).find('center > iframe').attr('src');

            linkEmbed !== false && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "seehd"
                },
                result: {
                    file: linkEmbed,
                    label: "embed",
                    type: "embed"
                }
            });
        });

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const seehd = new Seehd({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await seehd.searchDetail();
    await seehd.getHostFromDetail();
    return seehd.state.hosts;
}


exports.testing = Seehd;
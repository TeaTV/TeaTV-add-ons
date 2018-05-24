const URL = {
    DOMAIN: `https://www1.solarmoviex.to`,
    SEARCH: (title) => {
        return `https://www1.solarmoviex.to/search?keyword=${title}`;
    }
};

class Solar {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl   = false;

        let arrInfo     = [];

        let urlSearch   = URL.SEARCH(encodeURIComponent(title));
        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);

        let itemSearch  = $('.items .item');


        itemSearch.each(function() {

            let hrefMovie   = $(this).find('a.name').attr('href');
            let titleMovie  = $(this).find('a.name').text();

            let hrefInfo      = $(this).find('.inner').attr('data-tip');

            if( hrefMovie && hrefInfo ) {

                hrefInfo = URL.DOMAIN + '/' + hrefInfo;
                hrefMovie = URL.DOMAIN + hrefMovie;
                arrInfo.push({hrefMovie, titleMovie, hrefInfo});
            }
        });

        let arrPromise = arrInfo.map(async (val) => {


            if( type == 'movie' ) {

                let yearMovie = await this.getYear(httpRequest, cheerio, val.hrefInfo);

                if( stringHelper.shallowCompare(title, val.titleMovie) && year == yearMovie ) {

                     
                    detailUrl = val.hrefMovie;
                    return;
                }
            } else if( type == 'tv' ) {

                let titleWithSeason = `${title} ${season}`;
                
                if( stringHelper.shallowCompare(titleWithSeason, titleMovie) ) {

                    detailUrl = val.hrefMovie;
                    return;
                }
            }
        });

        await Promise.all(arrPromise);

        this.state.detailUrl = detailUrl;
        return;
    }


    async getYear(httpRequest, cheerio, hrefInfo) {

        let htmlInfo = await httpRequest.getHTML(hrefInfo);
        let $        = cheerio.load(htmlInfo);

        let yearMovie= $('.inner .title span').text();

        return +yearMovie;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];
        let arrServer = [];

        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);

        let itemServer  = $('#servers .server');

        itemServer.each(function() {
            let hrefServer = $(this).find('a.active').attr('href');


            if( hrefServer ) {
                hrefServer = URL.DOMAIN + hrefServer;
                arrServer.push(hrefServer);
            }
            
        });

        let arrPromise = arrServer.map(async (val) => {

            try {

                let htmlEmbed = await httpRequest.getHTML(val);
                let $_2       = cheerio.load(htmlEmbed);

            } catch(e) {}
        });



        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const solar = new Solar({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await solar.searchDetail();
    await solar.getHostFromDetail();
    return solar.state.hosts;
}


exports.testing = Solar;
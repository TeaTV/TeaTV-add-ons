const URL = {
    DOMAIN: 'http://www.watchepisodeseries.com',
    SEARCH: (title) => {
        return `http://www.watchepisodeseries.com/home/search?q=${title}`;
    },
    HEADER: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
    }
};

class WatchSeriesEpisode {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;

        let detailUrl       = false;
        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let jsonSearch      = await httpRequest.getCloudflare(urlSearch);
        jsonSearch          = jsonSearch.data;

        let slugMovie       = false;

        for( let item in jsonSearch.series ) {

            let titleMovie  = jsonSearch.series[item].original_name;
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();

            if( stringHelper.shallowCompare(title, titleMovie) ) {

                slugMovie = jsonSearch.series[item].seo_name; 
            }
        }

        if( slugMovie != false ) {
            this.state.detailUrl = URL.DOMAIN + '/' + slugMovie;
        }

        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 }      = this.libs;
        let { title, year, season, episode, type }  = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let arrRedirect = [];
        let hrefEpisode = [];
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);

        let itemEpisode   = $('.el-item');

        itemEpisode.each(function() {

            let hrefMovie = $(this).find('a').first().attr('href');
			let seasonMovie = $(this).find('a').first().find('.season').text();
			let episodeMovie = $(this).find('a').first().find('.episode').text();
			seasonMovie = seasonMovie.match(/season *([0-9]+)/i);
			seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
			episodeMovie = episodeMovie.match(/episode *([0-9]+)/i);
            episodeMovie = episodeMovie != null ? +episodeMovie[1] : false;
            
            if( seasonMovie != false && episodeMovie != false && +seasonMovie == season && +episodeMovie == episode ) {

                hrefEpisode = hrefMovie;
			}
        });

        if( hrefEpisode == false )  throw new Error('NOT EPISODE');

        await this.getEmbeds(hrefEpisode, this.state);
        return;
    }

    async getEmbeds(hrefMovie, state) {

        const { httpRequest, cheerio, base64, _ }      = this.libs;
        let { title, year, season, episode, type }  = this.movieInfo;

        let arrRedirect     = [];
        let arrhosts        = [];

        let htmlRedirect    = await httpRequest.getHTML(hrefMovie);
        let $               = cheerio.load(htmlRedirect);
        let itemRedirect    = $('.link-list .ll-item');

        itemRedirect.each(function() {

            let linkRedirect = $(this).find('.watch .watch-button').attr('href');
            arrRedirect.push(linkRedirect);
        });
    
        arrRedirect = _.dropRight(arrRedirect, arrRedirect.length - 50);


        let checkTimeout    = false;
        let checkReturn     = false
        let timeout         = setTimeout(function() {
          
            checkTimeout    = true; 
            checkReturn     = true;
            state.hosts     = arrhosts;
            return;
        }, 10000);

        /** 
         * 
         * FIXME 
         * this promise auto return after 10s.
         * because many link embed not response or loss many time to response
        */
        let arrPromise = arrRedirect.map(async function(val) {

            let htmlEmbed       = await httpRequest.getCloudflare(val, URL.HEADER);

            if( htmlEmbed.data != undefined )  {

                htmlEmbed       = htmlEmbed.data; 
                let $_2         = cheerio.load(htmlEmbed);
                let linkEmbed   = $_2('.wb-main .watch-button').attr('href');

                console.log(linkEmbed);
                linkEmbed && arrhosts.push({
                    provider: {
                        url: state.detailUrl,
                        name: "watchseriesepisode"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
                
            }
            
            if( checkReturn ) {
                return;
            }

        });

        await Promise.all(arrPromise);

        if( !checkTimeout )  {
            clearTimeout(timeout);
            state.hosts = arrhosts;
            return;
        }
       
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const watchseries = new WatchSeriesEpisode({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await watchseries.searchDetail();
    await watchseries.getHostFromDetail();
    return watchseries.state.hosts;
}

exports.testing = WatchSeriesEpisode;
const URL = {
    DOMAIN: 'http://www.watchepisodeseries.com',
    SEARCH: (title) => {
        return `http://www.watchepisodeseries.com/home/search?q=${title}`;
    },
    HEADER: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
        // 'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        // 'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        // 'Connection':'keep-alive',
        // 'Host': 'www.watchepisodeseries.com',
        // 'Upgrade-Insecure-Requests':1
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

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl       = false;
        let jsonSearch      = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));
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

        this.state.hosts = await this.getEmbeds(hrefEpisode, this.state.detailUrl);

        return;
    }

    async getEmbeds(hrefMovie, detailUrl) {

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

        
        if( arrRedirect.length > 100 ) {
            arrRedirect = _.dropRight(arrRedirect, arrRedirect.length - 50);
        }

        let arrPromise = arrRedirect.map(async function(val) {

            let htmlEmbed       = await httpRequest.getCloudflare(val, URL.HEADER);

            if( htmlEmbed.data != undefined )  {

                htmlEmbed       = htmlEmbed.data; 
                let $_2         = cheerio.load(htmlEmbed);
                let linkEmbed   = $_2('.wb-main .watch-button').attr('href');

                linkEmbed && arrhosts.push({
                    provider: {
                        url: detailUrl,
                        name: "watchseriesepisode"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
                
            }

        });

        await Promise.all(arrPromise);

        return arrhosts;
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
    console.log(watchseries.state); process.exit();
    return watchseries.state.hosts;
}



exports.testing = WatchSeriesEpisode;
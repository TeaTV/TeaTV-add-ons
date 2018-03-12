const URL = {
    DOMAIN: `http://www.watchepisodes4.com`,
    SEARCH: (title) => {
        return `http://www.watchepisodes4.com/search/ajax_search?q=${title}`
    }
};

class WatchEpisode {
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
        let detailSeason    = false;

        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let jsonSearch      = await httpRequest.get(urlSearch);
        jsonSearch          = jsonSearch.data;

        if( jsonSearch.series ) {

            for( let item in jsonSearch.series ) {

                let slug    = jsonSearch.series[item].seo;
                let titleMovie = jsonSearch.series[item].label;

                if( stringHelper.shallowCompare(title, titleMovie) ) {

                    detailSeason = URL.DOMAIN + '/' + slug;
                    break;
                }
            }
        }


        if( detailSeason != false && type == 'tv' ) {

            let htmlSeason  = await httpRequest.getHTML(detailSeason);
            let $           = cheerio.load(htmlSeason);
            let itemSeason  = $('.el-item ');

            itemSeason.each(function() {

                let hrefMovie   = $(this).find('a').attr('href');
                let seasonMovie = $(this).find('.season').text().replace(/season */i, '').trim();
                let episodeMovie= $(this).find('.episode').text().replace(/episode */i, '').trim();
                seasonMovie     = +seasonMovie;
                episodeMovie    = +episodeMovie;

                if( seasonMovie == season && episodeMovie == episode ) {

                    detailUrl = hrefMovie;
                }
            });
        }

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64, _ } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];

        let detailUrl   = this.state.detailUrl;


        let htmlEpisode = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlEpisode);

        let itemEmbed   = $('.ldr-item');

        itemEmbed.each(function() {

            let linkEmbed   = $(this).find('.watch-button').attr('data-actuallink');

            linkEmbed && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "episode4"
                },
                result: {
                    file: linkEmbed,
                    label: "embed",
                    type: "embed"
                }
            });
        });

        hosts = _.dropRight(hosts, hosts.length - 100);

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const watchepisode = new WatchEpisode({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await watchepisode.searchDetail();
    await watchepisode.getHostFromDetail();
    return watchepisode.state.hosts;
}


exports.testing = WatchEpisode;
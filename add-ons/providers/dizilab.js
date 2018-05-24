const URL = {
    DOMAIN: `http://dizilab.me`,
    SEARCH: (title) => {
        return `http://dizilab.me/arsiv?dizi_adi=${title}`
    },
    GET_EMBED: `http://dizilab.me/request/php/`,
    HEADERS: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Connection': 'keep-alive',
        'Host': 'dizilab.me',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    } 
};

class Dizilab {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;
        

        if( type == 'movie' ) {
            throw new Error("NOT FOUND");
        }

        let detailUrl       = false;
        let detailSeason    = false;
        let urlSearch       = URL.SEARCH(encodeURI(title));
        let resultSearch    = await httpRequest.getCloudflare(urlSearch, URL.HEADERS);
        let $               = cheerio.load(resultSearch.data)

        let itemSearch      = $('.tv-series-single');
        

        itemSearch.each(function() {

            let hrefMovie   = $('.film-image').attr('href');
            let titleMovie  = $('.film-image img').attr('alt');

            if( stringHelper.shallowCompare(title, titleMovie) ) {

                detailSeason = hrefMovie;
                return;
            }
            
        });


        if( detailSeason != false ) {

            let htmlSeason = await httpRequest.getCloudflare(detailSeason, URL.HEADERS);
            let $_2        = cheerio.load(htmlSeason.data);

            let itemSeason = $_2('.season');


            itemSeason.each(function() {

                let hrefSeason  = $_2(this).attr('href');
                let seasonMovie = hrefSeason.match(/sezon\-([0-9]+)/i);
                let episodeMovie= hrefSeason.match(/\/bolum-([0-9]+)/i);
                seasonMovie     = seasonMovie != null ? +seasonMovie[1] : -1;
                episodeMovie    = episodeMovie != null ? +episodeMovie[1] : -1;

                if( seasonMovie == season && episodeMovie == episode ) {

                    detailUrl = hrefSeason;
                    return;
                }

            });
        }

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64, qs }  = this.libs;
        const { season, episode }               = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts           = [];
        let arrVideoId      = [];

        let detailUrl       = this.state.detailUrl;
        
        let htmlDetail      = await httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS);
        let $               = cheerio.load(htmlDetail.data);
        let itemEpisode     = $('.tab-menu .hovered .language li');

        itemEpisode.each(function() {

            let videoId = $(this).find('a').attr('onclick');
            videoId     = videoId != undefined ? videoId : '';
            videoId     = videoId.match(/loadVideo\(\'([^\']+)/i);
            videoId     = videoId != null ? videoId[1] : false;

            if( videoId != false ) {

                arrVideoId.push(videoId);
            }
        });

        let arrPromise = arrVideoId.map(async function(val) {


            let headerEmbed = {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                'Connection': 'keep-alive',
                'Content-Length': 39,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Host': 'dizilab.me',
                'Origin': URL.DOMAIN,
                'Referer': detailUrl,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            };

            let bodyEmbed = qs.stringify({
                vid: val,
                tip: 0,
                type: "loadVideo"
            });
            
            let jsonEmbed       = '';
            try {
                jsonEmbed       = await httpRequest.postCloudflare(URL.GET_EMBED, headerEmbed, bodyEmbed);
                jsonEmbed       = jsonEmbed.data.html;

                let linkEmbed   = jsonEmbed.match(/src\=\"([^\"]+)/i);
                linkEmbed       = linkEmbed != null ? linkEmbed[1] : false;

                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "Dizilab"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            } catch(error) {}

        });

        await Promise.all(arrPromise);


        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const dizi = new Dizilab({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await dizi.searchDetail();
    await dizi.getHostFromDetail();
    return dizi.state.hosts;
}


exports.testing = Dizilab;
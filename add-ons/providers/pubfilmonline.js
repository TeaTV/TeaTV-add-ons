const URL = {
    DOMAIN: `http://pubfilmonline.net`,
    SEARCH: (title) => {
        return `http://pubfilmonline.net/?s=${title}`;
    },
    EMBED: `http://pubfilmonline.net/wp-admin/admin-ajax.php`,
    HEADERS: (referer, pipeGuard='') => {
        return {
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
            'Accept'     : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Cookie'     : `starstruck_4dd2a205616b4dfd6254e09b24c8f4d4=75e619c9213aab371f312095d87b8050; __test; ${pipeGuard}`,
            'Referer'    : referer,
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Upgrade-Insecure-Requests': 1,
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Host': 'pubfilmonline.net',
            'Accept-Encoding': 'deflate'
        }
    }
};

class PubfilmOnline {

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
        let htmlSearch      = await httpRequest.getCloudflare(urlSearch, URL.HEADERS(urlSearch));
        try {
            this.state.pipeGuard = htmlSearch.headers['set-cookie'][0].replace('path=/', '').trim();
        } catch(error) {
            this.state.pipeGuard = '';
        }

        htmlSearch          = await httpRequest.getCloudflare(urlSearch, URL.HEADERS(urlSearch, this.state.pipeGuard)); 
        htmlSearch          = htmlSearch.data;
        let $               = cheerio.load(htmlSearch);
        
        let itemSearch      = $('.search-page .result-item');

        itemSearch.each(function() {

            let hrefMovie   = $(this).find('.details .title a').attr('href');
            let titleMovie  = $(this).find('.details .title a').text();
            let yearMovie   = $(this).find('.details .meta .year').text();
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();

            if( stringHelper.shallowCompare(title, titleMovie) && +yearMovie == year ) {

                detailUrl   = hrefMovie;
                return;
            }

        });

        if( detailUrl != false && type == 'tv' ) {

            let htmlSeason  = await httpRequest.getCloudflare(detailUrl, URL.HEADERS(detailUrl, this.state.pipeGuard));
            htmlSeason      = htmlSeason.data;
            let $_2         = cheerio.load(htmlSeason);
            let itemSeason  = $_2('.episodios');

            itemSeason.each(function() {

                let itemEpisode = $_2(this).find('li');

                itemEpisode.each(function() {

                    let nameSeasonEpisode   = $_2(this).find('.numerando').text();
                    let seasonMovie         = nameSeasonEpisode.match(/([0-9]+)/i);
                    let episodeMovie        = nameSeasonEpisode.match(/[0-9]+ *\- *([0-9]+)/i);
                    let hrefEpisode         = $_2(this).find('.episodiotitle a').attr('href');
                    seasonMovie             = seasonMovie != null ? +seasonMovie[1] : -1;
                    episodeMovie            = episodeMovie != null ? +episodeMovie[1] : -1;

                    if( seasonMovie == season && episodeMovie == episode ) {
                        detailUrl           = hrefEpisode;
                        return;
                    }                

                });
            });
        }

        this.state.detailUrl                = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];
        let arrEmbed = [];

        let htmlDetail  = await httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS(this.state.detailUrl, this.state.pipeGuard));
        htmlDetail      = htmlDetail.data;
        let $_2         = cheerio.load(htmlDetail);

        let ids         = $_2('.htt_player').attr('data-ids');
        let nonce       = htmlDetail.match(/\"ajax\_get\_video\_info\" *\: *\"([^\"]+)/i);
        nonce           = nonce != null ? nonce[1] : '';


        let bodyEmbed   = {
            server: 1,
            nonce: nonce,
            action: 'ajax_get_video_info',
            ids:    ids
        };

        try {

            let itemEmbed   = await httpRequest.postCloudflare(URL.EMBED, URL.HEADERS(URL.EMBED, this.state.pipeGuard), bodyEmbed);
            itemEmbed       = itemEmbed.data;

            if( itemEmbed != -1 )  {

                for( let item in itemEmbed ) {

                    itemEmbed[item].file && hosts.push({
                        provider: {
                            url: this.state.detailUrl,
                            name: "pubfilmol"
                        },
                        result: {
                            file: itemEmbed[item].file,
                            label: "embed",
                            type: "embed"
                        }
                    });
                }
            }
            
            
        } catch(error) {
            throw new Error(error);
        }
        

        
        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const pubfilm = new PubfilmOnline({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await pubfilm.searchDetail();
    await pubfilm.getHostFromDetail();
    return pubfilm.state.hosts;
}


exports.testing = PubfilmOnline;
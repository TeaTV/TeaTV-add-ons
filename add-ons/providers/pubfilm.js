const URL = {
    DOMAIN: `http://pubfilm.is`,
    SEARCH: (title) => {
        return `https://www.google.com/search?q=${title}&sitesearch=pubfilm.is`;
    },
    HEADERS: () => {
        return {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
        }
    }
};



class Pubfilm {
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
        let detailSeasonUrl = false;
        let detailEpisodeUrl= false;
        let urlSearch       = '';


        urlSearch       = URL.SEARCH(encodeURIComponent(title.toLowerCase()));

        let htmlSearch      = await httpRequest.getHTML(urlSearch, URL.HEADERS());
        let $               = cheerio.load(htmlSearch);

        let itemSearch      = $('a');

        itemSearch.each(function() {

            let hrefCheck = $(this).attr('href');

            if( hrefCheck && hrefCheck.indexOf(URL.DOMAIN) != -1 && hrefCheck.indexOf('/tag/') == -1 ) {

                let titleMovie   = $(this).text();
                let hrefMovie    = hrefCheck;
                let seasonMovie  = titleMovie.match(/\: *Season *([0-9]+)/i);
                seasonMovie      = seasonMovie != null ? +seasonMovie[1] : -1;
                titleMovie       = titleMovie.replace('– Official Home pubfilm.com', '').trim();
                titleMovie       = titleMovie.replace(/\: *Season *[0-9]+/i, '').trim();
                let yearMovie    = titleMovie.toLowerCase().replace(title.toLowerCase(), '').trim();
                yearMovie        = yearMovie.match(/([0-9]+)/i);
                yearMovie        = yearMovie != null ? +yearMovie[1] : false;

                if( titleMovie && seasonMovie && yearMovie && (isNaN(yearMovie) == false || yearMovie == '') && hrefMovie.indexOf('pubfilm') != -1 ) {

                    if( type == 'movie' ) {

                        if( titleMovie.indexOf(year) != -1 ) {
                            detailUrl = hrefMovie;
                            return;
                        }
                        
                    } else {
                        
                        if( seasonMovie == season ) {
                            detailUrl = hrefMovie;
                            return;
                        }
                        
                    }
                }                
            }

        });


        let htmlEpisode = '';
        if( type == 'tv' && detailUrl != false ) {
            
            try {
                htmlEpisode = await httpRequest.getHTML(detailUrl, URL.HEADERS());
            } catch(error) {
                throw new Error('NOT VALID LINK');
            }
            let $_3         = cheerio.load(htmlEpisode);
            let itemEpisode = $_3('a[target=EZWebPlayer]');

            itemEpisode.each(function() {

                let episodeMovie    = $(this).text().replace(/episode */i, '').trim();
                let hrefEpisode     = $(this).attr('href');

                if( +episodeMovie == episode && hrefEpisode.indexOf('imdb.com') != -1 ) {

                    detailUrl       = hrefEpisode;
                    return;
                }
            });
            
        } else if( type == 'movie' && detailUrl != false ) {

            try {
                htmlEpisode = await httpRequest.getHTML(detailUrl, URL.HEADERS());
            } catch(error) {
                throw new Error('NOT VALID LINK');
            }
            
            let $_3         = cheerio.load(htmlEpisode);
            let detailUrlServer= $_3('a[target=EZWebPlayer]');

            detailUrlServer.each(function() {

                let urlServer = $_3(this).attr('href')
                if( urlServer.indexOf('imdb.com') == -1 ) {

                    detailUrl = urlServer;
                }
            });
            
        }

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];
        let _responseData; 

        let detailUrl           = this.state.detailUrl.replace('get.php', 'gel.php');
        
        try {

            let htmlDetail      = await httpRequest.getHTML(detailUrl, URL.HEADERS());
            htmlDetail          = htmlDetail.replace('|var', '| ');

            eval(htmlDetail);

            _responseData       = _responseData.info.hosterurls.alternalurls;

            for( let item in _responseData ) {

                let linkEmbed = _responseData[item].href;

                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "pubfilm"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            }


        } catch(error) {

            throw new Error(error);
        }

        
        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const pubfilm = new Pubfilm({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await pubfilm.searchDetail();
    await pubfilm.getHostFromDetail();
    return pubfilm.state.hosts;
}


exports.testing = Pubfilm;
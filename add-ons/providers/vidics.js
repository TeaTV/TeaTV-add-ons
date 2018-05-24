const URL = {
    DOMAIN: `https://www.vidics.to`,
    SEARCH: (title) => {
        return `https://www.vidics.to/Category-TvShows/Genre-Any/Letter-Any/ByPopularity/1/Search-${title}.htm`
    },
    HEADERS: () => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'www.vidics.to',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
        };
    }
};

class Vidics {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;

        let state       = this.state;

        let detailUrl   = false;
        let detailSeason= false;
        let htmlSearch  = await httpRequest.getHTML(URL.SEARCH(encodeURI(title)), URL.HEADERS());
        htmlSearch      = await httpRequest.getHTML(URL.SEARCH(encodeURI(title)), URL.HEADERS());
        let $           = cheerio.load(htmlSearch);
        let itemSearch  = $('#searchResults .searchResult');
        
        console.log(itemSearch.length);
        itemSearch.each(function() {
            
            let titleMovie  = $(this).find('.searchResultInner h2 a.blue').text();
            let hrefMovie   = URL.DOMAIN + $(this).find('.searchResultInner h2 a.blue').attr('href');
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();
            
            if( stringHelper.shallowCompare(titleMovie, title) ) {
                detailSeason = hrefMovie;
            }
        });

        if( detailSeason != false ) {

            let htmlDetail  = await httpRequest.getHTML(detailSeason, URL.HEADERS());
            htmlDetail      = await httpRequest.getHTML(detailSeason, URL.HEADERS());
            let $_2         = cheerio.load(htmlDetail);
    
            let itemSeason  = $_2('.episode');
            
            itemSeason.each(function() {


                let hrefEpisode = URL.DOMAIN + $_2(this).attr('href');
                let seasonMovie = hrefEpisode.match(/\-Season\-([0-9]+)/i);
                let episodeMovie= hrefEpisode.match(/\-Episode\-([0-9]+)/i);
                seasonMovie     = seasonMovie != null ? +seasonMovie[1] : -1;
                episodeMovie    = episodeMovie != null ? +episodeMovie[1] : -1;

                if( seasonMovie == season && episodeMovie == episode ) {

                    detailUrl   = hrefEpisode;
                    return;
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
        let arrRedirects= [];
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl, URL.HEADERS());
        htmlDetail      = await httpRequest.getHTML(this.state.detailUrl, URL.HEADERS());
        let $           = cheerio.load(htmlDetail);
        
        let itemRedirect=  $('.movie_link');

        itemRedirect.each(function() {

            let linkRedirect = URL.DOMAIN + $(this).find('.p1').attr('href');
            arrRedirects.push(linkRedirect);
        });

        arrRedirects = _.dropRight(arrRedirects, arrRedirects.length - 50);

        let arrPromise = arrRedirects.map(async function(val) {

            try {
                let htmlRedirect         = await httpRequest.getHTML(val, URL.HEADERS());
                let $_2                  = cheerio.load(htmlRedirect);
                let linkEmbed            = $_2('.movie_link1 .blue').attr('href');

                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "vidics"
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
    }

}

exports.default = async (libs, movieInfo, settings) => {

        const httpRequest = libs.httpRequest;

    const source = new Vidics({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Vidics',
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


exports.testing = Vidics;
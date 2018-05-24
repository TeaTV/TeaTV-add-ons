const URL = {
    DOMAIN: `http://www.hollymoviehd.com`,
    SEARCH: (title) => {
        return `http://www.hollymoviehd.com/?zc=search&s=${title}`;
    },
    HEADERS: () => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Cookie': 'taboola_rw23=5a1a871d45e;',
            'Referer': 'http://www.hollymoviehd.com/checking/',
            'Origin': 'http://www.hollymoviehd.com',
            'Host': 'www.hollymoviehd.com',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    }
};

class HollyMovies {
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
        let urlSearch       = '';

        if( type == 'movie' ) {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + `+${year}`; 
        } else {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + `+season+${season}`;
        }

        try {

            let htmlSearch  = await httpRequest.get(urlSearch, URL.HEADERS());
            let $           = cheerio.load(htmlSearch.data);


            console.log(htmlSearch);
            let itemSearch  = $('.movies-list .ml-item');

            console.log(itemSearch.length);

            itemSearch.each(function() {

                let hrefMovie   =  $(this).find('a').first().attr('href');
                let titleMovie  = $(this).find('a').first().attr('oldtitle');
                let yearMovie   = titleMovie.match(/\(([0-9]+)\)/i);
                yearMovie       = yearMovie != null ? +yearMovie[1] : 0;
                let seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                seasonMovie     = seasonMovie != null ? +seasonMovie[1] : false;
                titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();
                titleMovie      = titleMovie.replace(/ *season *[0-9]+/i, '').trim();

                console.log(title, titleMovie, hrefMovie, yearMovie, seasonMovie);
                if( stringHelper.shallowCompare(title, titleMovie) ) {
                    
                    console.log(title, titleMovie, hrefMovie, 'match1'); 
                    if( type == 'movie' && seasonMovie == false && yearMovie == year ) {

                        console.log(title, titleMovie, hrefMovie, 'match2'); 
                        detailUrl = hrefMovie;       
                        return;
                    } else if( type == 'tv' && seasonMovie == season ) {

                        detailUrl = hrefMovie;
                        return;
                    }
                }

            });
        } catch(error) {
            console.log(String(error));
        }

        console.log(detailUrl, 'match3'); 
        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 }  = this.libs;
        const {type, episode, season}           = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];
        let arrRedirect = [];

        let detailUrl   = this.state.detailUrl;


        if(type == 'tv') {
            detailUrl = detailUrl.replace('/series/', '/episode/');
            detailUrl = detailUrl.replace(/-season-[0-9]+\//i, `-season-${season}-episode-${episode}/`);
        }

        let htmlDetail = await httpRequest.getHTML(detailUrl, URL.HEADERS());
        let $          = cheerio.load(htmlDetail);
        let itemRedirect = $('#player2 > div');

        console.log(itemRedirect.length, 'dong4');
        itemRedirect.each(function() {

            let linkRedirect = $(this).find('iframe').attr('data-lazy-src');

            console.log(linkRedirect, 'asdasd');
            if( linkRedirect != undefined ) {
                
                if( linkRedirect.indexOf('http:') == -1 && linkRedirect.indexOf('https:') == -1 ) {
                    linkRedirect = 'http:' + linkRedirect; 
                }
    
                arrRedirect.push(linkRedirect);
            }
            
        });


        let arrPromise = arrRedirect.map(async function(val) {

            let arrSources      = [];
            let htmlRedirect    = '';


            try {
                htmlRedirect    = await httpRequest.getHTML(val, {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
                    'Referer': val
                });
            } catch(error) {}

            let sources         = htmlRedirect.match(/player\.setup\(\{\s*sources\: *\[([^\]]+)/i);
            if( sources == null ) {

                let $ = cheerio.load(htmlRedirect);
                let embed = $('iframe').attr('src');

                
                embed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "hollymovies"
                    },
                    result: {
                        file: embed,
                        label: "embed",
                        type: "embed"
                    }
                }); 
            } else {

                sources = sources != null ? sources[1] : '';

                eval(`arrSources = [${sources}]`);
    
                
                for( let item in arrSources ) {
    
                    if( arrSources[item].file.indexOf('google') == -1 ) {
    
                        arrSources[item].file && hosts.push({
                            provider: {
                                url: detailUrl,
                                name: "hollymovies"
                            },
                            result: {
                                file: arrSources[item].file,
                                label: "embed",
                                type: "direct"
                            }
                        });
                    } else {
                        arrSources[item].file && hosts.push({
                            provider: {
                                url: detailUrl,
                                name: "hollymovies"
                            },
                            result: {
                                file: arrSources[item].file,
                                label: "embed",
                                type: "embed"
                            }
                        }); 
                    }
                }
            }

        });


        await Promise.all(arrPromise);


        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new HollyMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'HollyMovies',
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


exports.testing = HollyMovies;
const URL = {
    DOMAIN: 'http://vexmovies.org',
    DOMAIN_EMBED: 'https://consistent.stream/api/getVideo',
    SEARCH: (title) => {
        return `http://vexmovies.org/?s=${title}`
    },
    HEADERS: (rerfer='') =>  {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    HEADERS_COOKIE: (rerfer='', cookie='') =>  {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Cookie': cookie,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
        
    }
};

class Vexmovies {
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
        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let htmlSearch      = await httpRequest.getHTML(urlSearch);
        let $               = cheerio.load(htmlSearch);
        let itemSearch      = $('.peliculas .item_1 .item');
        
        itemSearch.each(function() {
            
            let titleMovie  = $(this).find('.fixyear h2').text();
            let yearMovie   = $(this).find('.fixyear .year').text();
            let hrefMovies  = $(this).find('a').first().attr('href');


            if( stringHelper.shallowCompare(title, titleMovie) && +yearMovie == year ) {

                detailUrl = hrefMovies;
                return;
            }
        });

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];

        let detailUrl   = this.state.detailUrl;

        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl, URL.HEADERS(detailUrl));
        let $           = cheerio.load(htmlDetail);
        let embed       = $('#cap1 iframe').attr('src');
        let htmlDirect  = await httpRequest.get(embed, URL.HEADERS(detailUrl));

        let headers     = htmlDirect.headers;
        headers         = headers['set-cookie'][0];
        headers         = headers.replace(/\;.*/i, '').trim() + ';';

        let body        = htmlDirect.data;
        let $_2         = cheerio.load(body);
        let hash        = $_2('#app player').attr('hash');
        let video       = $_2('#app player').attr('video');


        let bodyForm = {
            key: hash,
            referrer: detailUrl,
            video: video
        };

        let encodeJson = await httpRequest.post(URL.DOMAIN_EMBED, URL.HEADERS(embed, headers), bodyForm);
        encodeJson      = encodeJson.data;




        // try {
        //     encodeJson = JSON.parse(encodeJson);
        // } catch(error) {
        //     console.log(String(error)); 
        //     throw new Error('NOT LINK');
        // }


        for( let item in  encodeJson.servers) {

            for( let item2 in  encodeJson.servers[item].sources) {

                if( encodeJson.servers[item].sources[item2].status == 1 ) {

                    let link = encodeJson.servers[item].sources[item2].src;
                    if( link.indexOf('cloudfront') == -1 && link.indexOf('dfcdn') == -1 && link.indexOf('stream') == -1) {
                        hosts.push({
                            provider: {
                                url: detailUrl,
                                name: "vexmovies"
                            },
                            result: {
                                file: link,
                                label: "embed",
                                type: "embed"
                            }
                        });
                    } else {
                        hosts.push({
                            provider: {
                                url: detailUrl,
                                name: "vexmovies"
                            },
                            result: {
                                file: link,
                                label: "embed",
                                type: "direct"
                            }
                        });
                    }
                    
                }
            }
        }

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

        const httpRequest = libs.httpRequest;

    const source = new Vexmovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Vexmovies',
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


exports.testing = Vexmovies;
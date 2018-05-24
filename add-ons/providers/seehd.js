const URL = {
   DOMAIN: 'http://www.seehd.pl',
   SEARCH: (title, page=false) => {

        if( page != false ) {
            return `http://www.seehd.pl/page/${page}/?s=${title}`;
        }
       return `http://www.seehd.pl/?s=${title}`;
   },
   HEADERS: () => {
    return {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.seehd.pl',
        'Referer':'http://www.seehd.pl/',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
   }
};

class Seehd {

    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        try {

            let urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));

            let htmlTest = await httpRequest.getHTML(urlSearch, URL.HEADERS());

            console.log(htmlTest);

            console.log(urlSearch, 'search');
            let htmlSearch  = await httpRequest.getCloudflare(urlSearch, URL.HEADERS());
            htmlSearch      = htmlSearch.data;

            console.log(htmlSearch, '1');
            let $           = cheerio.load(htmlSearch);
            let page        = $('.pagination-item').text();
            if( !page ) {
                page = 1;
            } else {
                page = page.match(/page *[0-9]* *of *([0-9]*)/i);
                page = page != null ? +page[1] : 1;
            }

            await this.getDetailUrl(page, this.state);
        } catch(error) {
            console.log(String(error), 'error');
        }
        

        return;
    }

    async getDetailUrl(page, state) {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let arrNumber = [];

        for( let i = 1; i <= page; i++ ) {
            arrNumber.push(i);
        }

        console.log(arrNumber, 'number');

        let arrPromise = arrNumber.map(async function(val) {

            let htmlSearch  = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), val), URL.HEADERS());
            let $           = cheerio.load(htmlSearch.data);
            let itemPage    = $('.movie');

            console.log(itemPage.length, 'page');
            itemPage.each(function() {
                
                let hrefMovie   = $(this).find('.post_thumb a').attr('href');
                let titleMovie  = $(this).find('a h2').text();
                titleMovie      = titleMovie.replace('Watch Online', '').trim();
                let yearMovie   = titleMovie.split(' ');
                yearMovie       = yearMovie.length > 0 ? yearMovie[yearMovie.length - 1] : 0;
                titleMovie      = titleMovie.replace(yearMovie, '').trim();    

                if( stringHelper.shallowCompare(title, titleMovie) ) {

                    if( type == 'movie' && year == +yearMovie ) {

                        state.detailUrl = hrefMovie;
                    } else if( type == 'tv' ) {

                        let seasonMovie     = yearMovie.match(/S([0-9]+)/i);
                        let episodeMovie    = yearMovie.match(/E([0-9]+)/i);
                        seasonMovie         = seasonMovie != null ? +seasonMovie[1]  : 0;
                        episodeMovie        = episodeMovie  != null ? +episodeMovie[1] : 0;


                        if( season == seasonMovie && episode == episodeMovie ) {
                            state.detailUrl = hrefMovie;
                        }

                    }
                } 
            });


            if( val == page ) {
                return;
            }

        });


        await Promise.all(arrPromise);
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let arrEmbed    = [];
        let detailUrl   = this.state.detailUrl;

        let htmlDetail  = await httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS());
        htmlDetail      = htmlDetail.data;
        let $           = cheerio.load(htmlDetail);
        let itemEmbed   = $('.tabcontent');

        itemEmbed.each(function() {

            let linkEmbed = $(this).find('center > iframe').attr('src');

            if( linkEmbed ) {
                arrEmbed.push(linkEmbed);
            }

        });


        let arrPromise = arrEmbed.map(async (val) => {

            if( val.indexOf('seehd.pl/d') != -1 ) {

                let htmlEmbed = await httpRequest.getCloudflare(val, URL.HEADERS());
                htmlEmbed     = htmlEmbed.data;
                let $_3       = cheerio.load(htmlEmbed);
                let iframe    = $_3('iframe').attr('src');

                if( iframe && iframe.indexOf('ok.ru') != -1) {
                    iframe = 'https:' + iframe; 
                }

                iframe && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "seehd"
                    },
                    result: {
                        file: iframe,
                        label: "embed",
                        type: "embed"
                    }
                }); 
            } else {
                val && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "seehd"
                    },
                    result: {
                        file: val,
                        label: "embed",
                        type: "embed"
                    }
                }); 
            }
        });

        await Promise.all(arrPromise);

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Seehd({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Seehd',
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


exports.testing = Seehd;
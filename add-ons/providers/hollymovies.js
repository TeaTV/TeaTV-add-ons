const URL = {
    DOMAIN: `http://www.hollymoviehd.com`,
    SEARCH: (title) => {
        return `http://www.hollymoviehd.com/?zc=search&s=${title}`;
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

        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);

        let itemSearch  = $('.movies-list .ml-item');
        
        itemSearch.each(function() {

            let hrefMovie   =  $(this).find('a').first().attr('href');
            let titleMovie  = $(this).find('a').first().attr('oldtitle');
            let yearMovie   = titleMovie.match(/\(([0-9]+)\)/i);
            yearMovie       = yearMovie != null ? +yearMovie[1] : 0;
            let seasonMovie = titleMovie.match(/season *([0-9]+)/i);
            seasonMovie    = seasonMovie != null ? +seasonMovie[1] : false;
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();
            titleMovie      = titleMovie.replace(/ *season *[0-9]+/i, '').trim();

            if( stringHelper.shallowCompare(title, titleMovie) ) {

                if( type == 'movie' && seasonMovie == false && yearMovie == year ) {

                    detailUrl = hrefMovie;       
                    return;
                } else if( type == 'tv' && seasonMovie == season ) {

                    detailUrl = hrefMovie;
                    return;
                }
            }

        });


        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 }  = this.libs;
        const {type}                            = this;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];
        let arrRedirect = [];

        let detailUrl   = this.state.detailUrl;
        
        let htmlDetail = await httpRequest.getHTML(this.state.detailUrl);
        let $          = cheerio.load(htmlDetail);
        let itemRedirect = $('#player2 > div');

        itemRedirect.each(function() {

            let linkRedirect = $(this).find('iframe').attr('data-lazy-src');

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
                htmlRedirect    = await httpRequest.getHTML(val);
            } catch(error) {}

            let sources         = htmlRedirect.match(/sources\: *\[([^\]]+)/i);


            if( sources == null ) {

                let $ = cheerio.load(htmlRedirect);
                let embed = $('iframe').attr('src');

                hosts.push({
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

                sources             = sources != null ? sources[1] : '';

                eval(`arrSources = [${sources}]`);
    
                
                for( let item in arrSources ) {
    
                    if( arrSources[item].file.indexOf('google') == -1 ) {
    
                        hosts.push({
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
                        hosts.push({
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

    const hollymovies = new HollyMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await hollymovies.searchDetail();
    await hollymovies.getHostFromDetail();
    return hollymovies.state.hosts;
}


exports.testing = HollyMovies;
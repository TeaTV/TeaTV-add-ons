const URL = {
    DOMAIN: `https://www1.fmovies.pe`,
    SEARCH: (title) => {
        return `https://www1.fmovies.pe/search.html?keyword=${title}`;
    }
};

class FmoviesPe {
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
        let urlSearch       = '';

        if( type == 'movie' ) {

            urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        } else {
            urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + `+season+${season}`);
        }

        let htmlSearch      = await httpRequest.getHTML(urlSearch);
        let $               = cheerio.load(htmlSearch);
        let itemSearch      = $('.wrapper .col2 ul li');

        itemSearch.each(function() {

            let hrefMovie   = URL.DOMAIN + $(this).find('a').attr('href');
            let titleMovie  = $(this).find('a h3').text();
            let seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
            seasonMovie     = seasonMovie != null ? +seasonMovie[1] : false;
            titleMovie      = titleMovie.replace(/\- *season *[0-9]+/i, '').trim();

            if( stringHelper.shallowCompare(title, titleMovie) ) {

                if( type == 'movie' && seasonMovie == false ) {

                    detailUrl = hrefMovie;
                    return;
                } else if( type == 'tv' && seasonMovie == season ) {

                    detailSeason = hrefMovie;
                    return;
                }
            }
            
        });


        if( type == 'tv' && detailSeason != false ) {

            try {

                let htmlEpisode = await httpRequest.getHTML(detailSeason);
                let $_2           = cheerio.load(htmlEpisode);
                let itemEpisode = $_2('.eps .server ul li');

                itemEpisode.each(function() {

                    let hrefEpisode     = $(this).find('a').attr('href');
                    let episodeMovie    = hrefEpisode.match(/\-episode\-([0-9]+)/i);
                    episodeMovie        = episodeMovie != null ? +episodeMovie[1] : -1;

                    if( episodeMovie == episode ) {
                        detailUrl = URL.DOMAIN + hrefEpisode;
                    }
                });
            } catch(error) {
                throw new Error('ERROR');
            }
            
        }
    
        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 }  = this.libs;
        const { type, episode }                 = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts           = [];
        let detailUrl       = this.state.detailUrl;
        let htmlDetail      = '';

        try {
            htmlDetail      = await httpRequest.getHTML(this.state.detailUrl);
        } catch(error) {}
        let vidnode2        = htmlDetail.match(/link\_server\_f2 *\= *\"([^\"]+)/i);
        vidnode2            = vidnode2 != null ? vidnode2[1] : false;
        let vidnode3        = htmlDetail.match(/link\_server\_vidnode *\= *\"([^\"]+)/i);
        vidnode3            = vidnode3 != null ? vidnode3[1] : false; 
        let thevideo        = htmlDetail.match(/link\_server\_thevideo *\= *\"([^\"]+)/i);
        thevideo            = thevideo != null ? thevideo[1] : false;
        let yourupload        = htmlDetail.match(/link\_server\_yourupload *\= *\"([^\"]+)/i);
        yourupload            = yourupload != null ? yourupload[1] : false;

        if( vidnode2 != false && vidnode2.indexOf('http:') == -1 && vidnode2.indexOf('https:') == -1 ) {
            vidnode2 = 'http:' + vidnode2;
        }
        if( vidnode3 != false && vidnode3.indexOf('http:') == -1 && vidnode3.indexOf('https:') == -1 ) {
            vidnode3 = 'http:' + vidnode3;
        }
        

        if( yourupload != false &&  yourupload.indexOf('http:') == -1 && yourupload.indexOf('https:') == -1 ) {
            yourupload = 'https:' + yourupload;
        }



        if( vidnode2 != false ) {
            hosts.push({
                provider: {
                    url: this.state.detailUrl,
                    name: "fmoviespe"
                },
                result: {
                    file: vidnode2,
                    label: "embed",
                    type: 'embed'
                }
            });
        }

        if( vidnode3 != false ) {
            hosts.push({
                provider: {
                    url: this.state.detailUrl,
                    name: "fmoviespe"
                },
                result: {
                    file: vidnode3,
                    label: "embed",
                    type: 'embed'
                }
            });
        }

        if( thevideo != false ) {
            hosts.push({
                provider: {
                    url: this.state.detailUrl,
                    name: "fmoviespe"
                },
                result: {
                    file: thevideo,
                    label: "embed",
                    type: 'embed'
                }
            });
        }

        if( yourupload != false ) {
            hosts.push({
                provider: {
                    url: this.state.detailUrl,
                    name: "fmoviespe"
                },
                result: {
                    file: yourupload,
                    label: "embed",
                    type: 'embed'
                }
            });
        }

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const fmovies = new FmoviesPe({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await fmovies.searchDetail();
    await fmovies.getHostFromDetail();
    return fmovies.state.hosts;
}


exports.testing = FmoviesPe;
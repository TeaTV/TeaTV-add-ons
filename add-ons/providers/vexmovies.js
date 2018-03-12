const URL = {
    DOMAIN: 'http://vexmovies.org',
    SEARCH: (title) => {
        return `http://vexmovies.org/?s=${title}`
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

        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);
        let embed       = $('#cap1 iframe').attr('src');
        let htmlDirect  = await httpRequest.getHTML(embed);
        let $_2         = cheerio.load(htmlDirect);
        let encodeJson  = $_2('#app player').attr(':title');

        try {
            encodeJson = JSON.parse(encodeJson);
        } catch(error) {
            throw new Error('NOT LINK');
        }


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

    const vexmovies = new Vexmovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await vexmovies.searchDetail();
    await vexmovies.getHostFromDetail();
    return vexmovies.state.hosts;
}


exports.testing = Vexmovies;
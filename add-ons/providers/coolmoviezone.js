const URL = {
    DOMAIN :`http://coolmoviezone.info`,
    SEARCH: (title) => {
        return `http://coolmoviezone.info/index.php?s=${title}`;
    },
    HEADERS: () => {
        return {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    }
};

class CoolMovie {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl   = false;
        
        let urlSearch   = URL.SEARCH(title);
        let htmlSearch  = await httpRequest.getHTML(urlSearch, URL.HEADERS());
        let $           = cheerio.load(htmlSearch);

        let itemSearch  = $('#contentleft a[rel=bookmark]');
        
        itemSearch.each(function() {

            let hrefMovie   = $(this).attr('href');
            let titleMovie  = $(this).text();
            let yearMovie   = titleMovie.match(/\(([0-9]+)\)/i);
            yearMovie       = yearMovie != null ? +yearMovie[1] : 0;
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();


            if( stringHelper.shallowCompare(title, titleMovie) ) {
                detailUrl = hrefMovie;
                return;
            }
        });

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];


        let detailUrl   = this.state.detailUrl;

        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl, URL.HEADERS());
        let $           = cheerio.load(htmlDetail);

        let itemEmbed   = $('.postarea table[align=center] tbody tr');

        itemEmbed.each(function() {

            let linkEmbed = $(this).find('a').attr('href');

            if( linkEmbed &&  (linkEmbed.indexOf('http:') != -1 || linkEmbed.indexOf('https:') != -1) ) {
                
                hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "Coolmovies"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            }
            
        });



        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Coolmovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Coolmovies',
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


exports.testing = CoolMovie;
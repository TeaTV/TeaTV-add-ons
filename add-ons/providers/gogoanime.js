const URL = {
    DOMAIN: `http://www.gogoanime.to`,
    SEARCH: (title, page=false) => {
        if( page != false ) return `http://www.gogoanime.to/page/${page}?s=${title}`;
        return `http://www.gogoanime.to/?s=${title}`;
    }
};

class Gogoanime {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, episode, type } = this.movieInfo;

        let detailUrl       = false;

        let arrPage         = [];

        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + `+episode+${episode}`);
        let htmlSearch      = await httpRequest.getHTML(urlSearch);
        let $               = cheerio.load(htmlSearch);

        let paginate        = $('.wp-pagenavi .last').attr('href');
        paginate            = paginate.match(/page\/([0-9]+)/i);
        paginate            = paginate != null ? +paginate[1] : 1;

        for( let i = 1; i <= paginate; i++ ) {
            arrPage.push(i);
        }

        let arrPromise      = arrPage.map(async function(val) {

            try {
                urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + `+episode+${episode}`, val);
                htmlSearch      = await httpRequest.getHTML(urlSearch);
                $               = cheerio.load(htmlSearch); 

                let itemSearch  = $('.postlist');

                itemSearch.each(function() {

                    let hrefMovie   = $(this).find('a').attr('href');
                    let titleMovie  = $(this).find('a').text();
                    let episodeMovie= titleMovie.match(/episode *([0-9]+)/i);
                    episodeMovie    = episodeMovie != null ? +episodeMovie[1] : -1;
                    titleMovie      = titleMovie.replace(/ *episode *[0-9]+/i, '').trim();

                    if( stringHelper.shallowCompare(titleMovie, title) && episode == episodeMovie )  {
                        detailUrl = hrefMovie;
                        return;
                    }
                });
            } catch(error) {}
            
        });

        await Promise.all(arrPromise);

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];

        let detailUrl   = this.state.detailUrl;

        let htmlSearch;
        let $;
        let itemEmbed   = [];
        try {
            htmlSearch  = await httpRequest.getHTML(this.state.detailUrl);
            $           = cheerio.load(htmlSearch);
            itemEmbed   = $('#content .postcontent iframe');
        } catch(error) {
            throw new Error(error);
        }
        

        itemEmbed.each(function() {

            let linkEmbed = $(this).attr('src');

            linkEmbed && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "gogoanime"
                },
                result: {
                    file: linkEmbed,
                    label: "embed",
                    type: "embed"
                }
            });
        });

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const gogo = new Gogoanime({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await gogo.searchDetail();
    await gogo.getHostFromDetail();
    return gogo.state.hosts;
}


exports.testing = Gogoanime;
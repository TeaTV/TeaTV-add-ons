const URL = {
    DOMAIN: `https://putlockerhd.co`,
    SEARCH: (title) => {
        return `https://putlockerhd.co/results?q=${title}`;
    }
};

class PutlockerHd {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;

        this.state = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;

        let detailUrl   = false;
        
        let urlSearch   = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch); 
        let itemSearch  = $('.video_container');

        itemSearch.each(function() {

            let titleMovies = $(this).find('.video_title h3 a').html();
            let hrefMovies 	= URL.DOMAIN + $(this).find('.video_title h3 a').attr('href');
            let yearMovies 	= $(this).find('.video_title h3 a').attr('title');
            yearMovies 		= yearMovies.match(/\(([0-9]+)/i);
            yearMovies 		= yearMovies != null ? +yearMovies[1] : 0;
                
            if( stringHelper.shallowCompare(title, titleMovies) && yearMovies == year ) { 
                detailUrl = hrefMovies;
            }
        });

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);
        let linkEmbed   = htmlDetail.match(/var *frame_url *\= *\"([^\"]+)/i);
        linkEmbed       = linkEmbed != false ? `http:${linkEmbed[1]}` : false;


        linkEmbed !== false && hosts.push({
            provider: {
                url: this.state.detailUrl,
                name: "putlockerhd"
            },
            result: {
                file: linkEmbed,
                label: "embed",
                type: "embed"
            }
        });

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const putlocker = new PutlockerHd({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await putlocker.searchDetail();
    await putlocker.getHostFromDetail();
    return putlocker.state.hosts;
}


exports.testing = PutlockerHd;
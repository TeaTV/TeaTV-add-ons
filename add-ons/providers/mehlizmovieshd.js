const URL = {
    DOMAIN: `https://www.mehlizmovieshd.com`,
    SEARCH: (title, type) => {

        if( type == 'movies' ) {
            return `https://www.mehlizmovieshd.com/123-movies/${title}/`;
        }
        return `https://www.mehlizmovieshd.com/episodes/${title}/`;
    }
};

class Mehlizmovies {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let embedUrl    = [];
        let urlSearch   = false;

        if( type == 'movie' ) {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title));
        } else {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title) + `-season-${season}-episode-${episode}`);
        }
        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);
        let itemEmbed   = $('.playex .play-box-iframe');

        itemEmbed.each(function() {

            let urlEmbed = $(this).find('iframe').attr('src');
            embedUrl.push(urlEmbed);
        });

        this.state.embedUrl = embedUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(this.state.embedUrl.length == 0) throw new Error("NOT_FOUND");

        let hosts = [];

        let arrPromise = this.state.embedUrl.map(async function(val) {

            let linkDirect   = [];
            let htmlDirect   = httpRequest.getHTML(val); 
            let fileMp4      = htmlDirect.match(/sources\: *\[([^\]]+)/i);
            
            if( fileMp4 != null ) {

                eval(`linkDirect = [${fileMp4[1]}]`);
            }

            console.log(linkDirect); process.exit();
            

        });
        this.state.embedUrl.map();


        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const mehlizmovies = new Mehlizmovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await mehlizmovies.searchDetail();
    await mehlizmovies.getHostFromDetail();
    return mehlizmovies.state.hosts;
}


exports.testing = Mehlizmovies;
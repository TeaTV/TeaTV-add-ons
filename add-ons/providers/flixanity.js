const URL = {
    DOMAIN: "https://flixanity.mobi",
    SEARCH: 'https://api.flixanity.mobi/api/v1/0A6ru35yevokjaqbb3',
    TOKEN_API_EMBED: 'eCNBuxFGpRmFlWjUJjmjguCJI',
    EMBED_URL: `https://flixanity.mobi/ajax/gonlflhyad.php`,
    KEY_SL: '9fc895fbb0b23f1c0fb8e5a5fe02f7b5',
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

class Flixanity {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }



    async searchDetail() {
        const { httpRequest, cheerio, stringHelper } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let dataBody = {
            sl: URL.KEY_SL,
            q: stringHelper.convertToSearchQueryString(title)
        };
        
        let resultSearch = await httpRequest.post(URL.SEARCH, URL.HEADERS, dataBody);

        for( let item of resultSearch.data )  {

            if( item.type == 'movie' && type == 'movie' ) {

                this.state.detailUrl = URL.DOMAIN + item.permalink;
            } else if( item.type == 'tv' && type == 'tv' ) {

                this.state.detailUrl = `${URL.DOMAIN}${item.permalink}/season/${season}/episode/${episode}`;
            }
        }

        return;
    }



    async getHostFromDetail() {
        const { httpRequest, cheerio } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");
        console.log(this.state.detailUrl);

        let hosts       = [];
        let {type}      = this.movieInfo;
        let actionEmbed = type == 'movie' ? 'getMovieEmb' : 'getEpisodeEmb';
        let htmlDetail  = await httpRequest.get(this.state.detailUrl, URL.HEADERS);
        let elid        = htmlDetail.htmlDetail.match(/elid *= *\"([^"]*)/);
        elid            = elid != null ? elid[1] : false;

        if( elid != false ) {

            let dataBody = {
                action: actionEmbed,
                idEl: elid,
                token: URL.TOKEN_API_EMBED,
                nopop: ''
            };
            let resultApi = await httpRequest.post(URL.EMBED_URL, URL.HEADERS, dataBody);

            for( let item in resultApi ) {

                let embed = resultApi[item].embed.match(/src="([^"]*)/i);

                embed && hosts.push({
                    provider: {
                        url: this.state.detailUrl,
                        name: "flixanity"
                    },
                    result: {
                        file: embed,
                        label: "embed",
                        type: "embed"
                    }
                });
            }
        }

        this.state.hosts = hosts;
    }


}

module.exports = async (libs, movieInfo, settings) => {

    const flixanity = new Flixanity({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await flixanity.searchDetail();
    await flixanity.getHostFromDetail();
    return flixanity.state.hosts;
}
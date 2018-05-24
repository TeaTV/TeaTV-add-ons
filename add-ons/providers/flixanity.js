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
        const { httpRequest, cheerio, stringHelper, qs }    = this.libs; 
        let { title, year, season, episode, type }      = this.movieInfo;

        let dataBody = {
            sl: URL.KEY_SL,
            q: stringHelper.convertToSearchQueryString(title)
        };
        
        let resultSearch = await httpRequest.post(URL.SEARCH, {'content-type' : 'application/json; charset=utf-8'}, JSON.stringify(dataBody));

        if( resultSearch.data == null ) return;

        resultSearch.data.forEach((item) => {

            if( stringHelper.shallowCompare(item.title, title) ) {

                if( item.type == 'movie' && type == 'movie' && item.year == year ) {

                    this.state.detailUrl = URL.DOMAIN + item.permalink;
                } else if( item.type == 'show' && type == 'tv' ) {
                    
                    this.state.detailUrl = `${URL.DOMAIN}${item.permalink}/season/${season}/episode/${episode}`;
                }
            }
            
        });
        return;
    }



    async getHostFromDetail() {
        const { httpRequest, cheerio, qs } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");
        // console.log(this.state.detailUrl);

        let hosts       = [];
        let {type}      = this.movieInfo;
        let actionEmbed = type == 'movie' ? 'getMovieEmb' : 'getEpisodeEmb';
        let htmlDetail  = await httpRequest.get(this.state.detailUrl, URL.HEADERS);
        let elid        = htmlDetail.data.match(/elid *= *\"([^"]*)/);
        elid            = elid != null ? elid[1] : false;

        if( elid != false ) {

            let dataBody = {
                action: actionEmbed,
                idEl: elid,
                token: URL.TOKEN_API_EMBED,
                nopop: ''
            };
            // let resultApi = await httpRequest.postCloudflare(URL.EMBED_URL, {}, dataBody);
            let resultApi = await httpRequest.post(URL.EMBED_URL, {
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'content-type':'application/x-www-form-urlencoded; charset=UTF-8'
            }, qs.stringify(dataBody));
            
            if( resultApi.data == 'Invalid request, your IP have been reported!' ) throw new Error('NOT LINK');

            for( let item in resultApi.data ) {

                let embed   = resultApi.data[item].embed.match(/src="([^"]*)/i);
                embed       = embed != null ? embed[1] : false;

                embed && hosts.push({
                    provider: {
                        url: this.state.detailUrl,
                        name: "flixanity"
                    },
                    result: {
                        file: embed,
                        label: "embed",
                        type: this.isEmbed(embed) ? "embed" : 'direct'
                    }
                });
            }
        }

        this.state.hosts = hosts;
    }



    isEmbed(link) {

        if( link.indexOf('statics2.vidcdn.pro') != -1 ) {
            return false;
        } else if( link.indexOf('stream2.m4ukido.com') != -1 ) {
            return false;
        } 


        return true;
    }


}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Flixanity({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Flixanity',
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

exports.testing = Flixanity;
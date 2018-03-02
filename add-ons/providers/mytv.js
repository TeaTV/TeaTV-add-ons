const URL = {
    DOMAIN_API: "http://api.teatv.net/api/v2/get_link",
    DOMAIN_MOVIEDB: (title) => {
        return `http://api.themoviedb.org/3/search/multi?api_key=07824c019b81ecf7ad094a66f6410cc9&query=${title}`
    },
    DOMAIN_SEARCH_MOVIE: (id) => {
        return `http://api.teatv.net/api/v2/get_link?id=${id}`;
    },
    DOMAIN_SEARCH_TVSHOW: (id, season, episode) => {
       return `http://api.teatv.net/api/v2/get_link?id=${id}&season=${season}&episode=${episode}`;
    }
};

class MyTv {
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
        let resultSearch    = await httpRequest.get(URL.DOMAIN_MOVIEDB(stringHelper.convertToSearchQueryString(title)));
        let movieid         = false;

        for( let item in resultSearch ) {

            if( stringHelper.shallowCompare(title, resultSearch.results[item].name) ) {
                movieid = resultSearch.results[item].id;
                break;
            }
        }

        if( id != false ) {

            if( type == 'movie' ) {

                this.state.detailUrl = URL.DOMAIN_SEARCH_MOVIE(movieid);
            } else if( type == 'tv' ) {
                this.state.detailUrl = URL.DOMAIN_SEARCH_TVSHOW(movieid, season, episode);
            }
        }

        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];

        let result = await httpRequest.get(this.state.detailUrl);

        if( result.error == 0 ) {

            for( let item in result.message.not_direct ) {

                for( let item1 in result.message.not_direct[item].link  ) {

                    item1 && hosts.push({
                        provider: {
                            url: this.state.detailUrl,
                            name: "mytv"
                        },
                        result: {
                            file: item1,
                            label: "embed",
                            type: "embed"
                        }
                    })
                }
            }
        }

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const mytv = new MyTv({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await mytv.searchDetail();
    await mytv.getHostFromDetail();
    return mytv.state.hosts;
}


exports.testing = MyTv;
const URL = {
    DOMAIN_MOVIE: "http://afilm.filmhub.io:8000/api/movies/get_link_direct",
    DOMAIN_TVSHOW: "http://afilm.filmhub.io:8000/api/tvshows/get_link_direct",
    HEADERS: {
    	'Accept': 'text/plain, */*; q=0.01',
        'Accept-Encoding': 'deflate',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
};


const SOURCES = {
    'banhtv': 'Source 5 - Vietsub',
    'animehay': 'Source 7 - Vietsub',
    'bilutv': 'Source 1 - Vietsub',
    'hdonline': 'Source 4 - Vietsub',
    'phimbathu': 'Source 2 - Vietsub',
    'banhtv': 'Source 5 - Vietsub',
    'phimmoi': 'Source 3 - Vietsub', 
    'vkool'  : "Source 6 - Vietsub"
};


class Lululita {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }



    async searchDetail() {
        const { httpRequest, cheerio, stringHelper, qs }    = this.libs; 
        let { title, year, season, episode, type, movie_id, title_vi }      = this.movieInfo;

        let result = [];

        
        let bodyInfo = {};
        let href = '';
        if( type == 'movie' ) {
        	href = URL.DOMAIN_MOVIE;
        	bodyInfo = {
        		movie_id: movie_id,
        		title_en: title,
        		title_vi: encodeURI(title_vi),
        		year: year
        	};
        } else {
        	href = URL.DOMAIN_TVSHOW;
        	bodyInfo = {
        		movie_id: movie_id,
        		title_en: title,
        		title_vi: encodeURI(title_vi),
        		season: season,
        		episode: episode
        	};
        }

        let resultPost = await httpRequest.post(href, {}, bodyInfo);
        resultPost 		= resultPost.data;

        if( resultPost.status == 200 ) {
        	result = resultPost.data;
        }

        this.state.detailUrl = result;
        return;
    }



    async getHostFromDetail() {
        const { httpRequest, cheerio, qs } = this.libs;
        if(this.state.detailUrl.length == 0) throw new Error("NOT_FOUND");

        let hosts       = [];

        let detailUrl = this.state.detailUrl;

       	for (let item in detailUrl) {

            let source = SOURCES[detailUrl[item].source];

            if(!source) {
                source = 'Server 8';
            }

       		 detailUrl[item].link && hosts.push({
                provider: {
                    url: detailUrl[item].link,
                    name: source
                },
                result: {
                    file: detailUrl[item].link,
                    label: detailUrl[item].label,
                    type: "embed"
               	}
            });
       	}

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const lulu = new Lululita({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await lulu.searchDetail();
    await lulu.getHostFromDetail();
    return lulu.state.hosts;
}

exports.testing = Lululita;
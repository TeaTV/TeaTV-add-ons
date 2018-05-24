const URL = {
    DOMAIN: "http://www.gowatchfreemovies.to",
    SEARCH: (title) => {
        return `http://www.gowatchfreemovies.to/?keyword=${title}&search_section=2`;
    }
};

class FreeMovies {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;

        this.state = {};
    }

    async searchDetail() {
        const { httpRequest, cheerio, stringHelper } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl   = false;
        let htmlSearch  = await httpRequest.get(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')), {});
        let $           = cheerio.load(htmlSearch.data);
        let item        = $('.item');

        item.each(function() {
            
            let hrefFree    = URL.DOMAIN + $(this).find('a').attr('href');
			let titleTemp   = $(this).find('a').attr('title');
			titleTemp       = titleTemp.replace('Watch Putlocker', '').trim();
			let yearFree    = titleTemp.match(/\(([^\)]+)/i);
			yearFree        = yearFree != null ? yearFree[1] : 0;
            let titleFree   = titleTemp.replace(/\(.*/i, '');    
            
            if( stringHelper.shallowCompare(title, titleFree) && +yearFree == year ) {

				if( hrefFree.indexOf('-tv-show-') != -1 && type == 'tv' ) {

                    hrefFree    = `${hrefFree}/season-${season}-episode-${episode}`;
	                hrefFree    = hrefFree.replace('watch-', 'tv-');
                    detailUrl   = hrefFree;

                    return;
				} else if(hrefFree.indexOf('-movie-') != -1 && type == 'movie') {

                    detailUrl   = hrefFree;
                    return;
				}
			}
        });

        this.state.detailUrl = detailUrl;
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let detailUrl       = this.state.detailUrl;
        let hosts           = [];
        let arrRedirects    = [];
        let htmlDetail      = await httpRequest.get(this.state.detailUrl, {});
        let $               = cheerio.load(htmlDetail.data);
        let item            = $('.link_item');

        item.each(function() {

            let linkRedirect    = URL.DOMAIN + $(this).find('tbody tr .link_middle strong a').attr('href');

            arrRedirects.push(linkRedirect);
        });

        let arrPromise = arrRedirects.map(async function(val) {

            try {
                let linkEmbed = await httpRequest.getRedirectUrl(val);
                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "gowatchfreemovies"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            } catch (err) {
                console.log(err);
            }

        });

        await Promise.all(arrPromise);
        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const freemovies = new FreeMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await freemovies.searchDetail();
    await freemovies.getHostFromDetail();
    return freemovies.state.hosts;
}


exports.testing = FreeMovies;
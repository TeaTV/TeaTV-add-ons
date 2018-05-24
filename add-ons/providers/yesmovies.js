const URL = {
    DOMAIN: 'https://yesmovies.to',
    SEARCH: (title, page=false) => {
        if( page == false ) {
            return `https://yesmovies.to/search/${title}.html`
        } 
        return `https://yesmovies.to/search/${title}/page-${page}.html`;
    },
    GET_INFO: (slug) => {
        return `https://yesmovies.to/${slug}?is_login=false`;
    },
    GET_EMBED: (id) => {
        return `https://yesmovies.to/ajax/movie_embed/${id}`;
    },
    GET_HTML_EMBED: (id) => {
        return `https://yesmovies.to/ajax/v4_movie_episodes/${id}`;
    }
};

class YesMovies {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;
        let { getYear, getHrefEpisode }                         = this;

        let hrefSearch = '';
        let detailUrl  = false;

        if( type == 'movie' ) {
            hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        } else {
            
            hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(`${title}++season+${season}+episode+${episode}`, '+'));
        }


        
        let htmlSearch  = await httpRequest.get(hrefSearch);
        let $           = cheerio.load(htmlSearch.data);
        let itemPage    = $('.movies-list .ml-item');
        let arrInfo     = [];

        itemPage.each(async function() {

            let hrefMovie 	= $(this).find('a').attr('href');
            let titleMovie 	= $(this).find('a .mli-info h2').text();
            let seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
            seasonMovie		= seasonMovie != null ? +seasonMovie[1] : false;
            titleMovie		= titleMovie.replace(/\([0-9]+\)/i, '');
            titleMovie		= titleMovie.replace(/\- *season.*/i, '');
            titleMovie		= titleMovie.trim();
            let slugGetInfo = $(this).find('a').attr('data-url');

            arrInfo.push({
                hrefMovie, titleMovie, seasonMovie, slugGetInfo
            });
        });

        let arrPromise = arrInfo.map(async function(val) {

            let yearMovie 	= await getYear(val.slugGetInfo, cheerio, httpRequest);

            if( stringHelper.shallowCompare(title, val.titleMovie) ) {

                let htmlWatching    = await httpRequest.get(val.hrefMovie);
                let $_2             = cheerio.load(htmlWatching.data);
                let linkWatching    = $_2('#mv-info .bwac-btn').attr('href');

                if( type == 'movie' && year == yearMovie ) {

                    detailUrl = linkWatching;
                } else if(type == 'tv' && val.seasonMovie == season) {

                    detailUrl = linkWatching;
                }
            }
        });


        await Promise.all(arrPromise);

        this.state.detailUrl = detailUrl;
        return;
    }


    async getYear(slug, cheerio, httpRequest) {

        let yearMovie        = 0;
        let htmlGetInfo = await httpRequest.get(URL.GET_INFO(slug), {
            'X-Requested-With': 'XMLHttpRequest',
            authority: 'yesmovies.to',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
        });

        let $           = cheerio.load(htmlGetInfo.data);
        let itemInfo    = $('.jt-info');

        itemInfo.each( function() {

			let info = $(this).text();

			if( isNaN(+info) == false ) {
				yearMovie = +info;
			}
        });
        
        return yearMovie;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 }      = this.libs;
        let { title, year, season, episode, type }  = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts           = [];
        let arrId           = [];
        let detailUrl       = this.state.detailUrl;
        let idMovies        = detailUrl.match(/\-([0-9]+)\/watching\.html/i);
        idMovies            = idMovies != null ? +idMovies[1] : 0;
        let htmlEmbed       = await httpRequest.get(URL.GET_HTML_EMBED(idMovies));
        let $               = cheerio.load(htmlEmbed.data.html);


        if( type == 'movie' ) {

            let idEmbed         = $('.ep-item');

            idEmbed.each(function() {

                let dataId = $(this).attr('data-id');
                arrId.push(dataId);
            });

        } else if( type == 'tv' )  {

            let idEmbed         = $('.ep-item');

            idEmbed.each(function() {

                let dataId          = $(this).attr('data-id');
                let episodeMovie    = $(this).find('a').attr('title');
                episodeMovie        = episodeMovie.match(/episode *([0-9]+)/i);
                episodeMovie        = episodeMovie != null ? +episodeMovie[1] : -1;

                if( episode == episodeMovie ) {
                    arrId.push(dataId);
                }
            });
        }
        

        let arrPromise = arrId.map(async function(val) {

            let jsonEmbed = await httpRequest.get(URL.GET_EMBED(val));

            let linkEmbed = jsonEmbed.data.src;
            linkEmbed && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "yesmovies"
                },
                result: {
                    file: linkEmbed,
                    label: "embed",
                    type: "embed"
                }
            });
        });

        await Promise.all(arrPromise);

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

        const httpRequest = libs.httpRequest;

    const source = new YesMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'YesMovies',
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


exports.testing = YesMovies;
const URL = {
    DOMAIN: `https://series9.co`,
    GET_INFO: (slug) => {
        return `https://series9.co${slug}`;
    },
    SEARCH: (title) => {
        return `https://series9.co/movie/search/${title}`;
    }
};

class Series9 {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        const { title, year, season, episode, type } = this.movieInfo;
        const { getYear }                               = this;

        let urlSearch   = false;
        let detailUrl   = false;

        if( type == 'movie' ) {

            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title));
        } else {

            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title) + `-season-${season}`);
        }

        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);
        let itemSearch  = $('.movies-list .ml-item');
        let arrInfo     = [];

        itemSearch.each(async function() {

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

                let urlWatching     = URL.DOMAIN + val.hrefMovie;
                let htmlWatching    = await httpRequest.getHTML(urlWatching);
                let $_2             = cheerio.load(htmlWatching);
                let linkWatching    = URL.DOMAIN + $_2('#mv-info a').first().attr('href');


                if( type == 'movie' && year == yearMovie && linkWatching != 'https://series9.coundefined' ) {

                    detailUrl = linkWatching;
                    return;
                } else if(type == 'tv' && val.seasonMovie == season && linkWatching != 'https://series9.coundefined' ) {

                    detailUrl = linkWatching;
                    return;
                }
            }
        });


        await Promise.all(arrPromise);

        this.state.detailUrl = detailUrl;
        return;
    }

    async getYear(slug, cheerio, httpRequest) {

        let yearMovie        = 0;
        let htmlGetInfo = await httpRequest.getHTML(URL.GET_INFO(slug), {
            'X-Requested-With': 'XMLHttpRequest',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
        });

        let $           = cheerio.load(htmlGetInfo);
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
        let htmlDetail      = await httpRequest.getHTML(detailUrl);
        let $               = cheerio.load(htmlDetail);
        let itemEpisode     = $('#list-eps .le-server');

        if( type == 'movie' ) {

            itemEpisode.each(function() {

                let linkEmbed = $(this).find('.les-content a').attr('player-data');

                if( linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1 ) {
                    linkEmbed = 'http:' + linkEmbed;
                }

                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "series9"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            });

        } else if( type == 'tv' )  {

            itemEpisode.each(function() {

                let itemLink        = $(this).find('.les-content a');

                itemLink.each(function() {

                    let linkEmbed       = $(this).attr('player-data');
                    let episodeMovie    = $(this).text();
                    episodeMovie        = episodeMovie.replace(/episode */i, '').trim();

                    if( episodeMovie == episode ) {
    
    
                        if( linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1 ) {
                            linkEmbed = 'http:' + linkEmbed;
                        }
        
                        linkEmbed && hosts.push({
                            provider: {
                                url: detailUrl,
                                name: "series9"
                            },
                            result: {
                                file: linkEmbed,
                                label: "embed",
                                type: "embed"
                            }
                        });
                    }
                });

                
            });
        }
        

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const series = new Series9({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await series.searchDetail();
    await series.getHostFromDetail();
    return series.state.hosts;
}


exports.testing = Series9;
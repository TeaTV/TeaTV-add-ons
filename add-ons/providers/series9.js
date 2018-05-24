const URL = {
    DOMAIN: `https://series9.co`,
    GET_INFO: (slug) => {
        return `https://series9.co${slug}`;
    },
    SEARCH: (title) => {
        return `https://api.yesmovie.io/series/ajax/suggest_search?keyword=${title}&img=%2F%2Fcdn.themovieseries.net%2F&link_web=https%3A%2F%2Fwww1.series9.io%2F`;
        // return `https://api.yesmovie.io/series//movie/search/${title}`;
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
        htmlSearch      = JSON.parse(htmlSearch);
        htmlSearch      = htmlSearch.content;
        let $           = cheerio.load(htmlSearch);
        let itemSearch  = $('ul li');
        let arrInfo     = [];

        itemSearch.each(async function() {

            let hrefMovie 	= $(this).find('a').attr('href');
            let titleMovie 	= $(this).find('.ss-title').text();
            let seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
            seasonMovie		= seasonMovie != null ? +seasonMovie[1] : false;
            titleMovie		= titleMovie.replace(/\([0-9]+\)/i, '');
            titleMovie		= titleMovie.replace(/\- *season.*/i, '');
            titleMovie		= titleMovie.trim();


            if( stringHelper.shallowCompare(title, titleMovie) ) {

                if( type == 'movie' && !seasonMovie ) {
                    arrInfo.push(hrefMovie);
                } else if( type == 'tv' && seasonMovie == season ) {
                    arrInfo.push(hrefMovie);
                }
            }
        });

        let arrPromise = arrInfo.map(async function(val) {

            let htmlVideo = await httpRequest.getHTML(val);
            let $         = cheerio.load(htmlVideo);
            let yearMovie = $('p:contains(Release)').text();
            yearMovie     = yearMovie.replace('Release', '');
            yearMovie     = yearMovie.replace(':', '').trim();

            if( type == 'movie' && yearMovie == year ) {

                detailUrl = val;
                return;
            } else {

                detailUrl = val;
                return;
            }
        });


        await Promise.all(arrPromise);

        this.state.detailUrl = detailUrl;
        return;
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

            itemEpisode = $('.btn-eps');

            itemEpisode.each(function() {

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
        }
        

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Series9({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Series9',
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


exports.testing = Series9;
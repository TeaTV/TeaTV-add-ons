const URL = {
    DOMAIN: `https://gomovieshub.sc`,
    SEARCH: (title) => {
        return `https://gomovieshub.sc/browse-word/${title}/`;
    }
};

class GoMovieshub {
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
        let urlSearch       = '';

        if( type == 'movie' ) {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + `+${year}`; 
        } else {
            urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + `+season+${season}`;
        }

        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);

        let itemSearch  = $('.movies-list .ml-item');
        
        itemSearch.each(function() {

            let hrefMovie   =  $(this).find('a').first().attr('href');
            let titleMovie  = $(this).find('a').first().attr('oldtitle');
            let seasonMovie = titleMovie.match(/season *([0-9]+)/i);
            seasonMovie    = seasonMovie != null ? +seasonMovie[1] : false;
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();
            titleMovie      = titleMovie.replace(/ *\- *season *[0-9]+/i, '').trim();

            if( stringHelper.shallowCompare(title, titleMovie) ) {

                if( type == 'movie' && seasonMovie == false ) {

                    detailUrl = hrefMovie;       
                    return;
                } else if( type == 'tv' && seasonMovie == season ) {

                    detailUrl = hrefMovie;
                    return;
                }
            }

        });


        let htmlWatching = await httpRequest.getHTML(detailUrl);
        let $_2          = cheerio.load(htmlWatching);
        
        detailUrl        = $_2('#mv-info a').attr('href');

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 }  = this.libs;
        const {type, year, episode}             = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let arrRedirect = [];

        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);

        let itemYear    = $('.mvici-right p');
        let yearMovie   = 0;

        itemYear.each(function() {

            let strong = $(this).find('strong').text();

            if( strong.indexOf('Release') != -1 ) {
                yearMovie = $(this).find('a').text();
            }
        });

        if( type == 'movie' && +yearMovie != year ) throw new Error('NOT FOUND');


        let itemServer = $('#list-eps .le-server');

        itemServer.each(function() {

            let linkEmbed   = false;
            let itemEpisode = $(this).find('.les-content a');

            itemEpisode.each(function() {

                if( type == 'movie' ) {

                    if( $(this).attr('data-strgo') ) {

                        linkEmbed       = 'https://streamgo.me/player/' + $(this).attr('data-strgo');
                    } else if( $(this).attr('data-openload') ) {
                        linkEmbed       = 'https://openload.co/embed/' + $(this).attr('data-openload'); 
                    }
                } else {

                    let episodeMovie    = $(this).attr('title'); 
                    episodeMovie        = episodeMovie.match(/episode *([0-9]+)/i);
                    episodeMovie        = episodeMovie != null ? +episodeMovie[1] : -1;

                    if( episodeMovie == episode ) {

                            if( $(this).attr('data-strgo') ) {

                                linkEmbed = 'https://streamgo.me/player/' + $(this).attr('data-strgo');
                            } else if( $(this).attr('data-openload') ) {
                                linkEmbed = 'https://openload.co/embed/' + $(this).attr('data-openload'); 
                            } 
                    }
                }
            });


            linkEmbed && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "gomoviessc"
                },
                result: {
                    file: linkEmbed,
                    label: "embed",
                    type: "embed"
                }
            });
        });

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const gomoviehub = new GoMovieshub({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await gomoviehub.searchDetail();
    await gomoviehub.getHostFromDetail();
    return gomoviehub.state.hosts;
}


exports.testing = GoMovieshub;
const URL = {
    DOMAIN: 'http://www.primewire.ac',
    SEARCH: (title, type) => {

        if( type == 'movie' ) {
            return `http://www.primewire.ac/?keywordssss=${title}&type=movie`; 
        }
        return `http://www.primewire.ac/?keywordssss=${title}&type=tv`;
    },
    DETAIL: (title) => {
        return `http://www.primewire.ac/watch-${title}-online.html`;
    }
};

class Primeware {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;

        this.state = {};
    }

    async searchDetail() {
        const { httpRequest, cheerio, stringHelper }      = this.libs; 
        const { title, year, season, episode, type }      = this.movieInfo;

        let detailUrl   = false;
        let detailUrlTv = false;

        // let urlSearch   = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), type);
        // let htmlSearch  = await httpRequest.getHTML(urlSearch);
        // let $           = cheerio.load(htmlSearch);
        // let itemSearch  = $('div.index_item.index_item_ie');

        // itemSearch.each(function() {

        //     let titleMovie  = $(this).find('a').attr('title').replace('Watch', '').match(/([^(]*)/);
        //     let yearMovie   = $(this).find('a h2').text().replace('Watch', '').match(/\(([0-9]*)\)/);
        //     let hrefMovie   = URL.DOMAIN + $(this).find('a').attr('href');
        //     titleMovie      = titleMovie    != null ? titleMovie[1].trim()  : '';
        //     yearMovie       = yearMovie     != null ? +yearMovie[1]         : 0;

        //     if( stringHelper.shallowCompare(title, titleMovie) && year == yearMovie ) {
                
        //         if( type == 'movie' ) {
        //             detailUrl = hrefMovie;
        //         } else {
        //             detailUrlTv = hrefMovie;
        //         }
                
        //     }
        // });

        if( type == 'tv' )  {
            detailUrl = URL.DETAIL(stringHelper.convertToSearchQueryString(title) + `-season-${season}-episode-${episode}`);
        } else if( type == 'movie' ) {
            detailUrl = URL.DETAIL(stringHelper.convertToSearchQueryString(title));
        }

        // if( type == 'tv' && detailUrlTv != false ) {

            
        //     let htmlEpisode     = await httpRequest.getHTML(detailUrlTv);
        //     let $_2             = cheerio.load(htmlEpisode);
        //     let itemEpisode     = $_2(`.tv_container div[data-id=${season}] .tv_episode_item`);

        //     itemEpisode.each(function() {

        //         let hrefEpisode     = URL.DOMAIN + $_2(this).find('a').attr('href');
        //         let episodeMovie    = hrefEpisode.match(/\-episode\-([0-9]+)/i); 
        //         episodeMovie        = episodeMovie != null ? +episodeMovie[1] : -1;

        //         if( episodeMovie == episode ) {
        //             detailUrl = hrefEpisode;
        //         }
        //     });
        // }
        
        this.state.detailUrl = detailUrl;
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let arrRedirect = [];
        let hosts       = [];

        let detailUrl   = this.state.detailUrl;
        let state       = this.state;


        let htmlEpisode = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlEpisode);
        let itemRedirect= $('.movie_version_link');


        itemRedirect.each(function() {

            let slug = $(this).find('a').attr('href');
            if( slug.indexOf('javascript:') == -1 )  {

                // let linkRedirect = URL.DOMAIN +  slug;
                arrRedirect.push(slug);
            }
            
        });

        let checkTimeout = false;
        let timeout = setTimeout(function() {

            state.hosts = hosts;
            checkTimeout = true;
            return;
        }, 7000);

        
        /** 
         * 
         * FIXME:
         * this function will setTimeout 7s. 
         * Because many link redirect error and not response. 
        */
        let arrPromise = arrRedirect.map(async function(val) {

            let linkEmbed;
            try {
                
                let htmlEmbed       = await httpRequest.getHTML(val); 
                let $_2             = cheerio.load(htmlEmbed);
                let linkRedirect    = $_2('.download').attr('href');
                linkEmbed           = await httpRequest.getRedirectUrl(linkRedirect);
                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "primeware"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            } catch(error) {}

            if( val == arrRedirect.length ) {
                return;
            }

        });

        await Promise.all(arrPromise);
        if( !checkTimeout ) {
            
            clearTimeout(timeout);
            state.hosts = hosts;
            return;
        }
        
    }
}

exports.default = async (libs, movieInfo, settings) => {

    const primeware = new Primeware({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await primeware.searchDetail();
    await primeware.getHostFromDetail();
    return primeware.state.hosts;
}

exports.testing = Primeware;
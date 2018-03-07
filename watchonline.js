const URL = {
    DOMAIN: 'https://www.watchonline.to',
    DOMAIN_SEARCH: 'https://www.watchonline.to/main/watchonline',
    DOMAIN_SEARCH_POST: 'https://www.watchonline.to/search',
    HEADERS: {
        'User-Agent': "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko"
    }
};

class WatchOnline {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl   = false;
        let htmlSearch  = await httpRequest.postCloudflare(URL.DOMAIN_SEARCH_POST, URL.HEADERS, {
            searchquery: title
        });

        console.log(htmlSearch.data, detailUrl);
        let $           = cheerio.load(htmlSearch.data);
        let itemSearch  = $('.search-page .table tbody tr');
        let arrSearch   = [];



        itemSearch.each( async function() {

            let hrefWatchMovies = $(this).find('a').attr('href');
			let titleWatchMovies = $(this).find('a').text();
			let yearWatchMovies = titleWatchMovies.match(/\(([0-9]+)\)/i);
			yearWatchMovies = yearWatchMovies != null ? +yearWatchMovies[1] : 0;
            titleWatchMovies = titleWatchMovies.replace(/\([0-9]+\)/i, '');

            arrSearch.push({
                hrefWatchMovies, titleWatchMovies, yearWatchMovies
            });
        });

        let arrPromise = arrSearch.map(async (val) => {

            if( stringHelper.shallowCompare(val.titleWatchMovies, title) && year == val.yearWatchMovies ) {

                
                if( type == 'movie' ) {

                    detailUrl = val.hrefWatchMovies;
                    return;
                } else if( type == 'tv' ) {

                    let htmlSeason  = await httpRequest.getCloudflare(val.hrefWatchMovies, URL.HEADERS);
                    let $_2         = cheerio.load(htmlSeason.data);
                    let itemSeason  = $_2('.accordion-group');


                    itemSeason.each(function() {

                        let numberSeason = $_2(this).find('.accordion-toggle h5').text().replace(/season/i, '').trim();

                        if( +numberSeason == season ) {

                            let itemEpisode = $_2(this).find('.unwatched');
    
                            itemEpisode.each(function() {
        
                                let numberEpisode = $_2(this).find('.sideleft > a').text().replace(/ *episode */i, '').trim();
        
                                
                                if( +numberEpisode == episode ) {
    
                                    let hrefEpisode = $_2(this).find('.sideleft > a').attr('href');
                                    detailUrl =  hrefEpisode;
                                    return;
                                }
                                
                            });
                        }
                    });
                }
            }
        });

        await Promise.all(arrPromise);
        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS);
        let $           = cheerio.load(htmlDetail.data);
        let itemEmbed   = $('.langEnglish');
        let arrRedirect = [];

        itemEmbed.each(function() {

            let linkRedirect 	= $(this).find('.noproner a').first().attr('href');
            arrRedirect.push(linkRedirect);
        });

        let arrPromise = arrRedirect.map(async (val) => {

            let linkEmbed = await httpRequest.redirectCloudflare(val);
            linkEmbed     = linkEmbed.caseless.dict.refresh;

            if( linkEmbed != undefined ) {

                linkEmbed = linkEmbed.replace('0;url=', '');
                hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "watchonline"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            }
        });

        await Promise.all(arrPromise);

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const watchonline = new WatchOnline({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await watchonline.searchDetail();
    await watchonline.getHostFromDetail();
    return watchonline.state.hosts;
}


exports.testing = WatchOnline;
const URL = {
    DOMAIN: `https://www.vidics.to`,
    SEARCH: (title) => {
        return `https://www.vidics.to/Category-TvShows/Genre-Any/Letter-Any/ByPopularity/1/Search-${title}.htm`
    }
};

class Vidics {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;

        let state       = this.state;

        let detailUrl   = false;
        let htmlSearch  = await httpRequest.getHTML(URL.SEARCH(encodeURI(title)));
        let $           = cheerio.load(htmlSearch);
        let itemSearch  = $('#searchResults .searchResult');
        
        itemSearch.each(function() {
            
            let titleMovie  = $(this).find('.searchResultInner h2 a.blue').text();
            let hrefMovie   = URL.DOMAIN + $(this).find('.searchResultInner h2 a.blue').attr('href');
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();
            
            if( stringHelper.shallowCompare(titleMovie, title) ) {
                detailUrl = hrefMovie;
            }
        });

        if( !detailUrl ) return;

        let htmlDetail  = await httpRequest.getHTML(detailUrl);
        let $_2         = cheerio.load(htmlDetail);

        let itemSeason  = $_2('.season');

        itemSearch.each(function() {

            let titleSeason = $_2(this).find('.season_header a.null').text();
            if( titleSeason ) {

                let numberSeason    = titleSeason.match(/season *([0-9]+)/i);
                numberSeason        = numberSeason != null ? +numberSeason[1] : -1;
                
                console.log("season", numberSeason);
                if( season == numberSeason ) {

                    let itemEpisode = $_2(this).find('.episode');

                    itemEpisode.each(function() {

                        let hrefEpisode     = DOMAIN + $_2(this).attr('href');  
                        let numberEpisode   = hrefEpisode.match(/-episode-([0-9]+)/i);
                        numberEpisode       = numberEpisode != null ? +numberEpisode[1] : -1;

                        if( numberEpisode == episode ) {
                            detailUrl = hrefEpisode;
                        }
                    });
                }

            }
        });


        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let arrRedirects= [];
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);
        
        let itemRedirect=  $('.movie_link');

        itemRedirect.each(function() {

            let linkRedirect = DOMAIN + $(this).find('.p1').attr('href');
            arrRedirects.push(linkRedirect);
        });

        let arrPromise = arrRedirects.map(async function() {

            let $_2         = await parse.PARSE_DOM_DEFAULT({}, linkRedirect, true);
            let linkEmbed   = $_2('.movie_link1 .blue').attr('href');

            linkEmbed && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "vidics"
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
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const vidics = new Vidics({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await vidics.searchDetail();
    await vidics.getHostFromDetail();
    return vidics.state.hosts;
}


exports.testing = Vidics;
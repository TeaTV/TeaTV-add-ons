const URL = {
    DOMAIN: "http://m4ufree.club",
    SEARCH: (title) => {
        return `http://m4ufree.club/search-movies/${title}.html`;
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

class M4uFree {
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
        let htmlSearch  = await httpRequest.get(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));
        let currentPage = false;
        let $           = cheerio.load(htmlSearch);
        let page        = $('.pages a');
        if( page ) {
            page        = 1;
            currentPage = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) 
        } else {
            currentPage = page.last().attr('href');
            page        = currentPage.match(/page\-([0-9]+)/i);
            page        = page != null ? +page[1] : 1;
        }

        await this.getDetailUrl(page, currentPage, this.state, this.state);
        return;
    }


    async getDetailUrl(page, currentPage, state) {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        for( let val = 1; val <= page; val++ ) {

            let hrefPage        = currentPage.replace(/page\-[0-9]+/i, `page-${val}`);
            let htmlCurrentPage = await httpRequest.get(hrefPage, URL.HEADERS);
            let $_2             = cheerio.load(htmlCurrentPage.data);
            let item            = $_2('.item');
            let arrItem         = [];

            item.each(function() {
    
                let hrefM4u 	= $_2(this).find('.item p b a').attr('href');
                let titleM4u 	= $_2(this).find('.item p b a').text();
                let checkMovies = titleM4u.match(/ *season *[0-9]+/i);
                let seasonNumber= checkMovies != null ? titleM4u.match(/season *([0-9]+)/i) != null ? titleM4u.match(/season *([0-9]+)/i)[1] : 0 : false;
                let infoM4u		= $_2(this).find('.item p b a').attr('onmouseover');
                let yearM4u 	= infoM4u.match(/release *\: *([0-9]+)/i);
                yearM4u			= yearM4u != null ? +yearM4u[1] : 0;
                titleM4u		= titleM4u.replace(/ *\: *season.*/i, '');
                
                arrItem.push({
                    hrefM4u: hrefM4u,
                    titleM4u: titleM4u,
                    seasonNumber: seasonNumber,
                    yearM4u: yearM4u, 
                    checkMovies: checkMovies
                });
            });

            for( let item in arrItem ) {

                if( stringHelper.shallowCompare(arrItem[item].titleM4u, title) && year == arrItem[item].yearM4u )  {
    
                    if( arrItem[item].checkMovies == null && type == 'movie'  ) {
                        
                        return arrItem[item].hrefM4u;
                    } else if( arrItem[item].checkMovies != null && type == 'tv' ) {
    
                        if( +arrItem[item].seasonNumber == season ) {
                            
                            let htmlEpisode         = await httpRequest.getHTML(arrItem[item].hrefM4u, URL.HEADERS);
                            let $_3                 = cheerio.load(htmlEpisode);
                            let itemEpisode         = $_3('#details .episode');

                            itemEpisode.each(function() {
    
                                let hrefEpisode 	= $_3(this).attr('href');
                                let numberEpisode	= $_3(this).text();    
    
                                if( +numberEpisode == episode ) {

                                    state.detailUrl =  hrefEpisode;
                                    return;
                                }
                            });
                            return false;
                        }
                    } 
                }
            }
        }
    }



    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let arrDetail   = [];
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.get(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail.data);
        let item        = $('#total_version .server_line');

        item.each(function() {

            let links = $(this).find('.server_version a').attr('href');
            arrDetail.push(links);
        });


        let arrPromise = arrDetail.map(async function(links) {

            let htmlData    = await httpRequest.get(links);
            let encode 	    = htmlData.data.match(/Base64\.decode\(\"([^\"]+)/i);
            encode 		    = encode != null ? encode[1] : false;

            if( encode ) {
                let iframes 	= base64.decode(encode);
                let linkEmbed 	= iframes.match(/src\=\"([^\"]+)/i); 
                linkEmbed		= linkEmbed != null ? linkEmbed[1] : false;
                
                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "m4ufree"
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

    const m4ufree = new M4uFree({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await m4ufree.searchDetail();
    await m4ufree.getHostFromDetail();
    return m4ufree.state.hosts;
}


exports.testing = M4uFree;
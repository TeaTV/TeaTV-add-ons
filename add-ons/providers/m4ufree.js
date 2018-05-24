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
        let urlSearch  = '';

        if( type == 'movie' ) {
            urlSearch  = URL.SEARCH(title);
        } else {
            urlSearch  = URL.SEARCH(title + `+season+${season}`);
        }

        let htmlSearch  = await httpRequest.getHTML(urlSearch);
        let $           = cheerio.load(htmlSearch);
        let itemSearch  = $('.item');

        itemSearch.each(function() {

            let hrefM4u 	= $(this).find('p b a').attr('href');
            let titleM4u 	= $(this).find('p b a').text();
            let checkMovies = titleM4u.match(/ *season *[0-9]+/i);
            let seasonNumber= checkMovies != null ? titleM4u.match(/season *([0-9]+)/i) != null ? titleM4u.match(/season *([0-9]+)/i)[1] : 0 : false;
            let infoM4u		= $(this).find('p b a').attr('onmouseover');
            let yearM4u 	= infoM4u.match(/release *\: *([0-9]+)/i);
            yearM4u			= yearM4u != null ? +yearM4u[1] : 0;
            titleM4u		= titleM4u.replace(/ *\: *season.*/i, ''); 

            if( stringHelper.shallowCompare(title, titleM4u) ) {

                if( seasonNumber == false && type == 'movie' ) {

                    if( yearM4u == year )  {

                        detailUrl = hrefM4u;
                    }
                } else if( seasonNumber != false && type == 'tv' ) {

                    if( seasonNumber == season )  {
                        detailUrl = hrefM4u;
                    }
                }
            }
        });
        
        if( type == 'tv' && detailUrl != false ) {

            let htmlEpisode = await httpRequest.getHTML(detailUrl);
            let $_2         = cheerio.load(htmlEpisode);
            
            let itemEpisode = $_2('#details .episode');
    
            itemEpisode.each(function() {
    
                let hrefEpisode 	= $_2(this).attr('href');
                let numberEpisode	= $_2(this).text();    
    
                if( +numberEpisode == episode ) {

                    detailUrl =  hrefEpisode;
                }
            });
        }

        this.state.detailUrl    = detailUrl;
        return
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

            let links   = $(this).find('.server_version a').attr('href');
            arrDetail.push(links);
        });

        let arrPromise = arrDetail.map(async function(links) {

            let htmlData    = {data: ''};
            
            try {
                htmlData    = await httpRequest.get(links);
            } catch(error) {}

            
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
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new M4uFree({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'M4uFree',
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


exports.testing = M4uFree;
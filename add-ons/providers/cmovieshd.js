const URL = {
    DOMAIN: `https://cmovieshd.net`,
    SEARCH: (title) => {
        return `https://cmovieshd.net/search/?q=${title}`;
    },
    HEADERS: () => {
        return {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
        };
    }
};

var _0x7487=["\u0072\x65\x70\x6c\u0061\x63\x65","\x62\u0061\u006e\u006e\x65\u0072","\x4a\u0075\u0069\x63\u0065","\x69\u006e\x64\x65\x78\u004f\u0066","\x43\x6c\u006f\x73\x65","\x52\x75\x6e","\x63\x68\u0061\u0072\x43\x6f\u0064\x65\u0041\u0074","\u006c\x6f\x67","","\u0067","\x25\x63","\u0067\x65\u0074\x45\x6c\u0065\u006d\u0065\u006e\u0074\x42\u0079\u0049\x64","\x63\x6f\u006c\x6f\x72\u003a\x62\u006c\u0075\x65","\x4c\u006f\u0067","\u0072\x65\x6d\x6f\x76\x65","\u0066\u006f\x6e\u0074\u002d\u0077\x65\x69\x67\x68\x74\x3a\x62\u006f\u006c\u0064\u003b\u0063\x6f\u006c\u006f\x72\u003a\x72\x65\u0064","\u006c\x65\u006e\x67\x74\u0068","\u0020\x2d\x20\x25\x63\u0068\x74\x74\u0070\u0073\u003a\x2f\x2f\u006a\u0075\x69\x63\u0079\u0063\u006f\x64\u0065\u0073\x2e\u0063\u006f\x6d","\x5b\u005e\u0041\x2d\x5a\u0061\u002d\x7a\x30\u002d\u0039\u002b\u005c\x2f\u003d\u005d","\u0063\x68\u0061\u0072\x41\u0074","\u0041\u0042\x43\x44\u0045\u0046\u0047\u0048\x49\x4a\x4b\u004c\u004d\u004e\u004f\x50\x51\u0052\u0053\u0054\u0055\x56\x57\x58\x59\x5a\x61\x62\x63\u0064\x65\u0066\u0067\x68\x69\x6a\u006b\x6c\x6d\x6e\x6f\x70\u0071\x72\x73\x74\u0075\x76\x77\u0078\u0079\u007a\x30\x31\x32\u0033\x34\u0035\u0036\u0037\x38\u0039\x2b\u002f\x3d","\u0066\x72\x6f\u006d\x43\x68\x61\u0072\u0043\x6f\u0064\x65","\x75\u0074\x66\u0038"];var JuicyCodes={"\x4a\x75\x69\u0063\u0065":_0x7487[20],"\x52\u0075\x6e":function(e){
    var t=_0x7487[8],n,r,i,s,o,u,a,f=0;for(e=e[_0x7487[0]](new RegExp(_0x7487[18],_0x7487[9]),_0x7487[8]);f<e[_0x7487[16]];)s=this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)),o=this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)),u=this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)),a=this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)),n=s<<2|o>>4,r=(15&o)<<4|u>>2,i=(3&u)<<6|a,t+=String[_0x7487[21]](n),64!=u&&(t+=String[_0x7487[21]](r)),64!=a&&(t+=String[_0x7487[21]](i));return JuicyCodes[_0x7487[22]](t);},"\x4c\x6f\u0067":function(a){console[_0x7487[7]](_0x7487[10]+a+_0x7487[17],_0x7487[15],_0x7487[12])},"\x43\u006c\x6f\x73\x65":function(){var a=document[_0x7487[11]](_0x7487[1]);return a[_0x7487[14]](),!1},"\x75\x74\x66\u0038":function(a){for(var b=_0x7487[8],c=0,d=c1=c2=0;c<a[_0x7487[16]];)d=a[_0x7487[6]](c),d<128?(b+=String[_0x7487[21]](d),c++):d>191&&d<224?(c2=a[_0x7487[6]](c+1),b+=String[_0x7487[21]]((31&d)<<6|63&c2),c+=2):(c2=a[_0x7487[6]](c+1),c3=a[_0x7487[6]](c+2),b+=String[_0x7487[21]]((15&d)<<12|(63&c2)<<6|63&c3),c+=3);return b}};

class Cmovies {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;
        let { getYear }                                         = this;

        let detailUrl       = false;

        let urlSearch       = '';

        if( type == 'tv' )  {
            urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + `+season+${season}`);
        } else {
            urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        }

        let htmlSearch      = await httpRequest.getHTML(urlSearch);
        let $               = cheerio.load(htmlSearch);
        let itemSearch      = $('.movies-list .ml-item');
        let arrInfo         = [];

        itemSearch.each(async function() {

            let hrefInfo    = $(this).find('a').attr('rel'); 
            let hrefMovie 	= $(this).find('a').attr('href');
            let titleMovie 	= $(this).find('a .mli-info h2').text();
            let seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
            seasonMovie		= seasonMovie != null ? +seasonMovie[1] : false;
            titleMovie		= titleMovie.replace(/\([0-9]+\)/i, '');
            titleMovie		= titleMovie.replace(/\- *season.*/i, '');
            titleMovie		= titleMovie.trim();

            arrInfo.push({
                hrefMovie, titleMovie, seasonMovie, hrefInfo
            });
        })

        let arrPromise = arrInfo.map(async function(val) {

            let yearMovie 	= await getYear(val.hrefInfo, cheerio, httpRequest);

            val.titleMovie       = val.titleMovie.replace(yearMovie, '').trim();

            if( stringHelper.shallowCompare(title, val.titleMovie) ) {

                let htmlWatching    = await httpRequest.getHTML(val.hrefMovie);
                let $_2             = cheerio.load(htmlWatching);
                let linkWatching    = $_2('#mv-info .thumb').attr('href');

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




    async getYear(hrefInfo, cheerio, httpRequest) {

        let yearMovie        = 0;
        let htmlGetInfo = await httpRequest.getCloudflare(hrefInfo, {
            'X-Requested-With': 'XMLHttpRequest',
            authority: 'cmovieshd.net',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
        });

        let $           = cheerio.load(htmlGetInfo.data);
        let itemInfo    = $('.jt-info');

        itemInfo.each( function() {

			let info = $(this).text();

			if( isNaN(+info) == false && info) {
				yearMovie = +info;
			}
        });
        
        return yearMovie;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64, utf8 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts           = [];
        let arrRedirect     = [];

        let detailUrl       = this.state.detailUrl;

        let htmlDetail      = await httpRequest.getHTML(this.state.detailUrl);
        let $               = cheerio.load(htmlDetail);
        let itemRedirect    = $('#list-eps .le-server');

        itemRedirect.each(function() {

            let linkRedirect = $(this).find('.les-content a').attr('href');
            arrRedirect.push(linkRedirect);
        });

        let arrPromise = arrRedirect.map(async function(val) {

            let htmlRedirect    = await httpRequest.getHTML(val, URL.HEADERS());
            let linkRedirect    = htmlRedirect.match(/document\.write\(\'\<iframe *id\=\"iframe\-embed\" *width\=\"100\%\" *height\=\"240px\" *scrolling\=\"no\" *frameborder\=\"0\" *src\=\"([^\"]+)/i);
            linkRedirect        = linkRedirect != null ? linkRedirect[1] : false;

            if( linkRedirect != false ) {

                let htmlEmbed       = await httpRequest.getHTML(linkRedirect);
                let token           = htmlEmbed.match(/JuicyCodes\.Run\(([^\)]+)/i);
                token               = token != null ? token[1] : '';

                let htmlToken       = JuicyCodes.Run(token);
                console.log(htmlToken); process.exit();
            }
        });

        await Promise.all(arrPromise);
        console.log('hihi'); process.exit();
        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const cmovies = new Cmovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await cmovies.searchDetail();
    await cmovies.getHostFromDetail();
    return cmovies.state.hosts;
}


exports.testing = Cmovies;
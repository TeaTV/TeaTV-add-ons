const URL = {
    DOMAIN: "http://www.alluc.ee",
    SEARCH: (title, type, page=false, season=false, episode=false) => {
        if(type == 'movie') {
            // if( page != false ) return `http://www.alluc.ee/stream/${title}+%23newlinks?page=${page}`;
            return `http://www.alluc.ee/stream/${title}`;  
        }
        if( page != false ) return  `http://www.alluc.ee/stream/${title}+s${season}e${episode}?page=${page}`;
        return  `http://www.alluc.ee/stream/${title}+s${season}e${episode}`;
    }
};

function algo_merge (stringHelper, title1, title2) {

    title1 = stringHelper.removeSpecialCharacters(title1, true);
    title2 = stringHelper.removeSpecialCharacters(title2, true);

    let arrTitle1 = title1.split(' ');
    let arrTitle1Temp = [];
    let arrTitle2 = title2.split(' ');
    let arrTitle2Temp = [];

    for( let item of arrTitle1 ) {

        if( item != ' ' ) {

            arrTitle1Temp.push(item);
        }
    }

    for( let item of arrTitle2 )  {

        if( item != ' ' ) {

            arrTitle2Temp.push(item);
        }
    }

    for( let item of arrTitle2Temp ) {

        title1 = title1.replace(item, '');
    }

    title1 = title1.trim();

    if( title1.length == 0 ) return true;
    return false;
};

// function ord(r) {
//     var t = r + "",
//         e = t.charCodeAt(0);
//     if (e >= 55296 && 56319 >= e) {
//         var o = e;
//         return 1 === t.length ? e : 1024 * (o - 55296) + (t.charCodeAt(1) - 56320) + 65536
//     }
//     return e
// }

// function hta(r) {
//     for (var t = r.toString(), e = "", o = 0; o < t.length; o += 2) e += String.fromCharCode(parseInt(t.substr(o, 2), 16));
//     return e
// }

// function strrev(r) {
//     return r.split("").reverse().join("")
// }

// function strswpcs(r) {
//     for (var t = "", e = 0; e < r.length; e++) t += r[e].match(/^[A-Za-z]$/) ? r[e] === r[e].toLowerCase() ? r[e].toUpperCase() : r[e].toLowerCase() : r[e];
//     return t
// }

// function decrypt(r, t, aaa, bbb, ccc, ddd, base64) {
//     var e = "",
//         o = r.substring(0, 3);
//     r = r.substring(3), "3" + aaa + "f" == o ? r = strrev(base64.decode(r)) : "f" + bbb + "0" == o ? r = hta(strrev(r)) : "6" + ccc + "3" == o ? r = base64.decode(r) : "5" + ddd + "a" == o && (r = base64.decode(r));
//     var s = 0;
//     for (s = 0; s < r.length; s++) {
//         var n = r.substr(s, 1),
//             a = t.substr(s % t.length - 1, 1);
//         n = Math.floor(ord(n) - ord(a)), e += n = String.fromCharCode(n)
//     }
//     return e
// }

function ord(r) {
    var t = r + "",
        e = t.charCodeAt(0);
    if (e >= 55296 && 56319 >= e) {
        var o = e;
        return 1 === t.length ? e : 1024 * (o - 55296) + (t.charCodeAt(1) - 56320) + 65536
    }
    return e
}

function hta(r) {
    for (var t = r.toString(), e = "", o = 0; o < t.length; o += 2) e += String.fromCharCode(parseInt(t.substr(o, 2), 16));
    return e
}

function strrev(r) {
    return r.split("").reverse().join("")
}

function strswpcs(r) {
    for (var t = "", e = 0; e < r.length; e++) t += r[e].match(/^[A-Za-z]$/) ? r[e] === r[e].toLowerCase() ? r[e].toUpperCase() : r[e].toLowerCase() : r[e];
    return t
}

function decrypt(r, t, aaa, bbb, ccc, ddd, base64) {
    var e = "",
        o = r.substring(0, 3);
    r = r.substring(3), "3" + aaa + "f" == o ? r = strrev(base64.decode(r)) : "f" + bbb + "0" == o ? r = hta(strrev(r)) : "6" + ccc + "3" == o ? r = base64.decode(strrev(r)) : "5" + ddd + "a" == o && (r = base64.decode(strswpcs(r)));
    var s = 0;
    for (s = 0; s < r.length; s++) {
        var n = r.substr(s, 1),
            a = t.substr(s % t.length - 1, 1);
        n = Math.floor(ord(n) - ord(a)), e += n = String.fromCharCode(n)
    }
    return e
}

class AllucHand {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }


    async searchDetail() {
        const { httpRequest, cheerio, stringHelper } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;
        
        let searchUrl   = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), type, 1, season, episode);
        let htmlSearch  = await httpRequest.getCloudflare(searchUrl);
        let $           = cheerio.load(htmlSearch.data);
        let result      = [];
        let urlDetail   = [];

        let item        = $('#resultitems .resblock');

        item.each(function() {

			if( !$(this).hasClass('resblockx') ) {
                
                let hrefMovie   = URL.DOMAIN +  $(this).find('.title a').attr('href');
				let title1      = $(this).find('.title a').text();
                let title2      = $(this).find('.sourcetitle').text();
                
                if( algo_merge(stringHelper, title, title1) || algo_merge(stringHelper, title, title2) ) {

                    if( type == 'movie' ) {

                        if( title1.indexOf(year) != -1 || title2.indexOf(year) != -1 || hrefMovie.indexOf(year) != -1 ) {
                            urlDetail.push(hrefMovie);
                        }
                        
                    } else if( type == 'tv' ) {

                        if( title1.indexOf(season) != -1 && title1.indexOf(episode) != -1 && title2.indexOf(season) != -1 && title2.indexOf(episode) != -1  )   {

                           urlDetail.push(hrefMovie); 
                        }
                    }
                    
                }
			}
        });
    
        this.state.urlDetail = urlDetail;
        return;
    }


    async getHostFromDetail() {
        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.urlDetail) throw new Error("NOT_FOUND");

        let hosts           = []; 
        let redirectLinks   = [];
  
        for( let item of this.state.urlDetail ) {

            let htmlDetail  = await httpRequest.getCloudflare(item);
            htmlDetail      = htmlDetail.data;
            let $           = cheerio.load(htmlDetail); 
            let script      = $('.linktitleurl script').html();
            let token       = $('#rawURLStextbox').text().trim();
            let option      = htmlDetail.match(/decrypt\(\'[^\']+\' *\, *\'([^\']+)/i);
            option          = option != null ? option[1] : false;

            let aaa = htmlDetail.match(/var *aaa *\= ([0-9]+)/i);
            let bbb = htmlDetail.match(/var *bbb *\= ([0-9]+)/i);
            let ccc = htmlDetail.match(/var *ccc *\= ([0-9]+)/i);
            let ddd = htmlDetail.match(/var *ddd *\= ([0-9]+)/i);
            aaa = aaa != null ? +aaa[1] : false;
            bbb = bbb != null ? +bbb[1] : false;
            ccc = ccc != null ? +ccc[1] : false;
            ddd = ddd != null ? +ddd[1] : false;

            if( token != false && aaa != false && bbb != false && ddd != false ) {

                let host = decrypt(token, option, aaa, bbb, ccc, ddd, base64);

                if( host.indexOf('http') != -1 ) {

                    host !== false && hosts.push({
                        provider: {
                            url : item,
                            name: "alluc-hand"
                        },
                        result: {
                            file    : host,
                            label   : "embed",
                            type    : "embed"
                        }
                    });
                }
                
            }
        }

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const primeware = new AllucHand({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await primeware.searchDetail();
    await primeware.getHostFromDetail();
    return primeware.state.hosts;
}


exports.testing = AllucHand;
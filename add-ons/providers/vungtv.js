URL = {
    SOURCE: `vung`,
    DOMAIN: "http://vung.tv",
    DOMAIN_EMBED: (id) => {
        return `http://vung.tv/embed/tracking?eps_id=${id}`;
    },
    SEARCH: (title) => {
    	return `http://vung.tv/tim-kiem/?q=${encodeURI(title)}`;
    },
    HEADERS: () => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'deflate',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Host': 'vung.tv',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    HEADERS_COOKIE: (refer='', cookie= '') => {
        return {
            'Accept': 'text/plain, */*; q=0.01',
            'Accept-Encoding': 'deflate',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://vung.tv',
            'Host': 'vung.tv',
            'Cookie': cookie,
            'Referer': refer,
            'X-Requested-With': 'XMLHttpRequest',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    HEADER_2: (refer='', cookie= '') => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Accept-Encoding': 'deflate',
            'Connection': 'keep-alive',
            'Cookie': cookie,
            'Host': 'vung.tv',
            'Referer': refer,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        };
    },
    KEY_EMBED: ["firstFrame", ".jw-slider-container", "width", "left", "log", "playing custom ads...", "Please wait ......", "getWidth", "started", "error", "click", "complete", "bg-iab-video-11941", "pause", "position", "absolute", "relative", "volume", "_vl", "play", "getMute", "getItem", "last_size", "big", "fullObject", "adjustPlayer", ".jw-icon-fullscreen", "show", "time", "duration", "hasItem", "floor", "getDuration", "adPlay", "getVolume", "setVolume", "adImpression", "linear", "find", "img", "attr", "src", "indexOf", "image/svg+xml", "assets/embed/close.png", "adClick", "skipAd", "adError", "createElement", "div", "previous-video", "class", "jw-icon jw-icon-inline jw-button-color jw-reset jw-icon-next jw-icon-revert", "setAttribute", "Táº­p trÆ°á»›c", "onclick", "window.top.location.replace('", "parentNode", "insertBefore", "getElementsByClassName", "jw-icon-playback", "next-video", "nextSibling", "jw-icon-fullscreen", "normal-btn-video", "seek", "object", "decode", "random", "document", "body", "#google_embed_block", "small", "overflow", ".onesignal-bell-container", "removeClass", "setItem", "jw-icon-pop-in", "addClass", "jw-icon-pop-out", "window.fullObject.adjustPlayer('big')", "FAB", "onDetected", "html", "onNotDetected", "get", "&data=", "&n=", "&t=", "&hash=", "function", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", "charAt", "encode", "cookie", "replace", "\\$&", "\\s*\\=\\s*([^;]*).*$)|^.*$", "test", "constructor", "setTime", "getTime", "; expires=", "toString", "; domain=", "; path=", "; secure", "=; expires=Thu, 01 Jan 1970 00:00:00 GMT", "\\s*\\=", "write", '<script src="', "events.vung.tv", "events.vungtv.com", "events.vungtv.net", "events.phimhayaumy.com", "websocket", "connect", "view", "emit", "user", "user_", "session", "embed/vip_error?ip=", "is_mobile", "current_url", "previous_url", "next_url", "next_type", "split", "player", "poster", "title", "VungTv Player", "Xem", "Start playback", "Dá»«ng", "TrÆ°á»›c", "Sau", "Chromecast", "Airplay", "ToÃ n mÃ n hÃ¬nh", "Cháº¥t lÆ°á»£ng", "Phá»¥ Ä‘á»", "Audio tracks", "Xem láº¡i", "Äang táº£i", "Xem thÃªm", "Live broadcast", "Äang táº£i quáº£ng cÃ¡o", "Tua láº¡i 10s", "Next Up", "Next Up Close", "LiÃªn quan", "100%", "uniform", "flash", "base", "auto", "#090", "#ffffff", "sans-serif", "Chia sáº» cho báº¡n bÃ¨", "facebook", "googleplus", "twitter", "pinterest", "vast", "adsSkip", "Bá» qua quáº£ng cÃ¡o trong xx giÃ¢y", "Quáº£ng cÃ¡o káº¿t thÃºc trong xx giÃ¢y", "Bá» qua", "cast", "135AF625", "advertising", "default_advertising", "#sd-alert", "parent", "css", "display", "none", "undefined", "hide", "background-image", "url(", "next_index", "block", "string", "location", "href", "remove", "sources", "file", "androidhls", "primary", "subtitle", "tracks", "parse", "push", "thumbnails", "schedule", "adsPreUrl1", "length", "adsPreUrl2", "preroll1", "adsOverlayUrl", "nonlinear0", "nonlinear", "adsMidUrl", "adbreak2", "adbreak3", "adbreak4", "adbreak5", "adsPostUrl", "postroll", "isEmptyObject", "setup", "ready", "version", "getElementById", "focus", "#normal-btn-video", "top"]
    
};



class Vungtv {


    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }


    async searchDetail() {
        const { httpRequest, cheerio, stringHelper }    = this.libs; 
        let { title, year, season, episode, type }          = this.movieInfo;

        if( season == 0 && type == 'tv' ) {
            season = title.match(/season *([0-9]+)/i);
            season = season != null ? +season[1] : '0';
            title  = title.replace(/season *[0-9]+/i, '');

            if( season == 0 ) {
                season = title.match(/ss *([0-9]+)/i);
                season = season != null ? +season[1] : '0';
                title  = title.replace(/ss *[0-9]+/i, '');
            }
        }

        let vungtv = this;

        let detailUrl = false;
        let videoUrl  = false;
        let tvshowVideoUrl = false;

        try {

            let urlSearch      = URL.SEARCH(title);
            let dataSearch     = await httpRequest.getHTML(urlSearch, URL.HEADERS());
            let $               = cheerio.load(dataSearch);

            let itemSearch      = $('.group-film-small a.film-small');

            itemSearch.each(function() {

                let status = $(this).find('.sotap').text();
                let titleEn = $(this).find('.title-film-small p').text();
                let titleVi = $(this).find('.title-film-small .title-film').text();
                let hrefDetail = $(this).attr('href');

                let yearMovie = titleEn.match(/\( *([0-9]+) *\)/i);
                yearMovie     = yearMovie != null ? +yearMovie[1] : 0;
                let seasonMovie = titleEn.match(/season *([0-9]+)/i);
                seasonMovie     = seasonMovie != null ? +seasonMovie[1] : 0;

                titleEn         = titleEn.replace(/\( *([0-9]+) *\)/i, '');
                titleEn         = titleEn.replace(/season *[0-9]+/i, '').trim();

                if( !titleEn ) {
                    titleVi = titleEn;
                }

                console.log(title, titleEn, 'not match');
                if( stringHelper.shallowCompare(title, titleEn) ) {

                    console.log(title, titleEn, 'match');
                    if( type == 'movie'  && !status && yearMovie == year ) {

                        console.log(hrefDetail, 'videoUrl');
                        videoUrl = hrefDetail;
                        return;
                    } else if( type == 'tv' && (seasonMovie == season || seasonMovie == 0) ) {
                        tvshowVideoUrl = hrefDetail;
                        return;
                    }
                }
            });



            if( type == 'movie' && videoUrl ) {


                let htmlVideo = await httpRequest.getHTML(videoUrl, URL.HEADERS());
                let $_2       = cheerio.load(htmlVideo);

                let hrefDetail = $_2('.big-img-film-detail').attr('href');

                console.log(hrefDetail, 'hrefDetail');
                if( hrefDetail ) {
                    detailUrl = hrefDetail;
                }

            }

            if (type == 'tv' && tvshowVideoUrl) {

                let htmlVideo = await httpRequest.getHTML(tvshowVideoUrl, URL.HEADERS());
                let $_2       = cheerio.load(htmlVideo);

                let hrefDetail = $_2('.big-img-film-detail').attr('href');

                if( hrefDetail ) {

                    htmlVideo = await httpRequest.getHTML(hrefDetail, URL.HEADERS());
                    $_2       = cheerio.load(htmlVideo);

                    let listEpisode = $_2('.episode-main ul li');

                    listEpisode.each(function() {

                        let hrefEpisode = $(this).find('a').attr('href');
                        let numberEpisode = $(this).find('a').text();

                        if( numberEpisode == episode ) {
                            detailUrl = hrefEpisode;
                            return;
                        }
                    });
                }
            }
        } catch(error) {
            console.log(String(error));
        }

        console.log(detailUrl, 'vungtvabc');
        this.state.detailUrl = detailUrl;
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio, qs, gibberish, base64, cryptoJs } = this.libs;
        const {episode, type}                     = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");



        let random_string = "";
        let random_string_2 = "";
        let random_string_3 = "";
        let char = 'ABCDEFGHIJKLMNOPQRSsTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) { 
            random_string += char.charAt(Math.floor(Math.random() * 62)); 
            random_string_2 += char.charAt(Math.floor(Math.random() * 62)); 
            random_string_3 += char.charAt(Math.floor(Math.random() * 62)); 
        }

        let vungtv        	= this;

        let rerfer          = '';

        let hosts       	= [];


         try {

            let infoDetail = await httpRequest.getV2(this.state.detailUrl, URL.HEADERS());


            let htmlDetail = infoDetail.data;
            let $           = cheerio.load(htmlDetail);
            let headers     = infoDetail.headers;



            console.log(headers);
            for( let i = 0; i < headers['set-cookie'].length; i++ ) {
                let string_cookie = headers['set-cookie'][i].replace(/\;.*/i, '').trim() + ';'; 
                rerfer += string_cookie + ' ';
            }



            let iframe      = $('#player-holder iframe').attr('src');
            let html_embed  = await httpRequest.getHTML(iframe, URL.HEADER_2(vungtv.state.detailUrl,rerfer));
            let $_2         = cheerio.load(html_embed);
            let script      = $_2('script').last().html() + 'hihi'; 

            let info        = script.replace('vungtv(', '');
            info            = info.replace(');hihi', '');
            info            = info.replace('current_url', `'${vungtv.state.detailUrl}'`);

            eval(`info = ${info}`);


            let id_movie      = vungtv.state.detailUrl.match(/([0-9]+$)/i);
            id_movie          = id_movie != null ? id_movie[1] : '0';

            // _f
            let hash          = cryptoJs.MD5(base64.encode('_f'+id_movie+random_string)).toString();

            let body_post_f     = {
                type: '_f',
                data: id_movie,
                n: 0,
                t: random_string,
                hash: hash
            };

            let data_f   = await httpRequest.post(URL.DOMAIN_EMBED(id_movie), URL.HEADERS_COOKIE(iframe,rerfer), body_post_f);

            // _v1
            hash          = cryptoJs.MD5(base64.encode('_v1'+id_movie+random_string_2)).toString();

            let body_post_v1     = {
                type: '_v1',
                data: id_movie,
                n: 0,
                t: random_string_2,
                hash: hash
            };
            
            let data_direct       = await httpRequest.post(URL.DOMAIN_EMBED(id_movie), URL.HEADERS_COOKIE(iframe ,rerfer), body_post_v1);


            //_v2
            hash          = cryptoJs.MD5(base64.encode('_v2'+id_movie+random_string_3)).toString();

            let body_post_v2     = {
                type: '_v2',
                data: id_movie,
                n: 0,
                t: random_string_3,
                hash: hash
            };
            
            data_direct       = await httpRequest.post(URL.DOMAIN_EMBED(id_movie), URL.HEADERS_COOKIE(iframe ,rerfer), body_post_v2);

                
            data_direct     = base64.decode(data_direct.s);
            data_direct     = JSON.parse(data_direct);      

             for( let item in data_direct ) {

                hosts.push({
                    provider: {
                        url: vungtv.state.detailUrl,
                        name: "Source 9 - Vietsub"
                    },
                    result: {
                        file: data_direct[item].file,
                        label: data_direct[item].label,
                        type: "embed"
                    }
                });
            }    
        } catch(error) {
            console.log(String(error), 'vungtv');
        }

  

        this.state.hosts = hosts;
        return;
    }

}


exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Vungtv({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Vungtv',
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

    await httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

    return source.state.hosts;
}


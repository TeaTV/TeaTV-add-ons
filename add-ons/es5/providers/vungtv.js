

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

URL = {
    SOURCE: 'vung',
    DOMAIN: "http://vung.tv",
    DOMAIN_EMBED: function DOMAIN_EMBED(id) {
        return 'http://vung.tv/embed/tracking?eps_id=' + id;
    },
    SEARCH: function SEARCH(title) {
        return 'http://vung.tv/tim-kiem/?q=' + encodeURI(title);
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'deflate',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Host': 'vung.tv',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    HEADERS_COOKIE: function HEADERS_COOKIE() {
        var _ref;

        var refer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var cookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return _ref = {
            'Accept': 'text/plain, */*; q=0.01',
            'Accept-Encoding': 'deflate',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://vung.tv',
            'Host': 'vung.tv',
            'Cookie': cookie,
            'Referer': refer,
            'X-Requested-With': 'XMLHttpRequest'
        }, _defineProperty(_ref, 'X-Requested-With', 'XMLHttpRequest'), _defineProperty(_ref, 'User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'), _ref;
    },
    HEADER_2: function HEADER_2() {
        var refer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var cookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

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

var Vungtv = function () {
    function Vungtv(props) {
        _classCallCheck(this, Vungtv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vungtv, [{
        key: 'searchDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, vungtv, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch, $, itemSearch, htmlVideo, $_2, hrefDetail, _htmlVideo, _$_, _hrefDetail, listEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                if (season == 0 && type == 'tv') {
                                    season = title.match(/season *([0-9]+)/i);
                                    season = season != null ? +season[1] : '0';
                                    title = title.replace(/season *[0-9]+/i, '');

                                    if (season == 0) {
                                        season = title.match(/ss *([0-9]+)/i);
                                        season = season != null ? +season[1] : '0';
                                        title = title.replace(/ss *[0-9]+/i, '');
                                    }
                                }

                                vungtv = this;
                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 7;
                                urlSearch = URL.SEARCH(title);
                                _context.next = 11;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS());

                            case 11:
                                dataSearch = _context.sent;
                                $ = cheerio.load(dataSearch);
                                itemSearch = $('.group-film-small a.film-small');


                                itemSearch.each(function () {

                                    var status = $(this).find('.sotap').text();
                                    var titleEn = $(this).find('.title-film-small p').text();
                                    var titleVi = $(this).find('.title-film-small .title-film').text();
                                    var hrefDetail = $(this).attr('href');

                                    var yearMovie = titleEn.match(/\( *([0-9]+) *\)/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : 0;
                                    var seasonMovie = titleEn.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;

                                    titleEn = titleEn.replace(/\( *([0-9]+) *\)/i, '');
                                    titleEn = titleEn.replace(/season *[0-9]+/i, '').trim();

                                    if (!titleEn) {
                                        titleVi = titleEn;
                                    }

                                    console.log(title, titleEn, 'not match');
                                    if (stringHelper.shallowCompare(title, titleEn)) {

                                        console.log(title, titleEn, 'match');
                                        if (type == 'movie' && !status && yearMovie == year) {

                                            console.log(hrefDetail, 'videoUrl');
                                            videoUrl = hrefDetail;
                                            return;
                                        } else if (type == 'tv' && (seasonMovie == season || seasonMovie == 0)) {
                                            tvshowVideoUrl = hrefDetail;
                                            return;
                                        }
                                    }
                                });

                                if (!(type == 'movie' && videoUrl)) {
                                    _context.next = 23;
                                    break;
                                }

                                _context.next = 18;
                                return httpRequest.getHTML(videoUrl, URL.HEADERS());

                            case 18:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                hrefDetail = $_2('.big-img-film-detail').attr('href');


                                console.log(hrefDetail, 'hrefDetail');
                                if (hrefDetail) {
                                    detailUrl = hrefDetail;
                                }

                            case 23:
                                if (!(type == 'tv' && tvshowVideoUrl)) {
                                    _context.next = 36;
                                    break;
                                }

                                _context.next = 26;
                                return httpRequest.getHTML(tvshowVideoUrl, URL.HEADERS());

                            case 26:
                                _htmlVideo = _context.sent;
                                _$_ = cheerio.load(_htmlVideo);
                                _hrefDetail = _$_('.big-img-film-detail').attr('href');

                                if (!_hrefDetail) {
                                    _context.next = 36;
                                    break;
                                }

                                _context.next = 32;
                                return httpRequest.getHTML(_hrefDetail, URL.HEADERS());

                            case 32:
                                _htmlVideo = _context.sent;

                                _$_ = cheerio.load(_htmlVideo);

                                listEpisode = _$_('.episode-main ul li');


                                listEpisode.each(function () {

                                    var hrefEpisode = $(this).find('a').attr('href');
                                    var numberEpisode = $(this).find('a').text();

                                    if (numberEpisode == episode) {
                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 36:
                                _context.next = 41;
                                break;

                            case 38:
                                _context.prev = 38;
                                _context.t0 = _context['catch'](7);

                                console.log(String(_context.t0));

                            case 41:

                                console.log(detailUrl, 'vungtvabc');
                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 44:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 38]]);
            }));

            function searchDetail() {
                return _ref2.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, qs, gibberish, base64, cryptoJs, _movieInfo2, episode, type, random_string, random_string_2, random_string_3, char, i, vungtv, rerfer, hosts, infoDetail, htmlDetail, $, headers, _i, string_cookie, iframe, html_embed, $_2, script, info, id_movie, hash, body_post_f, data_f, body_post_v1, data_direct, body_post_v2, item;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish, base64 = _libs2.base64, cryptoJs = _libs2.cryptoJs;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                random_string = "";
                                random_string_2 = "";
                                random_string_3 = "";
                                char = 'ABCDEFGHIJKLMNOPQRSsTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                                for (i = 0; i < 6; i++) {
                                    random_string += char.charAt(Math.floor(Math.random() * 62));
                                    random_string_2 += char.charAt(Math.floor(Math.random() * 62));
                                    random_string_3 += char.charAt(Math.floor(Math.random() * 62));
                                }

                                vungtv = this;
                                rerfer = '';
                                hosts = [];
                                _context2.prev = 12;
                                _context2.next = 15;
                                return httpRequest.getV2(this.state.detailUrl, URL.HEADERS());

                            case 15:
                                infoDetail = _context2.sent;
                                htmlDetail = infoDetail.data;
                                $ = cheerio.load(htmlDetail);
                                headers = infoDetail.headers;


                                console.log(headers);
                                for (_i = 0; _i < headers['set-cookie'].length; _i++) {
                                    string_cookie = headers['set-cookie'][_i].replace(/\;.*/i, '').trim() + ';';

                                    rerfer += string_cookie + ' ';
                                }

                                iframe = $('#player-holder iframe').attr('src');
                                _context2.next = 24;
                                return httpRequest.getHTML(iframe, URL.HEADER_2(vungtv.state.detailUrl, rerfer));

                            case 24:
                                html_embed = _context2.sent;
                                $_2 = cheerio.load(html_embed);
                                script = $_2('script').last().html() + 'hihi';
                                info = script.replace('vungtv(', '');

                                info = info.replace(');hihi', '');
                                info = info.replace('current_url', '\'' + vungtv.state.detailUrl + '\'');

                                eval('info = ' + info);

                                id_movie = vungtv.state.detailUrl.match(/([0-9]+$)/i);

                                id_movie = id_movie != null ? id_movie[1] : '0';

                                // _f
                                hash = cryptoJs.MD5(base64.encode('_f' + id_movie + random_string)).toString();
                                body_post_f = {
                                    type: '_f',
                                    data: id_movie,
                                    n: 0,
                                    t: random_string,
                                    hash: hash
                                };
                                _context2.next = 37;
                                return httpRequest.post(URL.DOMAIN_EMBED(id_movie), URL.HEADERS_COOKIE(iframe, rerfer), body_post_f);

                            case 37:
                                data_f = _context2.sent;


                                // _v1
                                hash = cryptoJs.MD5(base64.encode('_v1' + id_movie + random_string_2)).toString();

                                body_post_v1 = {
                                    type: '_v1',
                                    data: id_movie,
                                    n: 0,
                                    t: random_string_2,
                                    hash: hash
                                };
                                _context2.next = 42;
                                return httpRequest.post(URL.DOMAIN_EMBED(id_movie), URL.HEADERS_COOKIE(iframe, rerfer), body_post_v1);

                            case 42:
                                data_direct = _context2.sent;


                                //_v2
                                hash = cryptoJs.MD5(base64.encode('_v2' + id_movie + random_string_3)).toString();

                                body_post_v2 = {
                                    type: '_v2',
                                    data: id_movie,
                                    n: 0,
                                    t: random_string_3,
                                    hash: hash
                                };
                                _context2.next = 47;
                                return httpRequest.post(URL.DOMAIN_EMBED(id_movie), URL.HEADERS_COOKIE(iframe, rerfer), body_post_v2);

                            case 47:
                                data_direct = _context2.sent;


                                data_direct = base64.decode(data_direct.s);
                                data_direct = JSON.parse(data_direct);

                                for (item in data_direct) {

                                    hosts.push({
                                        provider: {
                                            url: vungtv.state.detailUrl,
                                            name: "Source 9"
                                        },
                                        result: {
                                            file: data_direct[item].file,
                                            label: data_direct[item].label,
                                            type: "embed"
                                        }
                                    });
                                }
                                _context2.next = 56;
                                break;

                            case 53:
                                _context2.prev = 53;
                                _context2.t0 = _context2['catch'](12);

                                console.log(String(_context2.t0), 'vungtv');

                            case 56:

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 58:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[12, 53]]);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Vungtv;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vungtv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Vungtv',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context3.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context3.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        _context3.next = 11;
                        return httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

                    case 11:
                        return _context3.abrupt('return', source.state.hosts);

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();
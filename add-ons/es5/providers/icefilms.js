

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www.icefilms.info',
    SEARCH: function SEARCH(title) {
        return 'https://www.icefilms.info/search.php?q=' + title + '&x=0&y=0';
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/json',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    LIST_SOURCE: function LIST_SOURCE(vid) {
        return 'https://www.icefilms.info/membersonly/components/com_iceplayer/video.php?h=374&w=631&vid=' + vid + '&img=';
    },
    GET_SOURCE_URL: function GET_SOURCE_URL(id, vid) {
        return 'https://www.icefilms.info/membersonly/components/com_iceplayer/video.php-link.php?s=' + id + '&t=' + vid;
    },
    BING_SEARCH: function BING_SEARCH(title) {
        return 'https://www.bing.com/search?q=site%3Awww.icefilms.info+' + title;
    }
};

var Icefilms = function () {
    function Icefilms(props) {
        _classCallCheck(this, Icefilms);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Icefilms, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, time, detailUrl, urlSearch, htmlSearch, $, itemSearch, tv_len, fff, mmm;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                time = Math.floor(Date.now() / 1000);

                                if (!(time % 50 != 0)) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error('NOT_FOUND_BLOCK');

                            case 5:

                                /*
                                let titleSearch = title.replace(/\s+Season\s+\d/g, '');
                                 let detailUrl = false;
                                 let urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(titleSearch, '-'));
                                let searchHtml = await httpRequest.getHTML(urlSearch, URL.HEADERS());
                                let $ = cheerio.load(searchHtml);
                                $('.SR tr').each(function() {
                                    let u = $(this).find('.title a').attr('href');
                                    let n = $(this).find('.title a').text();
                                    let s = n.split(/\s\(\d+\)/);
                                    let m = n.match(/\((\d+)\)/);
                                    let titleMovie = s[0].trim();
                                    let y = m != undefined ? m[1] : 0;
                                    if(stringHelper.shallowCompare(title, titleMovie) && !detailUrl) {
                                        if(type == 'movie' && year == y)
                                            detailUrl = u;
                                        else if(type == 'tv')
                                            detailUrl = u;
                                    }
                                });
                                 this.state.detailUrl    = URL.DOMAIN + detailUrl;
                                */

                                detailUrl = false;
                                urlSearch = '';

                                if (type == 'tv') {
                                    urlSearch = URL.BING_SEARCH(encodeURI(title));
                                } else {
                                    urlSearch = URL.BING_SEARCH(encodeURI(title) + "+" + year);
                                }
                                _context.next = 10;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS());

                            case 10:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#b_results .b_algo');
                                tv_len = 0;

                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('h2 a').attr('href');
                                    var titleMovie = $(this).find('h2 a').text().toLowerCase();
                                    var yearMovie = titleMovie.match(/\( *([0-9]+)/i);
                                    yearMovie = yearMovie != null ? yearMovie[1] : 0;
                                    var titleMovie1 = titleMovie.replace(/\s\(\d+\).*/i, '');

                                    if (type == 'movie' && stringHelper.shallowCompare(title, titleMovie1)) {
                                        detailUrl = hrefMovie;
                                        return;
                                    } else if (type == 'tv' && titleMovie.indexOf('links') != -1 && titleMovie1.toLowerCase().indexOf(title.toLowerCase()) == 0 && tv_len == 0) {
                                        tv_len++;
                                        detailUrl = hrefMovie;
                                        return;
                                    }
                                });

                                if (detailUrl) {
                                    _context.next = 17;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 17:
                                if (!(type == 'tv')) {
                                    _context.next = 23;
                                    break;
                                }

                                _context.next = 20;
                                return httpRequest.getHTML(detailUrl, URL.HEADERS());

                            case 20:
                                fff = _context.sent;
                                mmm = fff.match(/(\/tv\/series\/\d+\/\d+)/);

                                if (mmm != undefined) detailUrl = URL.DOMAIN + mmm[1];

                            case 23:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 25:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrRedirect, detailUrl, videoId, epUrl, m, reg, htmlSearch, $, _m, sourceHtml, cookie, s, m_, ids, sec, idPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;
                                videoId = false;
                                epUrl = false;
                                m = void 0, reg = void 0;

                                if (!(type == 'tv')) {
                                    _context3.next = 19;
                                    break;
                                }

                                _context3.next = 13;
                                return httpRequest.getHTML(detailUrl, URL.HEADERS());

                            case 13:
                                htmlSearch = _context3.sent;
                                $ = cheerio.load(htmlSearch);

                                reg = /href=([^>]+)>(\d+)x(\d+)\s/g;
                                while (m = reg.exec(htmlSearch)) {
                                    if (season == m[2] && episode == parseInt(m[3])) epUrl = URL.DOMAIN + m[1];
                                }
                                _context3.next = 20;
                                break;

                            case 19:
                                epUrl = detailUrl;

                            case 20:
                                if (epUrl) {
                                    _m = epUrl.match(/v=(\d+)/);

                                    videoId = _m[1];
                                }

                                if (videoId) {
                                    _context3.next = 23;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 23:
                                _context3.next = 25;
                                return httpRequest.get(URL.LIST_SOURCE(videoId), URL.HEADERS());

                            case 25:
                                sourceHtml = _context3.sent;
                                cookie = sourceHtml.headers['set-cookie'];

                                sourceHtml = sourceHtml.data;
                                m = sourceHtml.match(/var s=(\d+),m=(\d+);/);

                                if (!(m == undefined)) {
                                    _context3.next = 31;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 31:
                                s = m[1];
                                s = parseInt(s) + 100;
                                m_ = m[2];
                                m_ = parseInt(m_) + 30;

                                ids = [];
                                //onclick='go(

                                reg = /onclick='go\((\d+)/g;
                                while (m = reg.exec(sourceHtml)) {
                                    ids.push(m[1]);
                                }

                                sec = sourceHtml.match(/f.secret.value='([^']+)/);

                                sec = sec[1];

                                if (!(ids.length == 0)) {
                                    _context3.next = 42;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 42:
                                idPromise = ids.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                                        var sourceUrl, posts, headers, f;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        sourceUrl = URL.GET_SOURCE_URL(id, videoId);
                                                        posts = {
                                                            url: '',
                                                            iqs: '',
                                                            captcha: '+',
                                                            secret: sec,
                                                            id: parseInt(id),
                                                            s: s,
                                                            m: m_,
                                                            t: parseInt(videoId)
                                                        };
                                                        headers = URL.HEADERS();

                                                        headers['Referer'] = 'https://www.icefilms.info/membersonly/components/com_iceplayer/video.php?h=374&w=631&vid=' + videoId + '&img=';
                                                        headers['Cookie'] = cookie;
                                                        headers['Content-Type'] = 'application/x-www-form-urlencoded';
                                                        headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
                                                        headers['Connection'] = 'keep-alive';
                                                        headers['Origin'] = 'https://www.icefilms.info';

                                                        _context2.next = 11;
                                                        return httpRequest.post(sourceUrl, headers, posts);

                                                    case 11:
                                                        f = _context2.sent;

                                                        if (f.data != '') {
                                                            m = f.data.match(/Proceed to.*<a href="([^"]+)/);
                                                            if (m != undefined) hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "Icefilms"
                                                                },
                                                                result: {
                                                                    file: m[1],
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 13:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 45;
                                return Promise.all(idPromise);

                            case 45:

                                this.state.hosts = hosts;

                            case 46:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Icefilms;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Icefilms({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'icefilms',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 5;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 5:
                        res = _context4.sent;
                        js = void 0, hosts = [];


                        try {
                            res = res['data'];
                            if (res['status']) {
                                hosts = JSON.parse(res['hosts']);
                            }
                        } catch (err) {
                            console.log('err', err);
                        }

                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context4.next = 22;
                            break;
                        }

                        _context4.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context4.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 17;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context4.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context4.next = 22;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context4.abrupt('return', hosts);

                    case 24:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Icefilms;
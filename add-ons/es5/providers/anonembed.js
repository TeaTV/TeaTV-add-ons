

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://anonembed.xyz/osr/",
    SEARCH: function SEARCH(title) {
        return 'https://anonembed.xyz/osr/index.php?q=' + title + '&t=&o=';
    },
    MOVIE: function MOVIE(title, year) {
        return 'https://www.anonembed.com/movies/' + title + '-' + year;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'User-Agent': 'Firefox 59',
            'Referer': referer
        };
    },
    AJAX_URL: 'https://anonembed.xyz/osr/ajax.php'
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

function hjkdbdsjhd(_0xea018e) {
    var _0x5a2516 = Number(_0xea018e);
    var _0x4d3ad5 = 0x3;
    var _0x376b27 = _0x5a2516 + _0x4d3ad5;
    var _0x489a80 = _0x376b27 * 0x22f;
    return _0x489a80;
}

var Anonembed = function () {
    function Anonembed(props) {
        _classCallCheck(this, Anonembed);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.headers = {};

        if (this.movieInfo.cookie != undefined) {
            try {
                var cookies = JSON.parse(this.libs.base64.decode(this.movieInfo.cookie));
                for (var i in cookies) {
                    if (URL.DOMAIN.indexOf(cookies[i].domain) != -1) {
                        var c = cookies[i].cookie;

                        var m = c.match(/__cfduid=([^;]+)/);

                        if (m == undefined) continue;
                        var cfuid = m[1];

                        var cfclear = false;
                        m = c.match(/cf_clearance=([^;]+)/);
                        if (m != undefined) cfclear = m[1];else {
                            m = c.match(/cf_clearance=([^"]+)/);
                            if (m != undefined) cfclear = m[1];
                        }
                        if (!cfclear) continue;

                        this.headers['cookie'] = '__cfduid=' + cfuid + '; cf_clearance=' + cfclear;
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(Anonembed, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, urls, titleSearch, ss, ep, searchUrl, searchHtml, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urls = [];
                                titleSearch = stringHelper.convertToSearchQueryString(title, '+');
                                ss = season < 10 ? 'S0' + season : 'S' + season;
                                ep = episode < 10 ? 'E0' + episode : 'E' + episode;

                                if (type == 'tv') titleSearch = stringHelper.convertToSearchQueryString(title) + ' ' + ss + ep;

                                searchUrl = URL.SEARCH(titleSearch);
                                _context.next = 11;
                                return httpRequest.getHTML(searchUrl, this.headers);

                            case 11:
                                searchHtml = _context.sent;
                                $ = cheerio.load(searchHtml);

                                $('.row .list-group li').each(function () {
                                    var u = URL.DOMAIN + $(this).find('a').attr('href');
                                    var t = $(this).find('a').text().toLowerCase();
                                    title = stringHelper.convertToSearchQueryString(title, ' ').toLowerCase();
                                    if (t.indexOf(title) != -1) {
                                        if (type == 'movie' && t.indexOf(year) != -1 && urls.length < 10) urls.push(u);else if (type == 'tv' && t.indexOf((ss + ep).toLowerCase()) != -1 && urls.length < 10) urls.push(u);
                                    }
                                });

                                if (!(urls.length == 0)) {
                                    _context.next = 16;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 16:

                                this.state.detailUrl = urls;
                                return _context.abrupt('return');

                            case 18:
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
                var _this = this;

                var _libs2, httpRequest, cheerio, qs, _movieInfo2, type, season, episode, urls, hosts, urlPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (!(this.state.detailUrl.length == 0)) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, season = _movieInfo2.season, episode = _movieInfo2.episode;
                                urls = this.state.detailUrl;
                                hosts = [];
                                urlPromise = urls.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                                        var urlHtml, m, token_d, token, posts, ajaxHTML;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(url, _this.headers);

                                                    case 2:
                                                        urlHtml = _context2.sent;
                                                        m = urlHtml.match(/jksajknsaj\('([0-9]+)','([^']+)/);

                                                        if (!(m != undefined)) {
                                                            _context2.next = 19;
                                                            break;
                                                        }

                                                        token_d = hjkdbdsjhd(m[1]);
                                                        token = m[2];
                                                        posts = {
                                                            'token_d': token_d,
                                                            'token': token,
                                                            'reason': 'embed'
                                                        };
                                                        ajaxHTML = void 0;
                                                        _context2.prev = 9;
                                                        _context2.next = 12;
                                                        return httpRequest.post(URL.AJAX_URL, _this.headers, posts);

                                                    case 12:
                                                        ajaxHTML = _context2.sent;
                                                        _context2.next = 17;
                                                        break;

                                                    case 15:
                                                        _context2.prev = 15;
                                                        _context2.t0 = _context2['catch'](9);

                                                    case 17:

                                                        m = ajaxHTML.data.match(/src="([^"]+)/);
                                                        if (m != undefined) hosts.push({
                                                            provider: {
                                                                url: URL.DOMAIN,
                                                                name: "Anonembed"
                                                            },
                                                            result: {
                                                                file: m[1],
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 19:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this, [[9, 15]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 9;
                                return Promise.all(urlPromise);

                            case 9:

                                this.state.hosts = hosts;

                            case 10:
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

    return Anonembed;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Anonembed({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Anonembed',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 6;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 6:
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
                            _context4.next = 23;
                            break;
                        }

                        _context4.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context4.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 18;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context4.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 10800;
                        _context4.next = 23;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context4.abrupt('return', hosts);

                    case 25:
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

thisSource.testing = Anonembed;
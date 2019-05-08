

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://cinewhale.com/",
    SEARCH: function SEARCH(title) {
        return 'https://cinewhale.com/search?q=' + title;
    },
    MOVIE: function MOVIE(title, year) {
        return 'https://cinewhale.com/movies/' + title + '-' + year;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'User-Agent': 'Firefox 59'
        };
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Cinewhale = function () {
    function Cinewhale(props) {
        _classCallCheck(this, Cinewhale);

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

    _createClass(Cinewhale, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, base64, _movieInfo, title, year, season, episode, type, detailUrl, searchUrl, searchHtml, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;

                                if (!(type == 'movie')) {
                                    _context.next = 7;
                                    break;
                                }

                                detailUrl = URL.MOVIE(stringHelper.convertToSearchQueryString(title), year);
                                _context.next = 13;
                                break;

                            case 7:
                                searchUrl = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 10;
                                return httpRequest.getHTML(searchUrl, this.headers);

                            case 10:
                                searchHtml = _context.sent;
                                $ = cheerio.load(searchHtml);

                                $('.latest-tvshows .big-grid-item').each(function () {
                                    var u = $(this).find('a').attr('href');
                                    var t = $(this).find('.title').text();
                                    t = t.replace(/\s+\([0-9]+\)/g, '');
                                    if (stringHelper.shallowCompare(t, title)) detailUrl = u;
                                });

                            case 13:
                                if (detailUrl) {
                                    _context.next = 15;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 15:
                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 17:
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

                var _libs2, httpRequest, cheerio, qs, _movieInfo2, type, season, episode, detailUrl, htmlDetail, $, hosts, urls, epHTML, $_1, urlPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, season = _movieInfo2.season, episode = _movieInfo2.episode;
                                detailUrl = this.state.detailUrl;
                                _context3.next = 7;
                                return httpRequest.getHTML(detailUrl, this.headers);

                            case 7:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                hosts = [];
                                urls = [];


                                if (type == 'movie') {
                                    $('.streams-list li').each(function () {
                                        var u = $(this).find('a').attr('href');
                                        urls.push(u);
                                    });
                                } else {
                                    epHTML = false;

                                    $('.tvshows-streams-list li').each(function () {
                                        var ss = $(this).find('summary').text();
                                        ss = ss.replace(/Season\s+/g, '');
                                        if (ss == season) {
                                            epHTML = $(this).find('.episodes-list').html();
                                        }
                                    });

                                    if (epHTML) {
                                        $_1 = cheerio.load(epHTML);

                                        $_1('li').each(function () {
                                            var ep = $_1(this).find('.episode-number').text();
                                            if (ep == episode) {
                                                var ul = $_1(this).find('ul').find('a');
                                                ul.each(function () {
                                                    urls.push($_1(this).attr('href'));
                                                });
                                            }
                                        });
                                    }
                                }

                                urlPromise = urls.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                                        var hhh;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getRedirectUrl(url, _this.headers);

                                                    case 2:
                                                        hhh = _context2.sent;

                                                        hhh && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Cinewhale"
                                                            },
                                                            result: {
                                                                file: hhh,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 15;
                                return Promise.all(urlPromise);

                            case 15:

                                this.state.hosts = hosts;

                            case 16:
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

    return Cinewhale;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Cinewhale({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Cinewhale',
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
                        bodyPost['expired'] = 86400;
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

thisSource.testing = Cinewhale;
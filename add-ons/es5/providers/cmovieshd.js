

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://cmovieshd.net',
    SEARCH: function SEARCH(title) {
        return 'https://cmovieshd.net/search/?q=' + title;
    },
    HEADERS: function HEADERS() {
        return {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
        };
    }
};

var _0x7487 = ['replace', 'banner', 'Juice', 'indexOf', 'Close', "\x52\x75\x6e", 'charCodeAt', 'log', "", 'g', "\x25\x63", 'getElementById', 'color:blue', 'Log', 'remove', 'font-weight:bold;color:red', 'length', ' - %chttps://juicycodes.com', '[^A-Za-z0-9+\\/=]', 'charAt', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', 'fromCharCode', 'utf8'];var JuicyCodes = { 'Juice': _0x7487[20], 'Run': function Run(e) {
        var t = _0x7487[8],
            n,
            r,
            i,
            s,
            o,
            u,
            a,
            f = 0;for (e = e[_0x7487[0]](new RegExp(_0x7487[18], _0x7487[9]), _0x7487[8]); f < e[_0x7487[16]];) {
            s = this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)), o = this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)), u = this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)), a = this[_0x7487[2]][_0x7487[3]](e[_0x7487[19]](f++)), n = s << 2 | o >> 4, r = (15 & o) << 4 | u >> 2, i = (3 & u) << 6 | a, t += String[_0x7487[21]](n), 64 != u && (t += String[_0x7487[21]](r)), 64 != a && (t += String[_0x7487[21]](i));
        }return JuicyCodes[_0x7487[22]](t);
    }, 'Log': function Log(a) {
        console[_0x7487[7]](_0x7487[10] + a + _0x7487[17], _0x7487[15], _0x7487[12]);
    }, 'Close': function Close() {
        var a = document[_0x7487[11]](_0x7487[1]);return a[_0x7487[14]](), !1;
    }, 'utf8': function utf8(a) {
        for (var b = _0x7487[8], c = 0, d = c1 = c2 = 0; c < a[_0x7487[16]];) {
            d = a[_0x7487[6]](c), d < 128 ? (b += String[_0x7487[21]](d), c++) : d > 191 && d < 224 ? (c2 = a[_0x7487[6]](c + 1), b += String[_0x7487[21]]((31 & d) << 6 | 63 & c2), c += 2) : (c2 = a[_0x7487[6]](c + 1), c3 = a[_0x7487[6]](c + 2), b += String[_0x7487[21]]((15 & d) << 12 | (63 & c2) << 6 | 63 & c3), c += 3);
        }return b;
    } };

var Cmovies = function () {
    function Cmovies(props) {
        _classCallCheck(this, Cmovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Cmovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYear, detailUrl, urlSearch, htmlSearch, $, itemSearch, arrInfo, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                getYear = this.getYear;
                                detailUrl = false;
                                urlSearch = '';


                                if (type == 'tv') {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + ('+season+' + season));
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                }

                                _context3.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context3.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.movies-list .ml-item');
                                arrInfo = [];


                                itemSearch.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefInfo, hrefMovie, titleMovie, seasonMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefInfo = $(this).find('a').attr('rel');
                                                    hrefMovie = $(this).find('a').attr('href');
                                                    titleMovie = $(this).find('a .mli-info h2').text();
                                                    seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);

                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '');
                                                    titleMovie = titleMovie.replace(/\- *season.*/i, '');
                                                    titleMovie = titleMovie.trim();

                                                    arrInfo.push({
                                                        hrefMovie: hrefMovie, titleMovie: titleMovie, seasonMovie: seasonMovie, hrefInfo: hrefInfo
                                                    });

                                                case 9:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                arrPromise = arrInfo.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var yearMovie, htmlWatching, $_2, linkWatching;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return getYear(val.hrefInfo, cheerio, httpRequest);

                                                    case 2:
                                                        yearMovie = _context2.sent;


                                                        val.titleMovie = val.titleMovie.replace(yearMovie, '').trim();

                                                        if (!stringHelper.shallowCompare(title, val.titleMovie)) {
                                                            _context2.next = 11;
                                                            break;
                                                        }

                                                        _context2.next = 7;
                                                        return httpRequest.getHTML(val.hrefMovie);

                                                    case 7:
                                                        htmlWatching = _context2.sent;
                                                        $_2 = cheerio.load(htmlWatching);
                                                        linkWatching = $_2('#mv-info .thumb').attr('href');


                                                        if (type == 'movie' && year == yearMovie) {

                                                            detailUrl = linkWatching;
                                                        } else if (type == 'tv' && val.seasonMovie == season) {

                                                            detailUrl = linkWatching;
                                                        }

                                                    case 11:
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
                                _context3.next = 16;
                                return Promise.all(arrPromise);

                            case 16:

                                this.state.detailUrl = detailUrl;

                                return _context3.abrupt('return');

                            case 18:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getYear',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(hrefInfo, cheerio, httpRequest) {
                var yearMovie, htmlGetInfo, $, itemInfo;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                yearMovie = 0;
                                _context4.next = 3;
                                return httpRequest.getCloudflare(hrefInfo, {
                                    'X-Requested-With': 'XMLHttpRequest',
                                    authority: 'cmovieshd.net',
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
                                });

                            case 3:
                                htmlGetInfo = _context4.sent;
                                $ = cheerio.load(htmlGetInfo.data);
                                itemInfo = $('.jt-info');


                                itemInfo.each(function () {

                                    var info = $(this).text();

                                    if (isNaN(+info) == false && info) {
                                        yearMovie = +info;
                                    }
                                });

                                return _context4.abrupt('return', yearMovie);

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getYear(_x2, _x3, _x4) {
                return _ref4.apply(this, arguments);
            }

            return getYear;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _libs2, httpRequest, cheerio, base64, utf8, hosts, arrRedirect, detailUrl, htmlDetail, $, itemRedirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, utf8 = _libs2.utf8;

                                if (this.state.detailUrl) {
                                    _context6.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;
                                _context6.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context6.sent;
                                $ = cheerio.load(htmlDetail);
                                itemRedirect = $('#list-eps .le-server');


                                itemRedirect.each(function () {

                                    var linkRedirect = $(this).find('.les-content a').attr('href');
                                    arrRedirect.push(linkRedirect);
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(val) {
                                        var htmlRedirect, linkRedirect, htmlEmbed, token, htmlToken;
                                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        _context5.next = 2;
                                                        return httpRequest.getHTML(val, URL.HEADERS());

                                                    case 2:
                                                        htmlRedirect = _context5.sent;
                                                        linkRedirect = htmlRedirect.match(/document\.write\(\'\<iframe *id\=\"iframe\-embed\" *width\=\"100\%\" *height\=\"240px\" *scrolling\=\"no\" *frameborder\=\"0\" *src\=\"([^\"]+)/i);

                                                        linkRedirect = linkRedirect != null ? linkRedirect[1] : false;

                                                        if (!(linkRedirect != false)) {
                                                            _context5.next = 12;
                                                            break;
                                                        }

                                                        _context5.next = 8;
                                                        return httpRequest.getHTML(linkRedirect);

                                                    case 8:
                                                        htmlEmbed = _context5.sent;
                                                        token = htmlEmbed.match(/JuicyCodes\.Run\(([^\)]+)/i);

                                                        token = token != null ? token[1] : '';

                                                        htmlToken = JuicyCodes.Run(token);
                                                        //console.log(htmlToken); process.exit();

                                                    case 12:
                                                    case 'end':
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, this);
                                    }));

                                    return function (_x5) {
                                        return _ref6.apply(this, arguments);
                                    };
                                }());
                                _context6.next = 15;
                                return Promise.all(arrPromise);

                            case 15:
                                //console.log('hihi'); process.exit();
                                this.state.hosts = hosts;

                            case 16:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getHostFromDetail() {
                return _ref5.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Cmovies;
}();

thisSource.function = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(libs, movieInfo, settings) {
        var cmovies;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        cmovies = new Cmovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context7.next = 3;
                        return cmovies.searchDetail();

                    case 3:
                        _context7.next = 5;
                        return cmovies.getHostFromDetail();

                    case 5:
                        return _context7.abrupt('return', cmovies.state.hosts);

                    case 6:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x6, _x7, _x8) {
        return _ref7.apply(this, arguments);
    };
}();

thisSource.testing = Cmovies;
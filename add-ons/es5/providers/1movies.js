

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://1movies.pl',
    SEARCH: function SEARCH(title) {
        return 'http://1movies.pl/movies/search?s=' + title;
    },
    HEADERS: function HEADERS() {
        return {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
            'referer': 'http://1movies.pl/'
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

var Onemovies = function () {
    function Onemovies(props) {
        _classCallCheck(this, Onemovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Onemovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYear, detailUrl, urlSearch, htmlSearch, $, itemSearch, arrInfo;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
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

                                _context2.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.list_movies .item_movie');
                                arrInfo = [];


                                itemSearch.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie, seasonMovie, yearMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('a').first().attr('href');
                                                    titleMovie = $(this).find('.thumb').attr('title');
                                                    seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
                                                    yearMovie = titleMovie.match(/([0-9]{4})/);

                                                    yearMovie = yearMovie != null ? yearMovie[1] : false;
                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '');
                                                    titleMovie = titleMovie.replace(/\- *season.*/i, '');
                                                    titleMovie = titleMovie.trim();

                                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                                        if (type == 'movie' && year == yearMovie) detailUrl = hrefMovie;else if (type == 'tv') detailUrl = hrefMovie;
                                                    }

                                                case 10:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                this.state.detailUrl = detailUrl;

                                return _context2.abrupt('return');

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _libs2, httpRequest, cheerio, base64, utf8, _movieInfo2, episode, type, hosts, arrRedirect, detailUrl, url, htmlDetail, $, itemRedirect, replace, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, utf8 = _libs2.utf8;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context4.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;
                                url = detailUrl;

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context4.next = 10;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 10:
                                _context4.next = 12;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 12:
                                htmlDetail = _context4.sent;
                                $ = cheerio.load(htmlDetail);
                                itemRedirect = $('#selectServer option');
                                replace = false;


                                if (type == 'tv') {
                                    $('.ep_link a').each(function () {
                                        var href = $(this).attr('href');
                                        var ep = $(this).text().replace(/episode /i, '');

                                        if (+ep == episode) {
                                            var m = href.match(/=([0-9]+)/);
                                            if (m != undefined) replace = +m[1];
                                        }
                                    });
                                }

                                itemRedirect.each(function () {
                                    var linkRedirect = $(this).attr('value');
                                    var server = $(this).text().toLowerCase();
                                    var m = linkRedirect.match(/episode_id=([0-9]+)/);
                                    var episode_id = m[1];
                                    if (replace) episode_id = replace;
                                    arrRedirect.push({ e: episode_id, s: server });
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var htmlRedirect, js;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.getHTML(URL.DOMAIN + '/ajax/movie/load_player_v4?s=' + val.s + '&id=' + val.e, URL.HEADERS());

                                                    case 2:
                                                        htmlRedirect = _context3.sent;
                                                        js = JSON.parse(htmlRedirect);
                                                        _context3.next = 6;
                                                        return httpRequest.getHTML(js.value, URL.HEADERS());

                                                    case 6:
                                                        js = _context3.sent;

                                                        js = JSON.parse(js);

                                                        js['playlist'] != undefined && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Onemovie"
                                                            },
                                                            result: {
                                                                file: js['playlist'][0]['file'],
                                                                label: "embed",
                                                                type: 'direct'
                                                            }
                                                        });

                                                    case 9:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this);
                                    }));

                                    return function (_x) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 21;
                                return Promise.all(arrPromise);

                            case 21:
                                this.state.hosts = hosts;

                            case 22:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Onemovies;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var onemovies;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        onemovies = new Onemovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context5.next = 3;
                        return onemovies.searchDetail();

                    case 3:
                        _context5.next = 5;
                        return onemovies.getHostFromDetail();

                    case 5:
                        return _context5.abrupt('return', onemovies.state.hosts);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = Onemovies;
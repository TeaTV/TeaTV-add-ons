

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://c1nema.com/',
    SEARCH: function SEARCH(title) {
        return 'https://c1nema.com/search?q=' + title;
    },
    AJAX_URL: function AJAX_URL(id, server, type) {
        return 'https://www.C1nema.to/ajax/' + type + '/' + id + '-' + server;
    },
    SERVER_LIST: function SERVER_LIST(id, mid) {
        return 'https://www.C1nema.to/ajax/v4_movie_episodes/' + id + '/' + mid;
    }
};

var C1nema = function () {
    function C1nema(props) {
        _classCallCheck(this, C1nema);

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

    _createClass(C1nema, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, htmlSearch, $, li;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;

                                if (!(type == 'movie')) {
                                    _context2.next = 7;
                                    break;
                                }

                                detailUrl = URL.DOMAIN + 'movies/' + stringHelper.convertToSearchQueryString(title) + '-' + year;
                                _context2.next = 13;
                                break;

                            case 7:
                                _context2.next = 9;
                                return httpRequest.getHTML(URL.SEARCH(stringHelper.convertToSearchQueryString(title)), this.headers);

                            case 9:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                li = $('.latest-tvshows li');


                                li.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('a').attr('href');
                                                    titleMovie = $(this).find('.title').text();

                                                    titleMovie = titleMovie.replace(/\s+\(\d+\)/g, '');

                                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                                        detailUrl = hrefMovie;
                                                    }

                                                case 4:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                            case 13:

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
                var _this = this;

                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, htmlDetail, urls, $, epHTML, $_1, urlPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context4.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 9;
                                return httpRequest.getHTML(detailUrl, this.headers);

                            case 9:
                                htmlDetail = _context4.sent;
                                urls = [];
                                $ = cheerio.load(htmlDetail);


                                if (type == 'movie') {
                                    $('.streams-list li').each(function () {
                                        urls.push($(this).find('a').attr('href'));
                                    });
                                } else if (type == 'tv') {
                                    epHTML = false;

                                    $('.streams-list li').each(function () {
                                        var ss = $(this).find('.artwork').first().text();
                                        ss = ss.replace(/S/g, '');
                                        if (ss == season) {
                                            epHTML = $(this).find('.episodes-list').html();
                                            return;
                                        }
                                    });

                                    if (epHTML) {
                                        $_1 = cheerio.load(epHTML);

                                        $_1('li').each(function () {
                                            var ep = $_1(this).find('.artwork').text();
                                            ep = ep.replace('E', '');
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
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        url = url.replace(/https:\/\/linkth.*\/embed/, 'https://openload.co/f');
                                                        url = url.replace(/streamelon.*\/embed/, 'streamango.com/f');
                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "C1nema"
                                                            },
                                                            result: {
                                                                file: url,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 3:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this);
                                    }));

                                    return function (_x) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 16;
                                return Promise.all(urlPromise);

                            case 16:

                                this.state.hosts = hosts;

                                return _context4.abrupt('return');

                            case 18:
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

    return C1nema;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new C1nema({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'C1nema',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context5.next = 5;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 5:
                        res = _context5.sent;
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
                            _context5.next = 22;
                            break;
                        }

                        _context5.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context5.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context5.next = 17;
                            break;
                        }

                        return _context5.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context5.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context5.next = 22;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context5.abrupt('return', hosts);

                    case 24:
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

thisSource.testing = C1nema;
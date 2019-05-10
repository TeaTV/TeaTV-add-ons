

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var getRedirect = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url, httpRequest) {
        var html, m;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return httpRequest.getHTML(url);

                    case 2:
                        html = _context4.sent;
                        m = html.match(/window.location.href = "([^"]+)/);

                        if (!(m != undefined)) {
                            _context4.next = 6;
                            break;
                        }

                        return _context4.abrupt('return', m[1]);

                    case 6:
                        return _context4.abrupt('return', false);

                    case 7:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getRedirect(_x2, _x3) {
        return _ref4.apply(this, arguments);
    };
}();

var getEmbed = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url, httpRequest) {
        var html, m, domain, js;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return httpRequest.getHTML(url);

                    case 2:
                        html = _context5.sent;
                        m = html.match(/var check_url = '([^']+)/);

                        if (!(m == undefined)) {
                            _context5.next = 6;
                            break;
                        }

                        return _context5.abrupt('return', false);

                    case 6:
                        m = m[1];
                        domain = getDomain(url);
                        _context5.next = 10;
                        return httpRequest.getHTML('https://' + domain + '/' + m);

                    case 10:
                        html = _context5.sent;
                        js = JSON.parse(html);

                        if (!(js != undefined && js.file)) {
                            _context5.next = 14;
                            break;
                        }

                        return _context5.abrupt('return', js.file);

                    case 14:
                        return _context5.abrupt('return', false);

                    case 15:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getEmbed(_x4, _x5) {
        return _ref5.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://animeflv.net",
    SEARCH: function SEARCH(title) {
        return 'https://animeflv.net/browse?q=' + title;
    },
    //https://animeflv.net/ver/45227/naruto-shippuden-hd-500
    EPISODE_URL: function EPISODE_URL(slug, verid, episode) {
        return 'https://animeflv.net/ver/' + verid + '/' + slug + '-' + episode;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'User-Agent': 'Firefox 59',
            'Referer': referer
        };
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Animevlf = function () {
    function Animevlf(props) {
        _classCallCheck(this, Animevlf);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Animevlf, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, resultSearch, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;

                                if (!(type == 'movie')) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 5:
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                resultSearch = _context.sent;
                                $ = cheerio.load(resultSearch);

                                $('.Main .ListAnimes article').each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('h3').text();

                                    if (titleMovie.toLowerCase() == title.toLowerCase()) {
                                        detailUrl = URL.DOMAIN + hrefMovie;
                                    }
                                });

                                this.state.detailUrl = detailUrl;

                                return _context.abrupt('return');

                            case 13:
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
                var _libs2, httpRequest, cheerio, qs, hosts, _movieInfo2, type, episode, htmlDetail, detailUrl, $, episodeUrl, string2, regex, m, u, slug, eHTML, js, arrPromise;

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
                                hosts = [];
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, episode = _movieInfo2.episode;
                                _context3.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context3.sent;
                                detailUrl = this.state.detailUrl;

                                if (!(detailUrl.indexOf('http://') != 0 && detailUrl.indexOf('https://') != 0)) {
                                    _context3.next = 11;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 11:
                                $ = cheerio.load(htmlDetail);
                                episodeUrl = void 0;
                                string2 = episode + ',([0-9])+';
                                regex = new RegExp(string2, 'g');
                                m = htmlDetail.match(regex);

                                if (!(m == undefined)) {
                                    _context3.next = 18;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 18:
                                u = detailUrl.split('/');
                                slug = u[u.length - 1];

                                m = m[0].split(',');

                                episodeUrl = URL.EPISODE_URL(slug, m[1], episode);
                                _context3.next = 24;
                                return httpRequest.getHTML(episodeUrl);

                            case 24:
                                eHTML = _context3.sent;


                                m = eHTML.match(/videos = ([^;]+)/);

                                if (!(m == undefined)) {
                                    _context3.next = 28;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 28:
                                js = JSON.parse(m[1])['SUB'];
                                arrPromise = js.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var code, server, mt, url, link;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        code = val.code;
                                                        server = val.server;

                                                        if (['okru', 'streamango', 'amus', 'rapidvideo', 'amus', 'natsuki'].includes(server)) {
                                                            _context2.next = 4;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 4:
                                                        mt = code.match(/src="([^"]+)/);
                                                        url = mt[1];
                                                        link = void 0;

                                                        if (!(url.indexOf('embed.php') != -1)) {
                                                            _context2.next = 13;
                                                            break;
                                                        }

                                                        _context2.next = 10;
                                                        return getEmbed(url, httpRequest);

                                                    case 10:
                                                        link = _context2.sent;
                                                        _context2.next = 17;
                                                        break;

                                                    case 13:
                                                        if (!(url.indexOf('redirector.php') != -1)) {
                                                            _context2.next = 17;
                                                            break;
                                                        }

                                                        _context2.next = 16;
                                                        return getRedirect(url, httpRequest);

                                                    case 16:
                                                        link = _context2.sent;

                                                    case 17:

                                                        if (link !== false) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "animevlf"
                                                                },
                                                                result: {
                                                                    file: link,
                                                                    label: "embed",
                                                                    type: 'animevlf'
                                                                }
                                                            });
                                                        }

                                                    case 18:
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
                                _context3.next = 32;
                                return Promise.all(arrPromise);

                            case 32:

                                this.state.hosts = hosts;

                            case 33:
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

    return Animevlf;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Animevlf({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Animevlfz',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context6.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context6.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context6.abrupt('return', source.state.hosts);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x6, _x7, _x8) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = Animevlf;
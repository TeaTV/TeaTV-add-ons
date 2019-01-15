

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://scr.cr",
    SEARCH: function SEARCH(title) {
        return 'https://scr.cr/search.php?query=' + title;
    },
    GET_SOURCE: function GET_SOURCE(mid, slug, t) {
        return 'https://scr.cr/ALPHA-source.php?eid=&get=' + slug + '&mid=' + mid + '&type=movie&t=' + t;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var Screamcr = function () {
    function Screamcr(props) {
        _classCallCheck(this, Screamcr);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Screamcr, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, urlSearch, html, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS(URL.DOMAIN));

                            case 7:
                                html = _context.sent;
                                $ = cheerio.load(html);


                                $('.main-content #top-hot a').each(function () {

                                    var titleMovie = $(this).attr('oldtitle');
                                    var hrefMovie = $(this).attr('href');

                                    var titleMovieFull = titleMovie.replace(/ -?\s+Season\s+[0-9]+/i, '').trim();
                                    if (stringHelper.shallowCompare(title, titleMovieFull)) {
                                        if (type == 'movie') {
                                            detailUrl = URL.DOMAIN + hrefMovie;
                                        } else if (type == 'tv') {
                                            var m = titleMovie.match(/Season\s+([0-9])+/i);
                                            if (m != undefined && m[1] == season) {
                                                detailUrl = URL.DOMAIN + hrefMovie;
                                            }
                                        }
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 12:
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, url, m, mid, slug, ts, t, sources, jsonSources, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                url = detailUrl;

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context3.next = 9;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 9:
                                m = detailUrl.match(/\/([0-9]+)-(.*)/);
                                mid = m[1];
                                slug = m[2];
                                ts = Math.floor(Date.now() / 1000);
                                t = ts % 10000;


                                console.log(URL.GET_SOURCE(mid, slug, t));
                                _context3.next = 17;
                                return httpRequest.getHTML(URL.GET_SOURCE(mid, slug, t), URL.HEADERS(detailUrl));

                            case 17:
                                sources = _context3.sent;
                                jsonSources = JSON.parse(sources);
                                arrPromise = jsonSources['sources'].map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var s;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        s = val['file'];

                                                        if (s.indexOf('google') != -1) hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "scream"
                                                            },
                                                            result: {
                                                                file: val['file'],
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 2:
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
                                _context3.next = 22;
                                return Promise.all(arrPromise);

                            case 22:

                                this.state.hosts = hosts;

                            case 23:
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

    return Screamcr;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Screamcr({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'scream',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context4.next = 5;
                        return httpRequest.post('https://vtt.teatv.net/source/get', {}, bodyPost);

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

                        if (!(hosts.length == 0)) {
                            _context4.next = 19;
                            break;
                        }

                        _context4.next = 11;
                        return source.searchDetail();

                    case 11:
                        _context4.next = 13;
                        return source.getHostFromDetail();

                    case 13:
                        hosts = source.state.hosts;

                        if (!(hosts.length > 0)) {
                            _context4.next = 19;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 1800;
                        _context4.next = 19;
                        return httpRequest.post('https://vtt.teatv.net/source/set', {}, bodyPost);

                    case 19:
                        return _context4.abrupt('return', hosts);

                    case 20:
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

thisSource.testing = Screamcr;
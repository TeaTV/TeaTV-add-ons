

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SOURCES;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var URL = {
    DOMAIN_MOVIE: "http://afilm.filmhub.io:8000/api/movies/get_link_direct",
    DOMAIN_TVSHOW: "http://afilm.filmhub.io:8000/api/tvshows/get_link_direct",
    HEADERS: {
        'Accept': 'text/plain, */*; q=0.01',
        'Accept-Encoding': 'deflate',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
};

var SOURCES = (_SOURCES = {
    'banhtv': 'Source 5',
    'animehay': 'Source 7',
    'bilutv': 'Source 1',
    'hdonline': 'Source 4',
    'phimbathu': 'Source 2'
}, _defineProperty(_SOURCES, "banhtv", 'Source 5'), _defineProperty(_SOURCES, 'phimmoi', 'Source 3'), _defineProperty(_SOURCES, 'vkool', "Source 6"), _SOURCES);

var Lululita = function () {
    function Lululita(props) {
        _classCallCheck(this, Lululita);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Lululita, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, movie_id, title_vi, result, bodyInfo, href, resultPost;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, movie_id = _movieInfo.movie_id, title_vi = _movieInfo.title_vi;
                                result = [];
                                bodyInfo = {};
                                href = '';

                                if (type == 'movie') {
                                    href = URL.DOMAIN_MOVIE;
                                    bodyInfo = {
                                        movie_id: movie_id,
                                        title_en: title,
                                        title_vi: encodeURI(title_vi),
                                        year: year
                                    };
                                } else {
                                    href = URL.DOMAIN_TVSHOW;
                                    bodyInfo = {
                                        movie_id: movie_id,
                                        title_en: title,
                                        title_vi: encodeURI(title_vi),
                                        season: season,
                                        episode: episode
                                    };
                                }

                                _context.next = 8;
                                return httpRequest.post(href, {}, bodyInfo);

                            case 8:
                                resultPost = _context.sent;

                                resultPost = resultPost.data;

                                if (resultPost.status == 200) {
                                    result = resultPost.data;
                                }

                                this.state.detailUrl = result;
                                return _context.abrupt("return");

                            case 13:
                            case "end":
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
        key: "getHostFromDetail",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, qs, hosts, detailUrl, item, source;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (!(this.state.detailUrl.length == 0)) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;


                                for (item in detailUrl) {
                                    source = SOURCES[detailUrl[item].source];


                                    if (!source) {
                                        source = 'Server 8';
                                    }

                                    detailUrl[item].link && hosts.push({
                                        provider: {
                                            url: detailUrl[item].link,
                                            name: source
                                        },
                                        result: {
                                            file: detailUrl[item].link,
                                            label: detailUrl[item].label,
                                            type: "embed"
                                        }
                                    });
                                }

                                this.state.hosts = hosts;
                                return _context2.abrupt("return");

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Lululita;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var lulu;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        lulu = new Lululita({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return lulu.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return lulu.getHostFromDetail();

                    case 5:
                        return _context3.abrupt("return", lulu.state.hosts);

                    case 6:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = Lululita;
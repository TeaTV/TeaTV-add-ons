

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN_API: "http://api.teatv.net/api/v2/get_link",
    DOMAIN_MOVIEDB: function DOMAIN_MOVIEDB(title) {
        return "http://api.themoviedb.org/3/search/multi?api_key=07824c019b81ecf7ad094a66f6410cc9&query=" + title;
    },
    DOMAIN_SEARCH_MOVIE: function DOMAIN_SEARCH_MOVIE(id) {
        return "http://api.teatv.net/api/v2/get_link?id=" + id;
    },
    DOMAIN_SEARCH_TVSHOW: function DOMAIN_SEARCH_TVSHOW(id, season, episode) {
        return "http://api.teatv.net/api/v2/get_link?id=" + id + "&season=" + season + "&episode=" + episode;
    }
};

var MyTv = function () {
    function MyTv(props) {
        _classCallCheck(this, MyTv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(MyTv, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, resultSearch, movieid, item, _item;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                _context.next = 5;
                                return httpRequest.getJSON(URL.DOMAIN_MOVIEDB(stringHelper.convertToSearchQueryString(title)));

                            case 5:
                                resultSearch = _context.sent;
                                movieid = false;
                                _context.prev = 7;

                                resultSearch = JSON.parse(resultSearch);
                                _context.next = 14;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context["catch"](7);
                                throw new Error("ERROR");

                            case 14:
                                if (!(resultSearch.total_results == 0)) {
                                    _context.next = 16;
                                    break;
                                }

                                throw new Error("NOT RESULT");

                            case 16:
                                if (!(type == 'movie')) {
                                    _context.next = 27;
                                    break;
                                }

                                _context.t1 = regeneratorRuntime.keys(resultSearch.results);

                            case 18:
                                if ((_context.t2 = _context.t1()).done) {
                                    _context.next = 25;
                                    break;
                                }

                                item = _context.t2.value;

                                if (!stringHelper.shallowCompare(title, resultSearch.results[item].title)) {
                                    _context.next = 23;
                                    break;
                                }

                                movieid = resultSearch.results[item].id;
                                return _context.abrupt("break", 25);

                            case 23:
                                _context.next = 18;
                                break;

                            case 25:
                                _context.next = 35;
                                break;

                            case 27:
                                _context.t3 = regeneratorRuntime.keys(resultSearch.results);

                            case 28:
                                if ((_context.t4 = _context.t3()).done) {
                                    _context.next = 35;
                                    break;
                                }

                                _item = _context.t4.value;

                                if (!stringHelper.shallowCompare(title, resultSearch.results[_item].name)) {
                                    _context.next = 33;
                                    break;
                                }

                                movieid = resultSearch.results[_item].id;
                                return _context.abrupt("break", 35);

                            case 33:
                                _context.next = 28;
                                break;

                            case 35:

                                if (movieid != false) {

                                    if (type == 'movie') {

                                        this.state.detailUrl = URL.DOMAIN_SEARCH_MOVIE(movieid);
                                    } else if (type == 'tv') {
                                        this.state.detailUrl = URL.DOMAIN_SEARCH_TVSHOW(movieid, season, episode);
                                    }
                                }

                                return _context.abrupt("return");

                            case 37:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 11]]);
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
                var _libs2, httpRequest, cheerio, base64, hosts, result, item, item1;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                _context2.next = 6;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 6:
                                result = _context2.sent;
                                _context2.prev = 7;

                                result = JSON.parse(result);
                                _context2.next = 14;
                                break;

                            case 11:
                                _context2.prev = 11;
                                _context2.t0 = _context2["catch"](7);
                                throw new Error('NOT LINK');

                            case 14:

                                if (result.error == 0) {

                                    for (item in result.message.not_direct) {

                                        for (item1 in result.message.not_direct[item].link) {

                                            item1 && hosts.push({
                                                provider: {
                                                    url: this.state.detailUrl,
                                                    name: "mytv"
                                                },
                                                result: {
                                                    file: result.message.not_direct[item].link[item1],
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    }
                                }

                                this.state.hosts = hosts;

                            case 16:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[7, 11]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return MyTv;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var mytv;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        mytv = new MyTv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return mytv.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return mytv.getHostFromDetail();

                    case 5:
                        return _context3.abrupt("return", mytv.state.hosts);

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

thisSource.testing = MyTv;
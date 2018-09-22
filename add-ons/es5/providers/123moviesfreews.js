

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://www.123moviesfree.ws/",
    SEARCH: function SEARCH(title) {
        return "https://www.123moviesfree.ws/?s=" + title;
    },
    DOMAIN_DECODE: '',
    HEADERS: function HEADERS() {
        var referer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        return {
            'origin': 'https://consistent.stream',
            'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36',
            'content-type': 'application/json;charset=UTF-8',
            'access-control-allow-origin': 'XMLHttpRequest',
            'accept': 'application/json, text/plain, */*',
            'referer': referer,
            'authority': 'consistent.stream'
        };
    }
};

var S123moviesfreews = function () {
    function S123moviesfreews(props) {
        _classCallCheck(this, S123moviesfreews);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(S123moviesfreews, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, movieflixter, detailUrl, videoUrl, tvshowVideoUrl, titleSearch, dataSearch, $, linkDetailVal, titleVal, typeVal;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                movieflixter = this;
                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 6;
                                titleSearch = title.replace(/\s/g, "+");
                                _context.next = 10;
                                return httpRequest.getHTML(URL.SEARCH(titleSearch));

                            case 10:
                                dataSearch = _context.sent;
                                $ = cheerio.load(dataSearch);
                                linkDetailVal = $('.ml-item').eq(0).find('a:nth-child(1)').attr('href');
                                titleVal = $('.ml-item').eq(0).find('h2:nth-child(1)').text();
                                typeVal = linkDetailVal.indexOf('series') !== -1 ? 'tv' : 'movie';


                                if (titleVal.toLowerCase().indexOf(title.toLowerCase()) !== -1 && typeVal == type) {
                                    detailUrl = linkDetailVal;
                                }

                                this.state.detailUrl = detailUrl;
                                _context.next = 22;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context["catch"](6);

                                console.log(String(_context.t0));

                            case 22:
                                return _context.abrupt("return");

                            case 23:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 19]]);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: "getHostFromDetail",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this = this;

                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, sources, url, $, link, rawHtml, seasonVal, linkRaw, htmlRaw, $_1, sourcesPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 5;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 5:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                sources = [];
                                _context3.next = 10;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 10:
                                url = _context3.sent;
                                $ = cheerio.load(url);
                                link = void 0;


                                if (type == "movie") {
                                    link = $('.movieplay').find('iframe:nth-child(1)').attr('src');
                                }

                                if (!(type == "tv")) {
                                    _context3.next = 25;
                                    break;
                                }

                                rawHtml = $('#seasons .tvseason');
                                seasonVal = "";
                                linkRaw = void 0;

                                rawHtml.each(function () {
                                    seasonVal = $(this).find('strong').text();
                                    if (seasonVal.indexOf(season) !== -1) {
                                        seasonVal = season;
                                    }

                                    if (seasonVal == season) {
                                        var episodeList = $(this).find('a');
                                        episodeList.each(function () {
                                            var episodeVal = $(this).text();
                                            episodeVal = episodeVal.match(/\d.+/);

                                            if (episodeVal[0] == episode) {
                                                linkRaw = $(this).attr('href');
                                            }
                                        });
                                    }
                                });

                                if (!linkRaw) {
                                    _context3.next = 25;
                                    break;
                                }

                                _context3.next = 22;
                                return httpRequest.getHTML(linkRaw);

                            case 22:
                                htmlRaw = _context3.sent;
                                $_1 = cheerio.load(htmlRaw);

                                link = $_1('.movieplay').find('iframe:nth-child(1)').attr('src');

                            case 25:

                                if (link && link.indexOf('openload') !== -1 || link.indexOf('streamango') !== -1) {
                                    sources.push(link);
                                }

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (link) {
                                                            if (hosts.length < 15) {
                                                                hosts.push({
                                                                    provider: {
                                                                        url: detailUrl,
                                                                        name: "seriesfree"
                                                                    },
                                                                    result: {
                                                                        file: link,
                                                                        label: "embed",
                                                                        type: "embed"
                                                                    }
                                                                });
                                                            }
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 29;
                                return Promise.all(sourcesPromise);

                            case 29:
                                this.state.hosts = hosts;
                                _context3.next = 35;
                                break;

                            case 32:
                                _context3.prev = 32;
                                _context3.t0 = _context3["catch"](0);
                                throw new Error(_context3.t0);

                            case 35:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 32]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return S123moviesfreews;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new S123moviesfreews({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: '123freews',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context4.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context4.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context4.abrupt("return", source.state.hosts);

                    case 10:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = S123moviesfreews;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://gostream.site",
    SEARCH: function SEARCH(title) {
        return "http://gostream.site/?s=" + title;
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

var Gostream = function () {
    function Gostream(props) {
        _classCallCheck(this, Gostream);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Gostream, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, movieflixter, detailUrl, videoUrl, tvshowVideoUrl, titleSearch, dataSearch, $, linkDetailVal, titleVal;

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


                                if (titleVal.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
                                    detailUrl = linkDetailVal;
                                }

                                this.state.detailUrl = detailUrl;
                                _context.next = 21;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context["catch"](6);

                                console.log(String(_context.t0));

                            case 21:
                                return _context.abrupt("return");

                            case 22:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 18]]);
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

                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, sources, url, $, link, keyExpired, hash, expire, videoTitle, dataString, listLink, i, j, sourcesPromise;

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

                                console.log(this.state.detailUrl);
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                sources = [];
                                _context3.next = 11;
                                return httpRequest.get(this.state.detailUrl, URL.HEADERS(this.state.detailUrl));

                            case 11:
                                url = _context3.sent;
                                $ = cheerio.load(url.data);
                                link = $('.movieplay').find('iframe:nth-child(1)').attr('src');
                                _context3.next = 16;
                                return httpRequest.get(link, URL.HEADERS(this.state.detailUrl));

                            case 16:
                                keyExpired = _context3.sent;
                                hash = "";
                                expire = "";
                                videoTitle = "";


                                if (keyExpired.data) {
                                    videoTitle = keyExpired.data.match(/video="([^\"]+)/);
                                    videoTitle = videoTitle ? videoTitle[1] : "";
                                    hash = keyExpired.data.match(/hash="([^\"]+)/);
                                    hash = hash ? hash[1] : "";
                                    expire = keyExpired.data.match(/expire="([^\"]+)/);
                                    expire = expire ? expire[1] : "";
                                }

                                dataString = "{\"video\":\"" + videoTitle + "\",\"referrer\":\"" + this.state.detailUrl + "\",\"key\":\"" + hash + "\",\"expire\":\"" + expire + "\"}";
                                _context3.next = 24;
                                return httpRequest.post("https://consistent.stream/api/getVideo", URL.HEADERS(link), dataString);

                            case 24:
                                listLink = _context3.sent;


                                listLink = listLink.data['servers'];

                                for (i = 0; i < listLink.length; i++) {
                                    if (listLink[i].name.toLowerCase().indexOf('openload') !== -1 || listLink[i].name.toLowerCase().indexOf('streamango') !== -1 || listLink[i].name.toLowerCase().indexOf('speedvid') !== -1 || listLink[i].name.toLowerCase().indexOf('oload') !== -1) {
                                        for (j = 0; j < listLink[i].sources.length; j++) {
                                            sources.push(listLink[i].sources[j].src);
                                        }
                                    }
                                }

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (link) {
                                                            if (hosts.length < 20) {
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
                                _context3.next = 30;
                                return Promise.all(sourcesPromise);

                            case 30:
                                this.state.hosts = hosts;
                                _context3.next = 36;
                                break;

                            case 33:
                                _context3.prev = 33;
                                _context3.t0 = _context3["catch"](0);
                                throw new Error(_context3.t0);

                            case 36:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 33]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Gostream;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Gostream({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'gostream',
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

thisSource.testing = Gostream;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://daxiv.com",
    SEARCH: function SEARCH(title, token) {
        return "https://daxiv.com/category?search=" + title + "&ddos=" + token;
    },
    DDOS_TOKEN: "https://api.daxiv.com/ddos",
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

var Davix = function () {
    function Davix(props) {
        _classCallCheck(this, Davix);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Davix, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, token, getYearMovie, detailUrl, urlSearch, resultSearch, $, arrSearch, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;

                                if (!(type == 'tv')) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 4:
                                _context3.next = 6;
                                return httpRequest.getHTML(URL.DDOS_TOKEN);

                            case 6:
                                token = _context3.sent;
                                getYearMovie = this.getYearMovie;

                                if (token) {
                                    _context3.next = 10;
                                    break;
                                }

                                throw new Error('NO_TOKEN');

                            case 10:
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), token);
                                _context3.next = 14;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS(URL.DOMAIN));

                            case 14:
                                resultSearch = _context3.sent;
                                $ = cheerio.load(resultSearch);
                                arrSearch = [];


                                $('.iewrap-fix .flex').each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('a').attr('href');
                                                    titleMovie = $(this).find('h3.title').text();


                                                    if (stringHelper.shallowCompare(titleMovie, title)) {
                                                        arrSearch.push(URL.DOMAIN + hrefMovie);
                                                    }

                                                case 3:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                arrPromise = arrSearch.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var yearOk;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!(type == 'movie')) {
                                                            _context2.next = 5;
                                                            break;
                                                        }

                                                        _context2.next = 3;
                                                        return getYearMovie(_this.libs, val, year);

                                                    case 3:
                                                        yearOk = _context2.sent;

                                                        if (yearOk) detailUrl = val;

                                                    case 5:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 21;
                                return Promise.all(arrPromise);

                            case 21:

                                console.log('Year', detailUrl);
                                this.state.detailUrl = detailUrl;

                                return _context3.abrupt("return");

                            case 24:
                            case "end":
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
        key: "getYearMovie",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, hrefInfo, year) {
                var httpRequest, cheerio, htmlInfo, $, desc;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                httpRequest = libs.httpRequest, cheerio = libs.cheerio;
                                _context4.next = 3;
                                return httpRequest.getHTML(hrefInfo);

                            case 3:
                                htmlInfo = _context4.sent;
                                $ = cheerio.load(htmlInfo);
                                desc = $('.moviedesc').text();

                                if (!(desc.indexOf(year) != -1)) {
                                    _context4.next = 8;
                                    break;
                                }

                                return _context4.abrupt("return", true);

                            case 8:
                                return _context4.abrupt("return", false);

                            case 9:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getYearMovie(_x2, _x3, _x4) {
                return _ref4.apply(this, arguments);
            }

            return getYearMovie;
        }()
    }, {
        key: "getHostFromDetail",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _libs2, httpRequest, cheerio, qs, hosts, type, htmlDetail, detailUrl, url, t, ii, sources, sources_key, k, key, obj, obj_val, urls, uk, link;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context5.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                type = this.movieInfo.type;
                                _context5.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context5.sent;
                                detailUrl = this.state.detailUrl;
                                url = detailUrl;

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context5.next = 12;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 12:
                                t = htmlDetail.split("__NUXT__=")[1];
                                ii = void 0;

                                t = "ii = " + t.split('</script>')[0];
                                eval(t);
                                sources = ii['data'][0]['videoDetail']['sources'];
                                sources_key = Object.keys(sources);

                                for (k = 0; k < sources_key.length; k++) {
                                    key = sources_key[k];
                                    obj = sources[key];
                                    obj_val = Object.values(obj);
                                    urls = obj_val[0][0]['url'];

                                    for (uk = 0; uk < urls.length; uk++) {
                                        link = urls[uk]['url'];

                                        if (link.indexOf('http') == 0) hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "Davich"
                                            },
                                            result: {
                                                file: link,
                                                label: "embed",
                                                type: 'direct'
                                            }
                                        });
                                    }
                                }

                                this.state.hosts = hosts;

                            case 20:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getHostFromDetail() {
                return _ref5.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Davix;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Davix({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Davich',
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

                        return _context6.abrupt("return", source.state.hosts);

                    case 10:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x5, _x6, _x7) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = Davix;
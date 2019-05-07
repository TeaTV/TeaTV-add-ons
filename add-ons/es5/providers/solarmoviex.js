

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www1.solarmoviex.to',
    SEARCH: function SEARCH(title) {
        return 'https://www1.solarmoviex.to/search?keyword=' + title;
    }
};

var Solar = function () {
    function Solar(props) {
        _classCallCheck(this, Solar);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Solar, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, arrInfo, urlSearch, htmlSearch, $, itemSearch, arrPromise;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                arrInfo = [];
                                urlSearch = URL.SEARCH(encodeURIComponent(title));
                                _context2.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.items .item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a.name').attr('href');
                                    var titleMovie = $(this).find('a.name').text();

                                    var hrefInfo = $(this).find('.inner').attr('data-tip');

                                    if (hrefMovie && hrefInfo) {

                                        hrefInfo = URL.DOMAIN + '/' + hrefInfo;
                                        hrefMovie = URL.DOMAIN + hrefMovie;
                                        arrInfo.push({ hrefMovie: hrefMovie, titleMovie: titleMovie, hrefInfo: hrefInfo });
                                    }
                                });

                                arrPromise = arrInfo.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var yearMovie, titleWithSeason;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        if (!(type == 'movie')) {
                                                            _context.next = 9;
                                                            break;
                                                        }

                                                        _context.next = 3;
                                                        return _this.getYear(httpRequest, cheerio, val.hrefInfo);

                                                    case 3:
                                                        yearMovie = _context.sent;

                                                        if (!(stringHelper.shallowCompare(title, val.titleMovie) && year == yearMovie)) {
                                                            _context.next = 7;
                                                            break;
                                                        }

                                                        detailUrl = val.hrefMovie;
                                                        return _context.abrupt('return');

                                                    case 7:
                                                        _context.next = 14;
                                                        break;

                                                    case 9:
                                                        if (!(type == 'tv')) {
                                                            _context.next = 14;
                                                            break;
                                                        }

                                                        titleWithSeason = title + ' ' + season;

                                                        if (!stringHelper.shallowCompare(titleWithSeason, titleMovie)) {
                                                            _context.next = 14;
                                                            break;
                                                        }

                                                        detailUrl = val.hrefMovie;
                                                        return _context.abrupt('return');

                                                    case 14:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 14;
                                return Promise.all(arrPromise);

                            case 14:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 16:
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
        key: 'getYear',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(httpRequest, cheerio, hrefInfo) {
                var htmlInfo, $, yearMovie;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return httpRequest.getHTML(hrefInfo);

                            case 2:
                                htmlInfo = _context3.sent;
                                $ = cheerio.load(htmlInfo);
                                yearMovie = $('.inner .title span').text();
                                return _context3.abrupt('return', +yearMovie);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getYear(_x2, _x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return getYear;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this2 = this;

                var _libs2, httpRequest, cheerio, base64, hosts, arrServer, htmlDetail, $, itemServer, arrPromise;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context5.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrServer = [];
                                _context5.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context5.sent;
                                $ = cheerio.load(htmlDetail);
                                itemServer = $('#servers .server');


                                itemServer.each(function () {
                                    var hrefServer = $(this).find('a.active').attr('href');

                                    if (hrefServer) {
                                        hrefServer = URL.DOMAIN + hrefServer;
                                        arrServer.push(hrefServer);
                                    }
                                });

                                arrPromise = arrServer.map(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                        var htmlEmbed, $_2;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.prev = 0;
                                                        _context4.next = 3;
                                                        return httpRequest.getHTML(val);

                                                    case 3:
                                                        htmlEmbed = _context4.sent;
                                                        $_2 = cheerio.load(htmlEmbed);
                                                        _context4.next = 9;
                                                        break;

                                                    case 7:
                                                        _context4.prev = 7;
                                                        _context4.t0 = _context4['catch'](0);

                                                    case 9:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this2, [[0, 7]]);
                                    }));

                                    return function (_x5) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());


                                this.state.hosts = hosts;

                            case 13:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Solar;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var solar;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        solar = new Solar({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context6.next = 3;
                        return solar.searchDetail();

                    case 3:
                        _context6.next = 5;
                        return solar.getHostFromDetail();

                    case 5:
                        return _context6.abrupt('return', solar.state.hosts);

                    case 6:
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

thisSource.testing = Solar;
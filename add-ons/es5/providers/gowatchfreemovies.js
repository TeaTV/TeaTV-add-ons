

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://www.gowatchfreemovies.to",
    SEARCH: function SEARCH(title) {
        return 'http://www.gowatchfreemovies.to/?keyword=' + title + '&search_section=2';
    }
};

var FreeMovies = function () {
    function FreeMovies(props) {
        _classCallCheck(this, FreeMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(FreeMovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, detailUrl, htmlSearch, $, item;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                _context.next = 5;
                                return httpRequest.get(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')), {});

                            case 5:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                item = $('.item');


                                item.each(function () {

                                    var hrefFree = URL.DOMAIN + $(this).find('a').attr('href');
                                    var titleTemp = $(this).find('a').attr('title');
                                    titleTemp = titleTemp.replace('Watch Putlocker', '').trim();
                                    var yearFree = titleTemp.match(/\(([^\)]+)/i);
                                    yearFree = yearFree != null ? yearFree[1] : 0;
                                    var titleFree = titleTemp.replace(/\(.*/i, '');

                                    if (stringHelper.shallowCompare(title, titleFree) && +yearFree == year) {

                                        if (hrefFree.indexOf('-tv-show-') != -1 && type == 'tv') {

                                            hrefFree = hrefFree + '/season-' + season + '-episode-' + episode;
                                            hrefFree = hrefFree.replace('watch-', 'tv-');
                                            detailUrl = hrefFree;

                                            return;
                                        } else if (hrefFree.indexOf('-movie-') != -1 && type == 'movie') {

                                            detailUrl = hrefFree;
                                            return;
                                        }
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 11:
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
                var _libs2, httpRequest, cheerio, detailUrl, hosts, arrRedirects, htmlDetail, $, item, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                detailUrl = this.state.detailUrl;
                                hosts = [];
                                arrRedirects = [];
                                _context3.next = 8;
                                return httpRequest.get(this.state.detailUrl, {});

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail.data);
                                item = $('.link_item');


                                item.each(function () {

                                    var linkRedirect = URL.DOMAIN + $(this).find('tbody tr .link_middle strong a').attr('href');

                                    arrRedirects.push(linkRedirect);
                                });

                                arrPromise = arrRedirects.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.prev = 0;
                                                        _context2.next = 3;
                                                        return httpRequest.getRedirectUrl(val);

                                                    case 3:
                                                        linkEmbed = _context2.sent;

                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "gowatchfreemovies"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context2.next = 10;
                                                        break;

                                                    case 7:
                                                        _context2.prev = 7;
                                                        _context2.t0 = _context2['catch'](0);

                                                        console.log(_context2.t0);

                                                    case 10:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[0, 7]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 15;
                                return Promise.all(arrPromise);

                            case 15:
                                this.state.hosts = hosts;

                            case 16:
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

    return FreeMovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var freemovies;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        freemovies = new FreeMovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context4.next = 3;
                        return freemovies.searchDetail();

                    case 3:
                        _context4.next = 5;
                        return freemovies.getHostFromDetail();

                    case 5:
                        return _context4.abrupt('return', freemovies.state.hosts);

                    case 6:
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

thisSource.testing = FreeMovies;
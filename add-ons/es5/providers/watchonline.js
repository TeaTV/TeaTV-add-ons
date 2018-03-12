

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www.watchonline.to',
    DOMAIN_SEARCH: 'https://www.watchonline.to/main/watchonline',
    DOMAIN_SEARCH_POST: 'https://www.watchonline.to/search',
    HEADERS: {
        'User-Agent': "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko"
    }
};

var WatchOnline = function () {
    function WatchOnline(props) {
        _classCallCheck(this, WatchOnline);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(WatchOnline, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, htmlSearch, $, itemSearch, arrSearch, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                _context3.next = 5;
                                return httpRequest.postCloudflare(URL.DOMAIN_SEARCH_POST, URL.HEADERS, {
                                    searchquery: title
                                });

                            case 5:
                                htmlSearch = _context3.sent;


                                console.log(htmlSearch.data, detailUrl);
                                $ = cheerio.load(htmlSearch.data);
                                itemSearch = $('.search-page .table tbody tr');
                                arrSearch = [];


                                itemSearch.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefWatchMovies, titleWatchMovies, yearWatchMovies;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefWatchMovies = $(this).find('a').attr('href');
                                                    titleWatchMovies = $(this).find('a').text();
                                                    yearWatchMovies = titleWatchMovies.match(/\(([0-9]+)\)/i);

                                                    yearWatchMovies = yearWatchMovies != null ? +yearWatchMovies[1] : 0;
                                                    titleWatchMovies = titleWatchMovies.replace(/\([0-9]+\)/i, '');

                                                    arrSearch.push({
                                                        hrefWatchMovies: hrefWatchMovies, titleWatchMovies: titleWatchMovies, yearWatchMovies: yearWatchMovies
                                                    });

                                                case 6:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                arrPromise = arrSearch.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlSeason, $_2, itemSeason;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!(stringHelper.shallowCompare(val.titleWatchMovies, title) && year == val.yearWatchMovies)) {
                                                            _context2.next = 13;
                                                            break;
                                                        }

                                                        if (!(type == 'movie')) {
                                                            _context2.next = 6;
                                                            break;
                                                        }

                                                        detailUrl = val.hrefWatchMovies;
                                                        return _context2.abrupt('return');

                                                    case 6:
                                                        if (!(type == 'tv')) {
                                                            _context2.next = 13;
                                                            break;
                                                        }

                                                        _context2.next = 9;
                                                        return httpRequest.getCloudflare(val.hrefWatchMovies, URL.HEADERS);

                                                    case 9:
                                                        htmlSeason = _context2.sent;
                                                        $_2 = cheerio.load(htmlSeason.data);
                                                        itemSeason = $_2('.accordion-group');


                                                        itemSeason.each(function () {

                                                            var numberSeason = $_2(this).find('.accordion-toggle h5').text().replace(/season/i, '').trim();

                                                            if (+numberSeason == season) {

                                                                var itemEpisode = $_2(this).find('.unwatched');

                                                                itemEpisode.each(function () {

                                                                    var numberEpisode = $_2(this).find('.sideleft > a').text().replace(/ *episode */i, '').trim();

                                                                    if (+numberEpisode == episode) {

                                                                        var hrefEpisode = $_2(this).find('.sideleft > a').attr('href');
                                                                        detailUrl = hrefEpisode;
                                                                        return;
                                                                    }
                                                                });
                                                            }
                                                        });

                                                    case 13:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 14;
                                return Promise.all(arrPromise);

                            case 14:
                                this.state.detailUrl = detailUrl;
                                return _context3.abrupt('return');

                            case 16:
                            case 'end':
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
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this2 = this;

                var _libs2, httpRequest, cheerio, base64, hosts, detailUrl, htmlDetail, $, itemEmbed, arrRedirect, arrPromise;

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
                                detailUrl = this.state.detailUrl;
                                _context5.next = 7;
                                return httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS);

                            case 7:
                                htmlDetail = _context5.sent;
                                $ = cheerio.load(htmlDetail.data);
                                itemEmbed = $('.langEnglish');
                                arrRedirect = [];


                                itemEmbed.each(function () {

                                    var linkRedirect = $(this).find('.noproner a').first().attr('href');
                                    arrRedirect.push(linkRedirect);
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                        var linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.next = 2;
                                                        return httpRequest.redirectCloudflare(val);

                                                    case 2:
                                                        linkEmbed = _context4.sent;

                                                        linkEmbed = linkEmbed.caseless.dict.refresh;

                                                        if (linkEmbed != undefined) {

                                                            linkEmbed = linkEmbed.replace('0;url=', '');
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "watchonline"
                                                                },
                                                                result: {
                                                                    file: linkEmbed,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 5:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this2);
                                    }));

                                    return function (_x2) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());
                                _context5.next = 15;
                                return Promise.all(arrPromise);

                            case 15:

                                this.state.hosts = hosts;

                            case 16:
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

    return WatchOnline;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var watchonline;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        watchonline = new WatchOnline({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context6.next = 3;
                        return watchonline.searchDetail();

                    case 3:
                        _context6.next = 5;
                        return watchonline.getHostFromDetail();

                    case 5:
                        return _context6.abrupt('return', watchonline.state.hosts);

                    case 6:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x3, _x4, _x5) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = WatchOnline;
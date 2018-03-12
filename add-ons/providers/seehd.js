

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.seehd.pl',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        if (page != false) {
            return 'http://www.seehd.pl/page/' + page + '/?s=' + title;
        }
        return 'http://www.seehd.pl/?s=' + title;
    }
};

var Seehd = function () {
    function Seehd(props) {
        _classCallCheck(this, Seehd);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Seehd, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, urlSearch, htmlSearch, $, page;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 5;
                                return httpRequest.getCloudflare(urlSearch);

                            case 5:
                                htmlSearch = _context.sent;

                                htmlSearch = htmlSearch.data;
                                $ = cheerio.load(htmlSearch);
                                page = $('.pagination-item').text();

                                if (!page) {
                                    page = 1;
                                } else {
                                    page = page.match(/page *[0-9]* *of *([0-9]*)/i);
                                    page = page != null ? +page[1] : 1;
                                }

                                _context.next = 12;
                                return this.getDetailUrl(page, this.state);

                            case 12:
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
        key: 'getDetailUrl',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, state) {
                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, year, season, episode, type, arrNumber, i, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;
                                arrNumber = [];


                                for (i = 1; i <= page; i++) {

                                    arrNumber.push(i);
                                }

                                arrPromise = arrNumber.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlSearch, $, itemPage;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), val));

                                                    case 2:
                                                        htmlSearch = _context2.sent;
                                                        $ = cheerio.load(htmlSearch.data);
                                                        itemPage = $('.type-post');


                                                        itemPage.each(function () {

                                                            var hrefMovie = $(this).find('div > div').attr('data-url');
                                                            var titleMovie = $(this).find('div > div > header.entry-header > h2 > a').text();
                                                            titleMovie = titleMovie.replace('Watch Online', '').trim();
                                                            var yearMovie = titleMovie.split(' ');
                                                            yearMovie = yearMovie.length > 0 ? yearMovie[yearMovie.length - 1] : 0;
                                                            titleMovie = titleMovie.replace(yearMovie, '').trim();

                                                            if (stringHelper.shallowCompare(title, titleMovie)) {

                                                                if (type == 'movie' && year == +yearMovie) {

                                                                    state.detailUrl = hrefMovie;
                                                                } else if (type == 'tv') {

                                                                    var seasonMovie = yearMovie.match(/S([0-9]+)/i);
                                                                    var episodeMovie = yearMovie.match(/E([0-9]+)/i);
                                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : 0;

                                                                    if (season == seasonMovie && episode == episodeMovie) {
                                                                        state.detailUrl = hrefMovie;
                                                                    }
                                                                }
                                                            }
                                                        });

                                                        if (!(val == page)) {
                                                            _context2.next = 8;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return');

                                                    case 8:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x4) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 7;
                                return Promise.all(arrPromise);

                            case 7:
                                return _context3.abrupt('return');

                            case 8:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getDetailUrl(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getDetailUrl;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _libs3, httpRequest, cheerio, base64, hosts, detailUrl, htmlDetail, $, itemEmbed;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64;

                                if (this.state.detailUrl) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 7;
                                return httpRequest.getCloudflare(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context4.sent;

                                htmlDetail = htmlDetail.data;
                                $ = cheerio.load(htmlDetail);
                                itemEmbed = $('.tabcontent');


                                itemEmbed.each(function () {

                                    var linkEmbed = $(this).find('center > iframe').attr('src');

                                    linkEmbed && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "seehd"
                                        },
                                        result: {
                                            file: linkEmbed,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;

                            case 13:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Seehd;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var seehd;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        seehd = new Seehd({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context5.next = 3;
                        return seehd.searchDetail();

                    case 3:
                        _context5.next = 5;
                        return seehd.getHostFromDetail();

                    case 5:
                        return _context5.abrupt('return', seehd.state.hosts);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = Seehd;
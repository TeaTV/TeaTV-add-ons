

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://series9.co',
    GET_INFO: function GET_INFO(slug) {
        return 'https://series9.co' + slug;
    },
    SEARCH: function SEARCH(title) {
        return 'https://series9.co/movie/search/' + title;
    }
};

var Series9 = function () {
    function Series9(props) {
        _classCallCheck(this, Series9);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Series9, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYear, urlSearch, detailUrl, htmlSearch, $, itemSearch, arrInfo, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                getYear = this.getYear;
                                urlSearch = false;
                                detailUrl = false;


                                if (type == 'movie') {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title));
                                } else {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title) + ('-season-' + season));
                                }

                                _context3.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context3.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.movies-list .ml-item');
                                arrInfo = [];


                                itemSearch.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie, seasonMovie, slugGetInfo;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('a').attr('href');
                                                    titleMovie = $(this).find('a .mli-info h2').text();
                                                    seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);

                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '');
                                                    titleMovie = titleMovie.replace(/\- *season.*/i, '');
                                                    titleMovie = titleMovie.trim();
                                                    slugGetInfo = $(this).find('a').attr('data-url');


                                                    arrInfo.push({
                                                        hrefMovie: hrefMovie, titleMovie: titleMovie, seasonMovie: seasonMovie, slugGetInfo: slugGetInfo
                                                    });

                                                case 9:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                arrPromise = arrInfo.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var yearMovie, urlWatching, htmlWatching, $_2, linkWatching;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return getYear(val.slugGetInfo, cheerio, httpRequest);

                                                    case 2:
                                                        yearMovie = _context2.sent;

                                                        if (!stringHelper.shallowCompare(title, val.titleMovie)) {
                                                            _context2.next = 18;
                                                            break;
                                                        }

                                                        urlWatching = URL.DOMAIN + val.hrefMovie;
                                                        _context2.next = 7;
                                                        return httpRequest.getHTML(urlWatching);

                                                    case 7:
                                                        htmlWatching = _context2.sent;
                                                        $_2 = cheerio.load(htmlWatching);
                                                        linkWatching = URL.DOMAIN + $_2('#mv-info a').first().attr('href');

                                                        if (!(type == 'movie' && year == yearMovie && linkWatching != 'https://series9.coundefined')) {
                                                            _context2.next = 15;
                                                            break;
                                                        }

                                                        detailUrl = linkWatching;
                                                        return _context2.abrupt('return');

                                                    case 15:
                                                        if (!(type == 'tv' && val.seasonMovie == season && linkWatching != 'https://series9.coundefined')) {
                                                            _context2.next = 18;
                                                            break;
                                                        }

                                                        detailUrl = linkWatching;
                                                        return _context2.abrupt('return');

                                                    case 18:
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
                                _context3.next = 16;
                                return Promise.all(arrPromise);

                            case 16:

                                this.state.detailUrl = detailUrl;
                                return _context3.abrupt('return');

                            case 18:
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
        key: 'getYear',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(slug, cheerio, httpRequest) {
                var yearMovie, htmlGetInfo, $, itemInfo;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                yearMovie = 0;
                                _context4.next = 3;
                                return httpRequest.getHTML(URL.GET_INFO(slug), {
                                    'X-Requested-With': 'XMLHttpRequest',
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
                                });

                            case 3:
                                htmlGetInfo = _context4.sent;
                                $ = cheerio.load(htmlGetInfo);
                                itemInfo = $('.jt-info');

                                itemInfo.each(function () {

                                    var info = $(this).text();

                                    if (isNaN(+info) == false) {
                                        yearMovie = +info;
                                    }
                                });
                                return _context4.abrupt('return', yearMovie);

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getYear(_x2, _x3, _x4) {
                return _ref4.apply(this, arguments);
            }

            return getYear;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, htmlDetail, $, itemEpisode;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context5.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                detailUrl = this.state.detailUrl;
                                _context5.next = 9;
                                return httpRequest.getHTML(detailUrl);

                            case 9:
                                htmlDetail = _context5.sent;
                                $ = cheerio.load(htmlDetail);
                                itemEpisode = $('#list-eps .le-server');


                                if (type == 'movie') {

                                    itemEpisode.each(function () {

                                        var linkEmbed = $(this).find('.les-content a').attr('player-data');

                                        if (linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1) {
                                            linkEmbed = 'http:' + linkEmbed;
                                        }

                                        linkEmbed && hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "series9"
                                            },
                                            result: {
                                                file: linkEmbed,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    });
                                } else if (type == 'tv') {

                                    itemEpisode.each(function () {

                                        var itemLink = $(this).find('.les-content a');

                                        itemLink.each(function () {

                                            var linkEmbed = $(this).attr('player-data');
                                            var episodeMovie = $(this).text();
                                            episodeMovie = episodeMovie.replace(/episode */i, '').trim();

                                            if (episodeMovie == episode) {

                                                if (linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1) {
                                                    linkEmbed = 'http:' + linkEmbed;
                                                }

                                                linkEmbed && hosts.push({
                                                    provider: {
                                                        url: detailUrl,
                                                        name: "series9"
                                                    },
                                                    result: {
                                                        file: linkEmbed,
                                                        label: "embed",
                                                        type: "embed"
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }

                                this.state.hosts = hosts;
                                return _context5.abrupt('return');

                            case 15:
                            case 'end':
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

    return Series9;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var series;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        series = new Series9({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context6.next = 3;
                        return series.searchDetail();

                    case 3:
                        _context6.next = 5;
                        return series.getHostFromDetail();

                    case 5:
                        return _context6.abrupt('return', series.state.hosts);

                    case 6:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x5, _x6, _x7) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = Series9;
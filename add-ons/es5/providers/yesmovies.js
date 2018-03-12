

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://yesmovies.to',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (page == false) {
            return 'https://yesmovies.to/search/' + title + '.html';
        }
        return 'https://yesmovies.to/search/' + title + '/page-' + page + '.html';
    },
    GET_INFO: function GET_INFO(slug) {
        return 'https://yesmovies.to/' + slug + '?is_login=false';
    },
    GET_EMBED: function GET_EMBED(id) {
        return 'https://yesmovies.to/ajax/movie_embed/' + id;
    },
    GET_HTML_EMBED: function GET_HTML_EMBED(id) {
        return 'https://yesmovies.to/ajax/v4_movie_episodes/' + id;
    }
};

var YesMovies = function () {
    function YesMovies(props) {
        _classCallCheck(this, YesMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(YesMovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYear, getHrefEpisode, hrefSearch, detailUrl, htmlSearch, $, itemPage, arrInfo, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                getYear = this.getYear, getHrefEpisode = this.getHrefEpisode;
                                hrefSearch = '';
                                detailUrl = false;


                                if (type == 'movie') {
                                    hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                } else {

                                    hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title + '++season+' + season + '+episode+' + episode, '+'));
                                }

                                _context3.next = 8;
                                return httpRequest.getCloudflare(hrefSearch);

                            case 8:
                                htmlSearch = _context3.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemPage = $('.movies-list .ml-item');
                                arrInfo = [];


                                itemPage.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
                                        var yearMovie, htmlWatching, $_2, linkWatching;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return getYear(val.slugGetInfo, cheerio, httpRequest);

                                                    case 2:
                                                        yearMovie = _context2.sent;

                                                        if (!stringHelper.shallowCompare(title, val.titleMovie)) {
                                                            _context2.next = 10;
                                                            break;
                                                        }

                                                        _context2.next = 6;
                                                        return httpRequest.getCloudflare(val.hrefMovie);

                                                    case 6:
                                                        htmlWatching = _context2.sent;
                                                        $_2 = cheerio.load(htmlWatching.data);
                                                        linkWatching = $_2('#mv-info .bwac-btn').attr('href');


                                                        if (type == 'movie' && year == yearMovie) {

                                                            detailUrl = linkWatching;
                                                        } else if (type == 'tv' && val.seasonMovie == season) {

                                                            detailUrl = linkWatching;
                                                        }

                                                    case 10:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x2) {
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
                                return httpRequest.getCloudflare(URL.GET_INFO(slug), {
                                    'X-Requested-With': 'XMLHttpRequest',
                                    authority: 'yesmovies.to',
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
                                });

                            case 3:
                                htmlGetInfo = _context4.sent;
                                $ = cheerio.load(htmlGetInfo.data);
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

            function getYear(_x3, _x4, _x5) {
                return _ref4.apply(this, arguments);
            }

            return getYear;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, idMovies, htmlEmbed, $, idEmbed, _idEmbed, arrPromise;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context6.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                detailUrl = this.state.detailUrl;
                                idMovies = detailUrl.match(/\-([0-9]+)\/watching\.html/i);

                                idMovies = idMovies != null ? +idMovies[1] : 0;
                                _context6.next = 11;
                                return httpRequest.getCloudflare(URL.GET_HTML_EMBED(idMovies));

                            case 11:
                                htmlEmbed = _context6.sent;
                                $ = cheerio.load(htmlEmbed.data.html);


                                if (type == 'movie') {
                                    idEmbed = $('.ep-item');


                                    idEmbed.each(function () {

                                        var dataId = $(this).attr('data-id');
                                        arrId.push(dataId);
                                    });
                                } else if (type == 'tv') {
                                    _idEmbed = $('.ep-item');


                                    _idEmbed.each(function () {

                                        var dataId = $(this).attr('data-id');
                                        var episodeMovie = $(this).find('a').attr('title');
                                        episodeMovie = episodeMovie.match(/episode *([0-9]+)/i);
                                        episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                        if (episode == episodeMovie) {
                                            arrId.push(dataId);
                                        }
                                    });
                                }

                                arrPromise = arrId.map(function () {
                                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(val) {
                                        var jsonEmbed, linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        _context5.next = 2;
                                                        return httpRequest.getCloudflare(URL.GET_EMBED(val));

                                                    case 2:
                                                        jsonEmbed = _context5.sent;
                                                        linkEmbed = jsonEmbed.data.src;

                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "yesmovies"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 5:
                                                    case 'end':
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, this);
                                    }));

                                    return function (_x6) {
                                        return _ref6.apply(this, arguments);
                                    };
                                }());
                                _context6.next = 17;
                                return Promise.all(arrPromise);

                            case 17:

                                this.state.hosts = hosts;
                                return _context6.abrupt('return');

                            case 19:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getHostFromDetail() {
                return _ref5.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return YesMovies;
}();

thisSource.function = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(libs, movieInfo, settings) {
        var yesmovies;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        yesmovies = new YesMovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context7.next = 3;
                        return yesmovies.searchDetail();

                    case 3:
                        _context7.next = 5;
                        return yesmovies.getHostFromDetail();

                    case 5:
                        return _context7.abrupt('return', yesmovies.state.hosts);

                    case 6:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x7, _x8, _x9) {
        return _ref7.apply(this, arguments);
    };
}();

thisSource.testing = YesMovies;
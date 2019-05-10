

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.watchepisodeseries.com',
    SEARCH: function SEARCH(title) {
        return 'http://www.watchepisodeseries.com/home/search?q=' + title;
    },
    HEADER: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
    }
};

var WatchSeriesEpisode = function () {
    function WatchSeriesEpisode(props) {
        _classCallCheck(this, WatchSeriesEpisode);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(WatchSeriesEpisode, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, jsonSearch, slugMovie, item, titleMovie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 6;
                                return httpRequest.getCloudflare(urlSearch);

                            case 6:
                                jsonSearch = _context.sent;

                                jsonSearch = jsonSearch.data;

                                slugMovie = false;


                                for (item in jsonSearch.series) {
                                    titleMovie = jsonSearch.series[item].original_name;

                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        slugMovie = jsonSearch.series[item].seo_name;
                                    }
                                }

                                if (slugMovie != false) {
                                    this.state.detailUrl = URL.DOMAIN + '/' + slugMovie;
                                }

                                return _context.abrupt('return');

                            case 12:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrRedirect, hrefEpisode, htmlDetail, $, itemEpisode;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                hrefEpisode = [];
                                _context2.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 9:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                itemEpisode = $('.el-item');


                                itemEpisode.each(function () {

                                    var hrefMovie = $(this).find('a').first().attr('href');
                                    var seasonMovie = $(this).find('a').first().find('.season').text();
                                    var episodeMovie = $(this).find('a').first().find('.episode').text();
                                    seasonMovie = seasonMovie.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    episodeMovie = episodeMovie.match(/episode *([0-9]+)/i);
                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : false;

                                    if (seasonMovie != false && episodeMovie != false && +seasonMovie == season && +episodeMovie == episode) {

                                        hrefEpisode = hrefMovie;
                                    }
                                });

                                if (!(hrefEpisode == false)) {
                                    _context2.next = 15;
                                    break;
                                }

                                throw new Error('NOT EPISODE');

                            case 15:
                                _context2.next = 17;
                                return this.getEmbeds(hrefEpisode, this.state);

                            case 17:
                                return _context2.abrupt('return');

                            case 18:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }, {
        key: 'getEmbeds',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(hrefMovie, state) {
                var _libs3, httpRequest, cheerio, base64, _, _movieInfo3, title, year, season, episode, type, arrRedirect, arrhosts, htmlRedirect, $, itemRedirect, checkTimeout, checkReturn, timeout, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64, _ = _libs3._;
                                _movieInfo3 = this.movieInfo, title = _movieInfo3.title, year = _movieInfo3.year, season = _movieInfo3.season, episode = _movieInfo3.episode, type = _movieInfo3.type;
                                arrRedirect = [];
                                arrhosts = [];
                                _context4.next = 6;
                                return httpRequest.getHTML(hrefMovie);

                            case 6:
                                htmlRedirect = _context4.sent;
                                $ = cheerio.load(htmlRedirect);
                                itemRedirect = $('.link-list .ll-item');


                                itemRedirect.each(function () {

                                    var linkRedirect = $(this).find('.watch .watch-button').attr('href');
                                    arrRedirect.push(linkRedirect);
                                });

                                arrRedirect = _.dropRight(arrRedirect, arrRedirect.length - 50);

                                checkTimeout = false;
                                checkReturn = false;
                                timeout = setTimeout(function () {

                                    checkTimeout = true;
                                    checkReturn = true;
                                    state.hosts = arrhosts;
                                    return;
                                }, 10000);

                                /** 
                                 * 
                                 * FIXME 
                                 * this promise auto return after 10s.
                                 * because many link embed not response or loss many time to response
                                */

                                arrPromise = arrRedirect.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var htmlEmbed, $_2, linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.getCloudflare(val, URL.HEADER);

                                                    case 2:
                                                        htmlEmbed = _context3.sent;


                                                        if (htmlEmbed.data != undefined) {

                                                            htmlEmbed = htmlEmbed.data;
                                                            $_2 = cheerio.load(htmlEmbed);
                                                            linkEmbed = $_2('.wb-main .watch-button').attr('href');


                                                            console.log(linkEmbed);
                                                            linkEmbed && arrhosts.push({
                                                                provider: {
                                                                    url: state.detailUrl,
                                                                    name: "watchseriesepisode"
                                                                },
                                                                result: {
                                                                    file: linkEmbed,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                        if (!checkReturn) {
                                                            _context3.next = 6;
                                                            break;
                                                        }

                                                        return _context3.abrupt('return');

                                                    case 6:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this);
                                    }));

                                    return function (_x3) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 17;
                                return Promise.all(arrPromise);

                            case 17:
                                if (checkTimeout) {
                                    _context4.next = 21;
                                    break;
                                }

                                clearTimeout(timeout);
                                state.hosts = arrhosts;
                                return _context4.abrupt('return');

                            case 21:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getEmbeds(_x, _x2) {
                return _ref3.apply(this, arguments);
            }

            return getEmbeds;
        }()
    }]);

    return WatchSeriesEpisode;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var watchseries;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        watchseries = new WatchSeriesEpisode({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context5.next = 3;
                        return watchseries.searchDetail();

                    case 3:
                        _context5.next = 5;
                        return watchseries.getHostFromDetail();

                    case 5:
                        return _context5.abrupt('return', watchseries.state.hosts);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = WatchSeriesEpisode;
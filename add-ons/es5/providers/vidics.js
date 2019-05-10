

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www.vidics.to',
    SEARCH: function SEARCH(title) {
        return 'https://www.vidics.to/Category-TvShows/Genre-Any/Letter-Any/ByPopularity/1/Search-' + title + '.htm';
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'www.vidics.to',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
        };
    }
};

var Vidics = function () {
    function Vidics(props) {
        _classCallCheck(this, Vidics);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidics, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, state, detailUrl, detailSeason, htmlSearch, $, itemSearch, htmlDetail, $_2, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                state = this.state;
                                detailUrl = false;
                                detailSeason = false;
                                _context.next = 7;
                                return httpRequest.getHTML(URL.SEARCH(encodeURI(title)), URL.HEADERS());

                            case 7:
                                htmlSearch = _context.sent;
                                _context.next = 10;
                                return httpRequest.getHTML(URL.SEARCH(encodeURI(title)), URL.HEADERS());

                            case 10:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#searchResults .searchResult');

                                //console.log(itemSearch.length);

                                itemSearch.each(function () {

                                    var titleMovie = $(this).find('.searchResultInner h2 a.blue').text();
                                    var hrefMovie = URL.DOMAIN + $(this).find('.searchResultInner h2 a.blue').attr('href');
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(titleMovie, title)) {
                                        detailSeason = hrefMovie;
                                    }
                                });

                                if (!(detailSeason != false)) {
                                    _context.next = 24;
                                    break;
                                }

                                _context.next = 17;
                                return httpRequest.getHTML(detailSeason, URL.HEADERS());

                            case 17:
                                htmlDetail = _context.sent;
                                _context.next = 20;
                                return httpRequest.getHTML(detailSeason, URL.HEADERS());

                            case 20:
                                htmlDetail = _context.sent;
                                $_2 = cheerio.load(htmlDetail);
                                itemSeason = $_2('.episode');


                                itemSeason.each(function () {

                                    var hrefEpisode = URL.DOMAIN + $_2(this).attr('href');
                                    var seasonMovie = hrefEpisode.match(/\-Season\-([0-9]+)/i);
                                    var episodeMovie = hrefEpisode.match(/\-Episode\-([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : -1;
                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                    if (seasonMovie == season && episodeMovie == episode) {

                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 24:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 26:
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
                var _libs2, httpRequest, cheerio, base64, _, hosts, arrRedirects, detailUrl, htmlDetail, $, itemRedirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, _ = _libs2._;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrRedirects = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS());

                            case 8:
                                htmlDetail = _context3.sent;
                                _context3.next = 11;
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS());

                            case 11:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                itemRedirect = $('.movie_link');


                                itemRedirect.each(function () {

                                    var linkRedirect = URL.DOMAIN + $(this).find('.p1').attr('href');
                                    arrRedirects.push(linkRedirect);
                                });

                                arrRedirects = _.dropRight(arrRedirects, arrRedirects.length - 50);

                                arrPromise = arrRedirects.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlRedirect, $_2, linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.prev = 0;
                                                        _context2.next = 3;
                                                        return httpRequest.getHTML(val, URL.HEADERS());

                                                    case 3:
                                                        htmlRedirect = _context2.sent;
                                                        $_2 = cheerio.load(htmlRedirect);
                                                        linkEmbed = $_2('.movie_link1 .blue').attr('href');


                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "vidics"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context2.next = 11;
                                                        break;

                                                    case 9:
                                                        _context2.prev = 9;
                                                        _context2.t0 = _context2['catch'](0);

                                                    case 11:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[0, 9]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 19;
                                return Promise.all(arrPromise);

                            case 19:

                                this.state.hosts = hosts;

                            case 20:
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

    return Vidics;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vidics({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Vidics',
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

                        _context4.next = 11;
                        return httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                    case 11:
                        return _context4.abrupt('return', source.state.hosts);

                    case 12:
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

thisSource.testing = Vidics;
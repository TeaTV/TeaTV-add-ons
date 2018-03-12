

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www.vidics.to',
    SEARCH: function SEARCH(title) {
        return 'https://www.vidics.to/Category-TvShows/Genre-Any/Letter-Any/ByPopularity/1/Search-' + title + '.htm';
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
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, state, detailUrl, htmlSearch, $, itemSearch, htmlDetail, $_2, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                state = this.state;
                                detailUrl = false;
                                _context.next = 6;
                                return httpRequest.getHTML(URL.SEARCH(encodeURI(title)));

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#searchResults .searchResult');


                                console.log(itemSearch.length);
                                itemSearch.each(function () {

                                    var titleMovie = $(this).find('.searchResultInner h2 a.blue').text();
                                    var hrefMovie = URL.DOMAIN + $(this).find('.searchResultInner h2 a.blue').attr('href');
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(titleMovie, title)) {
                                        detailUrl = hrefMovie;
                                    }
                                });

                                if (detailUrl) {
                                    _context.next = 13;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 13:
                                _context.next = 15;
                                return httpRequest.getHTML(detailUrl);

                            case 15:
                                htmlDetail = _context.sent;
                                $_2 = cheerio.load(htmlDetail);
                                itemSeason = $_2('.season');


                                itemSearch.each(function () {

                                    var titleSeason = $_2(this).find('.season_header a.null').text();
                                    if (titleSeason) {

                                        var numberSeason = titleSeason.match(/season *([0-9]+)/i);
                                        numberSeason = numberSeason != null ? +numberSeason[1] : -1;

                                        console.log("season", numberSeason);
                                        if (season == numberSeason) {

                                            var itemEpisode = $_2(this).find('.episode');

                                            itemEpisode.each(function () {

                                                var hrefEpisode = DOMAIN + $_2(this).attr('href');
                                                var numberEpisode = hrefEpisode.match(/-episode-([0-9]+)/i);
                                                numberEpisode = numberEpisode != null ? +numberEpisode[1] : -1;

                                                if (numberEpisode == episode) {
                                                    detailUrl = hrefEpisode;
                                                }
                                            });
                                        }
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
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
                var _libs2, httpRequest, cheerio, base64, hosts, arrRedirects, detailUrl, htmlDetail, $, itemRedirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

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
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                itemRedirect = $('.movie_link');


                                itemRedirect.each(function () {

                                    var linkRedirect = DOMAIN + $(this).find('.p1').attr('href');
                                    arrRedirects.push(linkRedirect);
                                });

                                arrPromise = arrRedirects.map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    var $_2, linkEmbed;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.next = 2;
                                                    return parse.PARSE_DOM_DEFAULT({}, linkRedirect, true);

                                                case 2:
                                                    $_2 = _context2.sent;
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

                                                case 5:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, this);
                                })));
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

    return Vidics;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var vidics;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        vidics = new Vidics({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context4.next = 3;
                        return vidics.searchDetail();

                    case 3:
                        _context4.next = 5;
                        return vidics.getHostFromDetail();

                    case 5:
                        return _context4.abrupt('return', vidics.state.hosts);

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Vidics;
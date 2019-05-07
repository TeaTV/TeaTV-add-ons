

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://pubfilm.is',
    SEARCH: function SEARCH(title) {
        return 'https://www.google.com/search?q=' + title + '&sitesearch=pubfilm.is';
    },
    HEADERS: function HEADERS() {
        return {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
        };
    }
};

var Pubfilm = function () {
    function Pubfilm(props) {
        _classCallCheck(this, Pubfilm);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Pubfilm, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, detailSeasonUrl, detailEpisodeUrl, urlSearch, htmlSearch, $, itemSearch, htmlEpisode, $_3, itemEpisode, _$_, detailUrlServer;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                detailSeasonUrl = false;
                                detailEpisodeUrl = false;
                                urlSearch = '';


                                urlSearch = URL.SEARCH(encodeURIComponent(title.toLowerCase()));

                                _context.next = 9;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS());

                            case 9:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('a');


                                itemSearch.each(function () {

                                    var hrefCheck = $(this).attr('href');

                                    if (hrefCheck && hrefCheck.indexOf(URL.DOMAIN) != -1 && hrefCheck.indexOf('/tag/') == -1) {

                                        var titleMovie = $(this).text();
                                        var hrefMovie = hrefCheck;
                                        var seasonMovie = titleMovie.match(/\: *Season *([0-9]+)/i);
                                        seasonMovie = seasonMovie != null ? +seasonMovie[1] : -1;
                                        titleMovie = titleMovie.replace('– Official Home pubfilm.com', '').trim();
                                        titleMovie = titleMovie.replace(/\: *Season *[0-9]+/i, '').trim();
                                        var yearMovie = titleMovie.toLowerCase().replace(title.toLowerCase(), '').trim();
                                        yearMovie = yearMovie.match(/([0-9]+)/i);
                                        yearMovie = yearMovie != null ? +yearMovie[1] : false;

                                        if (titleMovie && seasonMovie && yearMovie && (isNaN(yearMovie) == false || yearMovie == '') && hrefMovie.indexOf('pubfilm') != -1) {

                                            if (type == 'movie') {

                                                if (titleMovie.indexOf(year) != -1) {
                                                    detailUrl = hrefMovie;
                                                    return;
                                                }
                                            } else {

                                                if (seasonMovie == season) {
                                                    detailUrl = hrefMovie;
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                });

                                htmlEpisode = '';

                                if (!(type == 'tv' && detailUrl != false)) {
                                    _context.next = 29;
                                    break;
                                }

                                _context.prev = 15;
                                _context.next = 18;
                                return httpRequest.getHTML(detailUrl, URL.HEADERS());

                            case 18:
                                htmlEpisode = _context.sent;
                                _context.next = 24;
                                break;

                            case 21:
                                _context.prev = 21;
                                _context.t0 = _context['catch'](15);
                                throw new Error('NOT VALID LINK');

                            case 24:
                                $_3 = cheerio.load(htmlEpisode);
                                itemEpisode = $_3('a[target=EZWebPlayer]');


                                itemEpisode.each(function () {

                                    var episodeMovie = $(this).text().replace(/episode */i, '').trim();
                                    var hrefEpisode = $(this).attr('href');

                                    if (+episodeMovie == episode && hrefEpisode.indexOf('imdb.com') != -1) {

                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                                _context.next = 42;
                                break;

                            case 29:
                                if (!(type == 'movie' && detailUrl != false)) {
                                    _context.next = 42;
                                    break;
                                }

                                _context.prev = 30;
                                _context.next = 33;
                                return httpRequest.getHTML(detailUrl, URL.HEADERS());

                            case 33:
                                htmlEpisode = _context.sent;
                                _context.next = 39;
                                break;

                            case 36:
                                _context.prev = 36;
                                _context.t1 = _context['catch'](30);
                                throw new Error('NOT VALID LINK');

                            case 39:
                                _$_ = cheerio.load(htmlEpisode);
                                detailUrlServer = _$_('a[target=EZWebPlayer]');


                                detailUrlServer.each(function () {

                                    var urlServer = _$_(this).attr('href');
                                    if (urlServer.indexOf('imdb.com') == -1) {

                                        detailUrl = urlServer;
                                    }
                                });

                            case 42:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 44:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[15, 21], [30, 36]]);
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
                var _libs2, httpRequest, cheerio, base64, hosts, _responseData, detailUrl, htmlDetail, item, linkEmbed;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                _responseData = void 0;
                                detailUrl = this.state.detailUrl.replace('get.php', 'gel.php');
                                _context2.prev = 6;
                                _context2.next = 9;
                                return httpRequest.getHTML(detailUrl, URL.HEADERS());

                            case 9:
                                htmlDetail = _context2.sent;

                                htmlDetail = htmlDetail.replace('|var', '| ');

                                eval(htmlDetail);

                                _responseData = _responseData.info.hosterurls.alternalurls;

                                for (item in _responseData) {
                                    linkEmbed = _responseData[item].href;


                                    linkEmbed && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "pubfilm"
                                        },
                                        result: {
                                            file: linkEmbed,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }

                                _context2.next = 19;
                                break;

                            case 16:
                                _context2.prev = 16;
                                _context2.t0 = _context2['catch'](6);
                                throw new Error(_context2.t0);

                            case 19:

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 21:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[6, 16]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Pubfilm;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var pubfilm;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        pubfilm = new Pubfilm({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return pubfilm.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return pubfilm.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', pubfilm.state.hosts);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = Pubfilm;
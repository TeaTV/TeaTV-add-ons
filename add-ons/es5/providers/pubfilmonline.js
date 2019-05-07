

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://pubfilmonline.net',
    SEARCH: function SEARCH(title) {
        return 'http://pubfilmonline.net/?s=' + title;
    },
    EMBED: 'http://pubfilmonline.net/wp-admin/admin-ajax.php',
    HEADERS: function HEADERS(referer) {
        var pipeGuard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Cookie': 'starstruck_4dd2a205616b4dfd6254e09b24c8f4d4=75e619c9213aab371f312095d87b8050; __test; ' + pipeGuard,
            'Referer': referer,
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Upgrade-Insecure-Requests': 1,
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Host': 'pubfilmonline.net',
            'Accept-Encoding': 'deflate'
        };
    }
};

var PubfilmOnline = function () {
    function PubfilmOnline(props) {
        _classCallCheck(this, PubfilmOnline);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(PubfilmOnline, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch, htmlSeason, $_2, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 6;
                                return httpRequest.getCloudflare(urlSearch, URL.HEADERS(urlSearch));

                            case 6:
                                htmlSearch = _context.sent;

                                try {
                                    this.state.pipeGuard = htmlSearch.headers['set-cookie'][0].replace('path=/', '').trim();
                                } catch (error) {
                                    this.state.pipeGuard = '';
                                }

                                _context.next = 10;
                                return httpRequest.getCloudflare(urlSearch, URL.HEADERS(urlSearch, this.state.pipeGuard));

                            case 10:
                                htmlSearch = _context.sent;

                                htmlSearch = htmlSearch.data;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.search-page .result-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('.details .title a').attr('href');
                                    var titleMovie = $(this).find('.details .title a').text();
                                    var yearMovie = $(this).find('.details .meta .year').text();
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie) && +yearMovie == year) {

                                        detailUrl = hrefMovie;
                                        return;
                                    }
                                });

                                if (!(detailUrl != false && type == 'tv')) {
                                    _context.next = 23;
                                    break;
                                }

                                _context.next = 18;
                                return httpRequest.getCloudflare(detailUrl, URL.HEADERS(detailUrl, this.state.pipeGuard));

                            case 18:
                                htmlSeason = _context.sent;

                                htmlSeason = htmlSeason.data;
                                $_2 = cheerio.load(htmlSeason);
                                itemSeason = $_2('.episodios');


                                itemSeason.each(function () {

                                    var itemEpisode = $_2(this).find('li');

                                    itemEpisode.each(function () {

                                        var nameSeasonEpisode = $_2(this).find('.numerando').text();
                                        var seasonMovie = nameSeasonEpisode.match(/([0-9]+)/i);
                                        var episodeMovie = nameSeasonEpisode.match(/[0-9]+ *\- *([0-9]+)/i);
                                        var hrefEpisode = $_2(this).find('.episodiotitle a').attr('href');
                                        seasonMovie = seasonMovie != null ? +seasonMovie[1] : -1;
                                        episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                        if (seasonMovie == season && episodeMovie == episode) {
                                            detailUrl = hrefEpisode;
                                            return;
                                        }
                                    });
                                });

                            case 23:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 25:
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
                var _libs2, httpRequest, cheerio, base64, hosts, arrEmbed, htmlDetail, $_2, ids, nonce, bodyEmbed, itemEmbed, item;

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
                                arrEmbed = [];
                                _context2.next = 7;
                                return httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS(this.state.detailUrl, this.state.pipeGuard));

                            case 7:
                                htmlDetail = _context2.sent;

                                htmlDetail = htmlDetail.data;
                                $_2 = cheerio.load(htmlDetail);
                                ids = $_2('.htt_player').attr('data-ids');
                                nonce = htmlDetail.match(/\"ajax\_get\_video\_info\" *\: *\"([^\"]+)/i);

                                nonce = nonce != null ? nonce[1] : '';

                                bodyEmbed = {
                                    server: 1,
                                    nonce: nonce,
                                    action: 'ajax_get_video_info',
                                    ids: ids
                                };
                                _context2.prev = 14;
                                _context2.next = 17;
                                return httpRequest.postCloudflare(URL.EMBED, URL.HEADERS(URL.EMBED, this.state.pipeGuard), bodyEmbed);

                            case 17:
                                itemEmbed = _context2.sent;

                                itemEmbed = itemEmbed.data;

                                if (itemEmbed != -1) {

                                    for (item in itemEmbed) {

                                        itemEmbed[item].file && hosts.push({
                                            provider: {
                                                url: this.state.detailUrl,
                                                name: "pubfilmol"
                                            },
                                            result: {
                                                file: itemEmbed[item].file,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    }
                                }

                                _context2.next = 25;
                                break;

                            case 22:
                                _context2.prev = 22;
                                _context2.t0 = _context2['catch'](14);
                                throw new Error(_context2.t0);

                            case 25:

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 27:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[14, 22]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return PubfilmOnline;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var pubfilm;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        pubfilm = new PubfilmOnline({
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

    return function (_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = PubfilmOnline;
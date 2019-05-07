

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://dizilab.me',
    SEARCH: function SEARCH(title) {
        return 'http://dizilab.me/arsiv?dizi_adi=' + title;
    },
    GET_EMBED: 'http://dizilab.me/request/php/',
    HEADERS: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Connection': 'keep-alive',
        'Host': 'dizilab.me',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
};

var Dizilab = function () {
    function Dizilab(props) {
        _classCallCheck(this, Dizilab);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Dizilab, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, detailSeason, urlSearch, resultSearch, $, itemSearch, htmlSeason, $_2, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;

                                if (!(type == 'movie')) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error("NOT FOUND");

                            case 4:
                                detailUrl = false;
                                detailSeason = false;
                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 9;
                                return httpRequest.getCloudflare(urlSearch, URL.HEADERS);

                            case 9:
                                resultSearch = _context.sent;
                                $ = cheerio.load(resultSearch.data);
                                itemSearch = $('.tv-series-single');


                                itemSearch.each(function () {

                                    var hrefMovie = $('.film-image').attr('href');
                                    var titleMovie = $('.film-image img').attr('alt');

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        detailSeason = hrefMovie;
                                        return;
                                    }
                                });

                                if (!(detailSeason != false)) {
                                    _context.next = 20;
                                    break;
                                }

                                _context.next = 16;
                                return httpRequest.getCloudflare(detailSeason, URL.HEADERS);

                            case 16:
                                htmlSeason = _context.sent;
                                $_2 = cheerio.load(htmlSeason.data);
                                itemSeason = $_2('.season');


                                itemSeason.each(function () {

                                    var hrefSeason = $_2(this).attr('href');
                                    var seasonMovie = hrefSeason.match(/sezon\-([0-9]+)/i);
                                    var episodeMovie = hrefSeason.match(/\/bolum-([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : -1;
                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                    if (seasonMovie == season && episodeMovie == episode) {

                                        detailUrl = hrefSeason;
                                        return;
                                    }
                                });

                            case 20:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 22:
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
                var _libs2, httpRequest, cheerio, base64, qs, _movieInfo2, season, episode, hosts, arrVideoId, detailUrl, htmlDetail, $, itemEpisode, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, season = _movieInfo2.season, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrVideoId = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 9;
                                return httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS);

                            case 9:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail.data);
                                itemEpisode = $('.tab-menu .hovered .language li');


                                itemEpisode.each(function () {

                                    var videoId = $(this).find('a').attr('onclick');
                                    videoId = videoId != undefined ? videoId : '';
                                    videoId = videoId.match(/loadVideo\(\'([^\']+)/i);
                                    videoId = videoId != null ? videoId[1] : false;

                                    if (videoId != false) {

                                        arrVideoId.push(videoId);
                                    }
                                });

                                arrPromise = arrVideoId.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var headerEmbed, bodyEmbed, jsonEmbed, linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        headerEmbed = {
                                                            'Accept': 'application/json, text/javascript, */*; q=0.01',
                                                            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                                                            'Connection': 'keep-alive',
                                                            'Content-Length': 39,
                                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                                            'Host': 'dizilab.me',
                                                            'Origin': URL.DOMAIN,
                                                            'Referer': detailUrl,
                                                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
                                                            'X-Requested-With': 'XMLHttpRequest'
                                                        };
                                                        bodyEmbed = qs.stringify({
                                                            vid: val,
                                                            tip: 0,
                                                            type: "loadVideo"
                                                        });
                                                        jsonEmbed = '';
                                                        _context2.prev = 3;
                                                        _context2.next = 6;
                                                        return httpRequest.postCloudflare(URL.GET_EMBED, headerEmbed, bodyEmbed);

                                                    case 6:
                                                        jsonEmbed = _context2.sent;

                                                        jsonEmbed = jsonEmbed.data.html;

                                                        linkEmbed = jsonEmbed.match(/src\=\"([^\"]+)/i);

                                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Dizilab"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context2.next = 15;
                                                        break;

                                                    case 13:
                                                        _context2.prev = 13;
                                                        _context2.t0 = _context2['catch'](3);

                                                    case 15:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[3, 13]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 16;
                                return Promise.all(arrPromise);

                            case 16:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 18:
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

    return Dizilab;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var dizi;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        dizi = new Dizilab({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context4.next = 3;
                        return dizi.searchDetail();

                    case 3:
                        _context4.next = 5;
                        return dizi.getHostFromDetail();

                    case 5:
                        return _context4.abrupt('return', dizi.state.hosts);

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

thisSource.testing = Dizilab;
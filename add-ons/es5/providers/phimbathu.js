

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://phimbathu.com",
    SEARCH: function SEARCH(title) {
        return 'http://phimbathu.com/tim-kiem.html?q=' + title;
    }
};

var Phimbathu = function () {
    function Phimbathu(props) {
        _classCallCheck(this, Phimbathu);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Phimbathu, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, videoUrl, detailUrl, tvshowDetailUrl, urlSearch, htmlSearch, $, itemSearch, htmlVideo, $_2, hrefVideo, htmlDetail, _$_, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                videoUrl = false;
                                detailUrl = false;
                                tvshowDetailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 8:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#page-info .item');


                                itemSearch.each(function () {

                                    var hrefMovie = URL.DOMAIN + $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.name-real').text();
                                    var yearMovie = titleMovie.match(/\( *([0-9]+)/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : false;
                                    var seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/season *[0-9]+ *\(* *[0-9]+ *\)*$/i, '').trim();
                                    titleMovie = titleMovie.replace(/\( *[0-9]+ *\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && yearMovie == year && !seasonMovie) {
                                            videoUrl = hrefMovie;
                                            return;
                                        } else if (type == 'tv' && seasonMovie && seasonMovie == season) {
                                            videoUrl = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                if (!(videoUrl != false)) {
                                    _context.next = 19;
                                    break;
                                }

                                _context.next = 15;
                                return httpRequest.getHTML(videoUrl, URL.HEADERS);

                            case 15:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                hrefVideo = $_2('.btn-see').attr('href');


                                if (type == 'movie' && hrefVideo) {
                                    detailUrl = URL.DOMAIN + hrefVideo;
                                } else if (type == 'tv' && hrefVideo) {

                                    tvshowDetailUrl = detailUrl;
                                }

                            case 19:
                                if (!(type == 'tv' && tvshowDetailUrl)) {
                                    _context.next = 26;
                                    break;
                                }

                                _context.next = 22;
                                return httpRequest.getHTML(tvshowDetailUrl);

                            case 22:
                                htmlDetail = _context.sent;
                                _$_ = cheerio.load(htmlDetail);
                                itemEpisode = _$_('#list_episodes');


                                itemEpisode.each(function () {

                                    var hrefEpisode = _$_(this).find('a').attr('href');
                                    var numberEpisode = _$_(this).find('a').text();
                                    numberEpisode = numberEpisode.match(/([0-9]+)/i);
                                    numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                    if (numberEpisode && numberEpisode == episode) {
                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 26:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 28:
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
                var _libs2, httpRequest, cheerio, qs, gibberish, hosts, type, phimbathu, playerSetting, html_video, player, key, item, item1, link_direct;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                type = this.movieInfo.type;
                                phimbathu = this;
                                playerSetting = {
                                    sourceLinks: [],
                                    modelId: ''
                                };
                                _context2.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS);

                            case 9:
                                html_video = _context2.sent;
                                player = html_video.match(/var *playerSetting *\=([^\$]+)/i);

                                player = player != null ? player[1] : '';

                                eval('playerSetting =  ' + player);

                                key = 'phimbathu.com4590481877' + playerSetting.modelId;


                                for (item in playerSetting.sourceLinks) {

                                    for (item1 in playerSetting.sourceLinks[item].links) {
                                        link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);


                                        if (link_direct) {

                                            hosts.push({
                                                provider: {
                                                    url: phimbathu.state.detailUrl,
                                                    name: "Server 2"
                                                },
                                                result: {
                                                    file: link_direct,
                                                    label: playerSetting.sourceLinks[item].links[item1].label,
                                                    type: 'direct'
                                                }
                                            });
                                        }
                                    }
                                }

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 17:
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
        key: 'isEmbed',
        value: function isEmbed(link) {

            if (link.indexOf('statics2.vidcdn.pro') != -1) {
                return false;
            } else if (link.indexOf('stream2.m4ukido.com') != -1) {
                return false;
            }

            return true;
        }
    }]);

    return Phimbathu;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var phimbathu;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        phimbathu = new Phimbathu({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return phimbathu.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return phimbathu.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', phimbathu.state.hosts);

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

thisSource.testing = Phimbathu;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://vuighe.net",
    SEARCH: function SEARCH(title) {
        return 'http://vuighe.net/tim-kiem/' + encodeURI(title);
    },
    DOMAIN_EPISODE: function DOMAIN_EPISODE(id) {
        return 'http://vuighe.net/api/v2/films/' + id + '/episodes?sort=name';
    },
    DOMAIN_EMBED: function DOMAIN_EMBED(id, id_episode) {
        return 'http://vuighe.net/api/v2/films/' + id + '/episodes/' + id_episode;
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Referer': 'http://vuighe.net/anime',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    HEADERS_RERFER: function HEADERS_RERFER() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    }
};

var Vuighe = function () {
    function Vuighe(props) {
        _classCallCheck(this, Vuighe);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Vuighe, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, title_vi, videoMovieUrl, arrHrefEpisode, videoTvshowUrl, videoUrl, detailUrl, tvshowDetailUrl, urlSearch, htmlSearch, $, itemSearch, htmlVideo, $_2, film_id, domainEpisode, json_detail, item, urlEpisode, numberEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, title_vi = _movieInfo.title_vi;

                                // if( season == 0 && type == 'tv' ) {
                                //     season = title.match(/season *([0-9]+)/i);
                                //     season = season != null ? +season[1] : '0';
                                //     title  = title.replace(/season *[0-9]+/i, '');

                                //     if( season == 0 ) {
                                //         season = title.match(/ss *([0-9]+)/i);
                                //         season = season != null ? +season[1] : '0';
                                //         title  = title.replace(/ss *[0-9]+/i, '');
                                //     }
                                // }

                                videoMovieUrl = [];
                                arrHrefEpisode = [];
                                videoTvshowUrl = false;
                                videoUrl = false;
                                detailUrl = [];
                                tvshowDetailUrl = false;
                                urlSearch = URL.SEARCH(title);
                                _context.next = 11;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 11:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.tray-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.tray-item-title').text();

                                    if (hrefMovie && stringHelper.shallowCompare(title, titleMovie) || stringHelper.shallowCompare(title_vi, titleMovie)) {

                                        videoTvshowUrl = URL.DOMAIN + hrefMovie;
                                    }
                                });

                                if (!(type == 'tv' && videoTvshowUrl != false)) {
                                    _context.next = 26;
                                    break;
                                }

                                _context.next = 18;
                                return httpRequest.getHTML(videoTvshowUrl, URL.HEADERS);

                            case 18:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                film_id = $_2('#filmPage').attr('data-id');
                                domainEpisode = URL.DOMAIN_EPISODE(film_id);
                                _context.next = 24;
                                return httpRequest.get(domainEpisode, URL.HEADERS_RERFER(videoTvshowUrl));

                            case 24:
                                json_detail = _context.sent;


                                if (json_detail.data) {

                                    json_detail = json_detail.data.data;
                                    for (item in json_detail) {
                                        urlEpisode = URL.DOMAIN + json_detail[item].link;
                                        numberEpisode = json_detail[item].name;


                                        if (numberEpisode == episode) {

                                            detailUrl = urlEpisode;
                                        }
                                    }
                                }

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
                var _libs2, httpRequest, cheerio, qs, gibberish, type, hosts, vuighe, htmlVideo, $, filmId, episodeId, url_episode, json_embed, item, item1;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;
                                type = this.movieInfo.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                vuighe = this;
                                _context2.next = 8;
                                return httpRequest.getHTML(vuighe.state.detailUrl, URL.HEADERS_RERFER(vuighe.state.detailUrl));

                            case 8:
                                htmlVideo = _context2.sent;
                                $ = cheerio.load(htmlVideo);
                                filmId = $('#filmPage').attr('data-id');
                                episodeId = $('#filmPage').attr('data-episode-id');
                                url_episode = URL.DOMAIN_EMBED(filmId, episodeId);
                                _context2.next = 15;
                                return httpRequest.get(url_episode, URL.HEADERS_RERFER(vuighe.state.detailUrl));

                            case 15:
                                json_embed = _context2.sent;


                                if (json_embed.data.sources) {

                                    for (item in json_embed.data.sources) {

                                        if (json_embed.data.sources[item].length > 0) {

                                            for (item1 in json_embed.data.sources[item]) {

                                                json_embed.data.sources[item][item1].src && hosts.push({
                                                    provider: {
                                                        url: vuighe.state.detailUrl,
                                                        name: "Server 10"
                                                    },
                                                    result: {
                                                        file: json_embed.data.sources[item][item1].src,
                                                        label: json_embed.data.sources[item][item1].quality,
                                                        type: 'direct'
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 19:
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
    }]);

    return Vuighe;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vuighe({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Vuighe',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context3.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context3.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        _context3.next = 11;
                        return httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

                    case 11:
                        return _context3.abrupt('return', source.state.hosts);

                    case 12:
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

thisSource.testing = Vuighe;
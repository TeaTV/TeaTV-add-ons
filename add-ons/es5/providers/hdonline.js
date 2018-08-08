

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://hdonline.vn",
    SEARCH: function SEARCH(title) {
        return 'http://hdonline.vn/tim-kiem/' + title + '.html';
    },
    HEADERS: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Connection': 'keep-alive',
        'Host': 'hdonline.vn',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    },
    HEADER_DIRECT: function HEADER_DIRECT() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var cookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'hdonline.vn',
            'Referer': rerfer,
            'Cookie': 'jwplayer.captionconfig={"back":false,"fontSize":20,"fontFamily":"Arial","fontOpacity":100,"color":"#FFFFFF","backgroundColor":"#000","backgroundOpacity":50,"edgeStyle":"uniform","windowColor":"#FFF","windowOpacity":0,"delayTime":0,"textShadow":"#080808","captionSecondPos":"below"}; ' + cookie,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    DOMAIN_EPISODE: function DOMAIN_EPISODE(id) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        return 'http://hdonline.vn/episode/ajax?film=' + id + '&episode=&page=' + page + '&search=';
    }
};

var Hdonline = function () {
    function Hdonline(props) {
        _classCallCheck(this, Hdonline);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Hdonline, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, videoUrl, detailUrl, tvshowDetailUrl, urlSearch, htmlSearch, $, itemSearch, arrPage, idEpisode, htmlVideo, $_2, itemEpisode, last_page, i, arr_promise;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                if (season == 0 && type == 'tv') {
                                    season = title.match(/season *([0-9]+)/i);
                                    season = season != null ? +season[1] : '0';
                                    title = title.replace(/season *[0-9]+/i, '');

                                    if (season == 0) {
                                        season = title.match(/ss *([0-9]+)/i);
                                        season = season != null ? +season[1] : '0';
                                        title = title.replace(/ss *[0-9]+/i, '');
                                    }
                                }

                                videoUrl = false;
                                detailUrl = false;
                                tvshowDetailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title));
                                _context2.next = 9;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 9:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#cat_tatca li');


                                itemSearch.each(function () {

                                    var hrefMovie = URL.DOMAIN + $(this).find('.tn-bxitem a').attr('href');
                                    var titleMovie = $(this).find('.name-vi').text();
                                    var seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                    titleMovie = titleMovie.replace(/season *[0-9]+/i, '').trim();
                                    var yearMovie = $(this).find("p:contains(Năm sản xuất)").text();
                                    yearMovie = yearMovie.match(/([0-9]+)/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : false;
                                    var status = $(this).find('.bxitem-episodes span').text();
                                    status = status ? status.trim().toLowerCase().replace('ậ', 'a') : '';

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && yearMovie == year && !status) {
                                            detailUrl = hrefMovie;
                                            return;
                                        } else if (type == 'tv' && (status.indexOf('full') != -1 || status.indexOf('tap') != -1) && (season == seasonMovie || seasonMovie == 0)) {
                                            videoUrl = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                if (!(videoUrl != false && type == 'tv')) {
                                    _context2.next = 28;
                                    break;
                                }

                                arrPage = [];
                                idEpisode = videoUrl.match(/([0-9]+)\.html/i);

                                idEpisode = idEpisode != null ? idEpisode[1] : "0";

                                _context2.next = 19;
                                return httpRequest.getHTML(URL.DOMAIN_EPISODE(idEpisode));

                            case 19:
                                htmlVideo = _context2.sent;
                                $_2 = cheerio.load(htmlVideo);
                                itemEpisode = $_2('.paginationEpMovies a').last().attr('onclick');
                                last_page = 1;


                                if (itemEpisode) {
                                    last_page = itemEpisode.match(/loadEpisode\( *\'.*\' *\, *([0-9]+)/i);
                                    last_page = last_page != null ? +last_page[1] : 0;
                                }

                                for (i = 1; i <= last_page; i++) {
                                    arrPage.push(i);
                                }

                                arr_promise = arrPage.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var href_page, html_page, $, item_episode;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        href_page = URL.DOMAIN_EPISODE(idEpisode, val);
                                                        _context.next = 3;
                                                        return httpRequest.getHTML(href_page);

                                                    case 3:
                                                        html_page = _context.sent;
                                                        $ = cheerio.load(html_page);
                                                        item_episode = $('a');


                                                        item_episode.each(function () {

                                                            var number_movie = $(this).text();
                                                            var href_movie = $(this).attr('href');

                                                            if (href_movie != 'javascript:void(0)' && number_movie == episode) {

                                                                href_movie = URL.DOMAIN + href_movie;
                                                                detailUrl = href_movie;
                                                                return;
                                                            }
                                                        });

                                                    case 7:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x4) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 28;
                                return Promise.all(arr_promise);

                            case 28:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 30:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this2 = this;

                var _libs2, httpRequest, cheerio, qs, gibberish, _movieInfo2, title, year, season, episode, type, hosts, hdonline, arr_result, arr_direct, playerSetting, header, html_video, player, arrValFile, arr_promise;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context5.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                hdonline = this;
                                arr_result = [];
                                arr_direct = [];
                                playerSetting = {
                                    sourceLinks: [],
                                    modelId: ''
                                };
                                _context5.next = 11;
                                return httpRequest.get(hdonline.state.detailUrl, URL.HEADER_DIRECT(hdonline.state.detailUrl));

                            case 11:
                                header = _context5.sent;

                                header = header.headers;
                                header = header['set-cookie'][1];
                                header = header.match(/([^\;]+)/i);
                                header = header != null ? header[1] + ';' : '';

                                _context5.next = 18;
                                return httpRequest.getHTML(hdonline.state.detailUrl, URL.HEADER_DIRECT(hdonline.state.detailUrl));

                            case 18:
                                html_video = _context5.sent;
                                player = html_video.match(/\"playlist\" *\:([^\]]+)/i);

                                player = player != null ? player[1] + ']' : ']';
                                player = JSON.parse(player);

                                arrValFile = [];
                                arr_promise = player.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var numberEpisode;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        numberEpisode = val.title;

                                                        numberEpisode = numberEpisode.match(/([0-9]+)/i);
                                                        numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                                        if (!(numberEpisode == episode && type == 'tv')) {
                                                            _context3.next = 7;
                                                            break;
                                                        }

                                                        arrValFile.push(val);
                                                        _context3.next = 10;
                                                        break;

                                                    case 7:
                                                        if (!(type == 'movie')) {
                                                            _context3.next = 10;
                                                            break;
                                                        }

                                                        arrValFile.push(val);
                                                        return _context3.abrupt('return');

                                                    case 10:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this2);
                                    }));

                                    return function (_x5) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context5.next = 26;
                                return Promise.all(arr_promise);

                            case 26:

                                arr_promise = arrValFile.map(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                        var href_get_direct, data, item;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        href_get_direct = URL.DOMAIN + val.file + '&format=json';
                                                        _context4.next = 3;
                                                        return httpRequest.getHTML(href_get_direct, URL.HEADER_DIRECT(hdonline.state.detailUrl, header));

                                                    case 3:
                                                        data = _context4.sent;


                                                        data = JSON.parse(data);
                                                        href_get_direct = URL.DOMAIN + val.file + '&_x=123&format=json';
                                                        _context4.next = 8;
                                                        return httpRequest.getHTML(href_get_direct, URL.HEADER_DIRECT(hdonline.state.detailUrl, header));

                                                    case 8:
                                                        data = _context4.sent;

                                                        data = JSON.parse(data);

                                                        data.file && hosts.push({
                                                            provider: {
                                                                url: hdonline.state.detailUrl,
                                                                name: "Server 4"
                                                            },
                                                            result: {
                                                                file: data.file,
                                                                label: 'HD',
                                                                type: 'direct'
                                                            }
                                                        });

                                                        for (item in data.level) {

                                                            data.level[item].file && hosts.push({
                                                                provider: {
                                                                    url: hdonline.state.detailUrl,
                                                                    name: "Server 4"
                                                                },
                                                                result: {
                                                                    file: data.level[item].file,
                                                                    label: data.level[item].label,
                                                                    type: 'direct'
                                                                }
                                                            });
                                                        }

                                                    case 12:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this2);
                                    }));

                                    return function (_x6) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());
                                _context5.next = 29;
                                return Promise.all(arr_promise);

                            case 29:

                                this.state.hosts = hosts;
                                return _context5.abrupt('return');

                            case 31:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Hdonline;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Hdonline({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Hdonline',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context6.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context6.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        _context6.next = 11;
                        return httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

                    case 11:
                        return _context6.abrupt('return', source.state.hosts);

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x7, _x8, _x9) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = Hdonline;
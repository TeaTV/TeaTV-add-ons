

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://vkool.net",
    DOMAIN_EMBED: 'http://vkool.net/js/vkphp/plugins/gkpluginsphp.php',
    SEARCH: function SEARCH(title) {
        return 'http://vkool.net/search/' + title + '.html';
    },
    HEADERS: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Content-type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'vkool.net',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    },
    HEADERS_RERFER: function HEADERS_RERFER() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Content-type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
            'Host': 'vkool.net',
            'Rerfer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    }
};

var Vkool = function () {
    function Vkool(props) {
        _classCallCheck(this, Vkool);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Vkool, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, videoMovieUrl, arrHrefEpisode, videoTvshowUrl, videoUrl, detailUrl, tvshowDetailUrl, urlSearch, htmlSearch, $, itemSearch, arrPromise, htmlVideo, $_2, linkVideo, htmlDetail, itemEpisode;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                videoMovieUrl = [];
                                arrHrefEpisode = [];
                                videoTvshowUrl = false;
                                videoUrl = false;
                                detailUrl = [];
                                tvshowDetailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context2.next = 11;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 11:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.list-movie .movie-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('.block-wrapper').attr('href');
                                    var titleMovie = $(this).find('.movie-title-2').text();
                                    var status = $(this).find('.movie-meta .ribbon').text().toLowerCase();
                                    var seasonMovie = titleMovie.match(/\(* *season *([0-9]+)\)*/i);
                                    titleMovie = titleMovie.replace(/\(* *season *[0-9]+\)*/i, '');
                                    seasonMovie = seasonMovie != null ? seasonMovie[1] : "0";

                                    status = status.trim().replace('ậ', 'a');

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && status.indexOf('tap') == -1 && status.indexOf('-end') == -1) {
                                            videoMovieUrl.push(hrefMovie);
                                        } else if (type == 'tv' && seasonMovie == season) {
                                            videoTvshowUrl = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                if (!(type == 'movie' && videoMovieUrl.length > 0)) {
                                    _context2.next = 19;
                                    break;
                                }

                                arrPromise = videoMovieUrl.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var htmlVideo, $_2, linkVideo, yearMovie;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return httpRequest.getHTML(val, URL.HEADERS);

                                                    case 2:
                                                        htmlVideo = _context.sent;
                                                        $_2 = cheerio.load(htmlVideo);
                                                        linkVideo = $_2('#btn-film-watch').attr('href');


                                                        if (linkVideo && linkVideo.indexOf('http://') == -1 && linkVideo.indexOf('https://') == -1) {
                                                            linkVideo = URL.DOMAIN + linkVideo;
                                                        }
                                                        yearMovie = $_2('a.nobr').text();


                                                        console.log(yearMovie, linkVideo, 'abc');

                                                        if (!(yearMovie == year)) {
                                                            _context.next = 11;
                                                            break;
                                                        }

                                                        detailUrl.push(linkVideo);
                                                        return _context.abrupt('return');

                                                    case 11:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 19;
                                return Promise.all(arrPromise);

                            case 19:
                                if (!(type == 'tv' && videoTvshowUrl != false)) {
                                    _context2.next = 33;
                                    break;
                                }

                                _context2.next = 22;
                                return httpRequest.getHTML(videoTvshowUrl, URL.HEADERS);

                            case 22:
                                htmlVideo = _context2.sent;
                                $_2 = cheerio.load(htmlVideo);
                                linkVideo = $_2('#btn-film-watch').attr('href');

                                if (linkVideo.indexOf('http://') == -1 && linkVideo.indexOf('https://') == -1) {
                                    linkVideo = URL.DOMAIN + linkVideo;
                                }

                                _context2.next = 28;
                                return httpRequest.getHTML(linkVideo, URL.HEADERS);

                            case 28:
                                htmlDetail = _context2.sent;

                                $_2 = cheerio.load(htmlDetail);
                                itemEpisode = $_2('.list_ep');


                                itemEpisode.each(function () {

                                    var itemA = $_2(this).find('a');

                                    itemA.each(function () {

                                        var numberEpisode = $_2(this).text();
                                        var hrefDetail = $_2(this).attr('href');

                                        if (hrefDetail.indexOf('http://') == -1 && hrefDetail.indexOf('https://') == -1) {
                                            hrefDetail = URL.DOMAIN + '/' + hrefDetail;
                                        }

                                        if (episode == numberEpisode) {
                                            arrHrefEpisode.push(hrefDetail);
                                        }
                                    });
                                });

                                detailUrl = arrHrefEpisode;

                            case 33:

                                console.log(detailUrl, 'abc2');
                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 36:
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
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this2 = this;

                var _libs2, httpRequest, cheerio, qs, gibberish, type, hosts, vkool, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;
                                type = this.movieInfo.type;

                                if (!(this.state.detailUrl.length == 0)) {
                                    _context4.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                vkool = this;


                                console.log(this.state.detailUrl, 'abc3');

                                _context4.next = 9;
                                return this.state.detailUrl.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
                                        var list_link, html_video, $, script, info_video, linkdatap, body_post, result_post, item1, link_direct;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        list_link = {
                                                            link: []
                                                        };
                                                        _context3.next = 3;
                                                        return httpRequest.getHTML(item, URL.HEADERS);

                                                    case 3:
                                                        html_video = _context3.sent;
                                                        $ = cheerio.load(html_video);


                                                        console.log($('#VkoolMovie').length, 'abc4');

                                                        if (!($('#VkoolMovie').length > 0)) {
                                                            _context3.next = 28;
                                                            break;
                                                        }

                                                        script = $('#VkoolMovie').next().html();


                                                        console.log(script, 'abc5');

                                                        info_video = script.match(/gkpluginsphp\(\"VkoolMovie\"\ *, *([^\)]+)/i);

                                                        info_video = info_video[1];
                                                        info_video = JSON.parse(info_video);

                                                        console.log(info_video, 'vkool');

                                                        if (!info_video.link) {
                                                            _context3.next = 25;
                                                            break;
                                                        }

                                                        linkdatap = info_video.link.replace(/&/g, '%26');
                                                        body_post = {
                                                            link: linkdatap
                                                        };


                                                        console.log(body_post, 'vkool1');
                                                        _context3.next = 19;
                                                        return httpRequest.post(URL.DOMAIN_EMBED, URL.HEADERS_RERFER(item), body_post);

                                                    case 19:
                                                        result_post = _context3.sent;

                                                        result_post = result_post.data;

                                                        console.log(result_post, 'vkool3');
                                                        list_link = result_post;
                                                        _context3.next = 26;
                                                        break;

                                                    case 25:
                                                        if (info_video.gklist) {} else if (info_video.list) {}

                                                    case 26:
                                                        console.log(list_link, 'vkool4');
                                                        if (list_link.link && list_link.link.length > 0) {
                                                            for (item1 in list_link.link) {
                                                                link_direct = gibberish.dec(list_link.link[item1].link, 'decolivkool');


                                                                link_direct && hosts.push({
                                                                    provider: {
                                                                        url: item,
                                                                        name: "Server 5"
                                                                    },
                                                                    result: {
                                                                        file: link_direct,
                                                                        label: list_link.link[item1].label,
                                                                        type: 'direct'
                                                                    }
                                                                });
                                                            }
                                                        }

                                                    case 28:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this2);
                                    }));

                                    return function (_x3) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());

                            case 9:
                                arrPromise = _context4.sent;
                                _context4.next = 12;
                                return Promise.all(arrPromise);

                            case 12:

                                this.state.hosts = hosts;
                                return _context4.abrupt('return');

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Vkool;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var vkool;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        vkool = new Vkool({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context5.next = 3;
                        return vkool.searchDetail();

                    case 3:
                        _context5.next = 5;
                        return vkool.getHostFromDetail();

                    case 5:
                        return _context5.abrupt('return', vkool.state.hosts);

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

thisSource.testing = Vkool;
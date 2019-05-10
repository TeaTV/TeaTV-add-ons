

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://animetvn.tv/",
    SEARCH: function SEARCH(title) {
        return 'http://animetvn.tv/tim-kiem/' + encodeURIComponent(title) + '.html';
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var Animetvn = function () {
    function Animetvn(props) {
        _classCallCheck(this, Animetvn);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Animetvn, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, tvshowDetailUrl, urlSearch, htmlSearch, $, itemSearch, htmlVideo, $_2, htmlDetail, _$_, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
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

                                detailUrl = false;
                                videoUrl = false;
                                tvshowDetailUrl = false;
                                urlSearch = URL.SEARCH(title);
                                _context.next = 9;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 9:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.film-list .film_item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('.film_item_inner a').attr('href');
                                    var titleMovie = $(this).find('.data .title a').text();
                                    titleMovie = titleMovie.replace(/\( *season *[0-9]+ *\)/i, '').trim();
                                    titleMovie = titleMovie.replace(/\(.*/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        videoUrl = hrefMovie;
                                        return;
                                    }
                                });

                                if (!videoUrl) {
                                    _context.next = 19;
                                    break;
                                }

                                _context.next = 16;
                                return httpRequest.getHTML(videoUrl);

                            case 16:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);


                                tvshowDetailUrl = $_2('.play-now').attr('href');

                            case 19:
                                if (!tvshowDetailUrl) {
                                    _context.next = 26;
                                    break;
                                }

                                _context.next = 22;
                                return httpRequest.getHTML(tvshowDetailUrl);

                            case 22:
                                htmlDetail = _context.sent;
                                _$_ = cheerio.load(htmlDetail);
                                itemEpisode = _$_('.tapphim');


                                itemEpisode.each(function () {

                                    var numberEpisode = _$_(this).text();
                                    var hrefEpisode = _$_(this).attr('href');

                                    if (numberEpisode == episode) {
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this = this;

                var _libs2, httpRequest, cheerio, qs, anime, arrDirect, hosts, _movieInfo2, type, episode, arrServer, htmlDetail, $, iframe, itemServer, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                anime = this;
                                arrDirect = [];
                                hosts = [];
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, episode = _movieInfo2.episode;
                                arrServer = [];
                                _context3.next = 10;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 10:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                iframe = $('.loadplayer iframe').attr('src');


                                iframe && hosts.push({
                                    provider: {
                                        url: anime.state.detailUrl,
                                        name: "Server 10"
                                    },
                                    result: {
                                        file: iframe,
                                        label: 'embed'
                                    }
                                });

                                itemServer = $('.tapphim');


                                itemServer.each(function () {

                                    var hrefServer = $(this).attr('href');
                                    var numberEpisode = $(this).text();

                                    if (numberEpisode == episode) {
                                        arrServer.push(hrefServer);
                                    }
                                });

                                if (arrServer.length == 0) {
                                    arrServer.push(anime.state.detailUrl);
                                }

                                arrPromise = arrServer.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(href) {
                                        var htmlDetail, pregDirect, item, linkDirect, label;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(href);

                                                    case 2:
                                                        htmlDetail = _context2.sent;
                                                        pregDirect = htmlDetail.match(/sources *\: *([^\]]+)/i);


                                                        if (pregDirect != null) {
                                                            pregDirect = pregDirect[1] + ']';

                                                            eval('arrDirect = ' + pregDirect);

                                                            for (item in arrDirect) {
                                                                linkDirect = arrDirect[item].file;
                                                                label = arrDirect[item].label;


                                                                linkDirect && hosts.push({
                                                                    provider: {
                                                                        url: anime.state.detailUrl,
                                                                        name: "Server 10"
                                                                    },
                                                                    result: {
                                                                        file: linkDirect,
                                                                        label: label
                                                                    }
                                                                });
                                                            }
                                                        }

                                                    case 5:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 20;
                                return Promise.all(arrPromise);

                            case 20:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 22:
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

    return Animetvn;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Animetvn({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Animetvn',
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
                        return httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

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

thisSource.testing = Animetvn;
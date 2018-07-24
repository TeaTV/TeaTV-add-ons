

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://moviewatcher.is",
    SEARCH: function SEARCH(title) {
        return 'https://moviewatcher.is/ajax?query=' + title;
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var MovieWatcher = function () {
    function MovieWatcher(props) {
        _classCallCheck(this, MovieWatcher);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(MovieWatcher, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, videoUrl, detailUrl, arrMovie, urlSearch, htmlSearch, itemSearch, arrPromise, htmlVideo, $, itemSeason;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                videoUrl = false;
                                detailUrl = false;
                                arrMovie = [];
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context2.next = 8;
                                return httpRequest.getCloudflare(urlSearch);

                            case 8:
                                htmlSearch = _context2.sent;

                                //console.log(htmlSearch, 'ff');
                                //let $			= cheerio.load(htmlSearch);

                                itemSearch = JSON.parse(htmlSearch);


                                itemSearch.each(function (i) {

                                    var hrefMovie = URL.DOMAIN + itemSearch[i][4];
                                    var titleMovie = itemSearch[i][0];
                                    console.log(titleMovie, 'f');

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie') {
                                            arrMovie.push(hrefMovie);
                                        } else {
                                            videoUrl = hrefMovie;
                                        }
                                    }
                                });

                                if (!(type == 'movie' && arrMovie.length > 0)) {
                                    _context2.next = 15;
                                    break;
                                }

                                arrPromise = arrMovie.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var yearMovie, htmlVideo, $_2, tableInfo;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        yearMovie = false;
                                                        _context.next = 3;
                                                        return httpRequest.getHTML(val);

                                                    case 3:
                                                        htmlVideo = _context.sent;
                                                        $_2 = cheerio.load(htmlVideo);
                                                        tableInfo = $_2('.table-info table  tbody tr');


                                                        tableInfo.each(function () {

                                                            var titleInfo = $_2(this).find('b').text();
                                                            var valueInfo = $_2(this).find('a').text();

                                                            if (titleInfo.indexOf('Release Year') != -1) {
                                                                yearMovie = valueInfo;
                                                            }
                                                        });

                                                        if (!(yearMovie == year)) {
                                                            _context.next = 10;
                                                            break;
                                                        }

                                                        detailUrl = val;
                                                        return _context.abrupt('return');

                                                    case 10:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 15;
                                return Promise.all(arrPromise);

                            case 15:
                                if (!(videoUrl && type == 'tv')) {
                                    _context2.next = 22;
                                    break;
                                }

                                _context2.next = 18;
                                return httpRequest.getHTML(videoUrl);

                            case 18:
                                htmlVideo = _context2.sent;
                                $ = cheerio.load(htmlVideo);
                                itemSeason = $('.episode_1');


                                itemSeason.each(function () {

                                    var hrefEpisode = $(this).attr('href');
                                    if (hrefEpisode) {
                                        var hrefEmbed = URL.DOMAIN + hrefEpisode;

                                        var numberSeason = hrefEmbed.match(/\/s([0-9]+)/i);
                                        numberSeason = numberSeason != null ? +numberSeason[1] : false;

                                        var numberEpisode = hrefEmbed.match(/\/s[0-9]+e([0-9]+)/i);
                                        numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                        if (season == numberSeason && episode == numberEpisode) {
                                            detailUrl = hrefEmbed;
                                            return;
                                        }
                                    }
                                });

                            case 22:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 24:
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

                var _libs2, httpRequest, cheerio, qs, hosts, arrRedirect, detailUrl, htmlDetail, $, iframe, itemRedirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context4.sent;
                                $ = cheerio.load(htmlDetail);
                                iframe = $('.addplayer iframe').attr('src');


                                iframe && hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "MovieWatcher"
                                    },
                                    result: {
                                        file: iframe,
                                        label: "embed",
                                        type: "direct"
                                    }
                                });

                                itemRedirect = $('.full-torrent1');


                                itemRedirect.each(function () {

                                    var hrefRedirect = $(this).find('.small_links').attr('onclick');

                                    if (hrefRedirect) {

                                        hrefRedirect = hrefRedirect.match(/window.open\(\'([^\']+)/i);
                                        hrefRedirect = hrefRedirect != null ? hrefRedirect[1] : false;

                                        if (hrefRedirect) {

                                            if (hrefRedirect.indexOf('https:') == -1 && hrefRedirect.indexOf('http:') == -1) {
                                                hrefRedirect = URL.DOMAIN + hrefRedirect;
                                            }
                                            arrRedirect.push(hrefRedirect);
                                        }
                                    }
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var urlRedirect;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.getRedirectUrl(val);

                                                    case 2:
                                                        urlRedirect = _context3.sent;


                                                        urlRedirect && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "MovieWatcher"
                                                            },
                                                            result: {
                                                                file: urlRedirect,
                                                                label: "embed",
                                                                type: "direct"
                                                            }
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this2);
                                    }));

                                    return function (_x2) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 17;
                                return Promise.all(arrPromise);

                            case 17:

                                this.state.hosts = hosts;
                                return _context4.abrupt('return');

                            case 19:
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

    return MovieWatcher;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new MovieWatcher({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'MovieWatcher',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context5.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context5.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        _context5.next = 11;
                        return httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                    case 11:
                        return _context5.abrupt('return', source.state.hosts);

                    case 12:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x3, _x4, _x5) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = MovieWatcher;
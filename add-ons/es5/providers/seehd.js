

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.seehd.pl',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        if (page != false) {
            return 'http://www.seehd.pl/page/' + page + '/?s=' + title;
        }
        return 'http://www.seehd.pl/?s=' + title;
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'www.seehd.pl',
            'Referer': 'http://www.seehd.pl/',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
        };
    }
};

var Seehd = function () {
    function Seehd(props) {
        _classCallCheck(this, Seehd);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Seehd, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, urlSearch, htmlSearch, $, page;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                if (!!httpRequest.cookie) {
                                    httpRequest.cookie.clear();
                                }

                                _context.prev = 3;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));

                                //console.log(urlSearch, 'search');

                                _context.next = 7;
                                return httpRequest.get(urlSearch, URL.HEADERS());

                            case 7:
                                htmlSearch = _context.sent;

                                htmlSearch = htmlSearch.data;

                                //console.log(htmlSearch, '1');
                                $ = cheerio.load(htmlSearch);
                                page = $('.pagination-item').text();

                                if (!page) {
                                    page = 1;
                                } else {
                                    page = page.match(/page *[0-9]* *of *([0-9]*)/i);
                                    page = page != null ? +page[1] : 1;
                                }

                                _context.next = 14;
                                return this.getDetailUrl(page, this.state);

                            case 14:
                                _context.next = 19;
                                break;

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context['catch'](3);

                                console.log(String(_context.t0), 'error');
                                //process.exit();

                            case 19:
                                return _context.abrupt('return');

                            case 20:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 16]]);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getDetailUrl',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, state) {
                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, year, season, episode, type, arrNumber, i, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;
                                arrNumber = [];


                                for (i = 1; i <= page; i++) {
                                    arrNumber.push(i);
                                }

                                //console.log(arrNumber, 'number');

                                arrPromise = arrNumber.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var urlSearch, htmlSearch, $, itemPage;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), 1);

                                                        //console.log(urlSearch, '1');

                                                        _context2.next = 3;
                                                        return httpRequest.get(urlSearch, URL.HEADERS());

                                                    case 3:
                                                        htmlSearch = _context2.sent;
                                                        $ = cheerio.load(htmlSearch.data);
                                                        itemPage = $('.movie');

                                                        //console.log(itemPage.length, 'page');

                                                        itemPage.each(function () {

                                                            var hrefMovie = $(this).find('.post_thumb a').attr('href');
                                                            var titleMovie = $(this).find('a h2').text();
                                                            titleMovie = titleMovie.replace('Watch Online', '').trim();
                                                            var yearMovie = titleMovie.split(' ');
                                                            console.log(titleMovie, yearMovie);
                                                            yearMovie = yearMovie.length > 0 ? yearMovie[yearMovie.length - 1] : 0;
                                                            titleMovie = titleMovie.replace(yearMovie, '').trim();
                                                            console.log(titleMovie, yearMovie, 'f');

                                                            if (stringHelper.shallowCompare(title, titleMovie)) {

                                                                if (type == 'movie' && year == +yearMovie) {

                                                                    state.detailUrl = hrefMovie;
                                                                } else if (type == 'tv') {

                                                                    var seasonMovie = yearMovie.match(/S([0-9]+)/i);
                                                                    var episodeMovie = yearMovie.match(/E([0-9]+)/i);
                                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : 0;

                                                                    if (season == seasonMovie && episode == episodeMovie) {
                                                                        state.detailUrl = hrefMovie;
                                                                    }
                                                                }
                                                            }
                                                        });

                                                        if (!(val == page)) {
                                                            _context2.next = 9;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return');

                                                    case 9:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x4) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 7;
                                return Promise.all(arrPromise);

                            case 7:
                                return _context3.abrupt('return');

                            case 8:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getDetailUrl(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getDetailUrl;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this = this;

                var _libs3, httpRequest, cheerio, base64, hosts, arrEmbed, detailUrl, htmlDetail, $, itemEmbed, arrPromise;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64;

                                if (this.state.detailUrl) {
                                    _context5.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrEmbed = [];
                                detailUrl = this.state.detailUrl;
                                _context5.next = 8;
                                return httpRequest.get(this.state.detailUrl, URL.HEADERS());

                            case 8:
                                htmlDetail = _context5.sent;

                                htmlDetail = htmlDetail.data;
                                $ = cheerio.load(htmlDetail);
                                itemEmbed = $('.tabcontent');


                                itemEmbed.each(function () {

                                    var linkEmbed = $(this).find('center > iframe').attr('src');

                                    if (linkEmbed) {
                                        arrEmbed.push(linkEmbed);
                                    }
                                });

                                arrPromise = arrEmbed.map(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                        var htmlEmbed, $_3, iframe;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        if (!(val.indexOf('seehd.pl/d') != -1)) {
                                                            _context4.next = 11;
                                                            break;
                                                        }

                                                        _context4.next = 3;
                                                        return httpRequest.get(val, URL.HEADERS());

                                                    case 3:
                                                        htmlEmbed = _context4.sent;

                                                        htmlEmbed = htmlEmbed.data;
                                                        $_3 = cheerio.load(htmlEmbed);
                                                        iframe = $_3('iframe').attr('src');


                                                        if (iframe && iframe.indexOf('ok.ru') != -1) {
                                                            iframe = 'https:' + iframe;
                                                        }

                                                        iframe && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "seehd"
                                                            },
                                                            result: {
                                                                file: iframe,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context4.next = 12;
                                                        break;

                                                    case 11:
                                                        val && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "seehd"
                                                            },
                                                            result: {
                                                                file: val,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 12:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this);
                                    }));

                                    return function (_x5) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());
                                _context5.next = 16;
                                return Promise.all(arrPromise);

                            case 16:

                                this.state.hosts = hosts;

                            case 17:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Seehd;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Seehd({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Seehd',
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

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context6.abrupt('return', source.state.hosts);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x6, _x7, _x8) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = Seehd;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://seehd.uno',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (page == false) {
            return 'https://seehd.uno/?s=' + title;
        }
        return 'https://seehd.uno/page/' + page + '/?s=' + title;
    }
};

var SeehdUno = function () {
    function SeehdUno(props) {
        _classCallCheck(this, SeehdUno);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(SeehdUno, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, htmlSearch, $, page;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                _context.next = 4;
                                return httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));

                            case 4:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                page = $('#paginador .paginado ul li');


                                if (page.length <= 0) {
                                    page = 1;
                                } else {
                                    page = page.last().find('a').attr('href');
                                    page = page.match(/\/page\/([0-9]+)/i);
                                    page = page != null ? +page[1] : 1;
                                }

                                _context.next = 10;
                                return this.getDetailUrl(page, this.state);

                            case 10:
                                return _context.abrupt('return');

                            case 11:
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

                                arrPromise = arrNumber.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlSearch, $, itemSearch;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), val));

                                                    case 2:
                                                        htmlSearch = _context2.sent;
                                                        $ = cheerio.load(htmlSearch.data);
                                                        itemSearch = $('.peliculas .items .item');


                                                        itemSearch.each(function () {

                                                            var hrefMovies = $(this).find('a').attr('href');
                                                            var yearMovies = $(this).find('.fixyear .year').text();
                                                            var titleMovies = $(this).find('.fixyear h2').text();
                                                            var seasonMovies = titleMovies.match(/season *([0-9]+)/i);
                                                            var episodeMovies = titleMovies.match(/season *[0-9]+ *episode *([0-9]+)/i);
                                                            seasonMovies = seasonMovies != null ? +seasonMovies[1] : false;
                                                            episodeMovies = episodeMovies != null ? +episodeMovies[1] : false;
                                                            titleMovies = titleMovies.replace('Watch', '').replace('Online', '').replace('Free', '').trim();
                                                            titleMovies = titleMovies.replace(/\([0-9]+\)/i, '').trim();

                                                            if (seasonMovies != false && episodeMovies != false) {

                                                                titleMovies = titleMovies.replace(/\– *season.*/i, '').trim();
                                                            }

                                                            if (stringHelper.shallowCompare(title, titleMovies)) {

                                                                if (type == 'movie' && +yearMovies == year) {

                                                                    state.detailUrl = hrefMovies;
                                                                } else if (type == 'tv' && seasonMovies == season && episodeMovies == episode) {

                                                                    state.detailUrl = hrefMovies;
                                                                }
                                                            }
                                                        });

                                                        if (!(val == page)) {
                                                            _context2.next = 8;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return');

                                                    case 8:
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
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _libs3, httpRequest, cheerio, base64, hosts, detailUrl, htmlDetail, $, itemEmbed;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64;

                                if (this.state.detailUrl) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 7;
                                return httpRequest.getCloudflare(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context4.sent;
                                $ = cheerio.load(htmlDetail.data);
                                itemEmbed = $('#player2 .movieplay');


                                itemEmbed.each(function () {

                                    var script = $(this).find('script').html();
                                    var token = script.match(/str *\= *\'([^\']+)/i);
                                    token = token != null ? token[1] : false;

                                    if (token) {

                                        token = unescape(token.replace(/@/g, '%'));
                                        var linkEmbed = token.match(/src *\= *\"([^\"]+)/i);
                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                        linkEmbed !== false && hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "seehduno"
                                            },
                                            result: {
                                                file: linkEmbed,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    }
                                });

                                this.state.hosts = hosts;

                            case 12:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return SeehdUno;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var seehduno;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        seehduno = new SeehdUno({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context5.next = 3;
                        return seehduno.searchDetail();

                    case 3:
                        _context5.next = 5;
                        return seehduno.getHostFromDetail();

                    case 5:
                        return _context5.abrupt('return', seehduno.state.hosts);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = SeehdUno;
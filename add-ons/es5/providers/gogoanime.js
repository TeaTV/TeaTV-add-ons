

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.gogoanime.to',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (page != false) return 'http://www.gogoanime.to/page/' + page + '?s=' + title;
        return 'http://www.gogoanime.to/?s=' + title;
    }
};

var Gogoanime = function () {
    function Gogoanime(props) {
        _classCallCheck(this, Gogoanime);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Gogoanime, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, episode, type, detailUrl, arrPage, urlSearch, htmlSearch, $, paginate, i, arrPromise;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                arrPage = [];
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + ('+episode+' + episode));
                                _context2.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                paginate = $('.wp-pagenavi .last').attr('href');

                                paginate = paginate.match(/page\/([0-9]+)/i);
                                paginate = paginate != null ? +paginate[1] : 1;

                                for (i = 1; i <= paginate; i++) {
                                    arrPage.push(i);
                                }

                                arrPromise = arrPage.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var itemSearch;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.prev = 0;

                                                        urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + ('+episode+' + episode), val);
                                                        _context.next = 4;
                                                        return httpRequest.getHTML(urlSearch);

                                                    case 4:
                                                        htmlSearch = _context.sent;

                                                        $ = cheerio.load(htmlSearch);

                                                        itemSearch = $('.postlist');


                                                        itemSearch.each(function () {

                                                            var hrefMovie = $(this).find('a').attr('href');
                                                            var titleMovie = $(this).find('a').text();
                                                            var episodeMovie = titleMovie.match(/episode *([0-9]+)/i);
                                                            episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;
                                                            titleMovie = titleMovie.replace(/ *episode *[0-9]+/i, '').trim();

                                                            if (stringHelper.shallowCompare(titleMovie, title) && episode == episodeMovie) {
                                                                detailUrl = hrefMovie;
                                                                return;
                                                            }
                                                        });
                                                        _context.next = 12;
                                                        break;

                                                    case 10:
                                                        _context.prev = 10;
                                                        _context.t0 = _context['catch'](0);

                                                    case 12:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this, [[0, 10]]);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 16;
                                return Promise.all(arrPromise);

                            case 16:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 18:
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
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, hosts, detailUrl, htmlSearch, $, itemEmbed;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                htmlSearch = void 0;
                                $ = void 0;
                                itemEmbed = [];
                                _context3.prev = 8;
                                _context3.next = 11;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 11:
                                htmlSearch = _context3.sent;

                                $ = cheerio.load(htmlSearch);
                                itemEmbed = $('#content .postcontent iframe');
                                _context3.next = 19;
                                break;

                            case 16:
                                _context3.prev = 16;
                                _context3.t0 = _context3['catch'](8);
                                throw new Error(_context3.t0);

                            case 19:

                                itemEmbed.each(function () {

                                    var linkEmbed = $(this).attr('src');

                                    linkEmbed && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "gogoanime"
                                        },
                                        result: {
                                            file: linkEmbed,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 22:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[8, 16]]);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Gogoanime;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var gogo;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        gogo = new Gogoanime({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context4.next = 3;
                        return gogo.searchDetail();

                    case 3:
                        _context4.next = 5;
                        return gogo.getHostFromDetail();

                    case 5:
                        return _context4.abrupt('return', gogo.state.hosts);

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Gogoanime;
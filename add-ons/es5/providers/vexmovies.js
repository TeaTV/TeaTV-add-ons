

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://vexmovies.org',
    SEARCH: function SEARCH(title) {
        return 'http://vexmovies.org/?s=' + title;
    }
};

var Vexmovies = function () {
    function Vexmovies(props) {
        _classCallCheck(this, Vexmovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vexmovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 6;
                                return httpRequest.getHTML(urlSearch);

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.peliculas .item_1 .item');


                                itemSearch.each(function () {

                                    var titleMovie = $(this).find('.fixyear h2').text();
                                    var yearMovie = $(this).find('.fixyear .year').text();
                                    var hrefMovies = $(this).find('a').first().attr('href');

                                    if (stringHelper.shallowCompare(title, titleMovie) && +yearMovie == year) {

                                        detailUrl = hrefMovies;
                                        return;
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 12:
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
                var _libs2, httpRequest, cheerio, base64, hosts, detailUrl, htmlDetail, $, embed, htmlDirect, $_2, encodeJson, item, item2, link;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                embed = $('#cap1 iframe').attr('src');
                                _context2.next = 12;
                                return httpRequest.getHTML(embed);

                            case 12:
                                htmlDirect = _context2.sent;
                                $_2 = cheerio.load(htmlDirect);
                                encodeJson = $_2('#app player').attr(':title');
                                _context2.prev = 15;

                                encodeJson = JSON.parse(encodeJson);
                                _context2.next = 22;
                                break;

                            case 19:
                                _context2.prev = 19;
                                _context2.t0 = _context2['catch'](15);
                                throw new Error('NOT LINK');

                            case 22:

                                for (item in encodeJson.servers) {

                                    for (item2 in encodeJson.servers[item].sources) {

                                        if (encodeJson.servers[item].sources[item2].status == 1) {
                                            link = encodeJson.servers[item].sources[item2].src;

                                            if (link.indexOf('cloudfront') == -1 && link.indexOf('dfcdn') == -1 && link.indexOf('stream') == -1) {
                                                hosts.push({
                                                    provider: {
                                                        url: detailUrl,
                                                        name: "vexmovies"
                                                    },
                                                    result: {
                                                        file: link,
                                                        label: "embed",
                                                        type: "embed"
                                                    }
                                                });
                                            } else {
                                                hosts.push({
                                                    provider: {
                                                        url: detailUrl,
                                                        name: "vexmovies"
                                                    },
                                                    result: {
                                                        file: link,
                                                        label: "embed",
                                                        type: "direct"
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }

                                this.state.hosts = hosts;

                            case 24:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[15, 19]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Vexmovies;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var vexmovies;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        vexmovies = new Vexmovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return vexmovies.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return vexmovies.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', vexmovies.state.hosts);

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

thisSource.testing = Vexmovies;
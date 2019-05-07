

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www.mehlizmovieshd.com',
    SEARCH: function SEARCH(title, type) {

        if (type == 'movies') {
            return 'https://www.mehlizmovieshd.com/123-movies/' + title + '/';
        }
        return 'https://www.mehlizmovieshd.com/episodes/' + title + '/';
    }
};

var Mehlizmovies = function () {
    function Mehlizmovies(props) {
        _classCallCheck(this, Mehlizmovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Mehlizmovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, embedUrl, urlSearch, htmlSearch, $, itemEmbed;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                embedUrl = [];
                                urlSearch = false;


                                if (type == 'movie') {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title));
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title) + ('-season-' + season + '-episode-' + episode));
                                }
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemEmbed = $('.playex .play-box-iframe');


                                itemEmbed.each(function () {

                                    var urlEmbed = $(this).find('iframe').attr('src');
                                    embedUrl.push(urlEmbed);
                                });

                                this.state.embedUrl = embedUrl;
                                return _context.abrupt('return');

                            case 13:
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
                var _libs2, httpRequest, cheerio, base64, hosts, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (!(this.state.embedUrl.length == 0)) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrPromise = this.state.embedUrl.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var linkDirect, htmlDirect, fileMp4;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        linkDirect = [];
                                                        htmlDirect = httpRequest.getHTML(val);
                                                        fileMp4 = htmlDirect.match(/sources\: *\[([^\]]+)/i);


                                                        if (fileMp4 != null) {

                                                            eval('linkDirect = [' + fileMp4[1] + ']');
                                                        }

                                                        //console.log(linkDirect); process.exit();


                                                    case 4:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());

                                this.state.embedUrl.map();

                                this.state.hosts = hosts;

                            case 7:
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
    }]);

    return Mehlizmovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var mehlizmovies;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        mehlizmovies = new Mehlizmovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context4.next = 3;
                        return mehlizmovies.searchDetail();

                    case 3:
                        _context4.next = 5;
                        return mehlizmovies.getHostFromDetail();

                    case 5:
                        return _context4.abrupt('return', mehlizmovies.state.hosts);

                    case 6:
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

thisSource.testing = Mehlizmovies;
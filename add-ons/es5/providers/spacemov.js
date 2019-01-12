

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://spacemov.cc/",
    SEARCH: function SEARCH(title) {
        return 'https://spacemov.cc/search-query/' + title;
    },
    HEADERS: {
        'Referer': 'spacemov',
        'Accept-Language': 'vi-VN,vi;q=0.8,fr-FR;q=0.6,fr;q=0.4,en-US;q=0.2,en;q=0.2',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

var Spacemov = function () {
    function Spacemov(props) {
        _classCallCheck(this, Spacemov);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Spacemov, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, _movieInfo, title, year, season, episode, type, detailUrl, html, $, lis;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;

                                // your code here

                                html = void 0;
                                _context.next = 6;
                                return httpRequest.getHTML(URL.SEARCH(title.replace(/[ '",-]+/g, '+')), URL.HEADERS);

                            case 6:
                                html = _context.sent;
                                $ = cheerio.load(html);
                                lis = $('.movies-list-full .ml-item');


                                lis.each(function () {
                                    var titleMovie = $(this).find('.mli-info h2').text();
                                    var hrefMovie = $(this).find('a').first().attr('href');
                                    var seasonMovie = titleMovie.match(/ *season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;

                                    if (seasonMovie != false) {
                                        titleMovie = titleMovie.replace(/ - *season.*/i, '');
                                    }

                                    console.log(titleMovie, hrefMovie);

                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                        if (type == 'movie' && hrefMovie.search(year) != -1) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv' && seasonMovie == season) {

                                            detailUrl = hrefMovie;
                                        }
                                    }
                                });

                                if (detailUrl !== false) this.state.detailUrl = detailUrl + 'watching/';else this.state.detailUrl = detailUrl;
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
                var _libs2, httpRequest, cheerio, _movieInfo2, episode, type, hosts, arrRedirect, arrLinkEmbed, detailUrl, htmlDetail, $, itemServer;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                arrLinkEmbed = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 10;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 10:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                itemServer = $('.les-content a');


                                itemServer.each(function () {

                                    if (type == 'movie' || episode <= 0) {
                                        if ($(this).attr('data-drive')) hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "spacemov"
                                            },
                                            result: {
                                                file: $(this).attr('data-drive'),
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });

                                        if ($(this).attr('data-svv1')) hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "spacemov"
                                            },
                                            result: {
                                                file: $(this).attr('data-svv1'),
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    } else {
                                        var e = $(this).attr('title');
                                        var m = e.match(/([0-9]+):/);
                                        if (m != undefined && m[1] == episode) {
                                            if ($(this).attr('data-drive')) hosts.push({
                                                provider: {
                                                    url: detailUrl,
                                                    name: "spacemov"
                                                },
                                                result: {
                                                    file: $(this).attr('data-drive'),
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });

                                            if ($(this).attr('data-svv1')) hosts.push({
                                                provider: {
                                                    url: detailUrl,
                                                    name: "spacemov"
                                                },
                                                result: {
                                                    file: $(this).attr('data-svv1'),
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    }
                                });

                                this.state.hosts = hosts;

                            case 15:
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

    return Spacemov;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Spacemov({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'spacemov',
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

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context3.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = Spacemov;
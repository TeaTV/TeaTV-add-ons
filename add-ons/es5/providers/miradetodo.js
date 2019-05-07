

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://miradetodo.net',
    SEARCH: function SEARCH(title) {
        return 'https://miradetodo.net/?s=' + title;
    },
    EPISODE_URL: function EPISODE_URL(slug, season, episode) {
        return 'https://miradetodo.net/episodio/' + slug + '-' + season + 'x' + episode + '/';
    }
};

var Mirade = function () {
    function Mirade(props) {
        _classCallCheck(this, Mirade);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Mirade, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getTitle, hrefSearch, detailUrl, htmlSearch, $, itemPage;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                getTitle = this.getTitle;
                                hrefSearch = '';
                                detailUrl = false;

                                if (!(type == 'tv')) {
                                    _context2.next = 9;
                                    break;
                                }

                                detailUrl = URL.EPISODE_URL(stringHelper.convertToSearchQueryString(title, '-'), season, episode);
                                _context2.next = 16;
                                break;

                            case 9:
                                hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));

                                _context2.next = 12;
                                return httpRequest.get(hrefSearch);

                            case 12:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemPage = $('.items .item');


                                itemPage.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie, m, yearMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('a').attr('href');
                                                    titleMovie = $(this).find('.image img').attr('alt');
                                                    m = titleMovie.match(/\(([0-9]+)\)/);
                                                    yearMovie = m[1];

                                                    titleMovie = titleMovie.replace(/\s+\([0-9]+\)/g, '');
                                                    if (stringHelper.shallowCompare(title, titleMovie) && year == yearMovie) {
                                                        detailUrl = hrefMovie;
                                                    }

                                                case 6:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

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
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this = this;

                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, htmlDetail, $, iframeSrc, html, $_1, iframes, alloweds, iframePromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context4.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 9;
                                return httpRequest.getHTML(detailUrl);

                            case 9:
                                htmlDetail = _context4.sent;
                                $ = cheerio.load(htmlDetail);
                                iframeSrc = $('iframe').attr('data-lazy-src');
                                _context4.next = 14;
                                return httpRequest.getHTML(iframeSrc);

                            case 14:
                                html = _context4.sent;
                                $_1 = cheerio.load(html);
                                iframes = [];
                                alloweds = ['ol.php', 'streamango.php', 'fastplay.php', 'okru.php', 'vidozavi.php', 'cdnvi.php'];

                                $_1('ul li a').each(function () {
                                    var u = $_1(this).attr('href');
                                    u = u.replace('openload.php', 'ol.php');
                                    for (var i = 0; i < alloweds.length; i++) {
                                        if (u.indexOf(alloweds[i]) != -1) iframes.push(u);
                                    }
                                });

                                iframePromise = iframes.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                                        var htmlIframe, $_2;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.getHTML(url);

                                                    case 2:
                                                        htmlIframe = _context3.sent;
                                                        $_2 = cheerio.load(htmlIframe);

                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Miradetodo"
                                                            },
                                                            result: {
                                                                file: $_2('iframe').attr('src').trim(),
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 5:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this);
                                    }));

                                    return function (_x) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 22;
                                return Promise.all(iframePromise);

                            case 22:

                                this.state.hosts = hosts;
                                return _context4.abrupt('return');

                            case 24:
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

    return Mirade;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Mirade({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Mirade',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context5.next = 5;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 5:
                        res = _context5.sent;
                        js = void 0, hosts = [];


                        try {
                            res = res['data'];
                            if (res['status']) {
                                hosts = JSON.parse(res['hosts']);
                            }
                        } catch (err) {
                            console.log('err', err);
                        }

                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context5.next = 22;
                            break;
                        }

                        _context5.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context5.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context5.next = 17;
                            break;
                        }

                        return _context5.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context5.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 1800;
                        _context5.next = 22;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context5.abrupt('return', hosts);

                    case 25:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = Mirade;
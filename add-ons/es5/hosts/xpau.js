

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://xpau.se',
    SEARCH: function SEARCH(title) {
        return 'http://xpau.se/search.php?dayq=' + title;
    },
    HEADERS: function HEADERS(rerfer) {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'xpau.se',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
        };
    }
};

var Xpau = function () {
    function Xpau(props) {
        _classCallCheck(this, Xpau);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Xpau, [{
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
                                return httpRequest.getHTML(urlSearch, URL.HEADERS(urlSearch));

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.topic_table');


                                itemSearch.each(function () {

                                    var hrefMovie = URL.DOMAIN + '/' + $(this).find('.topic_head a').attr('href');
                                    var titleMovie = $(this).find('.topic_head a p font').text();
                                    var yearMovie = titleMovie.match(/\(([0-9]+)\)/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : 0;
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie) && yearMovie == year) {
                                        detailUrl = hrefMovie;
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
                var _libs2, httpRequest, cheerio, base64, detailUrl, hosts, htmlDetail, $, linkWait, linkSkip, linkWatch;

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
                                detailUrl = this.state.detailUrl;
                                _context2.prev = 4;
                                hosts = [];
                                _context2.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS(this.state.detailUrl));

                            case 8:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                linkWait = URL.DOMAIN + $('#playthevid').attr('href');


                                console.log('link wait', linkWait);
                                _context2.next = 14;
                                return httpRequest.getHTML(linkWait, URL.HEADERS(linkWait));

                            case 14:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkSkip = URL.DOMAIN + $('#skipper').attr('href');


                                console.log('1', linkSkip);

                                _context2.next = 20;
                                return httpRequest.getHTML(linkSkip, URL.HEADERS(linkSkip));

                            case 20:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher3').attr('src');


                                console.log('2', linkWatch);

                                _context2.next = 26;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 26:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher4').attr('src');

                                console.log('3', linkWatch);

                                _context2.next = 32;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 32:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher5').attr('src');

                                console.log('4', linkWatch);

                                _context2.next = 38;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 38:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher6').attr('src');

                                console.log('5', linkWatch);

                                _context2.next = 44;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 44:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher7').attr('src');

                                console.log('6', linkWatch);

                                _context2.next = 50;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 50:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher8').attr('src');

                                console.log('7', linkWatch);

                                _context2.next = 56;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 56:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher9').attr('src');

                                console.log('8', linkWatch);

                                _context2.next = 62;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 62:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = URL.DOMAIN + $('#iwatcher10').attr('src');

                                console.log('9', linkWatch);

                                _context2.next = 68;
                                return httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));

                            case 68:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);
                                linkWatch = $('#iwatcher11').attr('src');

                                console.log('10', linkWatch);

                                linkWatch && hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "xpau"
                                    },
                                    result: {
                                        file: linkWatch,
                                        label: "embed",
                                        type: "embed"
                                    }
                                });

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 77:
                                _context2.prev = 77;
                                _context2.t0 = _context2['catch'](4);
                                throw new Error(_context2.t0);

                            case 80:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 77]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Xpau;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var xpau;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        xpau = new Xpau({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return xpau.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return xpau.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', xpau.state.hosts);

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

thisSource.testing = Xpau;
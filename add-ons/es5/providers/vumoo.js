

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://vumoo.to',
    DOMAIN_CDN: 'http://cdn.123moviesapp.net',
    SEARCH: function SEARCH(title, t) {
        return 'http://vumoo.to/search?t=' + t + '&q=' + title;
    },
    SEARCH_JS: 'http://vumoo.to/javascripts/vumoo-v1.0.0.min.js'
};

var Vumoo = function () {
    function Vumoo(props) {
        _classCallCheck(this, Vumoo);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vumoo, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getJs, match, t, detailUrl, urlSearch, jsonSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                throw new Error('no link');

                            case 5:
                                getJs = _context.sent;
                                match = getJs.data.match(/search\?t=([^"]+)/);

                                if (!(match[1] == undefined)) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 9:
                                t = match[1];
                                detailUrl = false;
                                urlSearch = URL.SEARCH(encodeURI(title), t);
                                _context.next = 14;
                                return httpRequest.get(urlSearch);

                            case 14:
                                jsonSearch = _context.sent;

                                jsonSearch = jsonSearch.data;

                                if (jsonSearch.suggestions) {
                                    _context.next = 18;
                                    break;
                                }

                                throw new Error('NOT SEARCH VUMOO');

                            case 18:

                                jsonSearch.suggestions.forEach(function (val) {

                                    var hrefMovie = URL.DOMAIN + val.data.href;
                                    var typeMovie = val.data.type;
                                    var titleMovie = val.value;
                                    var yearMovie = titleMovie.match(/\(([0-9]+)\)/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : 0;
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();
                                    var seasonMovie = titleMovie.match(/ *season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;

                                    if (seasonMovie != false) {
                                        titleMovie = titleMovie.replace(/ *season.*/i, '');
                                    }

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (typeMovie == 'movies' && type == 'movie' && yearMovie == year) {

                                            detailUrl = hrefMovie;
                                        } else if (typeMovie == 'tv-series' && type == 'tv' && seasonMovie == season) {

                                            detailUrl = hrefMovie;
                                        }
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _libs2, httpRequest, cheerio, base64, cryptoJs, _movieInfo2, episode, type, hosts, arrRedirect, arrLinkEmbed, detailUrl, htmlDetail, $, itemServer, arrPromise, arrPromiseEmbed;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, cryptoJs = _libs2.cryptoJs;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context4.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                arrLinkEmbed = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 10;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 10:
                                htmlDetail = _context4.sent;
                                $ = cheerio.load(htmlDetail);
                                itemServer = $('.tab-content .tab-pane ul li');


                                itemServer.each(function () {

                                    var episodeMovie = $(this).find('a').text();
                                    episodeMovie = episodeMovie.match(/s[0-9]+e([0-9]+)/i);
                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                    var linkRedirect = $(this).find('a').attr('embedurl');

                                    if (type == 'movie') {
                                        arrRedirect.push(linkRedirect);
                                    } else if (episodeMovie == episode) {
                                        arrRedirect.push(linkRedirect);
                                    }
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlRedirect, token, linkEmbed, item;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        console.log(val);
                                                        _context2.next = 3;
                                                        return httpRequest.getHTML(val, { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36', 'referer': detailUrl });

                                                    case 3:
                                                        htmlRedirect = _context2.sent;
                                                        token = htmlRedirect.match(/embedVal\=\"([^\"]+)/i);

                                                        token = token != null ? token[1] : false;

                                                        if (token != false) {
                                                            linkEmbed = cryptoJs.AES.decrypt(token, 'iso10126').toString(cryptoJs.enc.Utf8);

                                                            try {

                                                                linkEmbed = JSON.parse(linkEmbed);

                                                                for (item in linkEmbed.videos) {

                                                                    arrLinkEmbed.push(linkEmbed.videos[item].url);
                                                                }
                                                            } catch (error) {}
                                                        }

                                                    case 7:
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
                                _context4.next = 17;
                                return Promise.all(arrPromise);

                            case 17:
                                arrPromiseEmbed = arrLinkEmbed.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var urlDirect, linkDirect, item;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        if (!(val.indexOf('http:') == -1 && val.indexOf('https:') == -1)) {
                                                            _context3.next = 9;
                                                            break;
                                                        }

                                                        urlDirect = URL.DOMAIN_CDN + val;
                                                        _context3.next = 4;
                                                        return httpRequest.get(urlDirect, { 'User-agent': 'Firefox 59' });

                                                    case 4:
                                                        linkDirect = _context3.sent;

                                                        linkDirect = linkDirect.data;

                                                        for (item in linkDirect) {

                                                            linkDirect[item].file && hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "vumoo"
                                                                },
                                                                result: {
                                                                    file: linkDirect[item].file,
                                                                    label: "embed",
                                                                    type: "direct"
                                                                }
                                                            });
                                                        }
                                                        _context3.next = 10;
                                                        break;

                                                    case 9:
                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "vumoo"
                                                            },
                                                            result: {
                                                                file: val,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 10:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this);
                                    }));

                                    return function (_x2) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 20;
                                return Promise.all(arrPromiseEmbed);

                            case 20:

                                this.state.hosts = hosts;
                                return _context4.abrupt('return');

                            case 22:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Vumoo;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vumoo({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Vumoo',
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

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context5.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = Vumoo;
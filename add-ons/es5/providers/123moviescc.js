

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://123movie.cc/",
    SEARCH: function SEARCH(title, nonce) {
        return 'https://123movie.cc/wp-json/dooplay/search/?keyword=' + title + '&nonce=' + nonce;
    },
    DOMAIN_DECODE: 'https://gomostream.com/decoding_v3.php',
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var s123MoviesCc = function () {
    function s123MoviesCc(props) {
        _classCallCheck(this, s123MoviesCc);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(s123MoviesCc, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, htmlHome, dtGonza, urlSearch, jsonSearch, item, yearMovie, titleMovie, hrefMovie, titleMovieFull, m;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                _context.next = 6;
                                return httpRequest.getHTML(URL.DOMAIN);

                            case 6:
                                htmlHome = _context.sent;
                                dtGonza = htmlHome.match(/var *dtGonza *\= *([^\}]+)/i);

                                dtGonza = dtGonza != null ? dtGonza[1] + '}' : false;

                                if (dtGonza) {
                                    _context.next = 11;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 11:

                                eval('dtGonza = ' + dtGonza);

                                dtGonza = dtGonza.nonce;

                                urlSearch = URL.SEARCH(encodeURI(title), dtGonza);
                                _context.next = 16;
                                return httpRequest.getHTML(urlSearch);

                            case 16:
                                jsonSearch = _context.sent;

                                jsonSearch = JSON.parse(jsonSearch);

                                for (item in jsonSearch) {
                                    yearMovie = jsonSearch[item].extra.date;
                                    titleMovie = jsonSearch[item].title;
                                    hrefMovie = jsonSearch[item].url;
                                    titleMovieFull = titleMovie.replace(/:?\s+Season\s+[0-9]+/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovieFull)) {
                                        if (type == 'movie' && +yearMovie == year) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv') {
                                            m = titleMovie.match(/:?\s+Season\s+([0-9])+/i);

                                            if (m != undefined && m[1] == season) {
                                                detailUrl = hrefMovie;
                                            }
                                        }
                                    }
                                }

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, servers, sources, sourcesPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                servers = $('.episodios li');
                                sources = [];

                                servers.each(function () {
                                    var onclick = '';
                                    if (type == 'tv') onclick = $(this).find('button').attr('onclick');else onclick = $(this).find('a').attr('onclick');

                                    var seasonEpisode = $(this).find('.numerando').text();
                                    seasonEpisode = isNaN(seasonEpisode) ? 0 : seasonEpisode;
                                    if (seasonEpisode == episode) {
                                        var m = onclick.match(/'([^']+)/);
                                        if (m != undefined) sources.push(m[1]);
                                    }
                                });

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        var html, $_1, iframe, data;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(link, URL.HEADERS(detailUrl));

                                                    case 2:
                                                        html = _context2.sent;
                                                        $_1 = cheerio.load(html);
                                                        iframe = $_1('iframe').attr('src');

                                                        if (!(iframe != undefined)) {
                                                            _context2.next = 11;
                                                            break;
                                                        }

                                                        _context2.next = 8;
                                                        return httpRequest.getRedirectUrl(iframe, URL.HEADERS(detailUrl));

                                                    case 8:
                                                        data = _context2.sent;

                                                        if (data.search('openload.co/') != -1) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "123moviecc"
                                                                },
                                                                result: {
                                                                    file: data,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }
                                                        if (data.search('rapidvideo.com/') != -1) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "123moviecc"
                                                                },
                                                                result: {
                                                                    file: data,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 11:
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
                                _context3.next = 16;
                                return Promise.all(sourcesPromise);

                            case 16:

                                this.state.hosts = hosts;

                            case 17:
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

    return s123MoviesCc;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new s123MoviesCc({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: '123Moviesto',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context4.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context4.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context4.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = s123MoviesCc;
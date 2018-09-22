

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://scr.cr",
    SEARCH: function SEARCH(title) {
        return 'https://scr.cr/search.php?query=' + title;
    },
    GET_SOURCE: function GET_SOURCE(eid) {
        return 'https://ajax.embed.is/heartbypass/get-source.php?eid=' + eid + '&hmac=646679318296d72f5285f7cc3e6a6b8c%2F9c2Jt8%3D';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var Screamcr = function () {
    function Screamcr(props) {
        _classCallCheck(this, Screamcr);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Screamcr, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, urlSearch, html, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS(URL.DOMAIN));

                            case 7:
                                html = _context.sent;
                                $ = cheerio.load(html);


                                $('.main-content #top-hot a').each(function () {

                                    var titleMovie = $(this).attr('oldtitle');
                                    var hrefMovie = $(this).attr('href');

                                    var titleMovieFull = titleMovie.replace(/ -?\s+Season\s+[0-9]+/i, '').trim();
                                    if (stringHelper.shallowCompare(title, titleMovieFull)) {
                                        if (type == 'movie') {
                                            detailUrl = URL.DOMAIN + hrefMovie;
                                        } else if (type == 'tv') {
                                            var m = titleMovie.match(/Season\s+([0-9])+/i);
                                            if (m != undefined && m[1] == season) {
                                                detailUrl = URL.DOMAIN + hrefMovie;
                                            }
                                        }
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, eid, sources, jsonSources, arrPromise;

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
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS(detailUrl));

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                eid = false;

                                $('.wpb-content .wpbc-server .ulclear a').each(function () {
                                    if (type == 'movie') eid = $(this).attr('data-eid');else {
                                        var ename = $(this).text();
                                        var m = ename.match(/Episode ([0-9]+):/i);
                                        if (m != undefined) {
                                            var seasonEpisode = +m[1] + 0;

                                            if (seasonEpisode == episode) {
                                                eid = $(this).attr('data-eid');
                                            }
                                        }
                                    }
                                });

                                if (eid) {
                                    _context3.next = 14;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 14:
                                _context3.next = 16;
                                return httpRequest.getHTML(URL.GET_SOURCE(eid), URL.HEADERS(detailUrl));

                            case 16:
                                sources = _context3.sent;
                                jsonSources = JSON.parse(sources);
                                arrPromise = jsonSources['sources'].map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var domain;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        domain = val['file'].split('/')[2];
                                                        //console.log(domain);

                                                        if (['ca3.watchasap.ru', 'embedis.azureedge.net'].includes(domain)) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "scream"
                                                                },
                                                                result: {
                                                                    file: val['file'],
                                                                    label: "embed",
                                                                    type: "direct"
                                                                }
                                                            });
                                                        }

                                                    case 2:
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
                                _context3.next = 21;
                                return Promise.all(arrPromise);

                            case 21:

                                this.state.hosts = hosts;

                            case 22:
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

    return Screamcr;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Screamcr({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'scream',
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

thisSource.testing = Screamcr;
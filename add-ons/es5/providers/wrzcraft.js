

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {

    DOMAIN: "http://wrzcraft.life",
    SEARCH: function SEARCH(title) {
        return 'http://wrzcraft.life?s=' + title;
    },
    HEADERS: function HEADERS(time) {
        return {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_' + time + ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': 'http://wrzcraft.life/' + Math.round(+new Date())
        };
    },
    BING_SEARCH: function BING_SEARCH(title) {
        return 'https://www.bing.com/search?q=site%3Awww.ddlvalley.me+' + title;
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var firstChar = function firstChar(str, separator) {
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join(separator);

    return acronym;
};

var Wrzcraft = function () {
    function Wrzcraft(props) {
        _classCallCheck(this, Wrzcraft);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Wrzcraft, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, qs, _movieInfo, title, year, season, episode, type, realdebrid, detailUrl, tvshowVideo, urlSearch, ep, ss, htmlSearch, $, itemSearch, urls, find;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, realdebrid = _movieInfo.realdebrid;

                                if (!(realdebrid == undefined)) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error("NO REAL DEBITCH HIHI");

                            case 4:
                                detailUrl = false;
                                tvshowVideo = false;
                                urlSearch = '';
                                ep = void 0, ss = void 0;


                                if (type == 'tv') {
                                    ss = season < 10 ? '0' + season : season;
                                    ep = episode < 10 ? '0' + episode : episode;
                                    urlSearch = URL.BING_SEARCH(encodeURI(title + "+s" + ss + 'e' + ep));
                                } else {
                                    urlSearch = URL.BING_SEARCH(encodeURI(title));
                                }

                                urlSearch = URL.SEARCH(title);

                                _context.next = 12;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS());

                            case 12:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#posts .post .posttitle');
                                urls = [];
                                find = void 0;

                                if (type == 'tv') find = title.replace(/[\s':"]+/g, '-').toLowerCase() + "-s" + ss + 'e' + ep;else find = title.replace(/[\s':"]+/g, '-').toLowerCase() + '-' + year;

                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('h2 a').attr('href');
                                    if (hrefMovie.indexOf(find) != -1 && urls.length < 3) urls.push(hrefMovie);
                                });

                                this.state.detailUrl = urls;
                                //console.log(urls);
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
                var _libs2, httpRequest, cheerio, base64, _, _movieInfo2, title, year, season, episode, type, detailUrl, arr_lk, urls, hosts, supported, detailPromises, i, u, ulower, tlower, finds, f;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, _ = _libs2._;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                detailUrl = this.state.detailUrl;

                                if (!(detailUrl.length == 0)) {
                                    _context3.next = 7;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 7:
                                arr_lk = [];
                                urls = [];
                                hosts = [];
                                supported = ['rapidgator.net', 'ul.to', 'nitroflare.com'];
                                detailPromises = detailUrl.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        var dataSearch, hrefs, i, u, domain;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:

                                                        console.log(link, 'link');
                                                        _context2.next = 3;
                                                        return httpRequest.getHTML(link, URL.HEADERS());

                                                    case 3:
                                                        dataSearch = _context2.sent;
                                                        hrefs = dataSearch.match(/href="([^"]+)/g);

                                                        for (i = 0; i < hrefs.length; i++) {
                                                            u = hrefs[i].split('"');

                                                            if (u != null) {
                                                                u = u[1];
                                                                domain = getDomain(u);

                                                                if (supported.includes(domain)) urls.push(u);
                                                            }
                                                        }

                                                    case 6:
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
                                _context3.next = 14;
                                return Promise.all(detailPromises);

                            case 14:

                                for (i = 0; i < urls.length; i++) {
                                    u = urls[i];
                                    ulower = u.toLowerCase();
                                    tlower = title.toLowerCase();
                                    finds = [tlower.replace(/[\s:'"]+/ig, '.'), tlower.replace(/[\s:'"]+/ig, '-'), tlower.replace(/[\s:'"]+/ig, '_'), firstChar(tlower, '.'), firstChar(tlower, '_'), firstChar(tlower, '-')];

                                    for (f in finds) {
                                        if (ulower.indexOf('part') == -1) {
                                            if (hosts.length < 15 && (ulower.indexOf('mp4') != -1 || ulower.indexOf('mkv') != -1)) hosts.push({
                                                provider: {
                                                    url: u,
                                                    name: "Wrzcraft"
                                                },
                                                result: {
                                                    file: u,
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    }
                                }

                                this.state.hosts = hosts;

                            case 16:
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

    return Wrzcraft;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Wrzcraft({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Wrzcraft',
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

thisSource.testing = Wrzcraft;
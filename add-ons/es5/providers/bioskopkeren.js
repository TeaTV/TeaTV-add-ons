

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://bioskopkeren.vip/",
    SEARCH: function SEARCH(title) {
        return 'https://bioskopkeren.vip/?s=' + title;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'User-Agent': 'Firefox 59',
            'Referer': referer
        };
    }
};

function fuckfuck(p, a, c, k, e, d) {
    e = function e(c) {
        return c;
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[c] = k[c] || c;
        }
        k = [function (e) {
            return d[e];
        }];
        e = function e() {
            return '\\w+';
        };
        c = 1;
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
        }
    }
    return p;
}

var KZMovies = function () {
    function KZMovies(props) {
        _classCallCheck(this, KZMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(KZMovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, searchUrl, searchHtml, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                searchUrl = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 6;
                                return httpRequest.getHTML(searchUrl);

                            case 6:
                                searchHtml = _context.sent;
                                $ = cheerio.load(searchHtml);

                                $('.filmcontent .moviefilm').each(function () {
                                    var href = $(this).find('a').attr('href');
                                    var find = '';
                                    if (type == 'movie') find = stringHelper.convertToSearchQueryString(title) + '-' + year;else find = stringHelper.convertToSearchQueryString(title) + '-season-' + season + '/';

                                    if (href.indexOf(find) != -1) detailUrl = href;
                                });

                                this.state.detailUrl = detailUrl;

                            case 10:
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, type, episode, detailUrl, htmlDetail, hosts, $, ifUrl, ifHtml, m, a, b, ff, reg;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                detailUrl = this.state.detailUrl;

                                if (type == 'tv') detailUrl = detailUrl + episode;
                                _context2.next = 8;
                                return httpRequest.getHTML(detailUrl);

                            case 8:
                                htmlDetail = _context2.sent;
                                hosts = [];
                                $ = cheerio.load(htmlDetail);
                                ifUrl = $('iframe').attr('src');
                                _context2.next = 14;
                                return httpRequest.getHTML(ifUrl, {
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                                    'referer': detailUrl
                                });

                            case 14:
                                ifHtml = _context2.sent;
                                m = ifHtml.match(/unescape\("([^"]+)/);
                                a = void 0;
                                b = 'a = unescape("' + m[1] + '")';

                                eval(b);

                                m = a.split('eval(')[1];
                                m = m.split('</script>')[0];
                                m = 'eval(' + m;

                                ff = m.split('return p}')[1];

                                ff = 'a = fuckfuck' + ff.split('{}))')[0] + '{})';
                                eval(ff);
                                reg = /file":\s?"([^"]+)/g;

                                while (m = reg.exec(a)) {
                                    hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "KZMovies"
                                        },
                                        result: {
                                            file: m[1],
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }

                                this.state.hosts = hosts;

                            case 28:
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

    return KZMovies;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new KZMovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'KZMovies',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context3.next = 5;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 5:
                        res = _context3.sent;
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

                        hosts = [];

                        if (!(hosts.length == 0)) {
                            _context3.next = 23;
                            break;
                        }

                        _context3.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context3.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context3.next = 18;
                            break;
                        }

                        return _context3.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context3.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 3600;
                        _context3.next = 23;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context3.abrupt('return', hosts);

                    case 25:
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

thisSource.testing = KZMovies;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://2ddl.vg/',
    SEARCH: function SEARCH(title) {
        return 'https://2ddl.vg/?s=' + title;
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

var Twoddlnet = function () {
    function Twoddlnet(props) {
        _classCallCheck(this, Twoddlnet);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Twoddlnet, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, realdebrid, detailUrl, title1, urlSearch, searchHtml, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, realdebrid = _movieInfo.realdebrid;

                                if (!(realdebrid == undefined)) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error("NO REAL DEBITCH HIHI");

                            case 4:
                                detailUrl = [];
                                title1 = title;

                                if (type == 'tv') {
                                    if (season < 10) season = '0' + season;
                                    if (episode < 10) episode = '0' + episode;
                                    title1 = title1 + '+s' + season + 'e' + episode;
                                }

                                urlSearch = URL.SEARCH(title1);
                                _context.next = 10;
                                return httpRequest.getHTML(urlSearch);

                            case 10:
                                searchHtml = _context.sent;
                                $ = cheerio.load(searchHtml);

                                $('.container .row .postpage_movie').each(function () {
                                    var t = stringHelper.convertToSearchQueryString(title).toLowerCase();
                                    var u = $(this).find('a').first().attr('href');

                                    if (type == 'movie' && u.indexOf(t + '-' + year) != -1) detailUrl.push(u);

                                    if (type == 'tv' && u.indexOf(t) != -1 && u.indexOf('s' + season + 'e' + episode) != -1) detailUrl.push(u);
                                });

                                this.state.detailUrl = detailUrl;

                                if (!(detailUrl.length == 0)) {
                                    _context.next = 16;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 16:
                                return _context.abrupt('return');

                            case 17:
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
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(link);

                                                    case 2:
                                                        dataSearch = _context2.sent;
                                                        hrefs = dataSearch.match(/href="?([^("?\s?)]+)/g);
                                                        i = 0;

                                                    case 5:
                                                        if (!(i < hrefs.length)) {
                                                            _context2.next = 25;
                                                            break;
                                                        }

                                                        u = hrefs[i].split('"');

                                                        if (u == undefined) u = hrefs[i].split('=');

                                                        if (!(u != null && u != undefined)) {
                                                            _context2.next = 22;
                                                            break;
                                                        }

                                                        if (u.length == 2) u = u[1].replace(/href="?/, "");else u = u[0].replace(/href="?/, "");

                                                        if (!(u == undefined || u.length < 70)) {
                                                            _context2.next = 12;
                                                            break;
                                                        }

                                                        return _context2.abrupt('continue', 22);

                                                    case 12:
                                                        if (!(u.indexOf('part') != -1)) {
                                                            _context2.next = 14;
                                                            break;
                                                        }

                                                        return _context2.abrupt('continue', 22);

                                                    case 14:
                                                        if (!(u.indexOf('sample') != -1)) {
                                                            _context2.next = 16;
                                                            break;
                                                        }

                                                        return _context2.abrupt('continue', 22);

                                                    case 16:
                                                        if (!(u.indexOf('.rar') != -1)) {
                                                            _context2.next = 18;
                                                            break;
                                                        }

                                                        return _context2.abrupt('continue', 22);

                                                    case 18:
                                                        if (!(u.indexOf('.mp4') == -1 && u.indexOf('.avi') == -1 && u.indexOf('.mkv') == -1)) {
                                                            _context2.next = 20;
                                                            break;
                                                        }

                                                        return _context2.abrupt('continue', 22);

                                                    case 20:
                                                        domain = getDomain(u);

                                                        if (supported.includes(domain)) urls.push(u);

                                                    case 22:
                                                        i++;
                                                        _context2.next = 5;
                                                        break;

                                                    case 25:
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
                                _context3.next = 12;
                                return Promise.all(detailPromises);

                            case 12:

                                for (i = 0; i < urls.length; i++) {
                                    u = urls[i];
                                    ulower = u.toLowerCase();
                                    tlower = title.toLowerCase();
                                    finds = [tlower.replace(/[\s:'"]+/ig, '.'), tlower.replace(/[\s:'"]+/ig, '-'), tlower.replace(/[\s:'"]+/ig, '_'), firstChar(tlower, '.'), firstChar(tlower, '_'), firstChar(tlower, '-'), firstChar(tlower, '') + '.' + year];

                                    for (f in finds) {
                                        if (ulower.indexOf(finds[f].toLowerCase()) != -1 && ulower.indexOf('part') == -1) {
                                            if (hosts.length < 15 && (ulower.indexOf('mp4') != -1 || ulower.indexOf('mkv') != -1)) hosts.push({
                                                provider: {
                                                    url: u,
                                                    name: "Twoddlnet"
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

                            case 14:
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

    return Twoddlnet;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Twoddlnet({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Twoddlnet',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 5;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 5:
                        res = _context4.sent;
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
                            _context4.next = 22;
                            break;
                        }

                        _context4.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context4.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 17;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context4.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context4.next = 22;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context4.abrupt('return', hosts);

                    case 24:
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

thisSource.testing = Twoddlnet;
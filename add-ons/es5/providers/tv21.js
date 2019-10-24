

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://tv21.biz/",
    SEARCH: function SEARCH(title, year) {
        return 'https://tv21.biz/' + title + '-' + year + '/';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'User-Agent': 'Firefox 59',
            'Referer': referer
        };
    }
};

function base64_decode(w) {
    var m,
        b,
        z,
        k,
        x,
        q,
        A,
        y,
        v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        s = 0,
        j = 0,
        u = "",
        p = [];if (!w) {
        return w;
    }w += "";do {
        k = v.indexOf(w.charAt(s++)), x = v.indexOf(w.charAt(s++)), q = v.indexOf(w.charAt(s++)), A = v.indexOf(w.charAt(s++)), y = k << 18 | x << 12 | q << 6 | A, m = y >> 16 & 255, b = y >> 8 & 255, z = 255 & y, 64 == q ? p[j++] = String.fromCharCode(m) : 64 == A ? p[j++] = String.fromCharCode(m, b) : p[j++] = String.fromCharCode(m, b, z);
    } while (s < w.length);return u = p.join(""), decodeURIComponent(escape(u.replace(/\0+$/, "")));
}

var Tv21 = function () {
    function Tv21(props) {
        _classCallCheck(this, Tv21);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Tv21, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                this.state.detailUrl = URL.SEARCH(stringHelper.convertToSearchQueryString(title), year);

                            case 3:
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
                var _this = this;

                var _libs2, httpRequest, cheerio, qs, type, detailUrl, htmlDetail, hosts, nexts, $, nextPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                type = this.movieInfo.type;
                                detailUrl = this.state.detailUrl;
                                _context4.next = 7;
                                return httpRequest.getHTML(detailUrl);

                            case 7:
                                htmlDetail = _context4.sent;
                                hosts = [];
                                nexts = [];
                                $ = cheerio.load(htmlDetail);

                                $('.gmr-download-list li').each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    var title;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    title = $(this).find('a').text().toLowerCase();

                                                    if (!(title.indexOf('subtitle') != -1)) {
                                                        _context2.next = 3;
                                                        break;
                                                    }

                                                    return _context2.abrupt('return');

                                                case 3:
                                                    nexts.push($(this).find('a').attr('href'));

                                                case 4:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, this);
                                })));

                                nextPromise = nexts.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                                        var h, $_1, next, hash, posts, m, postHTML;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.getHTML(url);

                                                    case 2:
                                                        h = _context3.sent;
                                                        $_1 = cheerio.load(h);
                                                        next = $_1('form').attr('action');
                                                        hash = $_1('[name=d]').attr('value');
                                                        posts = {
                                                            d: hash
                                                        };
                                                        m = void 0;
                                                        _context3.prev = 8;
                                                        _context3.next = 11;
                                                        return httpRequest.post(next, {}, posts);

                                                    case 11:
                                                        postHTML = _context3.sent;

                                                        m = postHTML.data.match(/base64_decode\("([^"]+)/);
                                                        _context3.next = 17;
                                                        break;

                                                    case 15:
                                                        _context3.prev = 15;
                                                        _context3.t0 = _context3['catch'](8);

                                                    case 17:

                                                        if (m != undefined) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "Tv21"
                                                                },
                                                                result: {
                                                                    file: base64_decode(m[1]),
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 18:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this, [[8, 15]]);
                                    }));

                                    return function (_x) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 15;
                                return Promise.all(nextPromise);

                            case 15:

                                this.state.hosts = hosts;

                            case 16:
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

    return Tv21;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, hosts;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Tv21({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Tv21',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };

                        /*
                        let res = await httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);
                        let js, hosts = [];
                         try {
                            res = res['data'];
                            if(res['status']) {
                                hosts = JSON.parse(res['hosts']);
                            }
                        } catch(err) {
                            console.log('err', err);
                        }
                        */

                        hosts = [];


                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context5.next = 14;
                            break;
                        }

                        _context5.next = 8;
                        return source.searchDetail();

                    case 8:
                        _context5.next = 10;
                        return source.getHostFromDetail();

                    case 10:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context5.next = 13;
                            break;
                        }

                        return _context5.abrupt('return', hosts);

                    case 13:

                        if (hosts.length > 0) {
                            bodyPost['hosts'] = JSON.stringify(hosts);
                            bodyPost['expired'] = 86400;
                            //await httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);
                        }

                    case 14:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context5.abrupt('return', hosts);

                    case 16:
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

thisSource.testing = Tv21;
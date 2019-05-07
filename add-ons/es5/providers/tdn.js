

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://qwerty.teatv.net/",
    SEARCH: function SEARCH(title, nonce) {
        return 'https://qwerty.teatv.net/api/gp';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        };
    }
};

var Tdn = function () {
    function Tdn(props) {
        _classCallCheck(this, Tdn);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Tdn, [{
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


                                this.state.detailUrl = URL.SEARCH();
                                return _context.abrupt('return');

                            case 4:
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
                var _libs2, httpRequest, cheerio, qs, cryptoJs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, ss, ep, sign, posts, res, i, l, h, m, j, u;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, cryptoJs = _libs2.cryptoJs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:

                                if (type == 'movie') {
                                    season = 0;episode = 0;
                                }

                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                ss = season;
                                ep = episode;
                                sign = cryptoJs.MD5(title.toLowerCase() + ss.toString() + "aloha" + ep.toString()).toString();
                                posts = {
                                    'name': title,
                                    'ss': type == 'tv' ? season : 0,
                                    'ep': type == 'tv' ? episode : 0,
                                    'hash': sign,
                                    'year': type == 'movie' ? year : 0
                                };


                                if (type == 'movie') posts.year = year;

                                _context2.next = 14;
                                return httpRequest.post(this.state.detailUrl, URL.HEADERS(), posts);

                            case 14:
                                res = _context2.sent;

                                if (!(res.data.status && res.data.links.length > 0)) {
                                    _context2.next = 31;
                                    break;
                                }

                                _context2.t0 = regeneratorRuntime.keys(res.data.links);

                            case 17:
                                if ((_context2.t1 = _context2.t0()).done) {
                                    _context2.next = 31;
                                    break;
                                }

                                i = _context2.t1.value;
                                l = res.data.links[i].link;
                                _context2.next = 22;
                                return httpRequest.getHTML(l, URL.HEADERS());

                            case 22:
                                h = _context2.sent;

                                h = h.split('data:function(){return ')[1];
                                h = h.split('}});</script>')[0];
                                h = JSON.parse(h);
                                h = JSON.stringify(h[11]).replace(/%3D/g, '=').replace(/%3A/g, ':').replace(/%2F/g, '/');
                                m = h.match(/url=([^&]+)/g);

                                for (j = 0; j < m.length; j++) {
                                    u = m[j].split('url=')[1];

                                    hosts.push({
                                        provider: {
                                            url: 'https://themoviedb.org',
                                            name: "tdn"
                                        },
                                        result: {
                                            file: u,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }
                                _context2.next = 17;
                                break;

                            case 31:

                                this.state.hosts = hosts;

                            case 32:
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

    return Tdn;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Tdn({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Tdn',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context3.next = 6;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 6:
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
                        bodyPost['expired'] = 14400;
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

thisSource.testing = Tdn;
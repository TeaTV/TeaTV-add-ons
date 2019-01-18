

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://ymovies.tv",
    SEARCH: 'https://ymovies.tv/wp-admin/admin-ajax.php',
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Yifytv = function () {
    function Yifytv(props) {
        _classCallCheck(this, Yifytv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Yifytv, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, dataBody, resultSearch, posts;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                dataBody = {
                                    action: 'noprivate_ajaxsearch',
                                    sf_value: title
                                };
                                _context.next = 5;
                                return httpRequest.post(URL.SEARCH, {}, dataBody);

                            case 5:
                                resultSearch = _context.sent;

                                if (!(resultSearch.data == null)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 8:
                                posts = resultSearch.data['post']['all'];

                                posts.forEach(function (item) {
                                    if (stringHelper.shallowCompare(item.title, title)) {
                                        if (item.year == year) {
                                            _this.state.detailUrl = URL.DOMAIN + item.link + 'watching';
                                        }
                                    }
                                });

                                console.log(this.state.detailUrl);

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
                var _this2 = this;

                var _libs2, httpRequest, cheerio, qs, hosts, type, htmlDetail, m1, parametros, window, e, sources, sourcesPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                // console.log(this.state.detailUrl);

                                hosts = [];
                                type = this.movieInfo.type;
                                _context3.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS);

                            case 7:
                                htmlDetail = _context3.sent;
                                m1 = htmlDetail.split('});');

                                m1 = m1[4].split('</script>')[0];
                                m1 = m1.trim();

                                parametros = void 0;
                                window = {};

                                try {
                                    eval(m1);
                                } catch (e) {
                                    console.log(e);
                                }

                                e = window.parametros;
                                sources = e.split("&");
                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        var s, flag, data, url, type, posts, rp, vd;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (link) {
                                                            _context2.next = 2;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 2:
                                                        s = link.split('=');
                                                        flag = s[0];
                                                        data = s[1];
                                                        url = void 0;
                                                        type = 'embed';

                                                        if (!(s == 'lox')) {
                                                            _context2.next = 11;
                                                            break;
                                                        }

                                                        url = 'https://vidlox.tv/embed-' + data;
                                                        _context2.next = 29;
                                                        break;

                                                    case 11:
                                                        if (!(flag == 'emb' && ['openload.co', 'streamango.com'].includes(getDomain(data)))) {
                                                            _context2.next = 15;
                                                            break;
                                                        }

                                                        url = data;
                                                        _context2.next = 29;
                                                        break;

                                                    case 15:
                                                        if (!(flag == 'rpd')) {
                                                            _context2.next = 19;
                                                            break;
                                                        }

                                                        url = 'https://www.rapidvideo.com/v/' + data;
                                                        _context2.next = 29;
                                                        break;

                                                    case 19:
                                                        if (!(flag == 'pic')) {
                                                            _context2.next = 29;
                                                            break;
                                                        }

                                                        posts = {
                                                            top: 0,
                                                            fv: 0,
                                                            url: data,
                                                            sou: 'pic'
                                                        };
                                                        _context2.next = 23;
                                                        return httpRequest.post('https://ymovies.tv/playerlite/pk/pk/plugins/player_p2.php', URL.HEADERS, posts);

                                                    case 23:
                                                        rp = _context2.sent;
                                                        vd = rp.data[1];

                                                        if (!(vd == undefined)) {
                                                            _context2.next = 27;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 27:
                                                        url = vd['url'];
                                                        type = 'direct';

                                                    case 29:
                                                        if (!(url == undefined)) {
                                                            _context2.next = 31;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 31:

                                                        hosts.push({
                                                            provider: {
                                                                url: _this2.state.detailUrl,
                                                                name: "Yitivi"
                                                            },
                                                            result: {
                                                                file: url,
                                                                label: "embed",
                                                                type: type
                                                            }
                                                        });

                                                    case 32:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this2);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 19;
                                return Promise.all(sourcesPromise);

                            case 19:

                                this.state.hosts = hosts;

                            case 20:
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
    }, {
        key: 'isEmbed',
        value: function isEmbed(link) {

            if (link.indexOf('statics2.vidcdn.pro') != -1) {
                return false;
            } else if (link.indexOf('stream2.m4ukido.com') != -1) {
                return false;
            }

            return true;
        }
    }]);

    return Yifytv;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Yifytv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Yitivi',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context4.next = 5;
                        return httpRequest.post('https://vtt.teatv.net/source/get', {}, bodyPost);

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

                        if (!(hosts.length == 0)) {
                            _context4.next = 19;
                            break;
                        }

                        _context4.next = 11;
                        return source.searchDetail();

                    case 11:
                        _context4.next = 13;
                        return source.getHostFromDetail();

                    case 13:
                        hosts = source.state.hosts;

                        if (!(hosts.length > 0)) {
                            _context4.next = 19;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 1800;
                        _context4.next = 19;
                        return httpRequest.post('https://vtt.teatv.net/source/set', {}, bodyPost);

                    case 19:
                        return _context4.abrupt('return', hosts);

                    case 20:
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

thisSource.testing = Yifytv;
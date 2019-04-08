

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://salamdl.info/",
    SEARCH: function SEARCH(title, year) {
        return 'https://salamdl.info/' + title + '-' + year + '/';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'User-Agent': 'Firefox 59',
            'Referer': referer
        };
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Salamdl = function () {
    function Salamdl(props) {
        _classCallCheck(this, Salamdl);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Salamdl, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;

                                if (!(type == 'tv')) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 4:
                                detailUrl = URL.SEARCH(stringHelper.convertToSearchQueryString(title), year);


                                this.state.detailUrl = detailUrl;

                                return _context.abrupt('return');

                            case 7:
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
                var _libs2, httpRequest, cheerio, qs, type, detailUrl, htmlDetail, $, hosts;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                type = this.movieInfo.type;
                                detailUrl = this.state.detailUrl;
                                _context2.next = 7;
                                return httpRequest.getHTML(detailUrl);

                            case 7:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                hosts = [];


                                $('#linkbox li a').each(function () {
                                    var u = $(this).attr('href');
                                    if (u.toLowerCase().indexOf('trailer') == -1 && u.match(/\.(mkv|mp4)$/)) hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "Salamdl"
                                        },
                                        result: {
                                            file: u,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;

                            case 12:
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

    return Salamdl;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Salamdl({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Salamdl',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
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

                        if (!(hosts.length == 0)) {
                            _context3.next = 22;
                            break;
                        }

                        _context3.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context3.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context3.next = 17;
                            break;
                        }

                        return _context3.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context3.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 3600;
                        _context3.next = 22;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context3.abrupt('return', hosts);

                    case 24:
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

thisSource.testing = Salamdl;
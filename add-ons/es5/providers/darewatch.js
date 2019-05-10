

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://www.dailytvfix.com",
    SEARCH: function SEARCH() {
        return 'http://www.dailytvfix.com/ajax/search.php';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_' + Math.round(+new Date()) + ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': 'http://www.dailytvfix.com/',
            'X-Requested-With': 'XMLHttpRequest'
        };
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Darewatch = function () {
    function Darewatch(props) {
        _classCallCheck(this, Darewatch);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.time = +new Date();

        console.log('start', this.time);
    }

    _createClass(Darewatch, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                title = title.replace(/(Marvel\'s\s)?/, '');

                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 6;

                                if (!(type == 'movie')) {
                                    _context.next = 15;
                                    break;
                                }

                                urlSearch = URL.SEARCH();
                                _context.next = 11;
                                return httpRequest.post(urlSearch, URL.HEADERS(), {
                                    'q': title,
                                    'limit': 15,
                                    'verifiedCheck': ''
                                });

                            case 11:
                                dataSearch = _context.sent;


                                dataSearch.data.forEach(function (item) {

                                    if (stringHelper.shallowCompare(item.title, title)) {
                                        _this.state.detailUrl = '' + URL.DOMAIN + item.permalink;
                                    }
                                });
                                _context.next = 16;
                                break;

                            case 15:
                                this.state.detailUrl = URL.DOMAIN + '/' + stringHelper.convertToSearchQueryString(title, '-') + '/season/' + season + '/episode/' + episode;

                            case 16:
                                return _context.abrupt('return');

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](6);

                                console.log(String(_context.t0));

                            case 22:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 24:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 19]]);
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
                var _libs2, httpRequest, cheerio, qs, base64, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, reg, supported_hosts, m, match, iframe;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context2.sent;
                                reg = /] = '([^']+)/g;
                                supported_hosts = ['openload.co', 'streamango.com'];
                                m = void 0, match = void 0, iframe = void 0;

                            case 12:
                                if (!(m = reg.exec(htmlDetail))) {
                                    _context2.next = 20;
                                    break;
                                }

                                iframe = base64.decode(m[1]);
                                match = iframe.match(/src="([^"]+)/);
                                if (match != undefined && hosts.length < 10 && supported_hosts.includes(getDomain(match[1]))) hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "Darewatch"
                                    },
                                    result: {
                                        file: match[1],
                                        label: "embed",
                                        type: "embed"
                                    }
                                });

                                if (!(hosts.length >= 20)) {
                                    _context2.next = 18;
                                    break;
                                }

                                return _context2.abrupt('break', 20);

                            case 18:
                                _context2.next = 12;
                                break;

                            case 20:

                                //let total = + new Date() - this.time;
                                //console.log('total', total);
                                //let count = hosts.length;

                                //await httpRequest.getHTML(`https://logstatus.teatv.app/log.php?source=darewatch&count=${count}&time=${total}`);

                                this.state.hosts = hosts;

                            case 21:
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

    return Darewatch;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Darewatch({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Darewatch',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context3.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context3.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context3.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = Darewatch;
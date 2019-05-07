

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://hdpopcorns.co",
    SEARCH: function SEARCH(title) {
        return 'http://hdpopcorns.co/?s=' + title;
    },
    QUALITY_URL: 'http://hdpopcorns.co/select-movie-quality.php',
    HEADERS: function HEADERS(referer) {
        return headers = { 'Origin': 'http://hdpopcorns.co', 'Referer': referer,
            'X-Requested-With': 'XMLHttpRequest', 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36' };
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Popcorns = function () {
    function Popcorns(props) {
        _classCallCheck(this, Popcorns);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Popcorns, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, slug, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch, $, items;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                slug = title.replace(/(Marvel\'s\s)?/, '').replace(/[:'"\s]+/g, '+').toLowerCase();
                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 6;
                                urlSearch = URL.SEARCH(slug);
                                _context.next = 10;
                                return httpRequest.getHTML(urlSearch);

                            case 10:
                                dataSearch = _context.sent;
                                $ = cheerio.load(dataSearch);
                                items = $('#content_box .latestPost header a');


                                items.each(function () {

                                    var url = $(this).attr('href');
                                    var tit = $(this).attr('title');

                                    var m = tit.match(/[0-9]{4}/);
                                    if (tit.toLowerCase().indexOf(title.toLowerCase()) == 0 && m != undefined && m[0] > 1900) detailUrl = url;
                                });
                                _context.next = 19;
                                break;

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context['catch'](6);

                                console.log(String(_context.t0));

                            case 19:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 16]]);
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
                var _libs2, httpRequest, cheerio, qs, base64, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, posts, reg, m, post, data, m1, _post, _data, _m;

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
                                posts = [];
                                reg = /FileName1080p.+?value="(.+?)".+?FileSize1080p.+?value="(.+?)".+?value="(.+?)"/g;
                                m = void 0;

                            case 12:
                                if (!(m = reg.exec(htmlDetail))) {
                                    _context2.next = 21;
                                    break;
                                }

                                post = {
                                    'FileName1080p': m[1],
                                    'FileSize1080p': m[2],
                                    'FSID1080p': m[3]
                                };
                                _context2.next = 16;
                                return httpRequest.post(URL.QUALITY_URL, URL.HEADERS(detailUrl), post);

                            case 16:
                                data = _context2.sent;
                                m1 = data.data.match(/"(.*mp4([^"]+))/);


                                if (m1 != undefined) hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "Popcorns"
                                    },
                                    result: {
                                        file: m1[1],
                                        label: "direct",
                                        type: "direct"
                                    }
                                });
                                _context2.next = 12;
                                break;

                            case 21:

                                reg = /FileName720p.+?value="(.+?)".+?FileSize1080p.+?value="(.+?)".+?value="(.+?)"/g;

                            case 22:
                                if (!(m = reg.exec(htmlDetail))) {
                                    _context2.next = 31;
                                    break;
                                }

                                _post = {
                                    'FileName720p': m[1],
                                    'FileSize720p': m[2],
                                    'FSID720p': m[3]
                                };
                                _context2.next = 26;
                                return httpRequest.post(URL.QUALITY_URL, URL.HEADERS(detailUrl), _post);

                            case 26:
                                _data = _context2.sent;
                                _m = _data.data.match(/"(.*mp4([^"]+))/);


                                if (_m != undefined) hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "Popcorns"
                                    },
                                    result: {
                                        file: _m[1],
                                        label: "direct",
                                        type: "direct"
                                    }
                                });
                                _context2.next = 22;
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

    return Popcorns;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Popcorns({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Popcorns',
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

thisSource.testing = Popcorns;
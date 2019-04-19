

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://vexmovies.org',
    DOMAIN_EMBED: 'https://consistent.stream/api/getVideo',
    SEARCH: function SEARCH(title) {
        return 'http://vexmovies.org/?s=' + title;
    },
    HEADERS: function HEADERS() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    HEADERS_COOKIE: function HEADERS_COOKIE() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var cookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Cookie': cookie,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    HEADERS_JSON: function HEADERS_JSON() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Referer': rerfer,
            'content-type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    }
};

var Vexmovies = function () {
    function Vexmovies(props) {
        _classCallCheck(this, Vexmovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vexmovies, [{
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


                                this.state.detailUrl = URL.DOMAIN + '/' + stringHelper.convertToSearchQueryString(title);
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
                var _libs2, httpRequest, cheerio, base64, stringHelper, title, hosts, detailUrl, embed, htmlDirect, body, $_2, hash, video, expire, bodyForm, encodeJson, item, item2, link;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, stringHelper = _libs2.stringHelper;
                                title = this.movieInfo.title;
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                embed = 'https://consistent.stream/titles/' + stringHelper.convertToSearchQueryString(title);
                                _context2.next = 7;
                                return httpRequest.getHTML(embed, URL.HEADERS(detailUrl));

                            case 7:
                                htmlDirect = _context2.sent;
                                body = htmlDirect;
                                $_2 = cheerio.load(body);
                                hash = $_2('#app player').attr('hash');
                                video = $_2('#app player').attr('video');
                                expire = $_2('#app player').attr('expire');
                                bodyForm = {
                                    key: hash,
                                    referrer: detailUrl,
                                    video: video,
                                    expire: expire
                                };
                                _context2.next = 16;
                                return httpRequest.post(URL.DOMAIN_EMBED, URL.HEADERS_JSON(embed), JSON.stringify(bodyForm));

                            case 16:
                                encodeJson = _context2.sent;

                                encodeJson = encodeJson.data;
                                // try {
                                //     encodeJson = JSON.parse(encodeJson);
                                // } catch(error) {
                                //     console.log(String(error)); 
                                //     throw new Error('NOT LINK');
                                // }


                                for (item in encodeJson.servers) {

                                    for (item2 in encodeJson.servers[item].sources) {

                                        if (encodeJson.servers[item].sources[item2].status == 1) {
                                            link = encodeJson.servers[item].sources[item2].src;

                                            if (link.indexOf('cloudfront') == -1 && link.indexOf('dfcdn') == -1 && link.indexOf('stream') == -1) {
                                                hosts.push({
                                                    provider: {
                                                        url: detailUrl,
                                                        name: "vexmovies"
                                                    },
                                                    result: {
                                                        file: link,
                                                        label: "embed",
                                                        type: "embed"
                                                    }
                                                });
                                            } else {
                                                hosts.push({
                                                    provider: {
                                                        url: detailUrl,
                                                        name: "vexmovies"
                                                    },
                                                    result: {
                                                        file: link,
                                                        label: "embed",
                                                        type: "embed"
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }

                                this.state.hosts = hosts;

                            case 20:
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

    return Vexmovies;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vexmovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Vexmovies',
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

    return function (_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = Vexmovies;
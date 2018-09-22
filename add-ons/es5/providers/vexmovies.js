

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
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'origin': 'https://consistent.stream',
            'accept-encoding': 'gzip, deflate, br',
            'content-type': 'application/json;charset=UTF-8',
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
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 6;
                                return httpRequest.getHTML(urlSearch);

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.peliculas .item_1 .item');


                                itemSearch.each(function () {

                                    var titleMovie = $(this).find('.fixyear h2').text();
                                    var yearMovie = $(this).find('.fixyear .year').text();
                                    var hrefMovies = $(this).find('a').first().attr('href');

                                    if (stringHelper.shallowCompare(title, titleMovie) && +yearMovie == year) {

                                        detailUrl = hrefMovies;
                                        return;
                                    }
                                });

                                this.state.detailUrl = detailUrl;
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, base64, hosts, detailUrl, htmlDetail, $, embed, htmlDirect, headers, body, $_2, hash, video, expire, bodyForm, encodeJson, item, item2, link;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl, URL.HEADERS(detailUrl));

                            case 7:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                embed = $('.entry-content iframe').attr('src');
                                _context2.next = 12;
                                return httpRequest.get(embed, URL.HEADERS(detailUrl));

                            case 12:
                                htmlDirect = _context2.sent;
                                headers = htmlDirect.headers;

                                if (!(headers['set-cookie'] == undefined)) {
                                    _context2.next = 16;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 16:

                                headers = headers['set-cookie'][0];
                                headers = headers.replace(/\;.*/i, '').trim() + ';';

                                body = htmlDirect.data;
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
                                _context2.next = 26;
                                return httpRequest.post(URL.DOMAIN_EMBED, URL.HEADERS_JSON(embed), JSON.stringify(bodyForm));

                            case 26:
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
                                                        type: "direct"
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }

                                this.state.hosts = hosts;

                            case 30:
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
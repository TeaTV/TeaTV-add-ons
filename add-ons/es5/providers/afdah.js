

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://afdah.info",
    SEARCH: 'https://search.afdah.info/',
    HEADERS: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://afdah.info',
        'Accept-Language': 'vi-VN,vi;q=0.8,fr-FR;q=0.6,fr;q=0.4,en-US;q=0.2,en;q=0.2',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

var Afdah = function () {
    function Afdah(props) {
        _classCallCheck(this, Afdah);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Afdah, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, qs, _movieInfo, title, year, season, episode, type, detailUrl, bodyRequest, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                bodyRequest = {
                                    process: cryptoJs.AES.encrypt(title + '|||' + 'title', 'Watch Movies Online').toString()
                                };
                                _context.next = 6;
                                return httpRequest.post(URL.SEARCH, URL.HEADERS, qs.stringify(bodyRequest));

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemSearch = $('ul li');


                                itemSearch.each(function () {

                                    var titleAfdah = $(this).find('a').text().replace(/\([0-9]+\)/i, '').trim();
                                    var id = $(this).find('a').attr('href');
                                    var yearAfdah = $(this).find('a').text().match(/\(([0-9]+)\)/i);
                                    yearAfdah = yearAfdah != null ? +yearAfdah[1] : 0;

                                    if (stringHelper.shallowCompare(titleAfdah, title) && yearAfdah == year) {
                                        detailUrl = '' + URL.DOMAIN + id;
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
                var _libs2, httpRequest, cheerio, hosts, detailUrl, htmlDetail, $;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 7;
                                return httpRequest.get(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail.data);


                                $('iframe').each(function () {

                                    var ifsrc = $(this).attr('src');
                                    if (ifsrc.indexOf('/trailer/') == -1) hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "afdah"
                                        },
                                        result: {
                                            file: ifsrc,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;

                            case 11:
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

    return Afdah;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Afdah({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'afdah',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context3.next = 5;
                        return httpRequest.post('https://vtt.teatv.net/source/get', {}, bodyPost);

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

                        if (!(hosts.length == 0)) {
                            _context3.next = 19;
                            break;
                        }

                        _context3.next = 11;
                        return source.searchDetail();

                    case 11:
                        _context3.next = 13;
                        return source.getHostFromDetail();

                    case 13:
                        hosts = source.state.hosts;

                        if (!(hosts.length > 0)) {
                            _context3.next = 19;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 1800;
                        _context3.next = 19;
                        return httpRequest.post('https://vtt.teatv.net/source/set', {}, bodyPost);

                    case 19:
                        return _context3.abrupt('return', hosts);

                    case 20:
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

thisSource.testing = Afdah;
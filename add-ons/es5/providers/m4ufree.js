

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://m4ufree.fun",
    SEARCH: function SEARCH(title) {
        return 'http://m4ufree.fun/search/' + title + '.html';
    },
    AJAX_URL: 'http://m4ufree.fun/ajax',
    AJAX_URL_TV: 'http://m4ufree.fun/ajaxtv',
    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': ref
        };
    },
    MAX_LINK: 25
};

var M4ufree = function () {
    function M4ufree(props) {
        _classCallCheck(this, M4ufree);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(M4ufree, [{
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
                                urlSearch = '';


                                urlSearch = URL.SEARCH(stringHelper._replaceSpecialCharacter(title).replace(/\s+/g, '-'));
                                //console.log(urlSearch);

                                _context.next = 7;
                                return httpRequest.get(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemSearch = $('.item');


                                itemSearch.each(function () {

                                    var hrefM4u = $(this).find('a').attr('href');
                                    var h2 = $(this).find('a').attr('title');
                                    var titleM4u = h2.replace(' (' + year + ')', '');

                                    if (stringHelper.shallowCompare(title, titleM4u)) {
                                        detailUrl = hrefM4u;
                                    }
                                });

                                if (detailUrl.indexOf('http://') != 0 && detailUrl.indexOf('https://') != 0) detailUrl = URL.DOMAIN + '/' + detailUrl;
                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 14:
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
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, type, season, episode, hosts, keys, detailUrl, url, htmlDetail, html, token, $_1, _headers, _headers_arr, key, cookies, headers, idepisode, poststv, $, item, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, type = _movieInfo2.type, season = _movieInfo2.season, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                keys = [];
                                detailUrl = this.state.detailUrl;
                                url = detailUrl;

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context3.next = 10;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 10:
                                _context3.next = 12;
                                return httpRequest.get(this.state.detailUrl);

                            case 12:
                                htmlDetail = _context3.sent;

                                //console.log('m4u', htmlDetail.data.substr(0, 200));
                                html = htmlDetail.data.match(/name="csrf-token" content="([^"]+)/);

                                if (!(html == null)) {
                                    _context3.next = 16;
                                    break;
                                }

                                throw new Error('NO_TOKEN');

                            case 16:
                                token = html[1];
                                $_1 = cheerio.load(htmlDetail.data);
                                _headers = htmlDetail.headers;
                                _headers_arr = [];

                                for (key in _headers) {
                                    if (key == 'set-cookie') _headers_arr[key] = _headers[key];
                                }cookies = _headers_arr['set-cookie'].join('; ');
                                headers = URL.HEADERS(detailUrl);

                                if (!(type == 'tv')) {
                                    _context3.next = 33;
                                    break;
                                }

                                idepisode = void 0;

                                $_1('.episode').each(function () {
                                    var episode_name = $_1(this).text();
                                    var epi_r = episode_name.match(/S([0-9]+)-E([0-9]+)/i);
                                    var _season = +epi_r[1];
                                    var _episode = +epi_r[2];

                                    if (_season == season && _episode == episode) {
                                        idepisode = $_1(this).attr('idepisode');
                                    }
                                });

                                if (!(idepisode == null)) {
                                    _context3.next = 28;
                                    break;
                                }

                                throw new Error('NOT_FOUND_TV');

                            case 28:
                                headers['cookie'] = cookies;
                                poststv = {
                                    _token: token,
                                    idepisode: idepisode
                                };
                                _context3.next = 32;
                                return httpRequest.post(URL.AJAX_URL_TV, headers, poststv);

                            case 32:
                                htmlDetail = _context3.sent;

                            case 33:
                                $ = cheerio.load(htmlDetail.data);
                                item = $('.le-server .singlemv');


                                item.each(function () {
                                    var links = $(this).attr('data');
                                    keys.push(links);
                                });

                                arrPromise = keys.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(links) {
                                        var htmlData, posts, html, linkEmbed, reUrl;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        htmlData = { data: '' };
                                                        _context2.prev = 1;
                                                        posts = { m4u: links, _token: token };

                                                        headers['cookie'] = cookies;
                                                        _context2.next = 6;
                                                        return httpRequest.post(URL.AJAX_URL, headers, posts);

                                                    case 6:
                                                        htmlData = _context2.sent;
                                                        _context2.next = 12;
                                                        break;

                                                    case 9:
                                                        _context2.prev = 9;
                                                        _context2.t0 = _context2['catch'](1);

                                                        console.log('e', _context2.t0);

                                                    case 12:
                                                        html = htmlData.data;
                                                        //console.log(html, 'ff', htmlData, 'linkEmbed');

                                                        if (!(html == undefined)) {
                                                            _context2.next = 15;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 15:
                                                        linkEmbed = html.match(/src\=\"([^\"]+)/i);

                                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                                        if (linkEmbed) {
                                                            _context2.next = 19;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 19:
                                                        if (!(linkEmbed.indexOf('http://') != 0 && linkEmbed.indexOf('https://') != 0)) {
                                                            _context2.next = 21;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 21:
                                                        if (!(linkEmbed.search('them4ufree.com') != -1)) {
                                                            _context2.next = 25;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 25:
                                                        if (!(linkEmbed.search('openx.tv') != -1)) {
                                                            _context2.next = 32;
                                                            break;
                                                        }

                                                        _context2.next = 28;
                                                        return httpRequest.getRedirectUrl(linkEmbed);

                                                    case 28:
                                                        reUrl = _context2.sent;

                                                        reUrl && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "m4ufree"
                                                            },
                                                            result: {
                                                                file: reUrl,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context2.next = 33;
                                                        break;

                                                    case 32:
                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "m4ufree"
                                                            },
                                                            result: {
                                                                file: linkEmbed.replace('/preview', '/edit'),
                                                                label: "embed",
                                                                type: linkEmbed.indexOf('drive.google') != -1 ? "direct" : "embed"
                                                            }
                                                        });

                                                    case 33:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 9]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 39;
                                return Promise.all(arrPromise);

                            case 39:
                                //console.log(hosts, 'hostsm4u');
                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 41:
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

    return M4ufree;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new M4ufree({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'M4ufree',
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

thisSource.testing = M4ufree;
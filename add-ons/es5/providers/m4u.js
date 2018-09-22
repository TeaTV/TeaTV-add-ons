

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://m4ufree.tv",
    SEARCH: function SEARCH(title) {
        return 'http://m4ufree.tv/search/' + title + '.html';
        //return `http://m4ufree.com/search/${title}-m4ufree.html`;
    },
    AJAX_URL: 'http://m4ufree.tv/ajax_new.php',
    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Origin': 'http://m4ufree.com',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': ref
        };
    },
    MAX_LINK: 25
};

var M4u = function () {
    function M4u(props) {
        _classCallCheck(this, M4u);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(M4u, [{
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

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 13:
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
                var _libs2, httpRequest, cheerio, base64, hosts, keys, detailUrl, htmlDetail, $, item, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                keys = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.get(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
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
                                                        posts = { m4u: links };
                                                        _context2.next = 5;
                                                        return httpRequest.post(URL.AJAX_URL, URL.HEADERS(detailUrl), posts);

                                                    case 5:
                                                        htmlData = _context2.sent;
                                                        _context2.next = 10;
                                                        break;

                                                    case 8:
                                                        _context2.prev = 8;
                                                        _context2.t0 = _context2['catch'](1);

                                                    case 10:
                                                        html = htmlData.data;
                                                        linkEmbed = html.match(/src\=\"([^\"]+)/i);

                                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                                        if (!(linkEmbed.search('them4ufree.com') != -1)) {
                                                            _context2.next = 15;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 15:
                                                        if (!(linkEmbed.search('openx.tv') != -1)) {
                                                            _context2.next = 22;
                                                            break;
                                                        }

                                                        _context2.next = 18;
                                                        return httpRequest.getRedirectUrl(linkEmbed);

                                                    case 18:
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
                                                        _context2.next = 23;
                                                        break;

                                                    case 22:
                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "m4ufree"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 23:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 8]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 15;
                                return Promise.all(arrPromise);

                            case 15:
                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 17:
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

    return M4u;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new M4u({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'M4uFree',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context4.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context4.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context4.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = M4u;
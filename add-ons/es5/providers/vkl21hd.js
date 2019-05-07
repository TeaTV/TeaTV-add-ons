

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://lk21hd.com/',
    SEARCH: function SEARCH(title, year) {
        return 'http://lk21hd.com/' + title + '-' + year;
    },
    AJAX_URL: function AJAX_URL() {
        return 'http://lk21hd.com/wp-admin/admin-ajax.php';
    }
};

function fuckfuck(p, a, c, k, _e, d) {
    _e = function e(c) {
        return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[_e(c)] = k[c] || _e(c);
        }
        k = [function (e) {
            return d[e];
        }];
        _e = function _e() {
            return '\\w+';
        };
        c = 1;
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
        }
    }
    return p;
}

var Vkl21hd = function () {
    function Vkl21hd(props) {
        _classCallCheck(this, Vkl21hd);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vkl21hd, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = URL.SEARCH(stringHelper.convertToSearchQueryString(title), year);


                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 5:
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
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, htmlDetail, m, postId, posts, postHTML, $_1, ifSrc, ifHtml, ff, a, reg, urls, $;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 9;
                                return httpRequest.getHTML(detailUrl);

                            case 9:
                                htmlDetail = _context2.sent;
                                m = htmlDetail.match(/postid-(\d+)/);
                                postId = m[1];
                                posts = {
                                    action: 'muvipro_player_content',
                                    tab: 'player1',
                                    post_id: postId
                                };
                                _context2.next = 15;
                                return httpRequest.post(URL.AJAX_URL(), {}, posts);

                            case 15:
                                postHTML = _context2.sent;
                                _context2.prev = 16;
                                $_1 = cheerio.load(postHTML.data);
                                ifSrc = $_1('iframe').attr('src');

                                ifSrc = ifSrc.indexOf('//') == 0 ? 'https:' + ifSrc : ifSrc;

                                _context2.next = 22;
                                return httpRequest.getHTML(ifSrc);

                            case 22:
                                ifHtml = _context2.sent;
                                ff = ifHtml.split('return p}')[1];

                                ff = 'a = fuckfuck' + ff.split('{}))')[0] + '{})';
                                a = void 0;

                                eval(ff);
                                reg = /file":"([^"]+)/g;

                                while (m = reg.exec(a)) {
                                    hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "Vkl21hd"
                                        },
                                        result: {
                                            file: m[1],
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }
                                _context2.next = 33;
                                break;

                            case 31:
                                _context2.prev = 31;
                                _context2.t0 = _context2['catch'](16);

                            case 33:
                                urls = [];
                                $ = cheerio.load(htmlDetail);


                                $('.gmr-download-list li a').each(function () {
                                    hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "Vkl21hd"
                                        },
                                        result: {
                                            file: $(this).attr('href').replace('oload.stream', 'openload.co'),
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;

                                return _context2.abrupt('return');

                            case 38:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[16, 31]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Vkl21hd;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vkl21hd({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Vkl21hd',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
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
                        bodyPost['expired'] = 7200;
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

thisSource.testing = Vkl21hd;
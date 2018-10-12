

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://2dll.ws",
    SEARCH: function SEARCH(title) {
        return 'http://2ddl.ws/search/' + title + '/feed/rss2';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var Twodllws = function () {
    function Twodllws(props) {
        _classCallCheck(this, Twodllws);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Twodllws, [{
        key: 'getDomain',
        value: function getDomain(url) {
            var m = url.match(/\/\/([^\/]+)/);
            return m[1] != undefined ? m[1] : 'xyzzyx.com';
        }
    }, {
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, realdebrid, detailUrl, videoUrl, tvshowVideoUrl, supported, urlSearch, dataSearch, hrefs, i, u, domain;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, realdebrid = _movieInfo.realdebrid;

                                if (!(realdebrid == undefined)) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error("NO REAL DEBITCH HIHI");

                            case 4:
                                detailUrl = [];
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 7;
                                supported = ['rapidgator.net', 'ul.to', 'nitroflare.com'];
                                urlSearch = void 0;

                                if (type == 'movie') {
                                    urlSearch = URL.SEARCH(title.replace(/[\s:'-]+/, '+') + '+' + year);
                                } else {
                                    if (season < 10) season = '0' + season;
                                    if (episode < 10) episode = '0' + episode;
                                    urlSearch = URL.SEARCH(title.replace(/\s+/g, '+') + '+s' + season + 'e' + episode);
                                    console.log(urlSearch);
                                }

                                _context.next = 13;
                                return httpRequest.getHTML(urlSearch);

                            case 13:
                                dataSearch = _context.sent;
                                hrefs = dataSearch.match(/href="([^"]+)/g);

                                for (i = 0; i < hrefs.length; i++) {
                                    u = hrefs[i].split('"')[1];
                                    domain = this.getDomain(u);

                                    if (supported.includes(domain)) detailUrl.push(u);
                                }

                                _context.next = 21;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context['catch'](7);

                                console.log(String(_context.t0));

                            case 21:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 23:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 18]]);
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, alls, i, u, ulower, tlower, finds, f;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                alls = this.state.detailUrl;

                                for (i = 0; i < alls.length; i++) {
                                    u = alls[i];
                                    ulower = u.toLowerCase();
                                    tlower = title.toLowerCase();
                                    finds = [
                                    //tlower.replace(/[\s:'"]+/ig, '.'),
                                    //tlower.replace(/[\s:'"]+/ig, '-'),
                                    //tlower.replace(/[\s:'"]+/ig, '_'),
                                    '.mkv', '.mp4'];

                                    for (f in finds) {
                                        if (ulower.indexOf(finds[f]) != -1 && ulower.indexOf('part') == -1) {
                                            if (hosts.length < 15) hosts.push({
                                                provider: {
                                                    url: u,
                                                    name: "2dll"
                                                },
                                                result: {
                                                    file: u,
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    }
                                }

                                this.state.hosts = hosts;

                            case 8:
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

    return Twodllws;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Twodllws({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'moviepix',
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

thisSource.testing = Twodllws;
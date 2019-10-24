

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://vizer.tv/",
    MOVIE: function MOVIE(title) {
        return 'https://vizer.tv/assistir/filme/' + title;
    },
    SERIES: function SERIES(title) {
        return 'https://vizer.tv/assistir/serie/' + title;
    },
    EPISODES_LIST: function EPISODES_LIST() {
        return 'https://vizer.tv/includes/ajax/publicFunctions.php';
    },
    PLAYER_URL: function PLAYER_URL(id, type) {
        return 'https://vizer.tv/embed/getPlay.php?id=' + id + '&type=' + type;
    },

    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': ref
        };
    }
};

var Vizer = function () {
    function Vizer(props) {
        _classCallCheck(this, Vizer);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Vizer, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, time;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                time = Math.floor(Date.now() / 1000);

                                //if(time % 100 != 0) throw new Error('NOT_FOUND_BLOCK');

                                this.state.detailUrl = type == 'movie' ? URL.MOVIE(stringHelper.convertToSearchQueryString(title)) : URL.SERIES(stringHelper.convertToSearchQueryString(title));
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, type, season, episode, year, hosts, keys, detailUrl, htmlDetail, $, playIds, yearMovie, m, m1, ssId, p, pData, js, eId, i, j, x, playIdsPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, type = _movieInfo2.type, season = _movieInfo2.season, episode = _movieInfo2.episode, year = _movieInfo2.year;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                keys = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 9:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                playIds = [];

                                if (!(type == 'movie')) {
                                    _context3.next = 25;
                                    break;
                                }

                                yearMovie = $('.yearAndDate .item').first().find('.top').text();

                                if (!(yearMovie != year)) {
                                    _context3.next = 16;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 16:
                                m = htmlDetail.match(/getPlayer\('([^']+)/g);

                                if (!(m == undefined)) {
                                    _context3.next = 19;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 19:
                                m1 = m[0].match(/(\d+)/);

                                if (m1 != undefined) playIds.push(m1[1]);
                                m1 = m[1].match(/(\d+)/);
                                if (m1 != undefined) playIds.push(m1[1]);
                                _context3.next = 63;
                                break;

                            case 25:
                                ssId = false;

                                $('.seasonList .item').each(function () {
                                    var sId = $(this).attr('data-get-episodes');
                                    var name = $(this).find('.txt').text().trim();
                                    var m = name.match(/^(\d+)/);
                                    var ss = m[1];
                                    if (ss == season) ssId = sId;
                                });

                                if (ssId) {
                                    _context3.next = 29;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 29:
                                p = { 'getEpisodes': ssId };
                                _context3.next = 32;
                                return httpRequest.post(URL.EPISODES_LIST(), {}, p);

                            case 32:
                                pData = _context3.sent;
                                js = pData.data;

                                if (!(js.status != 'success')) {
                                    _context3.next = 36;
                                    break;
                                }

                                throw new Error('NOT_FOUND1');

                            case 36:
                                eId = false;
                                i = 0;

                            case 38:
                                if (!(i < 200)) {
                                    _context3.next = 46;
                                    break;
                                }

                                j = js.list[i];

                                if (!(j.name == episode)) {
                                    _context3.next = 43;
                                    break;
                                }

                                eId = j.id;
                                return _context3.abrupt('break', 46);

                            case 43:
                                i++;
                                _context3.next = 38;
                                break;

                            case 46:
                                if (eId) {
                                    _context3.next = 48;
                                    break;
                                }

                                throw new Error('NOT_FOUND3');

                            case 48:

                                p = { 'getEpisodeContent': eId };
                                _context3.next = 51;
                                return httpRequest.post(URL.EPISODES_LIST(), {}, p);

                            case 51:
                                pData = _context3.sent;

                                js = pData.data;

                                if (!(js.status != 'success')) {
                                    _context3.next = 55;
                                    break;
                                }

                                throw new Error('NOT_FOUND2');

                            case 55:
                                x = 0;

                            case 56:
                                if (!(x < 10)) {
                                    _context3.next = 63;
                                    break;
                                }

                                if (!(js.list[x] == undefined)) {
                                    _context3.next = 59;
                                    break;
                                }

                                return _context3.abrupt('break', 63);

                            case 59:
                                playIds.push(js.list[x].id);

                            case 60:
                                x++;
                                _context3.next = 56;
                                break;

                            case 63:
                                playIdsPromise = playIds.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                                        var typeObj, playUrl, playHtml, ph;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        typeObj = type == 'movie' ? 'movies_player' : 'series_player';
                                                        playUrl = URL.PLAYER_URL(id, typeObj);
                                                        _context2.next = 4;
                                                        return httpRequest.getHTML(playUrl);

                                                    case 4:
                                                        playHtml = _context2.sent;
                                                        ph = playHtml.match(/href="([^"]+)/);

                                                        if (ph != undefined) hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Vizer"
                                                            },
                                                            result: {
                                                                file: ph[1],
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 7:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 66;
                                return Promise.all(playIdsPromise);

                            case 66:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 68:
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

    return Vizer;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vizer({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Vizer',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 6;
                        return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                    case 6:
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

                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context4.next = 23;
                            break;
                        }

                        _context4.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context4.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 18;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context4.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context4.next = 23;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context4.abrupt('return', hosts);

                    case 25:
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

thisSource.testing = Vizer;
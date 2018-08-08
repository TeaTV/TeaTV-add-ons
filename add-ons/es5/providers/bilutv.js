

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

URL = {
    SOURCE: 'bilutv',
    DOMAIN: "http://bilutv.com",
    HEADERS: function HEADERS() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'bilutv.com',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    SEARCH: function SEARCH(title) {
        return 'http://bilutv.com/tim-kiem.html?q=' + encodeURI(title);
    },
    DOMAIN_THUYET_MINH: function DOMAIN_THUYET_MINH(id, vietsubId) {
        return 'http://bilutv.com/ajax/getLinkPlayer/id/' + id + '/index/' + vietsubId;
    }
};

var Bilutv = function () {
    function Bilutv(props) {
        _classCallCheck(this, Bilutv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Bilutv, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, bilu, link_detail, link_watch, link_epsiode, url_search, html_search, $, item_page, html_watch, $_2, html_episode, $_3, item_episode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                if (season == 0 && type == 'tv') {
                                    season = title.match(/season *([0-9]+)/i);
                                    season = season != null ? +season[1] : '0';
                                    title = title.replace(/season *[0-9]+/i, '');

                                    if (season == 0) {
                                        season = title.match(/ss *([0-9]+)/i);
                                        season = season != null ? +season[1] : '0';
                                        title = title.replace(/ss *[0-9]+/i, '');
                                    }
                                }

                                bilu = this;
                                link_detail = '';
                                link_watch = '';
                                link_epsiode = '';
                                url_search = URL.SEARCH(title);
                                _context.next = 10;
                                return httpRequest.getHTML(url_search, URL.HEADERS(url_search));

                            case 10:
                                html_search = _context.sent;
                                $ = cheerio.load(html_search);
                                item_page = $('.list-film .film-item');


                                item_page.each(function () {

                                    var status = $(this).find('.current-status').text().toLowerCase();
                                    var href_detail = URL.DOMAIN + $(this).find('a').attr('href');
                                    var title_vi = $(this).find('.title .name').text();
                                    var title_movie = $(this).find('.title .real-name').text();
                                    var season_movie = title_movie.match(/season *([0-9]+)/i);
                                    season_movie = season_movie != null ? +season_movie[1] : 0;
                                    title_movie = title_movie.replace(/\( *season *[0-9]+ *\)/i, '').trim();
                                    var year_movie = title_movie.match(/\(([0-9]+)\)/i);
                                    year_movie = year_movie != null ? +year_movie[1] : 0;
                                    title_movie = title_movie.replace(/\([0-9]+\)/i, '').trim();

                                    var status_lower = status.trim().replace('ậ', 'a');

                                    if (!title_movie) {
                                        title_movie = title_vi;
                                    }

                                    if (stringHelper.shallowCompare(title, title_movie)) {

                                        if (type == 'movie' && status_lower.indexOf('full') == -1 && status_lower.indexOf('tap') == -1 && year == year_movie) {
                                            link_detail = href_detail;
                                            return;
                                        } else if (type == 'tv' && (status_lower.indexOf('full') != -1 || status_lower.indexOf('tap') != -1) && (season == season_movie || season_movie == 0)) {
                                            link_detail = href_detail;
                                            return;
                                        }
                                    }
                                });

                                if (!(link_detail == '')) {
                                    _context.next = 16;
                                    break;
                                }

                                throw new Error('NOT FIND');

                            case 16:
                                _context.next = 18;
                                return httpRequest.getHTML(link_detail, URL.HEADERS(link_detail));

                            case 18:
                                html_watch = _context.sent;
                                $_2 = cheerio.load(html_watch);


                                link_watch = URL.DOMAIN + $_2('.film-info .poster a').attr('href');

                                if (link_watch) {
                                    _context.next = 23;
                                    break;
                                }

                                throw new Error('NOT lINK WATCH');

                            case 23:
                                if (!(type == 'tv')) {
                                    _context.next = 33;
                                    break;
                                }

                                _context.next = 26;
                                return httpRequest.getHTML(link_watch, URL.HEADERS(link_watch));

                            case 26:
                                html_episode = _context.sent;
                                $_3 = cheerio.load(html_episode);
                                item_episode = $_3('#list_episodes li');


                                item_episode.each(function () {

                                    var number_episode = $_3(this).find('a').text();
                                    var href_episode = URL.DOMAIN + $_3(this).find('a').attr('href');

                                    if (episode == number_episode) {
                                        link_epsiode = href_episode;
                                        return;
                                    }
                                });

                                if (!(link_epsiode == '')) {
                                    _context.next = 32;
                                    break;
                                }

                                throw new Error('NOT LINK EPISODE');

                            case 32:

                                link_watch = link_epsiode;

                            case 33:

                                this.state.detailUrl = link_watch;
                                return _context.abrupt('return');

                            case 35:
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
                var _this = this;

                var _libs2, httpRequest, cheerio, qs, gibberish, _movieInfo2, episode, type, bilu, hosts, playerSetting, html_video, $, player, key, item, item1, link_direct, arrServer, idServer, itemServer, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                bilu = this;
                                hosts = [];
                                playerSetting = {
                                    sourceLinks: [],
                                    modelId: ''
                                };
                                _context3.next = 9;
                                return httpRequest.getHTML(bilu.state.detailUrl, URL.HEADERS(bilu.state.detailUrl));

                            case 9:
                                html_video = _context3.sent;
                                $ = cheerio.load(html_video);
                                player = html_video.match(/var *playerSetting *\=([^\$]+)/i);

                                player = player != null ? player[1] : '';

                                eval('playerSetting =  ' + player);

                                key = 'bilutv.com4590481877' + playerSetting.modelId;

                                for (item in playerSetting.sourceLinks) {

                                    for (item1 in playerSetting.sourceLinks[item].links) {
                                        link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);


                                        if (link_direct && link_direct.indexOf('s.bilutv.com') == -1 && link_direct.indexOf('api.bilutv.com/test') == -1 && link_direct.indexOf('s5.bilutv.com') == -1 && link_direct.indexOf('api.bilutv.com/getst') == -1) {

                                            link_direct && hosts.push({
                                                provider: {
                                                    url: bilu.state.detailUrl,
                                                    name: "Server 1"
                                                },
                                                result: {
                                                    file: link_direct,
                                                    label: playerSetting.sourceLinks[item].links[item1].label
                                                }
                                            });
                                        }
                                    }
                                }

                                // thuyetminh
                                arrServer = [];
                                idServer = html_video.match(/\/ajax\/getLinkPlayer\/id\/([^\/]+)/i);

                                idServer = idServer != null ? idServer[1] : '';

                                itemServer = $('.server-item');


                                itemServer.each(function () {

                                    var nameServer = $(this).find('.name span').text();

                                    if (nameServer && nameServer.trim() == 'Thuyết Minh') {

                                        var itemNumberServer = $(this).find('.option .btn');

                                        itemNumberServer.each(function () {
                                            var numberServer = $(this).attr('data-index');
                                            arrServer.push(numberServer);
                                        });
                                    }
                                });

                                arrPromise = arrServer.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var jsonThuyetMinh, _item, _item2, _link_direct;

                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(URL.DOMAIN_THUYET_MINH(idServer, val));

                                                    case 2:
                                                        jsonThuyetMinh = _context2.sent;

                                                        jsonThuyetMinh = JSON.parse(jsonThuyetMinh);

                                                        for (_item in jsonThuyetMinh.sourceLinks) {

                                                            for (_item2 in jsonThuyetMinh.sourceLinks[_item].links) {
                                                                _link_direct = gibberish.dec(jsonThuyetMinh.sourceLinks[_item].links[_item2].file, key);


                                                                if (_link_direct && _link_direct.indexOf('s.bilutv.com') == -1 && _link_direct.indexOf('api.bilutv.com/test') == -1 && _link_direct.indexOf('s5.bilutv.com') == -1 && _link_direct.indexOf('api.bilutv.com/getst') == -1) {

                                                                    _link_direct && hosts.push({
                                                                        provider: {
                                                                            url: bilu.state.detailUrl,
                                                                            name: "Server 1 - Thuyet Minh"
                                                                        },
                                                                        result: {
                                                                            file: _link_direct,
                                                                            label: jsonThuyetMinh.sourceLinks[_item].links[_item2].label
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }

                                                    case 5:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 24;
                                return Promise.all(arrPromise);

                            case 24:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 26:
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

    return Bilutv;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Bilutv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Bilutv',
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

                        _context4.next = 11;
                        return httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

                    case 11:
                        return _context4.abrupt('return', source.state.hosts);

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
    };
}();
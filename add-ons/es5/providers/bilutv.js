

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
                                bilu = this;
                                link_detail = '';
                                link_watch = '';
                                link_epsiode = '';
                                url_search = URL.SEARCH(title);
                                _context.next = 9;
                                return httpRequest.getHTML(url_search, URL.HEADERS(url_search));

                            case 9:
                                html_search = _context.sent;
                                $ = cheerio.load(html_search);
                                item_page = $('.list-film .film-item');


                                item_page.each(function () {

                                    var status = $(this).find('.current-status').text().toLowerCase();
                                    var href_detail = URL.DOMAIN + $(this).find('a').attr('href');
                                    var title_vi = $(this).find('.title .name').text();
                                    var title_movie = $(this).find('.title .real-name').text();
                                    var season_movie = title_movie.match(/season *([0-9]+)/i);
                                    season_movie = season_movie != null ? +season_movie[1] : -1;
                                    title_movie = title_movie.replace(/\( *season *[0-9]+ *\)/i, '').trim();
                                    var year_movie = title_movie.match(/\(([0-9]+)\)/i);
                                    year_movie = year_movie != null ? +year_movie[1] : 0;
                                    title_movie = title_movie.replace(/\([0-9]+\)/i, '').trim();

                                    var status_lower = status.trim().replace('ậ', 'a');

                                    if (stringHelper.shallowCompare(title, title_movie)) {

                                        if (type == 'movie' && status_lower.indexOf('full') == -1 && status_lower.indexOf('tap') == -1 && year == year_movie) {
                                            link_detail = href_detail;
                                            return;
                                        } else if (type == 'tv' && (status_lower.indexOf('full') != -1 || status_lower.indexOf('tap') != -1) && season == season_movie) {
                                            link_detail = href_detail;
                                            return;
                                        }
                                    }
                                });

                                if (!(link_detail == '')) {
                                    _context.next = 15;
                                    break;
                                }

                                throw new Error('NOT FIND');

                            case 15:
                                _context.next = 17;
                                return httpRequest.getHTML(link_detail, URL.HEADERS(link_detail));

                            case 17:
                                html_watch = _context.sent;
                                $_2 = cheerio.load(html_watch);


                                link_watch = URL.DOMAIN + $_2('.film-info .poster a').attr('href');

                                if (link_watch) {
                                    _context.next = 22;
                                    break;
                                }

                                throw new Error('NOT lINK WATCH');

                            case 22:
                                if (!(type == 'tv')) {
                                    _context.next = 32;
                                    break;
                                }

                                _context.next = 25;
                                return httpRequest.getHTML(link_watch, URL.HEADERS(link_watch));

                            case 25:
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
                                    _context.next = 31;
                                    break;
                                }

                                throw new Error('NOT LINK EPISODE');

                            case 31:

                                link_watch = link_epsiode;

                            case 32:

                                this.state.detailUrl = link_watch;
                                return _context.abrupt('return');

                            case 34:
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
                var _libs2, httpRequest, cheerio, qs, encrypt, _movieInfo2, episode, type, bilu, hosts, playerSetting, html_video, player, key, item, item1, link_direct;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, encrypt = _libs2.encrypt;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
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
                                _context2.next = 9;
                                return httpRequest.getHTML(bilu.state.detailUrl, URL.HEADERS(bilu.state.detailUrl));

                            case 9:
                                html_video = _context2.sent;
                                player = html_video.match(/var *playerSetting *\=([^\$]+)/i);

                                player = player != null ? player[1] : '';

                                eval('playerSetting =  ' + player);

                                key = 'bilutv.com4590481877' + playerSetting.modelId;

                                for (item in playerSetting.sourceLinks) {

                                    for (item1 in playerSetting.sourceLinks[item].links) {
                                        link_direct = encrypt.dec(playerSetting.sourceLinks[item].links[item1].file, key);


                                        if (link_direct && link_direct.indexOf('s.bilutv.com') == -1 && link_direct.indexOf('api.bilutv.com/test') == -1 && link_direct.indexOf('s5.bilutv.com') == -1 && link_direct.indexOf('api.bilutv.com/getst') == -1) {

                                            link_direct && hosts.push({
                                                provider: {
                                                    url: bilu.state.detailUrl,
                                                    name: "bilutv"
                                                },
                                                result: {
                                                    file: link_direct,
                                                    label: playerSetting.sourceLinks[item].links[item1].label
                                                }
                                            });
                                        }
                                    }
                                }

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 17:
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

    return Bilutv;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var bilu;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        bilu = new Bilutv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return bilu.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return bilu.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', bilu.state.hosts);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}();
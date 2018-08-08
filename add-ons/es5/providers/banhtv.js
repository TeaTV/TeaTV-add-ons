

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

URL = {
    SOURCE: 'banhtv',
    DOMAIN: "http://banhtv.com",
    HEADERS: function HEADERS() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'banhtv.com',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    SEARCH: function SEARCH(title) {
        return 'http://banhtv.com/tim-kiem.html?q=' + encodeURI(title);
    },
    DOMAIN_THUYET_MINH: function DOMAIN_THUYET_MINH(id, vietsubId) {
        return 'http://banhtv.com/ajax/getLinkPlayer/id/' + id + '/index/' + vietsubId;
    }
};

var Banhtv = function () {
    function Banhtv(props) {
        _classCallCheck(this, Banhtv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Banhtv, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, banhtv, detailUrl, arrVideo, videoUrl, tvshowVideoUrl, url_search, html_search, $, item_page, arrPromise, htmlDetail, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
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

                                banhtv = this;
                                detailUrl = false;
                                arrVideo = [];
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                url_search = URL.SEARCH(title);
                                _context2.next = 11;
                                return httpRequest.getHTML(url_search, URL.HEADERS(url_search));

                            case 11:
                                html_search = _context2.sent;
                                $ = cheerio.load(html_search);
                                item_page = $('.list-film .item');


                                item_page.each(function () {

                                    var hrefVideo = $(this).find('a').attr('href');
                                    var status = $(this).find('.label').text().toLowerCase();
                                    status = status.replace('ậ', 'a');

                                    if (hrefVideo) {
                                        hrefVideo = URL.DOMAIN + hrefVideo;
                                        if (type == 'tv' && (status.indexOf('tap') != -1 || status.match(/[0-9]+ *\/ *[0-9]+/i))) {
                                            arrVideo.push(hrefVideo);
                                        } else if (type == 'movie' && status.indexOf('tap') == -1 && !status.match(/[0-9]+ *\/ *[0-9]+/i)) {
                                            arrVideo.push(hrefVideo);
                                        }
                                    }
                                });

                                arrPromise = arrVideo.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var htmlVideo, $_2, hrefVideo, titleVi, titleMovie, yearMovie, seasonMovie;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return httpRequest.getHTML(val);

                                                    case 2:
                                                        htmlVideo = _context.sent;
                                                        $_2 = cheerio.load(htmlVideo);
                                                        hrefVideo = $_2('.btn-see').attr('href');
                                                        titleVi = $_2('.image .text h1').text();
                                                        titleMovie = $_2('.image .text h2').text();
                                                        yearMovie = titleMovie.match(/\(* *([0-9]+) *\)*$/i);

                                                        yearMovie = yearMovie != null ? +yearMovie[1] : false;
                                                        seasonMovie = titleMovie.match(/\(* *season *([0-9]+) *\)*/i);

                                                        seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                                        titleMovie = titleMovie.replace(/\(* *season *[0-9]+ *\)*/i, '');
                                                        titleMovie = titleMovie.replace(/\(* *[0-9]+ *\)*/i, '');

                                                        if (!titleMovie) {
                                                            titleMovie = titleVi;
                                                        }

                                                        if (!(stringHelper.shallowCompare(title, titleMovie) && hrefVideo)) {
                                                            _context.next = 24;
                                                            break;
                                                        }

                                                        hrefVideo = URL.DOMAIN + hrefVideo;

                                                        if (!(type == 'movie' && yearMovie && (yearMovie - 1 == year || yearMovie == year || yearMovie + 1 == year))) {
                                                            _context.next = 21;
                                                            break;
                                                        }

                                                        detailUrl = hrefVideo;
                                                        return _context.abrupt('return');

                                                    case 21:
                                                        if (!(type == 'tv' && (seasonMovie == season || seasonMovie == 0))) {
                                                            _context.next = 24;
                                                            break;
                                                        }

                                                        tvshowVideoUrl = hrefVideo;
                                                        return _context.abrupt('return');

                                                    case 24:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 18;
                                return Promise.all(arrPromise);

                            case 18:
                                if (!(type == 'tv' && tvshowVideoUrl)) {
                                    _context2.next = 25;
                                    break;
                                }

                                _context2.next = 21;
                                return httpRequest.getHTML(tvshowVideoUrl, URL.HEADERS(tvshowVideoUrl));

                            case 21:
                                htmlDetail = _context2.sent;
                                $_2 = cheerio.load(htmlDetail);
                                itemEpisode = $_2('#list_episodes li');


                                itemEpisode.each(function () {

                                    var hrefEpisode = $_2(this).find('a').attr('href');
                                    var numberEpisode = $_2(this).find('a').text();
                                    numberEpisode = numberEpisode.match(/([0-9]+)/i);
                                    numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                    if (numberEpisode == episode && hrefEpisode) {

                                        hrefEpisode = URL.DOMAIN + hrefEpisode;
                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 25:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 27:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, qs, gibberish, _movieInfo2, episode, type, banhtv, hosts, playerSetting, html_video, $, player, key, item, item1, link_direct;

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
                                banhtv = this;
                                hosts = [];
                                playerSetting = {
                                    sourceLinks: [],
                                    modelId: ''
                                };
                                _context3.next = 9;
                                return httpRequest.getHTML(banhtv.state.detailUrl);

                            case 9:
                                html_video = _context3.sent;
                                $ = cheerio.load(html_video);
                                player = html_video.match(/var *playerSetting *\=([^$]+)/i);

                                player = player != null ? player[1] : '';
                                player = player.replace(/var *bbPlayer\;/i, '');
                                player = player.replace(/var *playerNoAds *\= *function\(\) *\{/i, '');
                                player = player.replace('playerSetting["adsArray"] = [];', '');
                                player = player.replace('playerSetting["midArray"] = [];', '');
                                player = player.replace('bbPlayer = new BPlayer(\'player\');', '');
                                player = player.replace('bbPlayer.init(playerSetting);', '');
                                player = player.replace('$(".ads-under-player").remove();', '');
                                player = player.replace(/\}$/i, '');
                                player = player.replace('var playerHasAds = function() {', '');
                                player = player.replace('bbPlayer = new BPlayer(\'player\');', '');
                                player = player.replace('bbPlayer.init(playerSetting);', '');
                                player = player.replace(/\}$/i, '');
                                player = player.replace('hook_no_play_ads.push(playerNoAds);', '');
                                player = player.replace('hook_play_ads.push(playerHasAds);', '');

                                eval('playerSetting =  ' + player);

                                key = 'banhtv.com4590481877' + playerSetting.modelId;

                                for (item in playerSetting.sourceLinks) {

                                    for (item1 in playerSetting.sourceLinks[item].links) {
                                        link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);


                                        if (link_direct) {

                                            hosts.push({
                                                provider: {
                                                    url: banhtv.state.detailUrl,
                                                    name: "Server 5"
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
                                // let arrServer = [];
                                // let idServer   = html_video.match(/\/ajax\/getLinkPlayer\/id\/([^\/]+)/i);
                                // idServer       = idServer != null ? idServer[1] : '';

                                // let itemServer = $('.server-item');

                                // itemServer.each(function() {

                                //     let nameServer = $(this).find('.name span').text();

                                //     if( nameServer && nameServer.trim() == 'Thuyết Minh' ) {

                                //         let itemNumberServer = $(this).find('.option .btn');

                                //         itemNumberServer.each(function() {
                                //             let numberServer = $(this).attr('data-index');
                                //             arrServer.push(numberServer);
                                //         });

                                //     }

                                // });

                                // let arrPromise = arrServer.map(async (val) => {

                                //     let jsonThuyetMinh = await httpRequest.getHTML(URL.DOMAIN_THUYET_MINH(idServer, val));
                                //     jsonThuyetMinh     = JSON.parse(jsonThuyetMinh);


                                //     for( let item in playerSetting.sourceLinks ) {

                                //         for( let item1 in playerSetting.sourceLinks[item].links ) {

                                //             let link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);

                                //             if( link_direct ) {

                                //                 hosts.push({
                                //                     provider: {
                                //                         url: banhtv.state.detailUrl,
                                //                         name: "Server 5 - Thuyet Minh"
                                //                     },
                                //                     result: {
                                //                         file: link_direct,
                                //                         label: playerSetting.sourceLinks[item].links[item1].label
                                //                     }
                                //                 });
                                //             }

                                //         }

                                //     }
                                // });

                                // await Promise.all(arrPromise);

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 32:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Banhtv;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Banhtv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Banhtv',
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
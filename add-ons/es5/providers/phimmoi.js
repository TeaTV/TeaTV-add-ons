

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://www.phimmoi.net",
    SEARCH: function SEARCH(title) {
        return 'http://www.phimmoi.net/tim-kiem/' + title + '/';
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var Phimmoi = function () {
    function Phimmoi(props) {
        _classCallCheck(this, Phimmoi);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Phimmoi, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, tvshowDetailUrl, urlSearch, htmlSearch, $, itemSearch, htmlVideo, $_2, hrefVideo, yearMovie, htmlTvshow, _$_, arrLinkEpisode, listServer;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
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

                                detailUrl = false;
                                videoUrl = false;
                                tvshowDetailUrl = false;
                                urlSearch = '';


                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));

                                _context.next = 10;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 10:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.list-movie .movie-item');


                                itemSearch.each(function () {

                                    var hrefMovie = URL.DOMAIN + '/' + $(this).find('.block-wrapper').attr('href');
                                    var titleMovie = $(this).find('.movie-title-2').text();
                                    var titleVi = $(this).find('.movie-title-1').text();
                                    var seasonMovie = titleMovie.match(/\( *season *([0-9]+) *\)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                    titleMovie = titleMovie.replace(/\( *season *[0-9]+ *\)/i, '').trim();
                                    titleMovie = titleMovie.replace(/\(.*/i, '').trim();

                                    if (!titleMovie) {
                                        titleMovie = titleVi;
                                    }

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie') {
                                            videoUrl = hrefMovie;
                                            return;
                                        } else if (type == 'tv' && (season == seasonMovie || seasonMovie == 0)) {
                                            videoUrl = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                if (!(videoUrl != false)) {
                                    _context.next = 24;
                                    break;
                                }

                                _context.next = 17;
                                return httpRequest.getHTML(videoUrl, URL.HEADERS);

                            case 17:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                hrefVideo = URL.DOMAIN + '/' + $_2('#btn-film-watch').attr('href');
                                yearMovie = $_2('.movie-title .title-year').text();

                                yearMovie = yearMovie.match(/([0-9]+)/i);
                                yearMovie = yearMovie != null ? +yearMovie[1] : 0;

                                if (type == 'movie' && yearMovie == year && hrefVideo) {
                                    detailUrl = [hrefVideo];
                                } else if (type == 'tv' && hrefVideo) {
                                    tvshowDetailUrl = hrefVideo;
                                }

                            case 24:
                                if (!(type == 'tv' && tvshowDetailUrl != false)) {
                                    _context.next = 33;
                                    break;
                                }

                                _context.next = 27;
                                return httpRequest.getHTML(tvshowDetailUrl, URL.HEADERS);

                            case 27:
                                htmlTvshow = _context.sent;
                                _$_ = cheerio.load(htmlTvshow);
                                arrLinkEpisode = [];
                                listServer = _$_('.episode');


                                listServer.each(function () {

                                    var hrefEpisode = URL.DOMAIN + '/' + _$_(this).find('.btn-episode').attr('href');
                                    var numberEpisode = _$_(this).find('.btn-episode').attr('data-number');

                                    if (numberEpisode && numberEpisode == episode) {
                                        arrLinkEpisode.push(hrefEpisode);
                                    }
                                });

                                detailUrl = arrLinkEpisode;

                            case 33:

                                this.state.detailUrl = detailUrl;
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
                var _libs2, httpRequest, cheerio, qs, phimmoi, arrDirect, hosts, type, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                phimmoi = this;
                                arrDirect = [];
                                hosts = [];
                                type = this.movieInfo.type;
                                arrPromise = this.state.detailUrl.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var currentEpisode, filmInfo, htmlVideo, $, infoScript, infoScriptString, decodeScript, decodeScriptString, getToken, episodeUrl, jsonDirect, bk, bk2, bk3, item, _item, _item2;

                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        currentEpisode = {};
                                                        filmInfo = {};
                                                        _context2.next = 4;
                                                        return httpRequest.getHTML(val, URL.HEADERS);

                                                    case 4:
                                                        htmlVideo = _context2.sent;
                                                        $ = cheerio.load(htmlVideo);
                                                        infoScript = $("script:contains(var filmInfo={})");
                                                        infoScriptString = infoScript.html().replace("<!--", "").replace("-->", "");

                                                        infoScriptString = infoScriptString.replace('var currentEpisode={};', '');
                                                        infoScriptString = infoScriptString.replace('var filmInfo={};', '');
                                                        infoScriptString = infoScriptString.replace('if(typeof filmInfo=="undefined")', '');
                                                        infoScriptString = infoScriptString.replace('if(typeof currentEpisode=="undefined")', '');
                                                        eval(infoScriptString);
                                                        decodeScript = $("script:contains(;eval)");
                                                        decodeScriptString = decodeScript.html();

                                                        getToken = function getToken(string) {
                                                            var window = {};
                                                            var document = { write: function write() {} };
                                                            eval(string);
                                                            return window.TOKEN_EPISODE;
                                                        };

                                                        episodeUrl = 'http://episode.phimmoi.net/episodeinfo-v1.2.php?ip=&episodeid=' + currentEpisode.episodeId + '&number=1&part=0&filmid=' + filmInfo.filmId + '&filmslug=' + filmInfo.url + '&type=javascript&requestid=' + currentEpisode.requestId + '&token=' + getToken(decodeScriptString) + '&type=json';
                                                        _context2.next = 19;
                                                        return httpRequest.getHTML(episodeUrl, URL.HEADERS);

                                                    case 19:
                                                        jsonDirect = _context2.sent;

                                                        jsonDirect = JSON.parse(jsonDirect);

                                                        bk = jsonDirect.medias;
                                                        bk2 = jsonDirect.mediasBk2;
                                                        bk3 = jsonDirect.mediasBk;


                                                        for (item in bk) {

                                                            bk[item].url && hosts.push({
                                                                provider: {
                                                                    url: phimmoi.state.detailUrl[0],
                                                                    name: "Server 3"
                                                                },
                                                                result: {
                                                                    file: bk[item].url,
                                                                    label: bk[item].resolution + 'p',
                                                                    type: 'direct'
                                                                }
                                                            });
                                                        }
                                                        for (_item in bk2) {
                                                            bk2[_item].url && hosts.push({
                                                                provider: {
                                                                    url: phimmoi.state.detailUrl[0],
                                                                    name: "Server 3"
                                                                },
                                                                result: {
                                                                    file: bk2[_item].url,
                                                                    label: bk2[_item].resolution + 'p',
                                                                    type: 'direct'
                                                                }
                                                            });
                                                        }
                                                        for (_item2 in bk3) {
                                                            bk3[_item2].url && hosts.push({
                                                                provider: {
                                                                    url: phimmoi.state.detailUrl[0],
                                                                    name: "Server 3 - Vietsub"
                                                                },
                                                                result: {
                                                                    file: bk3[_item2].url,
                                                                    label: bk3[_item2].resolution + 'p',
                                                                    type: 'direct'
                                                                }
                                                            });
                                                        }

                                                    case 27:
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
                                _context3.next = 10;
                                return Promise.all(arrPromise);

                            case 10:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 12:
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
    }, {
        key: 'isEmbed',
        value: function isEmbed(link) {

            if (link.indexOf('statics2.vidcdn.pro') != -1) {
                return false;
            } else if (link.indexOf('stream2.m4ukido.com') != -1) {
                return false;
            }

            return true;
        }
    }]);

    return Phimmoi;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Phimmoi({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Phimmoi',
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

    return function (_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Phimmoi;
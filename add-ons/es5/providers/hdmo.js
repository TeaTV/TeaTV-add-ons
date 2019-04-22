

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://hdmo.tv',
    SEARCH: function SEARCH(title) {
        return 'http://hdmo.tv/?s=' + title;
    },
    EPISODE: function EPISODE(title, ss, ep) {
        return 'https://hdmo.tv/episodes/' + title + '-' + ss + 'x' + ep + '/';
    },
    EMBED: 'https://hdmo.tv/wp-admin/admin-ajax.php'
};

var Hdmo = function () {
    function Hdmo(props) {
        _classCallCheck(this, Hdmo);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Hdmo, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, htmlSearch, $, page;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                _context.next = 4;
                                return httpRequest.get(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));

                            case 4:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                page = $('.pagination span').first().text();

                                page = page.match(/of *([0-9]+)/i);
                                page = page != null ? +page[1] : 1;

                                _context.next = 11;
                                return this.getDetailUrl(page, this.state);

                            case 11:
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
        key: 'getDetailUrl',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page, state) {
                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, year, season, episode, type, getHrefEpisode, detailUrl, urlSearch, htmlSearch, $, itemSearch, htmlEpisode, $_2, itemSeason;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;
                                getHrefEpisode = this.getHrefEpisode;
                                detailUrl = false;
                                urlSearch = false;


                                if (type == 'movie') {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                }

                                _context2.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.search-page .result-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('.image .thumbnail a').attr('href');
                                    var typeMovie = $(this).find('.image .thumbnail a span').text().trim().toLowerCase();
                                    var titleMovie = $(this).find('.details .title a').text();
                                    var yearMovie = $(this).find('.details .meta .year').text();
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && typeMovie == 'movie') {

                                            if (+yearMovie == year) {

                                                detailUrl = hrefMovie;
                                            }
                                        } else if (type == 'tv' && typeMovie == 'tv') {

                                            detailUrl = URL.EPISODE(stringHelper.convertToSearchQueryString(title), season, episode);
                                        }
                                    }
                                });

                                if (!(type == 'tv' && detailUrl != false)) {
                                    _context2.next = 19;
                                    break;
                                }

                                _context2.next = 15;
                                return httpRequest.getHTML(detailUrl);

                            case 15:
                                htmlEpisode = _context2.sent;
                                $_2 = cheerio.load(htmlEpisode);
                                itemSeason = $_2('#seasons .se-c');


                                itemSeason.each(function () {

                                    var seasonMovie = $_2(this).find('.se-q .se-t').text().trim();

                                    if (+seasonMovie == season) {

                                        var itemEpisode = $_2(this).find('.se-a .episodios li');

                                        itemEpisode.each(function () {

                                            var hrefEpisode = $_2(this).find('.episodiotitle a').first().attr('href');
                                            var episodeMovies = $_2(this).find('.episodiotitle a').first().text();
                                            episodeMovies = episodeMovies.match(/episode *([0-9]+)/i);
                                            episodeMovies = episodeMovies != null ? +episodeMovies[1] : -1;

                                            if (episodeMovies == episode) {
                                                detailUrl = hrefEpisode;
                                            }
                                        });
                                    }
                                });

                            case 19:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 21:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getDetailUrl(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return getDetailUrl;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this = this;

                var _libs3, httpRequest, cheerio, base64, detailUrl, hosts, htmlDetail, $, data, embeds, dataPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64;

                                if (this.state.detailUrl) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                detailUrl = this.state.detailUrl;
                                hosts = [];
                                _context4.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context4.sent;
                                $ = cheerio.load(htmlDetail);
                                data = [];
                                embeds = $('#playeroptionsul li');


                                embeds.each(function () {
                                    var t = $(this).attr('data-type');
                                    var dataPost = $(this).attr('data-post');
                                    var dataNume = $(this).attr('data-nume');
                                    if (isNaN(dataNume)) return;
                                    data.push({
                                        dpost: dataPost,
                                        dnume: dataNume,
                                        dType: t
                                    });
                                });

                                console.log(data);

                                dataPromise = data.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(d) {
                                        var posts, pHtml, m;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        posts = {
                                                            action: 'doo_player_ajax',
                                                            post: d.dpost,
                                                            nume: d.dnume,
                                                            type: d.dType
                                                        };
                                                        _context3.next = 3;
                                                        return httpRequest.post(URL.EMBED, {}, posts);

                                                    case 3:
                                                        pHtml = _context3.sent;
                                                        m = pHtml.data.match(/src="([^"]+)/);

                                                        if (m != undefined) hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Hdmo"
                                                            },
                                                            result: {
                                                                file: m[1],
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 6:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this);
                                    }));

                                    return function (_x3) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 16;
                                return Promise.all(dataPromise);

                            case 16:

                                this.state.hosts = hosts;

                            case 17:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Hdmo;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Hdmo({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'hdmotv',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context5.next = 5;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 5:
                        res = _context5.sent;
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
                            _context5.next = 22;
                            break;
                        }

                        _context5.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context5.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context5.next = 17;
                            break;
                        }

                        return _context5.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context5.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context5.next = 22;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context5.abrupt('return', hosts);

                    case 24:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = Hdmo;
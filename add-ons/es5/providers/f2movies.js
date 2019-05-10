

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www.f2movies.to/',
    SEARCH: function SEARCH(title) {
        return 'https://www.f2movies.to/search/' + title + '.html';
    },
    AJAX_URL: function AJAX_URL(id, server, type) {
        return 'https://www.f2movies.to/ajax/' + type + '/' + id + '-' + server;
    },
    SERVER_LIST: function SERVER_LIST(id, mid) {
        return 'https://www.f2movies.to/ajax/v4_movie_episodes/' + id + '/' + mid;
    }
};

var F2movies = function () {
    function F2movies(props) {
        _classCallCheck(this, F2movies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(F2movies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                _context2.next = 5;
                                return httpRequest.getHTML(URL.SEARCH(stringHelper.convertToSearchQueryString(title)));

                            case 5:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.film_list .film_list-wrap .flw-item');


                                itemSearch.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie, seasonMovie, yearMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('.film-detail .film-name a').attr('href');
                                                    titleMovie = $(this).find('.film-detail .film-name a').text();
                                                    seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);

                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '');
                                                    titleMovie = titleMovie.replace(/\- *season.*/i, '');
                                                    titleMovie = titleMovie.trim();

                                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                                        if (type == 'movie') {
                                                            yearMovie = $(this).find('.film-infor span').first().text();

                                                            if (yearMovie == year) detailUrl = hrefMovie;
                                                        } else if (seasonMovie == season) {
                                                            detailUrl = hrefMovie;
                                                        }
                                                    }

                                                case 8:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                this.state.detailUrl = detailUrl.replace('.html', '/watching.html');
                                return _context2.abrupt('return');

                            case 11:
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
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this = this;

                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, htmlDetail, m, id, mid, sourceHtml, $, itemEpisode, servers, serverPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context4.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                detailUrl = this.state.detailUrl;
                                _context4.next = 9;
                                return httpRequest.getHTML(detailUrl);

                            case 9:
                                htmlDetail = _context4.sent;
                                m = htmlDetail.match(/id: "([^"]+)/);
                                id = m[1];

                                m = htmlDetail.match(/movie_id: "([^"]+)/);
                                mid = m[1];
                                _context4.next = 16;
                                return httpRequest.getHTML(URL.SERVER_LIST(id, mid));

                            case 16:
                                sourceHtml = _context4.sent;

                                sourceHtml = JSON.parse(sourceHtml);
                                $ = cheerio.load(sourceHtml.html);
                                itemEpisode = $('.dp-s-line');
                                servers = [];


                                if (type == 'movie') {
                                    itemEpisode.each(function () {
                                        var id = $(this).find('li.nav-item').attr('data-id');
                                        var server = $(this).find('li.nav-item').attr('data-server');
                                        var onclick = $(this).find('li.nav-item').attr('onclick');
                                        var type = onclick.indexOf('embed') != -1 ? 'movie_embed' : 'movie_sources';
                                        servers.push({
                                            id: id,
                                            server: server,
                                            type: type
                                        });
                                    });
                                } else if (type == 'tv') {

                                    itemEpisode = $('.dp-s-line li');

                                    itemEpisode.each(function () {
                                        var id = $(this).attr('data-id');
                                        var server = $(this).attr('data-server');
                                        var onclick = $(this).attr('onclick');
                                        var type = onclick.indexOf('embed') != -1 ? 'movie_embed' : 'movie_sources';
                                        var title1 = $(this).find('a').text();
                                        var m = title1.match(/Episode\s(\d+):/);
                                        if (m != undefined && parseInt(m[1]) == episode) servers.push({
                                            id: id,
                                            server: server,
                                            type: type
                                        });
                                    });
                                }

                                serverPromise = servers.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(s) {
                                        var u, h, sources, i;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        u = URL.AJAX_URL(s.id, s.server, s.type);
                                                        _context3.next = 3;
                                                        return httpRequest.getHTML(u);

                                                    case 3:
                                                        h = _context3.sent;

                                                        try {
                                                            h = JSON.parse(h);
                                                        } catch (e) {}
                                                        if (h.status != undefined) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "F2movies"
                                                                },
                                                                result: {
                                                                    file: h.src,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        } else {
                                                            sources = h['playlist'][0]['sources'];

                                                            for (i in sources) {
                                                                hosts.push({
                                                                    provider: {
                                                                        url: detailUrl,
                                                                        name: "F2movies"
                                                                    },
                                                                    result: {
                                                                        file: sources[i].file,
                                                                        label: "embed",
                                                                        type: "embed"
                                                                    }
                                                                });
                                                            }
                                                        }

                                                    case 6:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this);
                                    }));

                                    return function (_x) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 25;
                                return Promise.all(serverPromise);

                            case 25:

                                this.state.hosts = hosts;

                                return _context4.abrupt('return');

                            case 27:
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

    return F2movies;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new F2movies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'F2movies',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context5.next = 6;
                        return httpRequest.post('https://vvv.teatv.net/source/get', {}, bodyPost);

                    case 6:
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
                            _context5.next = 23;
                            break;
                        }

                        _context5.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context5.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context5.next = 18;
                            break;
                        }

                        return _context5.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context5.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 10800;
                        _context5.next = 23;
                        return httpRequest.post('https://vvv.teatv.net/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context5.abrupt('return', hosts);

                    case 25:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = F2movies;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://www3.fmovies.to",
    SEARCH: function SEARCH(title) {
        return 'https://www3.fmovies.to/ajax/film/search?keyword=' + title;
    },
    HASH_URL: 'http://www5.123moviesfree.com/ip.file/swf/plugins/ipplugins.php',
    PLAYER_URL: function PLAYER_URL(key, server_id) {
        return 'http://www5.123moviesfree.com/ip.file/swf/ipplayer/ipplayer.php?u=' + key + '&s=' + server_id + '&n=0';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var s123MoviesFree = function () {
    function s123MoviesFree(props) {
        _classCallCheck(this, s123MoviesFree);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(s123MoviesFree, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, urlSearch, htmlSearch, html, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                html = void 0;
                                _context.prev = 9;

                                html = JSON.parse(htmlSearch).html;
                                _context.next = 16;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](9);
                                throw new Error('NOT_FOUND');

                            case 16:
                                $ = cheerio.load(html);

                                $('.item').each(function () {

                                    var titleMovie = $(this).find('.name').text().trim();
                                    var hrefMovie = $(this).find('.name').attr('href');
                                    var yearMovie = $(this).find('.year').parent().text().trim();

                                    if (type == 'tv') titleMovie = titleMovie + ' ' + season;
                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                        if (type == 'movie' && yearMovie.indexOf(year) != -1) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv') {
                                            detailUrl = hrefMovie;
                                        }
                                    }
                                });

                                if (detailUrl.indexOf('http') != 0) detailUrl = URL.DOMAIN + detailUrl;
                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 13]]);
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, m, new_url, servers, sources, sourcesPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);

                                if (!(type == 'tv')) {
                                    _context3.next = 20;
                                    break;
                                }

                                m = htmlDetail.match(/name="epname" value="([^"]+)/);

                                if (!(m != undefined && m[1] != episode)) {
                                    _context3.next = 20;
                                    break;
                                }

                                new_url = false;

                                $('#ip_episode a').each(function () {
                                    var ep = $(this).attr('data-name');
                                    if (ep == episode) {
                                        new_url = $(this).attr('href');
                                        return;
                                    }
                                });

                                if (!new_url) {
                                    _context3.next = 20;
                                    break;
                                }

                                _context3.next = 18;
                                return httpRequest.getHTML(new_url);

                            case 18:
                                htmlDetail = _context3.sent;

                                $ = cheerio.load(htmlDetail);

                            case 20:
                                servers = $('#ip_server li a');
                                sources = [];


                                servers.each(function () {
                                    var server_id = $(this).attr('data-server');
                                    var phim_id = $(this).attr('data-film');
                                    var episode = $(this).attr('data-name');

                                    sources.push({
                                        'ipplugins': 1,
                                        'ip_film': phim_id,
                                        'ip_server': server_id,
                                        'ip_name': episode,
                                        'fix': 0
                                    });
                                });

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source) {
                                        var hash, hashKey, playHtml, last_u;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.post(URL.HASH_URL, {}, source);

                                                    case 2:
                                                        hash = _context2.sent;
                                                        hashKey = hash.data.s;
                                                        _context2.next = 6;
                                                        return httpRequest.getHTML(URL.PLAYER_URL(hashKey, source.server_id));

                                                    case 6:
                                                        playHtml = _context2.sent;

                                                        try {
                                                            playHtml = JSON.parse(playHtml);
                                                        } catch (e) {
                                                            playHtml = { data: false };
                                                        }
                                                        if (playHtml.data) {
                                                            last_u = playHtml.data;

                                                            if (last_u.indexOf('//') == 0) last_u = 'https:' + last_u;
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "123xfree"
                                                                },
                                                                result: {
                                                                    file: last_u,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 9:
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
                                _context3.next = 26;
                                return Promise.all(sourcesPromise);

                            case 26:

                                this.state.hosts = hosts;

                            case 27:
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

    return s123MoviesFree;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new s123MoviesFree({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: '123xfree',
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

thisSource.testing = s123MoviesFree;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://hdo.to',
    SEARCH: function SEARCH(title) {
        return 'https://hdo.to/search/' + title;
    },
    DOMAIN_EPISODE: function DOMAIN_EPISODE(id) {
        return 'https://hdo.to/ajax/movie/episodes/' + id;
    },
    DOMAIN_TOKEN: function DOMAIN_TOKEN(eid, mid) {
        return 'https://hdo.to/ajax/movie_token?eid=' + eid + '&mid=' + mid;
    },
    DOMAIN_SOURCE: function DOMAIN_SOURCE(eid, x, y) {
        return 'https://hdo.to/ajax/movie_sources/' + eid + '?x=' + x + '&y=' + y;
    },
    DOMAIN_EMBED: function DOMAIN_EMBED(id) {
        return 'https://hdo.to/ajax/movie/get_embed/' + id;
    }
};

var Hdm = function () {
    function Hdm(props) {
        _classCallCheck(this, Hdm);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Hdm, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYearMovie, libs, detailUrl, videoSeason, videoUrl, urlSearch, idMovie, arrSearch, htmlSearch, $, itemSearch, arrPromise;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                getYearMovie = this.getYearMovie;
                                libs = this.libs;
                                detailUrl = [];
                                videoSeason = false;
                                videoUrl = false;
                                urlSearch = '';
                                idMovie = false;
                                arrSearch = [];


                                if (type == 'movie') {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + ('+season+' + season));
                                }

                                _context2.next = 13;
                                return httpRequest.getHTML(urlSearch);

                            case 13:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.ulclear .movie-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('a').attr('title');
                                    var ajaxInfo = $(this).attr('data-url');
                                    titleMovie = titleMovie.replace(/\( *[0-9]+ *\)/i, '');
                                    var seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/\- *season *[0-9]+/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie) || stringHelper.shallowCompare(title, titleMovie)) {
                                        arrSearch.push({ hrefMovie: hrefMovie, titleMovie: titleMovie, seasonMovie: seasonMovie, ajaxInfo: ajaxInfo });
                                    }
                                });

                                arrPromise = arrSearch.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var yearOk;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        if (!(type == 'movie')) {
                                                            _context.next = 7;
                                                            break;
                                                        }

                                                        val.ajaxInfo = URL.DOMAIN + val.ajaxInfo;
                                                        _context.next = 4;
                                                        return getYearMovie(libs, val.ajaxInfo, year);

                                                    case 4:
                                                        yearOk = _context.sent;

                                                        if (yearOk) {
                                                            _context.next = 7;
                                                            break;
                                                        }

                                                        return _context.abrupt('return', false);

                                                    case 7:

                                                        if (stringHelper.shallowCompare(title, val.titleMovie)) {
                                                            if (type == 'movie' || season == val.seasonMovie) detailUrl = val.hrefMovie;
                                                        }

                                                    case 8:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 20;
                                return Promise.all(arrPromise);

                            case 20:
                                if (detailUrl) {
                                    _context2.next = 22;
                                    break;
                                }

                                throw new Error('NOT FOUND');

                            case 22:

                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 24:
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
        key: 'getYearMovie',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, hrefInfo, year) {
                var httpRequest, cheerio, htmlInfo;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                httpRequest = libs.httpRequest, cheerio = libs.cheerio;
                                _context3.next = 3;
                                return httpRequest.getHTML(hrefInfo);

                            case 3:
                                htmlInfo = _context3.sent;

                                if (!(htmlInfo.indexOf(year) != -1)) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt('return', true);

                            case 6:
                                return _context3.abrupt('return', false);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getYearMovie(_x2, _x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return getYearMovie;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _this2 = this;

                var _libs2, httpRequest, cheerio, base64, _movieInfo2, type, episode, hosts, arrEmbed, detailUrl, getEmbed, libs, movieId, htmlDetail, $, arrServer, arrServerEmbed, itemServer, arrPromise;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context6.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrEmbed = [];
                                detailUrl = this.state.detailUrl;
                                getEmbed = this.getEmbed;
                                libs = this.libs;
                                movieId = detailUrl.match(/\-([0-9]+)$/i);

                                movieId = movieId != null ? +movieId[1] : false;

                                _context6.next = 13;
                                return httpRequest.getHTML(URL.DOMAIN_EPISODE(movieId));

                            case 13:
                                htmlDetail = _context6.sent;
                                _context6.prev = 14;

                                htmlDetail = JSON.parse(htmlDetail);
                                _context6.next = 22;
                                break;

                            case 18:
                                _context6.prev = 18;
                                _context6.t0 = _context6['catch'](14);

                                console.log('Hdm, invalid JSON');
                                throw new Error('INVALID_JSON');

                            case 22:
                                $ = cheerio.load(htmlDetail.html);
                                arrServer = [];
                                arrServerEmbed = [];
                                itemServer = $('.ep-item');
                                arrPromise = false;


                                itemServer.each(function () {

                                    var nameEpisode = $(this).find('a').text();
                                    var idEpisode = $(this).attr('data-id');
                                    var server = $(this).attr('data-server');

                                    arrServer.push({ nameEpisode: nameEpisode, idEpisode: idEpisode });
                                });

                                if (type == 'movie') {

                                    arrPromise = arrServer.map(function () {
                                        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                            var urlToken, jsonEmbed;
                                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                while (1) {
                                                    switch (_context4.prev = _context4.next) {
                                                        case 0:
                                                            urlToken = URL.DOMAIN_EMBED(val.idEpisode, movieId);
                                                            _context4.next = 3;
                                                            return httpRequest.getHTML(urlToken);

                                                        case 3:
                                                            jsonEmbed = _context4.sent;
                                                            _context4.prev = 4;

                                                            jsonEmbed = JSON.parse(jsonEmbed);
                                                            _context4.next = 12;
                                                            break;

                                                        case 8:
                                                            _context4.prev = 8;
                                                            _context4.t0 = _context4['catch'](4);
                                                            _context4.next = 12;
                                                            return getEmbed(libs, val.idEpisode, hosts, detailUrl);

                                                        case 12:

                                                            jsonEmbed.status && hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "hdm"
                                                                },
                                                                result: {
                                                                    file: jsonEmbed.src,
                                                                    label: 'embed',
                                                                    type: 'embed'
                                                                }
                                                            });

                                                        case 13:
                                                        case 'end':
                                                            return _context4.stop();
                                                    }
                                                }
                                            }, _callee4, _this2, [[4, 8]]);
                                        }));

                                        return function (_x5) {
                                            return _ref5.apply(this, arguments);
                                        };
                                    }());
                                } else {

                                    arrPromise = arrServer.map(function () {
                                        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(val) {
                                            var numberEpisode, urlEmbed, jsonEmbed;
                                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                while (1) {
                                                    switch (_context5.prev = _context5.next) {
                                                        case 0:
                                                            numberEpisode = val.nameEpisode.match(/([0-9]+)/i);

                                                            numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                                            if (!(numberEpisode == episode)) {
                                                                _context5.next = 16;
                                                                break;
                                                            }

                                                            urlEmbed = URL.DOMAIN_EMBED(val.idEpisode);
                                                            _context5.next = 6;
                                                            return httpRequest.getHTML(urlEmbed);

                                                        case 6:
                                                            jsonEmbed = _context5.sent;
                                                            _context5.prev = 7;

                                                            jsonEmbed = JSON.parse(jsonEmbed);
                                                            _context5.next = 15;
                                                            break;

                                                        case 11:
                                                            _context5.prev = 11;
                                                            _context5.t0 = _context5['catch'](7);
                                                            _context5.next = 15;
                                                            return getEmbed(libs, val.idEpisode, hosts, detailUrl);

                                                        case 15:

                                                            jsonEmbed.status && hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "hdm"
                                                                },
                                                                result: {
                                                                    file: jsonEmbed.src,
                                                                    label: 'embed',
                                                                    type: 'embed'
                                                                }
                                                            });

                                                        case 16:
                                                        case 'end':
                                                            return _context5.stop();
                                                    }
                                                }
                                            }, _callee5, _this2, [[7, 11]]);
                                        }));

                                        return function (_x6) {
                                            return _ref6.apply(this, arguments);
                                        };
                                    }());
                                }

                                _context6.next = 31;
                                return Promise.all(arrPromise);

                            case 31:

                                this.state.hosts = hosts;

                            case 32:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[14, 18]]);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }, {
        key: 'getEmbed',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(libs, idEpisode, hosts, detailUrl) {
                var httpRequest, urlEmbed, jsonEmbed;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                httpRequest = libs.httpRequest;
                                urlEmbed = URL.DOMAIN_EMBED(idEpisode);
                                _context7.next = 4;
                                return httpRequest.getHTML(urlEmbed);

                            case 4:
                                jsonEmbed = _context7.sent;


                                try {
                                    jsonEmbed = JSON.parse(jsonEmbed);

                                    jsonEmbed.src && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "hdm"
                                        },
                                        result: {
                                            file: jsonEmbed.src,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                } catch (e) {
                                    console.log('Hdm, getEmbed, no json parse');
                                }

                            case 6:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getEmbed(_x7, _x8, _x9, _x10) {
                return _ref7.apply(this, arguments);
            }

            return getEmbed;
        }()
    }]);

    return Hdm;
}();

thisSource.function = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Hdm({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Hdm',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context8.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context8.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context8.abrupt('return', source.state.hosts);

                    case 10:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x11, _x12, _x13) {
        return _ref8.apply(this, arguments);
    };
}();

thisSource.testing = Hdm;
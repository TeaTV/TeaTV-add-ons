

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www3.fmovies.cloud',
    SEARCH: function SEARCH(title) {
        return 'http://www3.fmovies.cloud/movie/search/' + title;
    },
    DOMAIN_EPISODE: function DOMAIN_EPISODE(id) {
        return 'http://www3.fmovies.cloud/ajax/movie_episodes/' + id;
    },
    DOMAIN_TOKEN: function DOMAIN_TOKEN(eid, mid) {
        return 'http://www3.fmovies.cloud/ajax/movie_token?eid=' + eid + '&mid=' + mid;
    },
    DOMAIN_SOURCE: function DOMAIN_SOURCE(eid, x, y) {
        return 'http://www3.fmovies.cloud/ajax/movie_sources/' + eid + '?x=' + x + '&y=' + y;
    },
    DOMAIN_EMBED: function DOMAIN_EMBED(id) {
        return 'http://www3.fmovies.cloud/ajax/movie_embed/' + id;
    }
};

var FmoviesVc = function () {
    function FmoviesVc(props) {
        _classCallCheck(this, FmoviesVc);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(FmoviesVc, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYearMovie, libs, detailUrl, videoSeason, videoUrl, urlSearch, idMovie, title1, arrSearch, htmlSearch, $, itemSearch, arrPromise, htmlVideo, $_2, hrefWatching;

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
                                title1 = title;

                                if (title1.indexOf('Marvel') != -1) title1 = title1.replace(/Marvel'?s?\s/, '');

                                arrSearch = [];


                                if (type == 'movie') {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + ('+season+' + season));
                                }

                                _context2.next = 15;
                                return httpRequest.getHTML(urlSearch);

                            case 15:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.movies-list .ml-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.mli-info h2').text();
                                    var yearMovie = titleMovie.match(/\( *([0-9]+) *\)/i);
                                    yearMovie = yearMovie != null ? yearMovie[1] : false;
                                    titleMovie = titleMovie.replace(/\( *[0-9]+ *\)/i, '');
                                    var seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/\- *season *[0-9]+/i, '').trim();

                                    var hrefInfo = $(this).find('a').attr('data-url');

                                    if (stringHelper.shallowCompare(title, titleMovie) || stringHelper.shallowCompare(title1, titleMovie)) {
                                        arrSearch.push({ hrefMovie: hrefMovie, titleMovie: titleMovie, yearMovie: yearMovie, seasonMovie: seasonMovie, hrefInfo: hrefInfo });
                                    }
                                });

                                arrPromise = arrSearch.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        if (val.yearMovie) {
                                                            _context.next = 6;
                                                            break;
                                                        }

                                                        if (!val.hrefInfo) {
                                                            _context.next = 6;
                                                            break;
                                                        }

                                                        val.hrefInfo = URL.DOMAIN + val.hrefInfo;
                                                        _context.next = 5;
                                                        return getYearMovie(libs, val.hrefInfo);

                                                    case 5:
                                                        val.yearMovie = _context.sent;

                                                    case 6:
                                                        if (!(stringHelper.shallowCompare(title, val.titleMovie) && val.hrefMovie)) {
                                                            _context.next = 17;
                                                            break;
                                                        }

                                                        idMovie = val.hrefMovie.match(/([0-9]+)\/$/i);
                                                        idMovie = idMovie != null ? idMovie[1] : false;

                                                        if (!(type == 'movie' && val.seasonMovie == false && val.yearMovie == year)) {
                                                            _context.next = 14;
                                                            break;
                                                        }

                                                        videoUrl = val.hrefMovie;
                                                        return _context.abrupt('return');

                                                    case 14:
                                                        if (!(type == 'tv' && val.seasonMovie == season)) {
                                                            _context.next = 17;
                                                            break;
                                                        }

                                                        videoUrl = val.hrefMovie;
                                                        return _context.abrupt('return');

                                                    case 17:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 22;
                                return Promise.all(arrPromise);

                            case 22:
                                if (!videoUrl) {
                                    _context2.next = 29;
                                    break;
                                }

                                _context2.next = 25;
                                return httpRequest.getHTML(videoUrl);

                            case 25:
                                htmlVideo = _context2.sent;
                                $_2 = cheerio.load(htmlVideo);
                                hrefWatching = $_2('#mv-info a').attr('href');


                                if (hrefWatching) {

                                    detailUrl = hrefWatching;
                                }

                            case 29:
                                if (detailUrl) {
                                    _context2.next = 31;
                                    break;
                                }

                                throw new Error('NOT FOUND');

                            case 31:
                                this.state.detailUrl = detailUrl;
                                return _context2.abrupt('return');

                            case 33:
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
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, hrefInfo) {
                var httpRequest, cheerio, yearMovie, htmlInfo, $, itemInfo;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                httpRequest = libs.httpRequest, cheerio = libs.cheerio;
                                yearMovie = false;
                                _context3.next = 4;
                                return httpRequest.getHTML(hrefInfo);

                            case 4:
                                htmlInfo = _context3.sent;
                                $ = cheerio.load(htmlInfo);
                                itemInfo = $('.jt-info');


                                itemInfo.each(function () {

                                    var text = $(this).text();

                                    if (!isNaN(+text)) {

                                        yearMovie = text;
                                        return;
                                    }
                                });

                                return _context3.abrupt('return', yearMovie);

                            case 9:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getYearMovie(_x3, _x4) {
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
                                movieId = detailUrl.match(/\-([0-9]+)\/watching\.html/i);

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

                                console.log('fmoviesvc, invalid JSON', _context6.t0);
                                throw new Error('INVALID_JSON');

                            case 22:
                                $ = cheerio.load(htmlDetail.html);
                                arrServer = [];
                                arrServerEmbed = [];
                                itemServer = $('.btn-eps');
                                arrPromise = false;


                                itemServer.each(function () {

                                    var nameEpisode = $(this).attr('title');
                                    var idEpisode = $(this).attr('data-id');
                                    var server = $(this).attr('data-server');

                                    arrServer.push({ nameEpisode: nameEpisode, idEpisode: idEpisode });
                                });

                                if (type == 'movie') {

                                    arrPromise = arrServer.map(function () {
                                        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                            var urlToken, htmlToken, _x, _y, urlEmbed, jsonEmbed, item;

                                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                while (1) {
                                                    switch (_context4.prev = _context4.next) {
                                                        case 0:
                                                            urlToken = URL.DOMAIN_TOKEN(val.idEpisode, movieId);
                                                            _context4.next = 3;
                                                            return httpRequest.getHTML(urlToken);

                                                        case 3:
                                                            htmlToken = _context4.sent;
                                                            _x = htmlToken.match(/\_x *\= *\'([^\']+)/i);

                                                            _x = _x != null ? _x[1] : false;

                                                            _y = htmlToken.match(/\_y *\= *\'([^\']+)/i);

                                                            _y = _y != null ? _y[1] : false;

                                                            urlEmbed = URL.DOMAIN_SOURCE(val.idEpisode, _x, _y);
                                                            _context4.next = 11;
                                                            return httpRequest.getHTML(urlEmbed);

                                                        case 11:
                                                            jsonEmbed = _context4.sent;
                                                            _context4.prev = 12;

                                                            jsonEmbed = JSON.parse(jsonEmbed);
                                                            _context4.next = 20;
                                                            break;

                                                        case 16:
                                                            _context4.prev = 16;
                                                            _context4.t0 = _context4['catch'](12);
                                                            _context4.next = 20;
                                                            return getEmbed(libs, val.idEpisode, hosts, detailUrl);

                                                        case 20:

                                                            if (jsonEmbed.playlist && jsonEmbed.playlist.length > 0) {

                                                                for (item in jsonEmbed.playlist[0].sources) {

                                                                    jsonEmbed.playlist[0].sources[item].file && hosts.push({
                                                                        provider: {
                                                                            url: detailUrl,
                                                                            name: "fmoviesvc"
                                                                        },
                                                                        result: {
                                                                            file: jsonEmbed.playlist[0].sources[item].file,
                                                                            label: 'direct',
                                                                            type: 'direct'
                                                                        }
                                                                    });
                                                                }
                                                            }

                                                        case 21:
                                                        case 'end':
                                                            return _context4.stop();
                                                    }
                                                }
                                            }, _callee4, _this2, [[12, 16]]);
                                        }));

                                        return function (_x5) {
                                            return _ref5.apply(this, arguments);
                                        };
                                    }());
                                } else {

                                    arrPromise = arrServer.map(function () {
                                        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(val) {
                                            var numberEpisode, urlToken, htmlToken, _x, _y, urlEmbed, jsonEmbed, item;

                                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                while (1) {
                                                    switch (_context5.prev = _context5.next) {
                                                        case 0:
                                                            numberEpisode = val.nameEpisode.match(/([0-9]+)/i);

                                                            numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                                            if (!(numberEpisode == episode)) {
                                                                _context5.next = 24;
                                                                break;
                                                            }

                                                            urlToken = URL.DOMAIN_TOKEN(val.idEpisode, movieId);
                                                            _context5.next = 6;
                                                            return httpRequest.getHTML(urlToken);

                                                        case 6:
                                                            htmlToken = _context5.sent;
                                                            _x = htmlToken.match(/\_x *\= *\'([^\']+)/i);

                                                            _x = _x != null ? _x[1] : false;

                                                            _y = htmlToken.match(/\_y *\= *\'([^\']+)/i);

                                                            _y = _y != null ? _y[1] : false;

                                                            urlEmbed = URL.DOMAIN_SOURCE(val.idEpisode, _x, _y);
                                                            _context5.next = 14;
                                                            return httpRequest.getHTML(urlEmbed);

                                                        case 14:
                                                            jsonEmbed = _context5.sent;
                                                            _context5.prev = 15;

                                                            jsonEmbed = JSON.parse(jsonEmbed);
                                                            _context5.next = 23;
                                                            break;

                                                        case 19:
                                                            _context5.prev = 19;
                                                            _context5.t0 = _context5['catch'](15);
                                                            _context5.next = 23;
                                                            return getEmbed(libs, val.idEpisode, hosts, detailUrl);

                                                        case 23:

                                                            if (jsonEmbed.playlist && jsonEmbed.playlist.length > 0) {

                                                                for (item in jsonEmbed.playlist[0].sources) {

                                                                    jsonEmbed.playlist[0].sources[item].file && hosts.push({
                                                                        provider: {
                                                                            url: detailUrl,
                                                                            name: "fmoviesvc"
                                                                        },
                                                                        result: {
                                                                            file: jsonEmbed.playlist[0].sources[item].file,
                                                                            label: 'direct',
                                                                            type: 'direct'
                                                                        }
                                                                    });
                                                                }
                                                            }

                                                        case 24:
                                                        case 'end':
                                                            return _context5.stop();
                                                    }
                                                }
                                            }, _callee5, _this2, [[15, 19]]);
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
                                            name: "fmoviesvc"
                                        },
                                        result: {
                                            file: jsonEmbed.src,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                } catch (e) {
                                    console.log('fmoviesvc, getEmbed, no json parse', e);
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

    return FmoviesVc;
}();

thisSource.function = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new FmoviesVc({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'FmoviesVc',
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

thisSource.testing = FmoviesVc;
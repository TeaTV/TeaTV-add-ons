

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www9.fmovies.io',
    SEARCH: function SEARCH(title) {
        return 'https://www9.fmovies.io/search.html?keyword=' + title;
    }
};

var FmoviesPe = function () {
    function FmoviesPe(props) {
        _classCallCheck(this, FmoviesPe);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(FmoviesPe, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, detailSeason, urlSearch, htmlSearch, $, itemSearch, htmlEpisode, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                detailSeason = false;
                                urlSearch = '';


                                if (type == 'movie') {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + ('+season+' + season));
                                }

                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.wrapper .col2 ul li');


                                itemSearch.each(function () {

                                    var hrefMovie = URL.DOMAIN + $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('a h3').text();
                                    var seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/\- *season *[0-9]+/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && seasonMovie == false) {

                                            detailUrl = hrefMovie;
                                            return;
                                        } else if (type == 'tv' && seasonMovie == season) {

                                            detailSeason = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                if (!(type == 'tv' && detailSeason != false)) {
                                    _context.next = 25;
                                    break;
                                }

                                _context.prev = 13;
                                _context.next = 16;
                                return httpRequest.getHTML(detailSeason);

                            case 16:
                                htmlEpisode = _context.sent;
                                $_2 = cheerio.load(htmlEpisode);
                                itemEpisode = $_2('.eps .server ul li');


                                itemEpisode.each(function () {

                                    var hrefEpisode = $(this).find('a').attr('href');
                                    var episodeMovie = hrefEpisode.match(/\-episode\-([0-9]+)/i);
                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                    if (episodeMovie == episode) {
                                        detailUrl = URL.DOMAIN + hrefEpisode;
                                    }
                                });
                                _context.next = 25;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t0 = _context['catch'](13);
                                throw new Error('ERROR');

                            case 25:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 27:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[13, 22]]);
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
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, type, episode, hosts, detailUrl, htmlDetail, vidnode2, vidnode3, thevideo, yourupload, openload, streamango;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                htmlDetail = '';
                                _context2.prev = 7;
                                _context2.next = 10;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 10:
                                htmlDetail = _context2.sent;
                                _context2.next = 15;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](7);

                            case 15:
                                vidnode2 = htmlDetail.match(/link\_server\_f2 *\= *\"*\'*([^\"*\'*]+)/i);

                                vidnode2 = vidnode2 != null ? vidnode2[1] : false;
                                vidnode3 = htmlDetail.match(/link\_server\_vidnode *\= *\"*\'*([^\"*\'*]+)/i);

                                vidnode3 = vidnode3 != null ? vidnode3[1] : false;
                                thevideo = htmlDetail.match(/link\_server\_thevideo *\= *\"*\'*([^\"*\'*]+)/i);

                                thevideo = thevideo != null ? thevideo[1] : false;
                                yourupload = htmlDetail.match(/link\_server\_yourupload *\= *\"*\'*([^\"*\'*]+)/i);

                                yourupload = yourupload != null ? yourupload[1] : false;
                                openload = htmlDetail.match(/link\_server\_openload *\= *\"*\'*([^\"*\'*]+)/i);

                                openload = openload != null ? openload[1] : false;
                                streamango = htmlDetail.match(/link\_server\_streamango *\= *\"*\'*([^\"*\'*]+)/i);

                                streamango = streamango != null ? streamango[1] : false;

                                if (vidnode2 != false && vidnode2.indexOf('http:') == -1 && vidnode2.indexOf('https:') == -1) {
                                    vidnode2 = 'http:' + vidnode2;
                                }
                                if (vidnode3 != false && vidnode3.indexOf('http:') == -1 && vidnode3.indexOf('https:') == -1) {
                                    vidnode3 = 'http:' + vidnode3;
                                }

                                if (yourupload != false && yourupload.indexOf('http:') == -1 && yourupload.indexOf('https:') == -1) {
                                    yourupload = 'https:' + yourupload;
                                }

                                if (vidnode2 != false) {
                                    hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "fmoviespe"
                                        },
                                        result: {
                                            file: vidnode2,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                if (streamango != false) {
                                    hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "fmoviespe"
                                        },
                                        result: {
                                            file: streamango,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                if (openload != false) {
                                    hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "fmoviespe"
                                        },
                                        result: {
                                            file: openload,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                if (vidnode3 != false) {
                                    hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "fmoviespe"
                                        },
                                        result: {
                                            file: vidnode3,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                if (thevideo != false) {
                                    hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "fmoviespe"
                                        },
                                        result: {
                                            file: thevideo,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                if (yourupload != false) {
                                    hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "fmoviespe"
                                        },
                                        result: {
                                            file: yourupload,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                this.state.hosts = hosts;

                            case 37:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[7, 13]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return FmoviesPe;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new FmoviesPe({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'FmoviesPe',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context3.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context3.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context3.abrupt('return', source.state.hosts);

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = FmoviesPe;
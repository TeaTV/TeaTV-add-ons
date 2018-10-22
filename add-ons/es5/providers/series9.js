

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www1.series9.io',
    GET_INFO: function GET_INFO(slug) {
        return 'https://www1.series9.io' + slug;
    },
    SEARCH: function SEARCH(title) {
        return 'https://api.ocloud.stream/series/ajax/suggest_search?keyword=' + title + '&img=%2F%2Fcdn.themovieseries.net%2F&link_web=https%3A%2F%2Fwww1.series9.io%2F';
        // return `https://api.yesmovie.io/series//movie/search/${title}`;
    }
};

var Series9 = function () {
    function Series9(props) {
        _classCallCheck(this, Series9);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Series9, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, getYear, urlSearch, detailUrl, title1, htmlSearch, $, itemSearch, arrInfo, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                getYear = this.getYear;
                                urlSearch = false;
                                detailUrl = false;
                                title1 = title;

                                if (title1.indexOf('Marvel') != -1) {
                                    title1 = title1.replace(/Marvel'?s?\s/, '');
                                }

                                if (type == 'movie') {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title1));
                                } else {

                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title1) + ('-season-' + season));
                                }

                                _context3.next = 10;
                                return httpRequest.getHTML(urlSearch);

                            case 10:
                                htmlSearch = _context3.sent;

                                htmlSearch = JSON.parse(htmlSearch);
                                htmlSearch = htmlSearch.content;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('ul li');
                                arrInfo = [];


                                itemSearch.each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var hrefMovie, titleMovie, seasonMovie;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    hrefMovie = $(this).find('a').attr('href');
                                                    titleMovie = $(this).find('.ss-title').text();
                                                    seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);

                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '');
                                                    titleMovie = titleMovie.replace(/\- *season.*/i, '');
                                                    titleMovie = titleMovie.trim();

                                                    if (stringHelper.shallowCompare(title1, titleMovie)) {

                                                        if (type == 'movie' && !seasonMovie) {
                                                            arrInfo.push(hrefMovie);
                                                        } else if (type == 'tv' && seasonMovie == season) {
                                                            arrInfo.push(hrefMovie);
                                                        }
                                                    }

                                                case 8:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                })));

                                arrPromise = arrInfo.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlVideo, $, yearMovie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(val);

                                                    case 2:
                                                        htmlVideo = _context2.sent;
                                                        $ = cheerio.load(htmlVideo);
                                                        yearMovie = $('p:contains(Release)').text();

                                                        yearMovie = yearMovie.replace('Release', '');
                                                        yearMovie = yearMovie.replace(':', '').trim();

                                                        if (!(type == 'movie' && yearMovie == year)) {
                                                            _context2.next = 12;
                                                            break;
                                                        }

                                                        detailUrl = val;
                                                        return _context2.abrupt('return');

                                                    case 12:

                                                        detailUrl = val;
                                                        return _context2.abrupt('return');

                                                    case 14:
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
                                _context3.next = 20;
                                return Promise.all(arrPromise);

                            case 20:

                                this.state.detailUrl = detailUrl;
                                return _context3.abrupt('return');

                            case 22:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, detailUrl, htmlDetail, $, itemEpisode;

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
                                $ = cheerio.load(htmlDetail);
                                itemEpisode = $('#list-eps .le-server');


                                if (type == 'movie') {

                                    itemEpisode.each(function () {

                                        var linkEmbed = $(this).find('.les-content a').attr('player-data');

                                        if (linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1) {
                                            linkEmbed = 'http:' + linkEmbed;
                                        }

                                        linkEmbed && hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "series9"
                                            },
                                            result: {
                                                file: linkEmbed,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    });
                                } else if (type == 'tv') {

                                    itemEpisode = $('.btn-eps');

                                    itemEpisode.each(function () {

                                        var linkEmbed = $(this).attr('player-data');
                                        var episodeMovie = $(this).text();
                                        episodeMovie = episodeMovie.replace(/episode */i, '').trim();

                                        if (episodeMovie == episode) {

                                            if (linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1) {
                                                linkEmbed = 'http:' + linkEmbed;
                                            }

                                            linkEmbed && hosts.push({
                                                provider: {
                                                    url: detailUrl,
                                                    name: "series9"
                                                },
                                                result: {
                                                    file: linkEmbed,
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    });
                                }

                                this.state.hosts = hosts;
                                return _context4.abrupt('return');

                            case 15:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Series9;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Series9({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Series9',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context5.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context5.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context5.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = Series9;
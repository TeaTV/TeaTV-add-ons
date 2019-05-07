

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://gomovieshub.sc',
    SEARCH: function SEARCH(title) {
        return 'https://gomovieshub.sc/browse-word/' + title + '/';
    }
};

var GoMovieshub = function () {
    function GoMovieshub(props) {
        _classCallCheck(this, GoMovieshub);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(GoMovieshub, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch, htmlWatching, $_2;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = '';


                                if (type == 'movie') {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + ('+' + year);
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + ('+season+' + season);
                                }

                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.movies-list .ml-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').first().attr('href');
                                    var titleMovie = $(this).find('a').first().attr('oldtitle');
                                    var seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();
                                    titleMovie = titleMovie.replace(/ *\- *season *[0-9]+/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && seasonMovie == false) {

                                            detailUrl = hrefMovie;
                                            return;
                                        } else if (type == 'tv' && seasonMovie == season) {

                                            detailUrl = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                _context.next = 13;
                                return httpRequest.getHTML(detailUrl);

                            case 13:
                                htmlWatching = _context.sent;
                                $_2 = cheerio.load(htmlWatching);


                                detailUrl = $_2('#mv-info a').attr('href');

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 18:
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
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, type, year, episode, hosts, arrRedirect, detailUrl, htmlDetail, $, itemYear, yearMovie, itemServer;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, year = _movieInfo2.year, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 9:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                itemYear = $('.mvici-right p');
                                yearMovie = 0;


                                itemYear.each(function () {

                                    var strong = $(this).find('strong').text();

                                    if (strong.indexOf('Release') != -1) {
                                        yearMovie = $(this).find('a').text();
                                    }
                                });

                                if (!(type == 'movie' && +yearMovie != year)) {
                                    _context2.next = 16;
                                    break;
                                }

                                throw new Error('NOT FOUND');

                            case 16:
                                itemServer = $('#list-eps .le-server');


                                itemServer.each(function () {

                                    var linkEmbed = false;
                                    var itemEpisode = $(this).find('.les-content a');

                                    itemEpisode.each(function () {

                                        if (type == 'movie') {

                                            if ($(this).attr('data-strgo')) {

                                                linkEmbed = 'https://streamgo.me/player/' + $(this).attr('data-strgo');
                                            } else if ($(this).attr('data-openload')) {
                                                linkEmbed = 'https://openload.co/embed/' + $(this).attr('data-openload');
                                            }
                                        } else {

                                            var episodeMovie = $(this).attr('title');
                                            episodeMovie = episodeMovie.match(/episode *([0-9]+)/i);
                                            episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                            if (episodeMovie == episode) {

                                                if ($(this).attr('data-strgo')) {

                                                    linkEmbed = 'https://streamgo.me/player/' + $(this).attr('data-strgo');
                                                } else if ($(this).attr('data-openload')) {
                                                    linkEmbed = 'https://openload.co/embed/' + $(this).attr('data-openload');
                                                }
                                            }
                                        }
                                    });

                                    linkEmbed && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "gomoviessc"
                                        },
                                        result: {
                                            file: linkEmbed,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 20:
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

    return GoMovieshub;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var gomoviehub;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        gomoviehub = new GoMovieshub({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return gomoviehub.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return gomoviehub.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', gomoviehub.state.hosts);

                    case 6:
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

thisSource.testing = GoMovieshub;
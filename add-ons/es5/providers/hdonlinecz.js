

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://hdonline.cz/",
    SEARCH: function SEARCH(title) {
        return 'http://hdonline.cz/?s=' + title;
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var HdonlineCz = function () {
    function HdonlineCz(props) {
        _classCallCheck(this, HdonlineCz);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(HdonlineCz, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, videoUrl, detailUrl, urlSearch, htmlSearch, $, itemSearch, htmlVideo, _$, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                videoUrl = false;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.movies-list .ml-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.mli-info h2').text();
                                    var yearMovie = $(this).find('a[rel=tag]').text();
                                    yearMovie = yearMovie.match(/([0-9]+)/i);
                                    yearMovie = yearMovie != null ? yearMovie[1] : false;

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && year == yearMovie) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv') {
                                            videoUrl = hrefMovie;
                                        }
                                        return;
                                    }
                                });

                                if (!(videoUrl && type == 'tv')) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 14;
                                return httpRequest.getHTML(videoUrl);

                            case 14:
                                htmlVideo = _context.sent;
                                _$ = cheerio.load(htmlVideo);
                                itemSeason = _$('#seasons .tvseason');


                                itemSeason.each(function () {

                                    var nameSeason = _$(this).find('.les-title strong').text();
                                    var numberSeason = nameSeason.match(/([0-9]+)/i);
                                    numberSeason = numberSeason != null ? numberSeason[1] : false;

                                    if (numberSeason == season) {

                                        var itemEpisode = _$(this).find('.les-content a');

                                        itemEpisode.each(function () {

                                            var hrefEpisode = _$(this).attr('href');
                                            var numberEpisode = hrefEpisode.match(/-episode-([0-9]+)/i);
                                            numberEpisode = numberEpisode != null ? numberEpisode[1] : false;

                                            if (numberEpisode == episode) {
                                                detailUrl = hrefEpisode;
                                                return;
                                            }
                                        });
                                    }
                                });

                            case 18:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 20:
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
                var _libs2, httpRequest, cheerio, qs, hosts, detailUrl, htmlDetail, $, itemIframe;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context2.sent;
                                $ = cheerio.load(htmlDetail);
                                itemIframe = $('.movieplay');


                                itemIframe.each(function () {

                                    var hrefEmbed = $(this).find('iframe').attr('src');

                                    if (hrefEmbed && hrefEmbed.indexOf('http:') == -1 && hrefEmbed.indexOf('https:') == -1) {
                                        hrefEmbed = 'http:' + hrefEmbed.trim();
                                    }

                                    hrefEmbed && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "HdonlineCz"
                                        },
                                        result: {
                                            file: hrefEmbed,
                                            label: "embed",
                                            type: "direct"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 13:
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

    return HdonlineCz;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new HdonlineCz({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'HdonlineCz',
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

                        _context3.next = 11;
                        return httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                    case 11:
                        return _context3.abrupt('return', source.state.hosts);

                    case 12:
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

thisSource.testing = HdonlineCz;
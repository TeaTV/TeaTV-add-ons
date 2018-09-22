

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {

    DOMAIN: "http://321movies.club",
    SEARCH: function SEARCH(title) {
        return 'http://321movies.club/search-movies/' + title + '.html';
    },
    HEADERS: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'http://321movies.club',
        'Accept-Language': 'vi-VN,vi;q=0.8,fr-FR;q=0.6,fr;q=0.4,en-US;q=0.2,en;q=0.2',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

var ThreeMovies = function () {
    function ThreeMovies(props) {
        _classCallCheck(this, ThreeMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(ThreeMovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, qs, _movieInfo, title, year, season, episode, type, detailUrl, tvshowVideo, urlSearch, htmlSearch, $, itemSearch, htmlVideo, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                tvshowVideo = false;
                                urlSearch = '';

                                if (type == 'movie') {

                                    urlSearch = URL.SEARCH(title.replace(/\s+/g, '+'));
                                } else {
                                    urlSearch = URL.SEARCH(title.replace(/\s+/g, '+') + ('+season+' + season));
                                }
                                //console.log(urlSearch, 'f');
                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.tab-content .movies-list');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var tip = $(this).find('.ml-item a').attr('onmouseover');
                                    tip = tip.replace("Tip('", '');
                                    tip = tip.replace("', WIDTH, -300, FONTFACE, 'Arial, Tahoma', FONTSIZE, '13px')", "");

                                    if (tip != false) {
                                        var $_2 = cheerio.load(tip);
                                        var titleMovie = $_2('b i').text();
                                        var yearMovie = $_2('b:contains(Release)').text();
                                        yearMovie = yearMovie.replace(/Release *\:/i, '').trim();
                                        //console.log(titleMovie, yearMovie, 'f');
                                        var seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                                        seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                        titleMovie = titleMovie.replace(/\:* *season *[0-9]+/i, '');
                                        titleMovie = titleMovie.replace(/\( *[0-9]+ *\)/i, '');

                                        if (stringHelper.shallowCompare(titleMovie, title)) {

                                            if (type == 'movie' && yearMovie == year) {
                                                detailUrl = hrefMovie;
                                                return;
                                            } else if (type == 'tv' && seasonMovie == season) {

                                                tvshowVideo = hrefMovie;
                                                return;
                                            }
                                        }
                                    }
                                });

                                if (!(type == 'tv' && tvshowVideo != false)) {
                                    _context.next = 19;
                                    break;
                                }

                                _context.next = 15;
                                return httpRequest.getHTML(tvshowVideo);

                            case 15:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                itemEpisode = $_2('#details .episode');


                                itemEpisode.each(function () {
                                    var numberEpisode = $_2(this).text();
                                    var hrefEpisode = $_2(this).attr('href');

                                    if (numberEpisode == episode) {

                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 19:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
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
                var _this = this;

                var _libs2, httpRequest, cheerio, base64, _, hosts, detailUrl, htmlDetail, decode, iframe, arrBackup, $, itemBackup, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, _ = _libs2._;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context3.sent;
                                decode = htmlDetail.match(/document\.write\(Base64\.decode\(\"([^\"]+)/i);

                                decode = decode != false ? decode[1] : false;

                                if (decode != false) {
                                    decode = base64.decode(decode);
                                    iframe = decode.match(/src\=\"([^\"]+)/i);

                                    iframe = iframe != false ? iframe[1] : false;

                                    iframe && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "321movies"
                                        },
                                        result: {
                                            file: iframe,
                                            label: "embed",
                                            type: 'embed'
                                        }
                                    });
                                }

                                arrBackup = [];
                                $ = cheerio.load(htmlDetail);
                                itemBackup = $('#total_version .server_line');


                                itemBackup.each(function () {
                                    var hrefDetail = $(this).find('.server_play a').attr('href');

                                    arrBackup.push(hrefDetail);
                                });
                                arrBackup = _.dropRight(arrBackup, arrBackup.length - 10);

                                arrPromise = arrBackup.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var _iframe;

                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(val);

                                                    case 2:
                                                        htmlDetail = _context2.sent;


                                                        decode = htmlDetail.match(/document\.write\(Base64\.decode\(\"([^\"]+)/i);
                                                        decode = decode != false ? decode[1] : false;

                                                        if (decode != false) {
                                                            decode = base64.decode(decode);
                                                            _iframe = decode.match(/src\=\"([^\"]+)/i);

                                                            _iframe = _iframe != false ? _iframe[1] : false;

                                                            _iframe && hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "321movies"
                                                                },
                                                                result: {
                                                                    file: _iframe,
                                                                    label: "embed",
                                                                    type: 'embed'
                                                                }
                                                            });
                                                        }

                                                    case 6:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 19;
                                return Promise.all(arrPromise);

                            case 19:

                                this.state.hosts = hosts;

                            case 20:
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

    return ThreeMovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new ThreeMovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: '321Movies',
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

thisSource.testing = ThreeMovies;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://yomovies.it',
    SEARCH: function SEARCH(title) {
        return 'http://yomovies.it/?s=' + title;
    },
    EPISODE: function EPISODE(title, ss, ep) {
        return 'https://yomovies.it/episodes/' + title + '-' + ss + 'x' + ep + '/';
    },
    EMBED: 'https://yomovies.it/wp-admin/admin-ajax.php'
};

var Yomoviesit = function () {
    function Yomoviesit(props) {
        _classCallCheck(this, Yomoviesit);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Yomoviesit, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;

                                //console.log('yomoviesit', title);

                                detailUrl = false;
                                urlSearch = false;

                                if (!(type == 'movie')) {
                                    _context.next = 14;
                                    break;
                                }

                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch);

                            case 8:
                                htmlSearch = _context.sent;

                                //console.log('yomoviesit htmlSearch', title);
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.search-page .result-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('.details .title a').attr('href');
                                    var titleMovie = $(this).find('.details .title a').text();
                                    var m = titleMovie.match(/\((\d+)\)/);
                                    var yearMovie = 2222;
                                    if (m != undefined) yearMovie = m[1];
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie) && year == yearMovie) {

                                        if (type == 'movie') {

                                            if (+yearMovie == year) {

                                                detailUrl = hrefMovie;
                                            }
                                        }
                                    }
                                });
                                _context.next = 15;
                                break;

                            case 14:
                                detailUrl = URL.EPISODE(stringHelper.convertToSearchQueryString(title, '-'), season, episode);

                            case 15:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 17:
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

                var _libs2, httpRequest, cheerio, base64, detailUrl, hosts, htmlDetail, $, data, embeds, dataPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                detailUrl = this.state.detailUrl;
                                //console.log('yomoviesit hasdetailUrl', detailUrl);

                                hosts = [];
                                _context3.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                //console.log('yomoviesit hasdetailHTML', htmlDetail);

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

                                //console.log('yomoviesit', data);


                                dataPromise = data.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(d) {
                                        var posts, pHtml, m;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        posts = {
                                                            action: 'doo_player_ajax',
                                                            post: d.dpost,
                                                            nume: d.dnume,
                                                            type: d.dType
                                                        };
                                                        _context2.next = 3;
                                                        return httpRequest.post(URL.EMBED, { 'Referer': detailUrl }, posts);

                                                    case 3:
                                                        pHtml = _context2.sent;

                                                        //console.log('yomoviesit pHtml', pHtml);
                                                        m = pHtml.data.match(/src='([^']+)/);

                                                        if (m != undefined) hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Yomoviesit"
                                                            },
                                                            result: {
                                                                file: m[1],
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

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
                                _context3.next = 15;
                                return Promise.all(dataPromise);

                            case 15:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 17:
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

    return Yomoviesit;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Yomoviesit({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'yomoviesit1',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 6;
                        return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                    case 6:
                        res = _context4.sent;
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
                            _context4.next = 23;
                            break;
                        }

                        _context4.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context4.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 18;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context4.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context4.next = 23;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }

                        return _context4.abrupt('return', hosts);

                    case 25:
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

thisSource.testing = Yomoviesit;
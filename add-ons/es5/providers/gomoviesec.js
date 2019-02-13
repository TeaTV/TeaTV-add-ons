

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://gomovies.ec",
    SEARCH: function SEARCH(title) {
        return 'https://gomovies.ec/movie/search/' + title;
    },
    HEADERS: function HEADERS() {
        var time = Math.round(+new Date());
        return {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': 'https://gomovies.ec/'
        };
    }, EMBED: function EMBED(ep) {
        return 'https://gomovies.ec/ajax/v2_get_sources?id=' + ep;
    }

};

var sleep = function sleep(milliseconds) {
    return new Promise(function (resolve) {
        return setInterval(resolve, milliseconds);
    });
};

var Gomoviesec = function () {
    function Gomoviesec(props) {
        _classCallCheck(this, Gomoviesec);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.cookies = '';
    }

    _createClass(Gomoviesec, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, dataSearch, $, as;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('hahaheheeh');
                                _context.next = 3;
                                return sleep(10000);

                            case 3:
                                console.log('hahaha');
                                throw new Error('dis');

                            case 12:
                                dataSearch = _context.sent;

                                if (dataSearch.cookies) this.cookies = dataSearch.cookies;
                                $ = cheerio.load(dataSearch.data);
                                as = $('.movies-list .ml-item a');


                                as.each(function () {
                                    var yearOk = false;
                                    var hrefMovie = $(this).attr('href');
                                    var titleMovie = $(this).attr('title');
                                    if (titleMovie.indexOf(year)) yearOk = true;
                                    var seasonMovie = titleMovie.match(/ *season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;

                                    if (seasonMovie != false) {
                                        titleMovie = titleMovie.replace(/ - *season.*/i, '');
                                    } else {
                                        titleMovie = titleMovie.replace(/ \([0-9]+\)/i, '');
                                    }

                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                        if (type == 'movie' && yearOk) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv' && seasonMovie == season) {
                                            detailUrl = hrefMovie;
                                        }
                                    }
                                });
                                _context.next = 22;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](8);

                                console.log(String(_context.t0));

                            case 22:

                                if (detailUrl) detailUrl = detailUrl + 'watching.html';

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 25:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 19]]);
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, headers, htmlDetail, $, arrRedirect, itemRedirect, replace, arrPromise;

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
                                headers = URL.HEADERS();
                                //console.log('it is here', this.cookies, this.state.detailUrl);

                                if (this.cookies) {
                                    _context3.next = 9;
                                    break;
                                }

                                throw new Error('NO_COOKIE');

                            case 9:
                                headers['cookie'] = this.cookies;
                                _context3.next = 12;
                                return httpRequest.getHTML(this.state.detailUrl, headers);

                            case 12:
                                htmlDetail = _context3.sent;

                                //console.log(htmlDetail, 'fff');
                                $ = cheerio.load(htmlDetail);
                                arrRedirect = [];
                                itemRedirect = $('#selectServer option');
                                replace = false;


                                if (type == 'tv') {
                                    $('.btn-eps').each(function () {
                                        var href = $(this).attr('href');
                                        var ep = $(this).text();

                                        if (+ep == episode) {
                                            var m = href.match(/=([0-9]+)/);
                                            if (m != undefined) replace = +m[1];
                                        }
                                    });
                                }

                                itemRedirect.each(function () {
                                    var linkRedirect = $(this).attr('value');
                                    var server = $(this).text().toLowerCase();
                                    var m = linkRedirect.match(/episode_id=([0-9]+)/);
                                    var episode_id = m[1];
                                    if (replace) episode_id = replace;
                                    arrRedirect.push({ e: episode_id, s: server });
                                });

                                console.log(arrRedirect, 'a');

                                arrPromise = arrRedirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var htmlRedirect, js;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(URL.DOMAIN + '/ajax/v3_get_sources?s=' + val.s + '&id=' + val.e, headers);

                                                    case 2:
                                                        htmlRedirect = _context2.sent;
                                                        js = void 0;
                                                        _context2.prev = 4;

                                                        js = JSON.parse(htmlRedirect);
                                                        console.log(js, 'js0');

                                                        _context2.next = 9;
                                                        return httpRequest.getHTML(js.value, headers);

                                                    case 9:
                                                        js = _context2.sent;

                                                        js = JSON.parse(js);
                                                        _context2.next = 17;
                                                        break;

                                                    case 13:
                                                        _context2.prev = 13;
                                                        _context2.t0 = _context2['catch'](4);

                                                        console.log('json err', _context2.t0);
                                                        return _context2.abrupt('return', false);

                                                    case 17:

                                                        js['playlist'] != undefined && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "gaumovi"
                                                            },
                                                            result: {
                                                                file: js['playlist'][0]['file'],
                                                                label: "embed",
                                                                type: 'direct'
                                                            }
                                                        });

                                                        js['fb'] != undefined && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "gaumovi"
                                                            },
                                                            result: {
                                                                file: js['fb'],
                                                                label: "embed",
                                                                type: 'direct'
                                                            }
                                                        });

                                                    case 19:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[4, 13]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 23;
                                return Promise.all(arrPromise);

                            case 23:

                                this.state.hosts = hosts;

                            case 24:
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

    return Gomoviesec;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Gomoviesec({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'gomovies',
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

thisSource.testing = Gomoviesec;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://www3.123movies0.com",
    SEARCH: function SEARCH(title) {
        return 'https://www3.123movies0.com/movie/search/' + title;
    },
    DOMAIN_DECODE: '',
    HEADERS: function HEADERS(referer) {
        return {
            'authority': 'www3.123movies0.com',
            'cache-control': 'max-age=0',
            'origin': 'https://www3.123movies0.com',
            'upgrade-insecure-requests': '1',
            'content-type': 'application/x-www-form-urlencoded',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'referer': referer,
            // 'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'vi,en-US;q=0.9,en;q=0.8'
        };
    }
};

var S123movies0 = function () {
    function S123movies0(props) {
        _classCallCheck(this, S123movies0);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(S123movies0, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, movieflixter, detailUrl, videoUrl, tvshowVideoUrl, titleSearch, dataSearch, $, yearVal, divHoldData, titleVal;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                movieflixter = this;
                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 6;
                                titleSearch = title.toLowerCase();

                                titleSearch = titleSearch.replace(/\s/g, "-");

                                dataSearch = "";

                                if (!(type == "movie")) {
                                    _context.next = 14;
                                    break;
                                }

                                _context.next = 13;
                                return httpRequest.getHTML(URL.SEARCH(titleSearch));

                            case 13:
                                dataSearch = _context.sent;

                            case 14:
                                if (!(type == "tv")) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 17;
                                return httpRequest.getHTML(URL.SEARCH(titleSearch + '-season-' + season));

                            case 17:
                                dataSearch = _context.sent;

                            case 18:
                                console.log(URL.SEARCH(titleSearch + '-season-' + season));

                                $ = cheerio.load(dataSearch);
                                yearVal = void 0;
                                divHoldData = $('.ml-item');
                                titleVal = void 0;


                                divHoldData.each(function () {
                                    yearVal = $(this).find('.jt-info').eq(1).text();
                                    titleVal = $(this).find('h2').text();

                                    if (titleVal.toLowerCase().indexOf(title.toLowerCase()) !== -1 && yearVal.toString().indexOf(year) !== -1 && type == 'movie') {
                                        detailUrl = $(this).find('a').attr('href') + "/watching.html";
                                    } else if (titleVal.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
                                        detailUrl = $(this).find('a').attr('href') + "/watching.html";
                                    }
                                });

                                console.log(detailUrl);
                                this.state.detailUrl = detailUrl;
                                _context.next = 31;
                                break;

                            case 28:
                                _context.prev = 28;
                                _context.t0 = _context['catch'](6);

                                console.log(String(_context.t0));

                            case 31:
                                return _context.abrupt('return');

                            case 32:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 28]]);
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

                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, sources, servers, checkSeason, _servers, sourcesPromise;

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
                                sources = [];


                                if (type == "movie") {
                                    servers = $('#list-eps .le-server');


                                    servers.each(function () {
                                        var hostName = $(this).find('strong').text().toLowerCase();
                                        var onclick = "";

                                        if (hostName.indexOf("openload") !== -1 && sources.length < 20) {
                                            onclick = 'https://openload.co/embed/' + $(this).find('a').attr('data-' + 'openload');
                                        }
                                        sources.push(onclick);
                                    });
                                }

                                if (type == "tv") {
                                    checkSeason = this.state.detailUrl.match(/-season-(\d)/);

                                    if (checkSeason[1] == season) {
                                        _servers = $('#list-eps .le-server');

                                        _servers.each(function () {
                                            var hostName = $(this).find('strong').text().toLowerCase();
                                            var onclick = "";
                                            if (hostName.indexOf("openload") != -1 && sources.length < 20) {
                                                var checkEpisode = $(this).find('a');
                                                checkEpisode.each(function (i, e) {
                                                    if (e.attribs['episode-id'] == episode) {
                                                        onclick = 'https://openload.co/embed/' + e.attribs['data-' + 'openload'];
                                                    }
                                                });
                                            }
                                            sources.push(onclick);
                                        });
                                    }
                                }

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (link) {
                                                            if (hosts.length < 20) {
                                                                hosts.push({
                                                                    provider: {
                                                                        url: detailUrl,
                                                                        name: "seriesfree"
                                                                    },
                                                                    result: {
                                                                        file: link,
                                                                        label: "embed",
                                                                        type: "embed"
                                                                    }
                                                                });
                                                            }
                                                        }

                                                    case 1:
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
                                _context3.next = 16;
                                return Promise.all(sourcesPromise);

                            case 16:
                                this.state.hosts = hosts;

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

    return S123movies0;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new S123movies0({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: '123movies0',
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

thisSource.testing = S123movies0;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://seehd.biz/",
    SEARCH: function SEARCH(title) {
        return 'https://seehd.biz/?s=' + title;
    },
    DOMAIN_DECODE: '',
    HEADERS: function HEADERS() {
        return {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_' + Math.round(+new Date()) + ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': 'http://www.scnsrc.me/' + Math.round(+new Date())
        };
    }
};

var Seehdbiz = function () {
    function Seehdbiz(props) {
        _classCallCheck(this, Seehdbiz);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Seehdbiz, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, movieflixter, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch, $, itemSearch;

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
                                urlSearch = URL.SEARCH(title);
                                _context.prev = 8;
                                _context.next = 11;
                                return httpRequest.getCloudflare(urlSearch, URL.HEADERS());

                            case 11:
                                dataSearch = _context.sent;
                                _context.next = 17;
                                break;

                            case 14:
                                _context.prev = 14;
                                _context.t0 = _context['catch'](8);
                                throw new Error('NOT_FOUND');

                            case 17:
                                $ = cheerio.load(dataSearch.data);
                                itemSearch = $('.item_1 .item');

                                itemSearch.each(function () {
                                    var yearVal = $(this).find('.year').text();
                                    var titleVal = $(this).find('h2').text();

                                    var linkDetailVal = $(this).find('a:nth-child(1)').attr('href');
                                    var typeVal = titleVal.search('Season') !== -1 ? 'tv' : 'movie';
                                    var seasonVal = titleVal.match(/Season.[0-9]*/);
                                    var episodeVal = titleVal.match(/Episode.[0-9]*/);

                                    if (seasonVal && episodeVal) {
                                        seasonVal = seasonVal[0].match(/\d/);
                                        episodeVal = episodeVal[0].match(/\d/);
                                    }

                                    if (typeVal == 'movie') {
                                        if (yearVal == year && titleVal.toLowerCase().search(title.toLowerCase()) !== -1 && typeVal == type) {
                                            detailUrl = linkDetailVal;
                                        }
                                    }

                                    if (typeVal == 'tv') {
                                        if (titleVal.toLowerCase().search(title.toLowerCase()) !== -1 && typeVal == type && seasonVal == season && episodeVal == episode) {
                                            detailUrl = linkDetailVal;
                                        }
                                    }
                                });
                                _context.next = 25;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t1 = _context['catch'](6);

                                console.log(String(_context.t1));

                            case 25:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 27:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 22], [8, 14]]);
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, servers, sources, sourcesPromise;

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
                                _context3.prev = 6;
                                _context3.next = 9;
                                return httpRequest.getCloudflare(this.state.detailUrl, URL.HEADERS());

                            case 9:
                                htmlDetail = _context3.sent;
                                _context3.next = 15;
                                break;

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](6);
                                throw new Error('NOT_FOUND');

                            case 15:
                                $ = cheerio.load(htmlDetail.data);
                                servers = $(".movieplay script");
                                sources = [];

                                servers.each(function () {
                                    var onclick = $(this).text();

                                    //console.log(onclick);
                                    var rawLink = onclick.split(";");
                                    rawLink = rawLink[0].slice(4);
                                    rawLink = rawLink.replace(/'/g, "");
                                    rawLink = unescape(rawLink.replace(/@/g, '%'));
                                    if (rawLink) {
                                        rawLink = rawLink.match(/src="([^"]+)/);
                                        // console.log(rawLink[1]);
                                        sources.push(rawLink[1]);
                                    }
                                });

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        // console.log(`LINK ${iframe} ${html.data}`)
                                                        if (link != undefined) {
                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "seehdbix"
                                                                },
                                                                result: {
                                                                    file: link,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 1:
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
                                _context3.next = 22;
                                return Promise.all(sourcesPromise);

                            case 22:
                                this.state.hosts = hosts;

                            case 23:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[6, 12]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Seehdbiz;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Seehdbiz({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'seehdbiz',
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

thisSource.testing = Seehdbiz;
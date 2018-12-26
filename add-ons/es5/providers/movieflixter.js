

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://movieflixter.to",
    SEARCH: function SEARCH(title) {
        return 'http://movieflixter.to/search?q=' + title;
    },
    DOMAIN_DECODE: '',
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var MovieFlixter = function () {
    function MovieFlixter(props) {
        _classCallCheck(this, MovieFlixter);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(MovieFlixter, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                _context.prev = 5;
                                urlSearch = URL.SEARCH(title);
                                _context.next = 9;
                                return httpRequest.getHTML(urlSearch);

                            case 9:
                                dataSearch = _context.sent;

                                // console.log(dataSearch);
                                $ = cheerio.load(dataSearch);
                                itemSearch = $('#content .movie_cell');


                                itemSearch.each(function () {
                                    var yearVal = $(this).find('.year').text();
                                    yearVal = yearVal.replace("(", "");
                                    yearVal = yearVal.replace(")", "");

                                    var titleVal = $(this).find('a:nth-child(1)').attr('title');
                                    var linkDetailVal = URL.DOMAIN + $(this).find('a:nth-child(1)').attr('href');
                                    var typeVal = void 0;
                                    if (linkDetailVal.search('movie') !== -1) {
                                        typeVal = 'movie';
                                    } else {
                                        typeVal = 'tv';
                                    }

                                    if (yearVal == year && type == typeVal && title == titleVal) {
                                        detailUrl = linkDetailVal;
                                    }
                                });
                                _context.next = 18;
                                break;

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context['catch'](5);

                                console.log(String(_context.t0));

                            case 18:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 20:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 15]]);
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
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                servers = $(".stream_links").eq(1).find('tr');
                                sources = [];

                                servers.each(function () {
                                    var onclick = '';
                                    var host = $(this).find('td:nth-child(2)').text().trim();
                                    if (['openload.co', 'streamango.com', 'vidoza.net', 'vidlox.me'].includes(host) && sources.length < 10) {
                                        if (type == 'tv') onclick = $(this).find('button').attr('onclick');else onclick = $(this).find('td:nth-child(1)').find('a');

                                        console.log(host, 'http://movieflixter.to' + onclick.attr('href'));
                                        sources.push('http://movieflixter.to' + onclick.attr('href'));
                                    }
                                });

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        var html, $_1, iframe, estreamLink;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.get(link);

                                                    case 2:
                                                        html = _context2.sent;
                                                        $_1 = cheerio.load(html.data);
                                                        iframe = $_1('meta[name="og:url"]').attr('content');

                                                        // console.log(`LINK ${iframe} ${html.data}`)

                                                        if (iframe != undefined) {
                                                            if (iframe.search('openload.co/') != -1) {
                                                                hosts.push({
                                                                    provider: {
                                                                        url: detailUrl,
                                                                        name: "movieflixter"
                                                                    },
                                                                    result: {
                                                                        file: iframe,
                                                                        label: "embed",
                                                                        type: "embed"
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            estreamLink = html.data.match(/top.location = "([^"]+)/);


                                                            if (estreamLink !== undefined) {
                                                                iframe = estreamLink[1];

                                                                if (iframe.search('estream.to/') != -1 && iframe.search('/.html') == -1) {
                                                                    hosts.push({
                                                                        provider: {
                                                                            url: detailUrl,
                                                                            name: "moviepix"
                                                                        },
                                                                        result: {
                                                                            file: iframe,
                                                                            label: "embed",
                                                                            type: "embed"
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }

                                                    case 6:
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

    return MovieFlixter;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new MovieFlixter({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'moviepix',
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

thisSource.testing = MovieFlixter;
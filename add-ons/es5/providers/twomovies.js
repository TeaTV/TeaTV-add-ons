

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://www1.two-movies.name/",
    SEARCH: function SEARCH(title) {
        return 'https://www1.two-movies.name/search/?criteria=all&search_query=' + title;
    },
    DOMAIN_DECODE: '',
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var Twomovies = function () {
    function Twomovies(props) {
        _classCallCheck(this, Twomovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Twomovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, movieflixter, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch, $, itemSearch, titleVal, yearVal, linkDetailVal, searchLink, $_2, totalLinks;

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
                                _context.next = 10;
                                return httpRequest.getHTML(urlSearch);

                            case 10:
                                dataSearch = _context.sent;
                                $ = cheerio.load(dataSearch);

                                //let checkType = $('.divConteiner h1').text();

                                itemSearch = $('.film_content .filmDiv');
                                titleVal = itemSearch.find('filmganrediv2').text().trim();
                                yearVal = itemSearch.find('.filmyar').text().trim();
                                linkDetailVal = 'https://seriesfree.to' + itemSearch.find('a:nth-child(1)').attr('href');


                                console.log(yearVal, titleVal, linkDetailVal);

                                if (titleVal.toLowerCase().search(title.toLowerCase()) !== -1 && yearVal == year) {
                                    detailUrl = linkDetailVal;
                                }

                                if (!detailUrl) {
                                    _context.next = 25;
                                    break;
                                }

                                _context.next = 21;
                                return httpRequest.getHTML(detailUrl);

                            case 21:
                                searchLink = _context.sent;
                                $_2 = cheerio.load(searchLink);
                                totalLinks = $_2('.seasons-grid a');

                                totalLinks.each(function () {
                                    var checkCondition = $(this).attr('href');
                                    if (checkCondition.indexOf('s' + season + '_e' + episode) !== -1) {
                                        detailUrl = 'https://seriesfree.to' + checkCondition;
                                    }
                                });

                            case 25:

                                console.log("AAAAAAAAAAAAAAa " + detailUrl);
                                this.state.detailUrl = detailUrl;
                                _context.next = 32;
                                break;

                            case 29:
                                _context.prev = 29;
                                _context.t0 = _context['catch'](6);

                                console.log(String(_context.t0));

                            case 32:
                                return _context.abrupt('return');

                            case 33:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 29]]);
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

                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, servers, sources, sourcesPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                this.state.detailUrl = "https://www1.two-movies.name/watch_movie/Avengers_Infinity_War_2018";

                                if (this.state.detailUrl) {
                                    _context3.next = 5;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 5:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 9:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                servers = $("#fbody tr .vlink");
                                sources = [];

                                servers.each(function () {
                                    var onclick = 'https://www1.two-movies.name' + $(this).attr('href');
                                    sources.push(onclick);
                                });

                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
                                        var originLink, hash, dataString, headers, newHeader, originLink3, $_1, linkToGet, linkDetail;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(link, URL.HEADERS());

                                                    case 2:
                                                        originLink = _context2.sent;

                                                        originLink = JSON.stringify(originLink);
                                                        hash = originLink.match(/var hash = ([^;]+)/);

                                                        hash = hash[1];
                                                        hash = hash.replace(/\\/g, "");
                                                        hash = hash.replace(/\'/g, "");
                                                        dataString = 'hash=' + hash + '&confirm_continue=I+understand%2C+I+want+to+continue';
                                                        headers = {
                                                            'authority': 'www1.two-movies.name',
                                                            'cache-control': 'max-age=0',
                                                            'origin': 'https://www1.two-movies.name',
                                                            'upgrade-insecure-requests': '1',
                                                            'content-type': 'application/x-www-form-urlencoded',
                                                            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36',
                                                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                                                            'referer': link,
                                                            'accept-encoding': 'gzip, deflate, br',
                                                            'accept-language': 'vi,en-US;q=0.9,en;q=0.8'
                                                        };
                                                        _context2.next = 12;
                                                        return httpRequest.postCloudflare(link, headers, dataString);

                                                    case 12:
                                                        newHeader = _context2.sent;

                                                        newHeader.headers['accept-encoding'] = "";

                                                        _context2.next = 16;
                                                        return httpRequest.getCloudflare(link, newHeader);

                                                    case 16:
                                                        originLink3 = _context2.sent;
                                                        $_1 = cheerio.load(originLink3.data);
                                                        linkToGet = $_1('.warningLinkBox');

                                                        linkToGet = linkToGet.find('a').attr('href');
                                                        linkToGet = linkToGet.match(/https:.*/);

                                                        console.log(linkToGet[0]);

                                                        linkDetail = "";

                                                        if ((linkToGet.indexOf("openload") !== -1 || linkToGet.indexOf("streamango") !== -1 || linkToGet.indexOf("speedvid") !== -1) && hosts.length < 20) {
                                                            linkDetail = linkToGet[0];
                                                        }

                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "seriesfree"
                                                            },
                                                            result: {
                                                                file: linkDetail,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 25:
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
                                _context3.next = 17;
                                return Promise.all(sourcesPromise);

                            case 17:
                                this.state.hosts = hosts;

                            case 18:
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

    return Twomovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Twomovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'twomovies',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };

                        // await source.searchDetail();

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context4.next = 6;
                        return source.getHostFromDetail();

                    case 6:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context4.abrupt('return', source.state.hosts);

                    case 8:
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

thisSource.testing = Twomovies;
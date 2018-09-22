

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://123-putlocker.com",
    SEARCH: function SEARCH(title) {
        return 'http://123-putlocker.com/search-movies/' + title + '.html';
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    },
    MAX_LINK: 25
};

var M4uFree = function () {
    function M4uFree(props) {
        _classCallCheck(this, M4uFree);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(M4uFree, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch, htmlEpisode, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = '';


                                if (type == 'movie') {
                                    urlSearch = URL.SEARCH(title);
                                } else {
                                    urlSearch = URL.SEARCH(title + ('+season+' + season));
                                }

                                _context.next = 7;
                                return httpRequest.get(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemSearch = $('.list li');


                                itemSearch.each(function (i) {

                                    var hrefM4u = $(this).find('a').attr('href');
                                    var mover = $(this).find('a').attr('onmouseover');
                                    var m = mover.match(/<i>(.*)<\/i>/);
                                    if (m == undefined) return false;

                                    var titleM4u = m[1];
                                    var checkMovies = titleM4u.match(/ *season *[0-9]+/i);
                                    var seasonNumber = checkMovies != null ? titleM4u.match(/season *([0-9]+)/i) != null ? titleM4u.match(/season *([0-9]+)/i)[1] : 0 : false;
                                    var yearM4u = mover.match(/release *\: *([0-9]+)/i);
                                    yearM4u = yearM4u != null ? +yearM4u[1] : 0;
                                    titleM4u = titleM4u.replace(/ *\: *season.*/i, '');

                                    if (stringHelper.shallowCompare(title, titleM4u)) {

                                        if (seasonNumber == false && type == 'movie') {

                                            if (yearM4u == year) {

                                                detailUrl = hrefM4u;
                                            }
                                        } else if (seasonNumber != false && type == 'tv') {

                                            if (seasonNumber == season) {
                                                detailUrl = hrefM4u;
                                            }
                                        }
                                    }
                                });

                                if (!(type == 'tv' && detailUrl != false)) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 14;
                                return httpRequest.getHTML(detailUrl);

                            case 14:
                                htmlEpisode = _context.sent;
                                $_2 = cheerio.load(htmlEpisode);
                                itemEpisode = $_2('#details .episode');


                                itemEpisode.each(function () {

                                    var hrefEpisode = $_2(this).attr('href');
                                    var numberEpisode = $_2(this).text();

                                    if (+numberEpisode == episode) {

                                        detailUrl = hrefEpisode;
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, hosts, arrDetail, detailUrl, htmlDetail, $, item, num_links, arrPromise;

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
                                hosts = [];
                                arrDetail = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.get(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail.data);
                                item = $('#total_version .server_line');
                                num_links = 0;

                                item.each(function () {
                                    var links = $(this).find('.server_version a').attr('href');
                                    if (links.search('other.html') == -1) {
                                        num_links++;
                                        if (num_links < URL.MAX_LINK) arrDetail.push(links);
                                    }
                                });

                                arrPromise = arrDetail.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(links) {
                                        var htmlData, encode, iframes, linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        htmlData = { data: '' };
                                                        _context2.prev = 1;
                                                        _context2.next = 4;
                                                        return httpRequest.get(links);

                                                    case 4:
                                                        htmlData = _context2.sent;
                                                        _context2.next = 9;
                                                        break;

                                                    case 7:
                                                        _context2.prev = 7;
                                                        _context2.t0 = _context2['catch'](1);

                                                    case 9:
                                                        encode = htmlData.data.match(/Base64\.decode\(\"([^\"]+)/i);

                                                        encode = encode != null ? encode[1] : false;
                                                        //console.log(links);

                                                        if (encode) {
                                                            iframes = base64.decode(encode);
                                                            linkEmbed = iframes.match(/src\=\"([^\"]+)/i);

                                                            linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                                            linkEmbed && hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "m4ufree"
                                                                },
                                                                result: {
                                                                    file: linkEmbed,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        }

                                                    case 12:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 7]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 16;
                                return Promise.all(arrPromise);

                            case 16:
                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

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

    return M4uFree;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new M4uFree({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'M4uFree',
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

thisSource.testing = M4uFree;
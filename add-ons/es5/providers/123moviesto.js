

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://www.123moviesto.live/",
    SEARCH: function SEARCH(title, nonce) {
        return 'https://www.123moviesto.live/wp-json/dooplay/search/?keyword=' + title + '&nonce=' + nonce;
    },
    DOMAIN_DECODE: 'https://gomostream.com/decoding_v3.php',
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

function _tsd_tsd_ds(s) {
    var _27x70Y = s;var _84Dxx146 = _27x70Y.slice(9, 13);var _607Lx84 = _99x131p(_84Dxx146);var _1x82d = _q43xq1(_607Lx84);return _41Dx51(_1x82d) + "13" + "916471";
}
function _99x131p(s) {
    return s.split("");
}
function _q43xq1(r) {
    return r.reverse();
}
function _41Dx51(n) {
    return n.join("");
}

var Moviesto = function () {
    function Moviesto(props) {
        _classCallCheck(this, Moviesto);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Moviesto, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, htmlHome, dtGonza, urlSearch, jsonSearch, item, yearMovie, titleMovie, hrefMovie, htmlVideo, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                _context.next = 6;
                                return httpRequest.getHTML(URL.DOMAIN);

                            case 6:
                                htmlHome = _context.sent;
                                dtGonza = htmlHome.match(/var *dtGonza *\= *([^\}]+)/i);

                                dtGonza = dtGonza != null ? dtGonza[1] + '}' : false;

                                if (dtGonza) {
                                    _context.next = 11;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 11:

                                eval('dtGonza = ' + dtGonza);

                                dtGonza = dtGonza.nonce;

                                urlSearch = URL.SEARCH(encodeURI(title), dtGonza);
                                _context.next = 16;
                                return httpRequest.getHTML(urlSearch);

                            case 16:
                                jsonSearch = _context.sent;

                                jsonSearch = JSON.parse(jsonSearch);

                                for (item in jsonSearch) {
                                    yearMovie = jsonSearch[item].extra.date;
                                    titleMovie = jsonSearch[item].title;
                                    hrefMovie = jsonSearch[item].url;


                                    titleMovie = titleMovie.replace('Watch', '');
                                    titleMovie = titleMovie.replace('Online Free', '');
                                    titleMovie = titleMovie.replace(/\( *[0-9]+ *\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && yearMovie == year) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv') {
                                            videoUrl = hrefMovie;
                                        }
                                    }
                                }

                                if (!(type == 'tv' && videoUrl)) {
                                    _context.next = 26;
                                    break;
                                }

                                _context.next = 22;
                                return httpRequest.getHTML(videoUrl);

                            case 22:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                itemEpisode = $_2('.episodios li');


                                itemEpisode.each(function () {

                                    var hrefEpisode = $_2(this).find('.episodiotitle a').attr('href');
                                    var numberSeasonEpisode = $_2(this).find('.numerando').text();

                                    var numberSeason = numberSeasonEpisode.match(/([0-9]+)/i);
                                    numberSeason = numberSeason != null ? +numberSeason[1] : false;

                                    var numberEpisode = numberSeasonEpisode.match(/[0-9]+ *\- *([0-9]+)/i);
                                    numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                    if (season == numberSeason && episode == numberEpisode) {
                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 26:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 28:
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
                var _libs2, httpRequest, cheerio, qs, hosts, detailUrl, htmlDetail, $, iframe, htmlGomo, token, tc, headers, body, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

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
                                iframe = $('#option-1 iframe').attr('src');

                                if (!(iframe.indexOf('gomostream') == -1)) {
                                    _context2.next = 14;
                                    break;
                                }

                                iframe && hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "123Movies"
                                    },
                                    result: {
                                        file: iframe,
                                        label: "embed",
                                        type: "embed"
                                    }
                                });
                                _context2.next = 46;
                                break;

                            case 14:
                                _context2.next = 16;
                                return httpRequest.getHTML(iframe);

                            case 16:
                                htmlGomo = _context2.sent;
                                token = htmlGomo.match(/\"\_token\" *\: *\"([^\"]+)/i);

                                token = token != null ? token[1] : false;

                                tc = htmlGomo.match(/var *tc *\= *\'([^\']+)/i);

                                tc = tc != null ? tc[1] : false;

                                headers = {
                                    'x-token': _tsd_tsd_ds(tc)
                                };
                                body = {
                                    'tokenCode': tc,
                                    '_token': token
                                };
                                _context2.next = 25;
                                return httpRequest.post(URL.DOMAIN_DECODE, headers, body);

                            case 25:
                                data = _context2.sent;

                                data = data.data;

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context2.prev = 30;
                                for (_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    item = _step.value;

                                    item && hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "123Movies"
                                        },
                                        result: {
                                            file: item,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }
                                _context2.next = 38;
                                break;

                            case 34:
                                _context2.prev = 34;
                                _context2.t0 = _context2['catch'](30);
                                _didIteratorError = true;
                                _iteratorError = _context2.t0;

                            case 38:
                                _context2.prev = 38;
                                _context2.prev = 39;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 41:
                                _context2.prev = 41;

                                if (!_didIteratorError) {
                                    _context2.next = 44;
                                    break;
                                }

                                throw _iteratorError;

                            case 44:
                                return _context2.finish(41);

                            case 45:
                                return _context2.finish(38);

                            case 46:

                                this.state.hosts = hosts;

                            case 47:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[30, 34, 38, 46], [39,, 41, 45]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Moviesto;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Moviesto({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: '123Moviesto',
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

thisSource.testing = Moviesto;
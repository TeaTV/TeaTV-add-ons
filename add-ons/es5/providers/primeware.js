

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.primewire.ac',
    SEARCH: function SEARCH(title, type) {

        if (type == 'movie') {
            return 'http://www.primewire.ac/?keywords=' + title + '&type=movie';
            // return `http://www.primewire.ag/index.php?search_keywords=${title}&key=235debe0d7f423b4&search_section=1`; 
        }
        return 'http://www.primewire.ac/tv?keywords=' + title;
        // return `http://www.primewire.ag/index.php?search_keywords=${title}&key=235debe0d7f423b4&search_section=2`;
    }
};

var Primeware = function () {
    function Primeware(props) {
        _classCallCheck(this, Primeware);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Primeware, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, detailUrl, detailUrlTv, urlSearch, htmlSearch, $, itemSearch, htmlEpisode, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                detailUrlTv = false;
                                urlSearch = URL.SEARCH(encodeURIComponent(title), type);
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('div.index_item.index_item_ie');


                                itemSearch.each(function () {

                                    var titleMovie = $(this).find('a').attr('title').replace('Watch', '').match(/([^(]*)/);
                                    var yearMovie = $(this).find('a h2').text().replace('Watch', '').match(/\(([0-9]*)\)/);
                                    var hrefMovie = URL.DOMAIN + '/' + $(this).find('a').attr('href');
                                    titleMovie = titleMovie != null ? titleMovie[1].trim() : '';
                                    yearMovie = yearMovie != null ? +yearMovie[1] : 0;

                                    if (stringHelper.shallowCompare(title, titleMovie) && year == yearMovie) {

                                        if (type == 'movie') {
                                            detailUrl = hrefMovie;
                                        } else {
                                            detailUrlTv = hrefMovie;
                                        }
                                    }
                                });

                                if (!(type == 'tv' && detailUrlTv != false)) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 14;
                                return httpRequest.getHTML(detailUrlTv);

                            case 14:
                                htmlEpisode = _context.sent;
                                $_2 = cheerio.load(htmlEpisode);
                                itemEpisode = $_2('.tv_container div[data-id=' + season + '] .tv_episode_item');


                                itemEpisode.each(function () {

                                    var hrefEpisode = URL.DOMAIN + $_2(this).find('a').attr('href');
                                    var episodeMovie = hrefEpisode.match(/\-episode\-([0-9]+)/i);
                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                                    if (episodeMovie == episode && hrefEpisode.indexOf('javascript') == -1) {
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _libs2, httpRequest, cheerio, arrRedirect, hosts, detailUrl, state, htmlEpisode, $, itemRedirect, checkTimeout, timeout, arr_redirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;

                                if (this.state.detailUrl) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                arrRedirect = [];
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                state = this.state;
                                _context4.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 9:
                                htmlEpisode = _context4.sent;
                                $ = cheerio.load(htmlEpisode);
                                itemRedirect = $('.movie_version_link');


                                itemRedirect.each(function () {

                                    var slug = $(this).find('a').attr('href');

                                    if (slug.indexOf('javascript:') == -1) {

                                        var linkRedirect = URL.DOMAIN + slug;
                                        arrRedirect.push(linkRedirect);
                                    }
                                });

                                checkTimeout = false;
                                timeout = setTimeout(function () {

                                    state.hosts = hosts;
                                    checkTimeout = true;
                                    return;
                                }, 7000);

                                /** 
                                 * 
                                 * FIXME:
                                 * this function will setTimeout 7s. 
                                 * Because many link redirect error and not response. 
                                */

                                arr_redirect = [];
                                arrPromise = arrRedirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var html_redirect, $_3, link_embed;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.prev = 0;
                                                        _context2.next = 3;
                                                        return httpRequest.getHTML(val);

                                                    case 3:
                                                        html_redirect = _context2.sent;
                                                        $_3 = cheerio.load(html_redirect);
                                                        link_embed = $_3('.download').attr('href');


                                                        if (link_embed.indexOf('javascript:') == -1) {
                                                            link_embed = URL.DOMAIN + link_embed;

                                                            arr_redirect.push(link_embed);
                                                        }

                                                        _context2.next = 11;
                                                        break;

                                                    case 9:
                                                        _context2.prev = 9;
                                                        _context2.t0 = _context2['catch'](0);

                                                    case 11:
                                                        if (!(val == arr_redirect.length)) {
                                                            _context2.next = 13;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return');

                                                    case 13:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[0, 9]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 19;
                                return Promise.all(arrPromise);

                            case 19:

                                arrPromise = arr_redirect.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var linkEmbed;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.prev = 0;
                                                        _context3.next = 3;
                                                        return httpRequest.getRedirectUrl(val);

                                                    case 3:
                                                        linkEmbed = _context3.sent;


                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "primeware"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                        _context3.next = 9;
                                                        break;

                                                    case 7:
                                                        _context3.prev = 7;
                                                        _context3.t0 = _context3['catch'](0);

                                                    case 9:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this, [[0, 7]]);
                                    }));

                                    return function (_x2) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());

                                _context4.next = 22;
                                return Promise.all(arrPromise);

                            case 22:
                                if (checkTimeout) {
                                    _context4.next = 26;
                                    break;
                                }

                                clearTimeout(timeout);
                                state.hosts = hosts;
                                return _context4.abrupt('return');

                            case 26:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Primeware;
}();

thisSource.function = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Primeware({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Primeware',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context5.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context5.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        _context5.next = 11;
                        return httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                    case 11:
                        return _context5.abrupt('return', source.state.hosts);

                    case 12:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x3, _x4, _x5) {
        return _ref5.apply(this, arguments);
    };
}();

thisSource.testing = Primeware;
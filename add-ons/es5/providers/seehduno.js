

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://seehd.uno',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (page == false) {
            return 'https://seehd.uno/?s=' + title;
        }
        return 'https://seehd.uno/page/' + page + '/?s=' + title;
    }
};

var SeehdUno = function () {
    function SeehdUno(props) {
        _classCallCheck(this, SeehdUno);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(SeehdUno, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, page;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                if (!!httpRequest.cookie) {
                                    httpRequest.cookie.clear();
                                }

                                page = 1;
                                // let htmlSearch  = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));
                                // let $           = cheerio.load(htmlSearch.data);
                                // let page        = $('#paginador .paginado ul li');

                                // if( page.length <= 0 ) {
                                //     page = 1;
                                // } else {
                                //     page = page.last().find('a').attr('href');
                                //     page = page.match(/\/page\/([0-9]+)/i);
                                //     page = page != null ? +page[1] : 1;
                                // }

                                _context.next = 6;
                                return this.getDetailUrl(page, this.state);

                            case 6:
                                return _context.abrupt('return');

                            case 7:
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
        key: 'getDetailUrl',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page, state) {
                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, year, season, episode, type, urlSearch, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                // let arrNumber = [];

                                // for( let i = 1; i <= page; i++ )  {

                                //     arrNumber.push(i);
                                // }

                                // let arrPromise = arrNumber.map(async function(val) {

                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), 1);

                                //console.log(urlSearch, '1');

                                _context2.next = 5;
                                return httpRequest.getHTML(urlSearch);

                            case 5:
                                htmlSearch = _context2.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.peliculas .items .item');


                                if (!!httpRequest.cookie) {
                                    httpRequest.cookie.clear();
                                }

                                //console.log(itemSearch.length, '2');
                                itemSearch.each(function () {

                                    var hrefMovies = $(this).find('a').attr('href');
                                    var yearMovies = $(this).find('.fixyear .year').text();
                                    var titleMovies = $(this).find('.fixyear h2').text();
                                    var seasonMovies = titleMovies.match(/season *([0-9]+)/i);
                                    var episodeMovies = titleMovies.match(/season *[0-9]+ *episode *([0-9]+)/i);
                                    seasonMovies = seasonMovies != null ? +seasonMovies[1] : false;
                                    episodeMovies = episodeMovies != null ? +episodeMovies[1] : false;
                                    titleMovies = titleMovies.replace('Watch', '').replace('Online', '').replace('Free', '').trim();
                                    titleMovies = titleMovies.replace(/\([0-9]+\)/i, '').trim();

                                    //console.log(hrefMovies, titleMovies, '3');
                                    if (seasonMovies != false && episodeMovies != false) {

                                        titleMovies = titleMovies.replace(/\– *season.*/i, '').trim();
                                    }

                                    if (stringHelper.shallowCompare(title, titleMovies)) {

                                        if (type == 'movie' && +yearMovies == year) {

                                            //console.log(hrefMovies, '4');
                                            state.detailUrl = hrefMovies;
                                        } else if (type == 'tv' && seasonMovies == season && episodeMovies == episode) {

                                            state.detailUrl = hrefMovies;
                                        }
                                    }
                                });

                                // if( val == page ) {
                                //     return;
                                // }

                                // });

                                // await Promise.all(arrPromise);
                                return _context2.abrupt('return');

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getDetailUrl(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getDetailUrl;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs3, httpRequest, cheerio, base64, hosts, detailUrl, htmlDetail, $, itemEmbed;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:

                                if (!!httpRequest.cookie) {
                                    httpRequest.cookie.clear();
                                }

                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                itemEmbed = $('#player2 .movieplay');

                                //console.log(itemEmbed.length, '5');

                                itemEmbed.each(function () {

                                    var script = $(this).find('script').html();
                                    var token = script.match(/str *\= *\'([^\']+)/i);
                                    token = token != null ? token[1] : false;

                                    if (token) {

                                        token = unescape(token.replace(/@/g, '%'));
                                        var linkEmbed = token.match(/src *\= *\"([^\"]+)/i);
                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                        //console.log(linkEmbed, '6');
                                        linkEmbed !== false && hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "seehduno"
                                            },
                                            result: {
                                                file: linkEmbed,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    }
                                });

                                this.state.hosts = hosts;

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getHostFromDetail() {
                return _ref3.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return SeehdUno;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new SeehdUno({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'SeehdUno',
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

    return function (_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = SeehdUno;
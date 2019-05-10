

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://moviewatcher.is",
    SEARCH: function SEARCH(title) {
        return 'https://moviewatcher.is/ajax?query=' + title;
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_' + Math.round(+new Date()) + ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    },
    BING_SEARCH: function BING_SEARCH(title) {
        return 'https://www.bing.com/search?q=site%3Amoviewatcher.is+' + title;
    }
};

var MovieWatcher = function () {
    function MovieWatcher(props) {
        _classCallCheck(this, MovieWatcher);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(MovieWatcher, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, qs, _movieInfo, title, year, season, episode, type, detailUrl, tvshowVideo, urlSearch, htmlSearch, $, itemSearch, htmlVideo, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                /*
                                const { httpRequest, cheerio, stringHelper, qs }    = this.libs; 
                                let { title, year, season, episode, type }      = this.movieInfo;
                                  let videoUrl = false;
                                let detailUrl = false;
                                let arrMovie = [];
                                 let urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                //let htmlSearch 	= await httpRequest.get(urlSearch);
                                let htmlSearch  = await httpRequest.getCloudflare(urlSearch);
                                //console.log(htmlSearch, 'ff');
                                //let $			= cheerio.load(htmlSearch);
                                 let itemSearch = JSON.parse(htmlSearch);
                                 itemSearch.each(function(i) {
                                 	let hrefMovie = URL.DOMAIN +  itemSearch[i][4];
                                	let titleMovie = itemSearch[i][0];
                                    console.log(titleMovie, 'f');
                                 	if (stringHelper.shallowCompare(title, titleMovie)) {
                                 		if( type == 'movie' ) {
                                			arrMovie.push(hrefMovie);	
                                		} else {
                                			videoUrl = hrefMovie;
                                		}
                                		
                                	}
                                });
                                 if(type == 'movie' && arrMovie.length > 0) {
                                 	let arrPromise = arrMovie.map(async (val) => {
                                 		let yearMovie = false;
                                		let htmlVideo = await httpRequest.getHTML(val);
                                		let $_2 	  = cheerio.load(htmlVideo);
                                 		let tableInfo = $_2('.table-info table  tbody tr');
                                 		tableInfo.each(function() {
                                 			let titleInfo = $_2(this).find('b').text();
                                			let valueInfo = $_2(this).find('a').text();
                                 			if(titleInfo.indexOf('Release Year') != -1) {
                                				yearMovie = valueInfo;
                                			}
                                		});
                                 		if(yearMovie == year) {
                                			detailUrl = val;
                                			return;
                                		}
                                	});
                                 	await Promise.all(arrPromise);
                                }
                                 if(videoUrl && type == 'tv') {
                                 	let htmlVideo = await httpRequest.getHTML(videoUrl); 
                                let $  		  = cheerio.load(htmlVideo);        	
                                let itemSeason = $('.episode_1');
                                itemSeason.each(function() {
                                let hrefEpisode = $(this).attr('href');
                                if(hrefEpisode) {
                                let hrefEmbed = URL.DOMAIN + hrefEpisode;
                                let numberSeason = hrefEmbed.match(/\/s([0-9]+)/i);
                                numberSeason     = numberSeason != null ? +numberSeason[1] : false;
                                let numberEpisode = hrefEmbed.match(/\/s[0-9]+e([0-9]+)/i);
                                numberEpisode     = numberEpisode != null ? +numberEpisode[1] : false;
                                if (season == numberSeason && episode == numberEpisode) {
                                detailUrl = hrefEmbed;
                                return;
                                }
                                }
                                });
                                 }
                                 this.state.detailUrl = detailUrl;
                                return;
                                */

                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                tvshowVideo = false;
                                urlSearch = '';

                                if (type == 'tv') {
                                    urlSearch = URL.BING_SEARCH(encodeURI(title));
                                } else {
                                    urlSearch = URL.BING_SEARCH(encodeURI(title) + "+" + year);
                                }
                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch, URL.HEADERS);

                            case 8:
                                htmlSearch = _context.sent;

                                // let headers = htmlSearch.headers;

                                // let setCookie = headers['set-cookie'];
                                // let sessid = '';


                                // for(let item of setCookie) {
                                //  if(item.indexOf('PHPSESSID') != -1) {
                                //      sessid = item.match(/([^\;]+)/i);
                                //      sessid = sessid != null ? sessid[1] +';' : '';
                                //      break;
                                //  }
                                // }


                                // htmlSearch = await httpRequest.post(urlSearch, URL.HEADERS(urlSearch, sessid), URL.BODY_SEARCH);

                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('#b_results .b_algo');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('h2 a').attr('href');
                                    var titleMovie = $(this).find('h2 a').first().text().toLowerCase();
                                    var yearMovie = titleMovie.match(/([0-9]+)/i);
                                    yearMovie = yearMovie != null ? yearMovie[1] : 0;
                                    //console.log(titleMovie, '---', yearMovie, hrefMovie)

                                    // let hrefMovie = $(this).find('a').attr('href');
                                    // let titleMovie = $(this).find('a img').attr('alt');
                                    // let yearMovie = titleMovie.match(/\( *([0-9]+)/i);
                                    // yearMovie = yearMovie != null ? yearMovie[1] : 0;
                                    // titleMovie = titleMovie.replace(/\( *[0-9]+ *\)/i, '');

                                    // if(hrefMovie.indexOf('http') == -1 && hrefMovie.indexOf('https') == -1) {
                                    //  hrefMovie = 'http:' + hrefMovie;
                                    // }

                                    if (titleMovie && titleMovie.indexOf(title.toLowerCase()) == 0) {

                                        console.log(hrefMovie, titleMovie, 'year', year, yearMovie);
                                        if (type == 'movie' && yearMovie == year) {
                                            detailUrl = hrefMovie;
                                            return;
                                        } else {

                                            hrefMovie = hrefMovie.replace(/\-s[0-9]+e[0-9]+/i, '');
                                            tvshowVideo = hrefMovie;
                                            return;
                                        }
                                    }
                                });

                                if (!(type == 'tv' && tvshowVideo != false)) {
                                    _context.next = 19;
                                    break;
                                }

                                _context.next = 15;
                                return httpRequest.getHTML(tvshowVideo);

                            case 15:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                itemEpisode = $_2('.Season a');


                                itemEpisode.each(function () {
                                    var hrefEpisode = $(this).attr('href');

                                    if (hrefEpisode.indexOf('http') == -1 && hrefEpisode.indexOf('https') == -1) {
                                        hrefEpisode = 'http:' + hrefEpisode;
                                    }

                                    var seasonMovie = hrefEpisode.match(/\-s([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? seasonMovie[1] : -1;
                                    var episodeMovie = hrefEpisode.match(/\-s[0-9]+e([0-9]+)/i);
                                    episodeMovie = episodeMovie != null ? episodeMovie[1] : -1;

                                    if (seasonMovie == season && episodeMovie == episode) {
                                        detailUrl = hrefEpisode;
                                    }
                                });

                            case 19:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
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

                var _libs2, httpRequest, cheerio, qs, hosts, arrRedirect, detailUrl, htmlDetail, $, iframe, itemRedirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:

                                //this.state.detailUrl = 'https://moviewatcher.is/352542/the-nun-2018';
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);


                                console.log(htmlDetail);

                                iframe = $('.addplayer iframe').attr('src');


                                iframe && hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "MovieWatcher"
                                    },
                                    result: {
                                        file: iframe,
                                        label: "embed",
                                        type: "direct"
                                    }
                                });

                                console.log(hosts);

                                itemRedirect = $('.full-torrent1');


                                itemRedirect.each(function () {

                                    var hrefRedirect = $(this).find('.small_links').attr('onclick');

                                    if (hrefRedirect) {

                                        hrefRedirect = hrefRedirect.match(/window.open\(\'([^\']+)/i);
                                        hrefRedirect = hrefRedirect != null ? hrefRedirect[1] : false;

                                        if (hrefRedirect) {

                                            if (hrefRedirect.indexOf('https:') == -1 && hrefRedirect.indexOf('http:') == -1) {
                                                hrefRedirect = URL.DOMAIN + hrefRedirect;
                                            }
                                            arrRedirect.push(hrefRedirect);
                                        }
                                    }
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var urlRedirect;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getRedirectUrl(val);

                                                    case 2:
                                                        urlRedirect = _context2.sent;


                                                        urlRedirect && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "MovieWatcher"
                                                            },
                                                            result: {
                                                                file: urlRedirect,
                                                                label: "embed",
                                                                type: "direct"
                                                            }
                                                        });

                                                    case 4:
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
                                _context3.next = 19;
                                return Promise.all(arrPromise);

                            case 19:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 21:
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

    return MovieWatcher;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new MovieWatcher({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'MovieWatcher',
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

thisSource.testing = MovieWatcher;
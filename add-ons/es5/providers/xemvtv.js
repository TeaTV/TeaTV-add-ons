

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

URL = {
    SOURCE: 'xemvtv',
    DOMAIN: "http://xemvtv.net",
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    SEARCH: function SEARCH(title) {
        return 'http://xemvtv.net/tim-kiem/' + encodeURI(title) + '/';
    },
    DOMAIN_EMBED_VIP: 'http://player.xemvtv.net/vip/loader.php',
    DOMAIN_EMBED: 'http://x-api.xemvtv.net/loader.php'
};

var Xemvtv = function () {
    function Xemvtv(props) {
        _classCallCheck(this, Xemvtv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Xemvtv, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, xemvtv, detailUrl, videoUrl, tvshowVideoUrl, url_search, html_search, $, item_page, htmlVideo, $_2, hrefDetail, htmlEpisode, _$_, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                xemvtv = this;
                                detailUrl = false;
                                videoUrl = false;
                                tvshowVideoUrl = false;
                                url_search = URL.SEARCH(title);
                                _context.next = 9;
                                return httpRequest.getHTML(url_search, URL.HEADERS());

                            case 9:
                                html_search = _context.sent;
                                $ = cheerio.load(html_search);
                                item_page = $('.box-main ul li.box');


                                item_page.each(function () {

                                    var hrefDetail = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.data p').text();
                                    var seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/season *[0-9]+/i, '').trim();
                                    var yearMovie = $(this).find('.data  h4').text();
                                    yearMovie = yearMovie.match(/\(* *([0-9]+) *\)*/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : false;

                                    if (stringHelper.shallowCompare(title, titleMovie) && hrefDetail) {

                                        if (type == 'movie' && yearMovie && !seasonMovie && yearMovie == year) {
                                            videoUrl = hrefDetail;
                                            return;
                                        } else if (type == 'tv' && seasonMovie && seasonMovie == seasonMovie) {
                                            videoUrl = hrefDetail;
                                            return;
                                        }
                                    }
                                });

                                if (!(videoUrl != false)) {
                                    _context.next = 20;
                                    break;
                                }

                                _context.next = 16;
                                return httpRequest.getHTML(videoUrl);

                            case 16:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                hrefDetail = $_2('#btn-film-watch').attr('href');


                                if (type == 'movie') {
                                    detailUrl = hrefDetail;
                                } else {
                                    tvshowVideoUrl = hrefDetail;
                                }

                            case 20:
                                if (!(type == 'tv' && tvshowVideoUrl)) {
                                    _context.next = 27;
                                    break;
                                }

                                _context.next = 23;
                                return httpRequest.getHTML(tvshowVideoUrl);

                            case 23:
                                htmlEpisode = _context.sent;
                                _$_ = cheerio.load(htmlEpisode);
                                itemEpisode = _$_('#_listep .listep .svep a');


                                itemEpisode.each(function () {

                                    var hrefEpisode = _$_(this).attr('href');
                                    var numberEpisode = _$_(this).text();
                                    numberEpisode = numberEpisode.match(/([0-9]+)/i);
                                    numberEpisode = numberEpisode != null ? +numberEpisode[1] : false;

                                    if (numberEpisode == episode) {

                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 27:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 29:
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
                var _libs2, httpRequest, cheerio, qs, gibberish, _movieInfo2, episode, type, gibberXemvtv, host, key, xemvtv, html_video, sub_url, url_video, e_id, c_c, b_m, film_name, body_form, data, tokens, link_direct;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                _context2.next = 6;
                                return httpRequest.getHTML('https://raw.githubusercontent.com/TeaTV/TeaTV-add-ons/master/add-ons/decode/xemvtv.js');

                            case 6:
                                gibberXemvtv = _context2.sent;

                                eval(gibberXemvtv);

                                host = [];
                                key = 'xemvtv.net14516064006969';
                                xemvtv = this;
                                _context2.next = 13;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 13:
                                html_video = _context2.sent;
                                sub_url = "";
                                url_video = html_video.match(/var *linkPlay *\= *\"([^\"]+)/i);
                                e_id = html_video.match(/var *e_Id *\= *([0-9]+)/i);
                                c_c = html_video.match(/var *c_C *\= *([0-9]+)/i);
                                b_m = html_video.match(/var *b_M *\= *([0-9]+)/i);
                                film_name = html_video.match(/var *filmName *\= *\"([^\"]+)/i);

                                url_video = url_video != null ? url_video[1] : '';
                                e_id = e_id != null ? e_id[1] : '';
                                c_c = c_c != null ? c_c[1] : '';
                                b_m = b_m != null ? b_m[1] : '';
                                film_name = film_name != null ? film_name[1] : '';

                                body_form = {
                                    'Url': url_video,
                                    'eId': e_id,
                                    'cC': c_c,
                                    'bM': b_m,
                                    'subUrl': sub_url,
                                    'filmTitle': film_name
                                };
                                _context2.next = 28;
                                return httpRequest.post(URL.DOMAIN_EMBED, {}, body_form);

                            case 28:
                                data = _context2.sent;
                                tokens = data.match(/file *\: *decodeLink\( *\"([^\"]+)/i);

                                tokens = tokens != null ? tokens[1] : '';

                                if (tokens != '') {
                                    link_direct = gibberXemvtv.dec(tokens, key);


                                    if (link_direct) {

                                        hosts.push({
                                            provider: {
                                                url: xemvtv.state.detailUrl,
                                                name: "Server 6"
                                            },
                                            result: {
                                                file: link_direct,
                                                label: 'HD'
                                            }
                                        });
                                    }
                                }

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 34:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Xemvtv;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var xemvtv;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        xemvtv = new Xemvtv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return xemvtv.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return xemvtv.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', xemvtv.state.hosts);

                    case 6:
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

thisSource.testing = Xemvtv;
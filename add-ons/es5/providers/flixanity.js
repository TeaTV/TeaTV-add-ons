

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://flixanity.site",
    SEARCH: 'https://api.flixanity.site/api/v1/0A6ru35yevokjaqbb3',
    TOKEN_API_EMBED: 'eCNBuxFGpRmFlWjUJjmjguCJI',
    EMBED_URL: 'https://flixanity.site/ajax/gonlflhyad.php',
    KEY_SL: '9fc895fbb0b23f1c0fb8e5a5fe02f7b5',
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var Flixanity = function () {
    function Flixanity(props) {
        _classCallCheck(this, Flixanity);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Flixanity, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this = this;

                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, dataBody, resultSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                dataBody = {
                                    sl: URL.KEY_SL,
                                    q: stringHelper.convertToSearchQueryString(title, '-')
                                };
                                _context.next = 5;
                                return httpRequest.post(URL.SEARCH, { 'content-type': 'application/json; charset=utf-8' }, JSON.stringify(dataBody));

                            case 5:
                                resultSearch = _context.sent;

                                if (!(resultSearch.data == null)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 8:

                                resultSearch.data.forEach(function (item) {

                                    if (stringHelper.shallowCompare(item.title, title)) {

                                        if (item.type == 'movie' && type == 'movie' && item.year == year) {

                                            _this.state.detailUrl = URL.DOMAIN + item.permalink;
                                        } else if (item.type == 'show' && type == 'tv') {

                                            _this.state.detailUrl = '' + URL.DOMAIN + item.permalink + '/season/' + season + '/episode/' + episode;
                                        }
                                    }
                                });

                                /*
                                if(type == 'movie') {
                                    this.state.detailUrl = URL.DOMAIN + '/movie/' + stringHelper.convertToSearchQueryString(title, '-');
                                } else {
                                    this.state.detailUrl = URL.DOMAIN + '/tv-show/' + stringHelper.convertToSearchQueryString(title, '-') + '/season/' + season + '/episode/' + episode;
                                }
                                */

                                console.log(this.state.detailUrl);

                                return _context.abrupt('return');

                            case 11:
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
                var _libs2, httpRequest, cheerio, qs, hosts, type, actionEmbed, htmlDetail, elid, dataBody, resultApi, item, embed;

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
                                // console.log(this.state.detailUrl);

                                hosts = [];
                                type = this.movieInfo.type;
                                actionEmbed = type == 'movie' ? 'getMovieEmb' : 'getEpisodeEmb';
                                _context2.next = 8;
                                return httpRequest.get(this.state.detailUrl, URL.HEADERS);

                            case 8:
                                htmlDetail = _context2.sent;
                                elid = htmlDetail.data.match(/elid *= *\"([^"]*)/);

                                elid = elid != null ? elid[1] : false;

                                if (!(elid != false)) {
                                    _context2.next = 19;
                                    break;
                                }

                                dataBody = {
                                    action: actionEmbed,
                                    idEl: elid,
                                    token: URL.TOKEN_API_EMBED,
                                    nopop: ''
                                };
                                // let resultApi = await httpRequest.postCloudflare(URL.EMBED_URL, {}, dataBody);

                                _context2.next = 15;
                                return httpRequest.post(URL.EMBED_URL, { 'User-Agent': 'Firefox 59' }, dataBody);

                            case 15:
                                resultApi = _context2.sent;

                                if (!(resultApi.data == 'Invalid request, your IP have been reported!')) {
                                    _context2.next = 18;
                                    break;
                                }

                                throw new Error('NOT LINK');

                            case 18:

                                for (item in resultApi.data) {
                                    embed = resultApi.data[item].embed.match(/src="([^"]*)/i);

                                    embed = embed != null ? embed[1] : false;

                                    embed && hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "flixanity"
                                        },
                                        result: {
                                            file: embed,
                                            label: "embed",
                                            type: this.isEmbed(embed) ? "embed" : 'direct'
                                        }
                                    });
                                }

                            case 19:

                                this.state.hosts = hosts;

                            case 20:
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
    }, {
        key: 'isEmbed',
        value: function isEmbed(link) {

            if (link.indexOf('statics2.vidcdn.pro') != -1) {
                return false;
            } else if (link.indexOf('stream2.m4ukido.com') != -1) {
                return false;
            }

            return true;
        }
    }]);

    return Flixanity;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Flixanity({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Flixanity',
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

                        //await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                        return _context3.abrupt('return', source.state.hosts);

                    case 10:
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

thisSource.testing = Flixanity;
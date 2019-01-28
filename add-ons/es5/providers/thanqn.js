

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://qwerty.teatv.net/",
    SEARCH: function SEARCH(title, nonce) {
        return 'https://qwerty.teatv.net/api/links';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        };
    }
};

var Thanqn = function () {
    function Thanqn(props) {
        _classCallCheck(this, Thanqn);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Thanqn, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;

                                /*if(type == 'movie' && parseInt(year) < 2016) {
                                    this.state.detailUrl = false;
                                    return;
                                }*/

                                this.state.detailUrl = URL.SEARCH();
                                return _context.abrupt('return');

                            case 4:
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
                var _libs2, httpRequest, cheerio, qs, cryptoJs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, ss, ep, sign, posts, res, i;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, cryptoJs = _libs2.cryptoJs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                ss = season;
                                ep = episode;
                                sign = cryptoJs.MD5(title.toLowerCase() + ss.toString() + "fapnhaptrensansau" + ep.toString()).toString();
                                //console.log(title.toLowerCase() + ss.toString() + "fapnhaptrensansau" + ep.toString(), 'f');

                                posts = {
                                    'name': title,
                                    'ss': type == 'tv' ? season : 0,
                                    'ep': type == 'tv' ? episode : 0,
                                    'hash': sign,
                                    'year': type == 'movie' ? year : 0
                                };

                                //console.log(posts);

                                if (type == 'movie') posts.year = year;

                                _context2.next = 13;
                                return httpRequest.post(this.state.detailUrl, URL.HEADERS(), posts);

                            case 13:
                                res = _context2.sent;


                                if (res.data.status && res.data.links.length > 0) {
                                    for (i in res.data.links) {
                                        hosts.push({
                                            provider: {
                                                url: 'https://themoviedb.org',
                                                name: "thanqn"
                                            },
                                            result: {
                                                file: res.data.links[i].link,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    }
                                }

                                if (title.toLowerCase() == 'aquaman' && year == 2018) hosts.push({
                                    provider: {
                                        url: 'https://themoviedb.org',
                                        name: "thanqn"
                                    },
                                    result: {
                                        file: 'https://lh3.googleusercontent.com/95Pf83bXooPyatJzf4QiAXYKi_qwjGbnvoUzS4xPbRXSWGBZBBIOgrDMdyKwC8rPePVEJ50E9X3FlR7_T4yVpu-B60kUd23p-IswoCYo-g-CD3ZzhT-G4eW9vOrApFnjTV8irbGbLoi7kjS1LlkkcxQEC2GJ5jWKUkinEQM3g19M82c0zBVOrhtkzNQnp8P30Wa6FNza42UPHxZRWfKnpGy0ylWzAHx5IXD4fYdLR3V6itIKq_UwDZ9KkQAtWHPDYTRTQtlQWIBsfD4tcYJ_T1nCa7Psrp83YuIrBe9GoTsWASZ_JFpmOX6OG1zRiWWVq-2_fELshnAE3hy0jMmvYAqkuKa326MlmAGlK_sWuZbYnt4EWa5Xpwvss-I8dfMyAmorlfLatH_UNh0qgxA0_NvKMYvumnlZhA_UfG_WuBpJp_47f_rcp9N4U4s9Y2R6-aFndZGZZ8vLa7nNaemsTtcI72ZUMSJO3Hk4Tosa3Esx4FRNVg8gs448zOV5RxpNjwP82Pad0Icy_9pcyz4uABG6b7XJ132xB3eGSaySNraQiX7Z8gCT_hBjkaDgz1K6CuqGkZC4rs2gnsNAsaWCA0Jlu1Uiyj_iAJsqlg1ou84Wevplo5U9PPWk7CaOOa-N3naPW9Ircn3hJ2o2fZmTboecW4bKHCJfn5G9FlDeLyfyuwNxUE1ciNYoiDnIlp7KKkW6kdhgRTXKq0DmEuQ=m18',
                                        label: "embed",
                                        type: "embed"
                                    }
                                });

                                /*/ test
                                if(title == 'Vikings' && season == 5 && episode == 16) {
                                    hosts.push({
                                        provider: {
                                            url: 'https://themoviedb.org',
                                            name: "thanqn"
                                        },
                                        result: {
                                            file: 'http://dk.gsopcast.xyz/hls/vikings-s05e16.mp4/master.m3u8',
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }
                                 if(title.toLowerCase() == 'aquaman' && year == 2018) {
                                    hosts.push({
                                        provider: {
                                            url: 'https://themoviedb.org',
                                            name: "thanqn"
                                        },
                                        result: {
                                            file: 'http://dk.gsopcast.xyz/hls/aquaman-s0e0-2018.mp4/master.m3u8',
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                }
                                */

                                /*
                                if(type == 'movie') {
                                    let res          = await httpRequest.post('https://qwerty.teatv.net/cors_get/links', URL.HEADERS(), {
                                        'title': title, 'year': year
                                    });
                                     if(res.data.status && res.data.links.length > 0) {
                                        for(let i in res.data.links) {
                                            hosts.push({
                                                provider: {
                                                    url: 'https://themoviedb.org',
                                                    name: "thanqn"
                                                },
                                                result: {
                                                    file: res.data.links[i].link,
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    }
                                }
                                */

                                this.state.hosts = hosts;

                            case 17:
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

    return Thanqn;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Thanqn({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Thanqn',
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

thisSource.testing = Thanqn;
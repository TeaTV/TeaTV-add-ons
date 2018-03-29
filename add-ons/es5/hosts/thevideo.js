

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TheVideo = function () {
    function TheVideo(props) {
        _classCallCheck(this, TheVideo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(TheVideo, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.prev = 1;
                                _context.next = 4;
                                return httpRequest.getHTML(url, {
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                                    'cache-control': 'max-age=0',
                                    'upgrade-insecure-requests': 1,
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
                                });

                            case 4:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);
                                throw new Error(_context.t0);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'convertToEmbed',
        value: function convertToEmbed(url) {

            // convert link detail to link embed
            // if input is embed then return input

            // let id = url.match(/\/embed\-([^\-]+)/i);
            // id = url != null ? url[1] : false;

            // if( id == false ) return url;

        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, sources, htmlDetail, thief, jwConfig, htmlJwConfig, vt, linkPlay, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                htmlDetail = false;
                                _context3.prev = 3;
                                _context3.next = 6;
                                return this.checkLive(url);

                            case 6:
                                htmlDetail = _context3.sent;
                                _context3.next = 12;
                                break;

                            case 9:
                                _context3.prev = 9;
                                _context3.t0 = _context3['catch'](3);
                                throw new Error(_context3.t0);

                            case 12:
                                if (!(htmlDetail == false)) {
                                    _context3.next = 14;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 14:
                                thief = htmlDetail.match(/var *thief *\=\ *'([^\']+)/i);

                                thief = thief != null ? thief[1] : '';

                                jwConfig = 'https://thevideo.website/vsign/player/' + thief;
                                htmlJwConfig = false;
                                _context3.prev = 18;
                                _context3.next = 21;
                                return httpRequest.getHTML(jwConfig);

                            case 21:
                                htmlJwConfig = _context3.sent;
                                _context3.next = 27;
                                break;

                            case 24:
                                _context3.prev = 24;
                                _context3.t1 = _context3['catch'](18);
                                throw new Error(_context3.t1);

                            case 27:
                                vt = htmlJwConfig.match(/jwConfig\|([^\|]+)/i);

                                vt = vt != null ? vt[1] : '';

                                linkPlay = htmlDetail.match(/sources *: *\[([^\]]+)/i);

                                linkPlay = linkPlay != null ? linkPlay[1] : '';

                                linkPlay = eval('[' + linkPlay + ']');

                                arrPromise = linkPlay.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
                                        var linkDirect, isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        linkDirect = value.file + '?direct=false&ua=1&vt=' + vt;
                                                        _context2.prev = 1;
                                                        _context2.next = 4;
                                                        return httpRequest.isLinkDie(linkDirect);

                                                    case 4:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {

                                                            sources.push({
                                                                file: linkDirect, label: value.label, type: "embed", size: isDie
                                                            });
                                                        }
                                                        _context2.next = 10;
                                                        break;

                                                    case 8:
                                                        _context2.prev = 8;
                                                        _context2.t0 = _context2['catch'](1);

                                                    case 10:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 8]]);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 35;
                                return Promise.all(arrPromise);

                            case 35:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "thevideo"
                                    },
                                    result: sources
                                });

                            case 36:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[3, 9], [18, 24]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return TheVideo;
}();

thisSource.function = function (libs, settings) {
    return new TheVideo({ libs: libs, settings: settings });
};
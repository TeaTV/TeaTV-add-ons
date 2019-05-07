

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UploadHeaven = function () {
    function UploadHeaven(props) {
        _classCallCheck(this, UploadHeaven);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(UploadHeaven, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, urlPost, headers, html, token, jsonEmbed;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                urlPost = 'https://uploadhaven.com/video/getSource';
                                headers = {
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                                    'content-type': 'application/json;charset=UTF-8',
                                    'accept': 'application/json, text/plain, */*',
                                    'authority': 'uploadhaven.com',
                                    'referer': url
                                };
                                _context.prev = 3;
                                _context.next = 6;
                                return httpRequest.getHTML(url);

                            case 6:
                                html = _context.sent;
                                token = html.match(/\'token\' *\: *\'([^\']+)/i);

                                token = token != null ? token[1] : false;

                                if (!(token == false)) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt('return', false);

                            case 11:
                                _context.next = 13;
                                return httpRequest.post(urlPost, headers, {
                                    referrer: '',
                                    token: token
                                });

                            case 13:
                                jsonEmbed = _context.sent;

                                jsonEmbed = jsonEmbed.data;

                                jsonEmbed = jsonEmbed.source;
                                return _context.abrupt('return', jsonEmbed);

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](3);
                                return _context.abrupt('return', false);

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 19]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs2, httpRequest, cheerio, results, embed, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                results = [];
                                _context2.next = 4;
                                return this.checkLive(url);

                            case 4:
                                embed = _context2.sent;

                                if (!(embed == false)) {
                                    _context2.next = 7;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 7:
                                _context2.prev = 7;
                                _context2.next = 10;
                                return httpRequest.isLinkDie(embed);

                            case 10:
                                isDie = _context2.sent;


                                if (isDie != false) {

                                    results.push({
                                        file: embed, label: "embed", type: "embed", size: isDie
                                    });
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Stream"
                                    },
                                    result: results
                                });

                            case 15:
                                _context2.prev = 15;
                                _context2.t0 = _context2['catch'](7);
                                throw new Error(_context2.t0);

                            case 18:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[7, 15]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return UploadHeaven;
}();

thisSource.function = function (libs, settings) {
    return new UploadHeaven({ libs: libs, settings: settings });
};
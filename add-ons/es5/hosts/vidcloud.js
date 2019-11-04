

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidcloud = function () {
    function Vidcloud(props) {
        _classCallCheck(this, Vidcloud);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidcloud, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.next = 3;
                                return httpRequest.getHTML(url);

                            case 3:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, sources, html, reg, m;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                _context2.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 8;
                                    break;
                                }

                                console.log('vidtodo no link');
                                throw new Error("vidtodo LINK DIE");

                            case 8:
                                reg = /file:\s?'?"?([^'?"?]+)/g;
                                m = void 0;

                            case 10:
                                if (!(m = reg.exec(html))) {
                                    _context2.next = 16;
                                    break;
                                }

                                if (!(m[1].indexOf('m3u8') == -1)) {
                                    _context2.next = 13;
                                    break;
                                }

                                return _context2.abrupt('continue', 10);

                            case 13:

                                sources.push({
                                    label: 'NOR',
                                    file: m[1],
                                    type: "direct",
                                    size: "NOR"
                                });
                                _context2.next = 10;
                                break;

                            case 16:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Vidcloud"
                                    },
                                    result: sources
                                });

                            case 17:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidcloud;
}();

thisSource.function = function (libs, settings) {
    return new Vidcloud({ libs: libs, settings: settings });
};
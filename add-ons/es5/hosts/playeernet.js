

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Playeernet = function () {
    function Playeernet(props) {
        _classCallCheck(this, Playeernet);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Playeernet, [{
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
                                return httpRequest.getHTML(url, {
                                    'Referer': 'https://online.moviesmax.net/movies/'
                                });

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
                var _libs, httpRequest, cheerio, sources, html, results, m, isDie;

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

                                console.log('Playeernet no link');
                                throw new Error("Playeernet LINK DIE");

                            case 8:
                                results = [];
                                m = html.match(/mp4 = '([^']+)/);

                                if (!(m == undefined)) {
                                    _context2.next = 12;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 12:
                                _context2.next = 14;
                                return httpRequest.isLinkDie(m[1]);

                            case 14:
                                isDie = _context2.sent;

                                if (isDie != false) {

                                    results.push({
                                        file: m[1], label: 'NOR', type: "direct", size: isDie
                                    });
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Playeernet"
                                    },
                                    result: results
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

    return Playeernet;
}();

thisSource.function = function (libs, settings) {
    return new Playeernet({ libs: libs, settings: settings });
};
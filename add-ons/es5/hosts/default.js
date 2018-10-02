

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Defaulthost = function () {
    function Defaulthost(props) {
        _classCallCheck(this, Defaulthost);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Defaulthost, [{
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, isEmbed, results, isDie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                throw new Error('NOT_FOUND');

                            case 4:
                                isEmbed = _context.sent;

                                if (!(JSON.stringify(isEmbed).indexOf('video/mp4') == -1)) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "CDN OK"
                                    },
                                    result: []
                                });

                            case 7:
                                results = [];
                                isDie = 'NOR';
                                _context.prev = 9;
                                _context.next = 12;
                                return httpRequest.isLinkDie(url);

                            case 12:
                                isDie = _context.sent;
                                _context.next = 17;
                                break;

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context['catch'](9);

                            case 17:

                                if (isDie != false && isDie != 'NOR') {

                                    results.push({
                                        file: url, label: 'NOR', type: "direct", size: isDie
                                    });
                                }

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "CDN"
                                    },
                                    result: results
                                });

                            case 19:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 15]]);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Defaulthost;
}();

thisSource.function = function (libs, settings) {
    return new Defaulthost({ libs: libs, settings: settings });
};
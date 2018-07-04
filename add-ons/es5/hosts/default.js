

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Default = function () {
    function Default(props) {
        _classCallCheck(this, Default);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Default, [{
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, isEmbed, results, isDie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                _context.next = 3;
                                return httpRequest.getContentType(url);

                            case 3:
                                isEmbed = _context.sent;

                                if (!(isEmbed.indexOf('video/mp4') == -1)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "CDN"
                                    },
                                    result: []
                                });

                            case 6:
                                results = [];
                                isDie = 'NOR';
                                _context.prev = 8;
                                _context.next = 11;
                                return httpRequest.isLinkDie(url);

                            case 11:
                                isDie = _context.sent;
                                _context.next = 16;
                                break;

                            case 14:
                                _context.prev = 14;
                                _context.t0 = _context['catch'](8);

                            case 16:

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

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 14]]);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Default;
}();

thisSource.function = function (libs, settings) {
    return new Default({ libs: libs, settings: settings });
};
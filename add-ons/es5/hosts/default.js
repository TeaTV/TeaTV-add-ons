

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
                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 2:
                                throw new Error('NOT_FOUND');

                            case 7:
                                _context.next = 9;
                                return httpRequest.getHeader(url);

                            case 9:
                                isEmbed = _context.sent;

                                if (!(JSON.stringify(isEmbed).indexOf('video/mp4') == -1 && JSON.stringify(isEmbed).indexOf('application/octet-stream') == -1)) {
                                    _context.next = 12;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Direct"
                                    },
                                    result: []
                                });

                            case 12:
                                results = [];
                                isDie = 'NOR';
                                _context.prev = 14;
                                _context.next = 17;
                                return httpRequest.isLinkDie(url);

                            case 17:
                                isDie = _context.sent;
                                _context.next = 23;
                                break;

                            case 20:
                                _context.prev = 20;
                                _context.t0 = _context['catch'](14);
                                throw new Error('NOT_FOUND_ERR');

                            case 23:

                                console.log('isDie', isDie);

                                if (!(isDie != false && isDie != 'NOR')) {
                                    _context.next = 27;
                                    break;
                                }

                                results.push({
                                    file: url, label: 'NOR', type: "direct", size: isDie
                                });

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "CDN"
                                    },
                                    result: results
                                });

                            case 27:
                                throw new Error('NOT_FOUND');

                            case 28:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[14, 20]]);
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
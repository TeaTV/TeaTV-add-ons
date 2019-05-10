

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VodFree = function () {
    function VodFree(props) {
        _classCallCheck(this, VodFree);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(VodFree, [{
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, results, isDie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];


                                url = url.replace(/\?pi=.*/i, '');

                                isDie = 'NOR';
                                _context.prev = 4;
                                _context.next = 7;
                                return this.isLinkDie(url);

                            case 7:
                                isDie = _context.sent;
                                _context.next = 12;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](4);

                            case 12:

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

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[4, 10]]);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }, {
        key: 'isLinkDie',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var converter, sizeMb;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                converter = this.libs.converter;
                                _context2.next = 3;
                                return this.getFileSize(url);

                            case 3:
                                sizeMb = _context2.sent;
                                _context2.prev = 4;


                                sizeMb = converter(+sizeMb, 'MB', 'GB');
                                sizeMb = parseFloat(+sizeMb).toFixed(2);

                                return _context2.abrupt('return', sizeMb);

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2['catch'](4);
                                return _context2.abrupt('return', false);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 10]]);
            }));

            function isLinkDie(_x2) {
                return _ref2.apply(this, arguments);
            }

            return isLinkDie;
        }()
    }, {
        key: 'getFileSize',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var axios, res;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                axios = this.libs.axios;
                                _context3.next = 3;
                                return axios.head(url);

                            case 3:
                                res = _context3.sent;
                                return _context3.abrupt('return', res.headers["content-length"]);

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getFileSize(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getFileSize;
        }()
    }]);

    return VodFree;
}();

thisSource.function = function (libs, settings) {
    return new VodFree({ libs: libs, settings: settings });
};
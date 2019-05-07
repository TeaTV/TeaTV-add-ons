

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToCloud = function () {
    function ToCloud(props) {
        _classCallCheck(this, ToCloud);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(ToCloud, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html, sources;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.next = 3;
                                return httpRequest.getHTML(url);

                            case 3:
                                html = _context.sent;
                                sources = html.match(/sources *\: *([^\]]+)/i);

                                sources = sources != null ? sources[1] + ']' : false;

                                if (!(sources == false)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return', false);

                            case 8:

                                eval('sources = ' + sources);

                                return _context.abrupt('return', sources);

                            case 10:
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
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _this = this;

                var _libs, httpRequest, cheerio, arrVideoQuality, results, jsonDirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                results = [];
                                _context3.next = 5;
                                return this.checkLive(url);

                            case 5:
                                jsonDirect = _context3.sent;

                                if (!(jsonDirect == false)) {
                                    _context3.next = 8;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 8:
                                _context3.prev = 8;
                                arrPromise = jsonDirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        isDie = 'NOR';
                                                        _context2.prev = 1;
                                                        _context2.next = 4;
                                                        return httpRequest.isLinkDie(val.file);

                                                    case 4:
                                                        isDie = _context2.sent;
                                                        _context2.next = 9;
                                                        break;

                                                    case 7:
                                                        _context2.prev = 7;
                                                        _context2.t0 = _context2['catch'](1);

                                                    case 9:

                                                        if (isDie != false && isDie != 'NOR') {

                                                            results.push({
                                                                file: val.file, label: 'NOR', type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 10:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this, [[1, 7]]);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 12;
                                return Promise.all(arrPromise);

                            case 12:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Cloud"
                                    },
                                    result: results
                                });

                            case 15:
                                _context3.prev = 15;
                                _context3.t0 = _context3['catch'](8);
                                throw new Error(_context3.t0);

                            case 18:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[8, 15]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return ToCloud;
}();

thisSource.function = function (libs, settings) {
    return new ToCloud({ libs: libs, settings: settings });
};
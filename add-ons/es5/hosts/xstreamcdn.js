

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XstreamCDN = function () {
    function XstreamCDN(props) {
        _classCallCheck(this, XstreamCDN);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(XstreamCDN, [{
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
                                return httpRequest.post(url);

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, sources, m, u, html, data, results, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];


                                url = url.replace(/#.*/, '');

                                m = url.split('/')[4];
                                u = 'https://www.xstreamcdn.com/api/source/' + m;
                                _context3.next = 7;
                                return this.checkLive(u);

                            case 7:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 11;
                                    break;
                                }

                                console.log('XstreamCDN no link');
                                throw new Error("XstreamCDN LINK DIE");

                            case 11:
                                data = html.data.data;
                                results = [];
                                arrPromise = data.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var label, isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        label = val.label;
                                                        _context2.next = 3;
                                                        return httpRequest.isLinkDie(val.file);

                                                    case 3:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {

                                                            results.push({
                                                                file: val.file, label: label, type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 5:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 16;
                                return Promise.all(arrPromise);

                            case 16:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "XstreamCDN"
                                    },
                                    result: results
                                });

                            case 17:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return XstreamCDN;
}();

thisSource.function = function (libs, settings) {
    return new XstreamCDN({ libs: libs, settings: settings });
};
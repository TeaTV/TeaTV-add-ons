

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const jsdom = require('jsdom');
//const { JSDOM } = jsdom;
//const jqueryPath = './jquery.min.js';
//const fs = require('fs');

var Onlystream = function () {
    function Onlystream(props) {
        _classCallCheck(this, Onlystream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Onlystream, [{
        key: 'getQuality',
        value: function getQuality(url) {
            var qualities = ['DVDRip', 'HDTV', 'HDRip', 'WEB-DL', 'WEBRip', 'BRRip', 'Bluray', 'Blu-ray', 'BDRip', 'WEB', 'HDTS', 'TS', 'CAM'];

            for (var i in qualities) {
                var quality = qualities[i];
                if (url.toLowerCase().indexOf(quality.toLowerCase()) != -1) {
                    return quality;
                }
            }

            return false;
        }
    }, {
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
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
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.prev = 3;
                                _context.next = 6;
                                return httpRequest.getHTML(url);

                            case 6:
                                html = _context.sent;
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);
                                throw new Error('NOT_FOUND');

                            case 12:
                                return _context.abrupt('return', html);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 9]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'getUsingAPI',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _this = this;

                var _libs, httpRequest, cryptoJs, cheerio, html, m, m1, results, m1Pro;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                url = url.replace(/(oload.[a-z]+)/g, 'Onlystream.pw');

                                _libs = this.libs, httpRequest = _libs.httpRequest, cryptoJs = _libs.cryptoJs, cheerio = _libs.cheerio;
                                html = false;
                                _context3.prev = 3;
                                _context3.next = 6;
                                return this.checkLive(url);

                            case 6:
                                html = _context3.sent;
                                _context3.next = 12;
                                break;

                            case 9:
                                _context3.prev = 9;
                                _context3.t0 = _context3['catch'](3);
                                throw new Error("LINK DIE");

                            case 12:
                                m = html.split('sources: ')[1].split('}],')[0] + '}]';
                                m1 = m.match(/file:"([^"]+)/g);
                                results = [];
                                m1Pro = m1.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(str) {
                                        var aSize;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        str = str.split('"')[1];
                                                        _context2.next = 3;
                                                        return httpRequest.isLinkDie(str);

                                                    case 3:
                                                        aSize = _context2.sent;

                                                        aSize = aSize === false ? 'NOR' : aSize;
                                                        results.push({
                                                            file: str, label: 'NOR', type: "direct", size: aSize
                                                        });

                                                    case 6:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 18;
                                return Promise.all(m1Pro);

                            case 18:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Onlystream"
                                    },
                                    result: results
                                });

                            case 19:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[3, 9]]);
            }));

            function getUsingAPI(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getUsingAPI;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
                var _libs2, httpRequest, cheerio, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                _context4.prev = 1;
                                _context4.next = 4;
                                return this.getUsingAPI(url);

                            case 4:
                                data = _context4.sent;
                                return _context4.abrupt('return', data);

                            case 8:
                                _context4.prev = 8;
                                _context4.t0 = _context4['catch'](1);
                                throw new Error(_context4.t0);

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[1, 8]]);
            }));

            function getLink(_x4) {
                return _ref4.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Onlystream;
}();

thisSource.function = function (libs, settings) {
    return new Onlystream({ libs: libs, settings: settings });
};


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var converter = require('byte-converter').converterBase2;

var END_OF_INPUT = -1;
var arrChrs = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/");
var reversegetFChars = new Array();
for (var i = 0; i < arrChrs.length; i++) {
    reversegetFChars[arrChrs[i]] = i;
}
var getFStr = void 0;
var getFCount = void 0;

function ntos(e) {
    e = e.toString(16);
    if (e.length == 1) e = "0" + e;
    e = "%" + e;
    return unescape(e);
}

function readReversegetF() {
    if (!getFStr) return END_OF_INPUT;
    while (true) {
        if (getFCount >= getFStr.length) return END_OF_INPUT;
        var e = getFStr.charAt(getFCount);
        getFCount++;
        if (reversegetFChars[e]) {
            return reversegetFChars[e];
        }
        if (e == "A") return 0;
    }
    return END_OF_INPUT;
}

function readgetF() {
    if (!getFStr) return END_OF_INPUT;
    if (getFCount >= getFStr.length) return END_OF_INPUT;
    var e = getFStr.charCodeAt(getFCount) & 255;
    getFCount++;
    return e;
}

function setgetFStr(e) {
    getFStr = e;
    getFCount = 0;
}

function getF(e) {
    setgetFStr(e);
    var t = "";
    var n = new Array(4);
    var r = false;
    while (!r && (n[0] = readReversegetF()) != END_OF_INPUT && (n[1] = readReversegetF()) != END_OF_INPUT) {
        n[2] = readReversegetF();
        n[3] = readReversegetF();
        t += ntos(n[0] << 2 & 255 | n[1] >> 4);
        if (n[2] != END_OF_INPUT) {
            t += ntos(n[1] << 4 & 255 | n[2] >> 2);
            if (n[3] != END_OF_INPUT) {
                t += ntos(n[2] << 6 & 255 | n[3]);
            } else {
                r = true;
            }
        } else {
            r = true;
        }
    }
    return t;
}

function tor(txt) {
    var map = [];
    var tmp = "abcdefghijklmnopqrstuvwxyz";
    var buf = "";
    for (j = 0; j < tmp.length; j++) {
        var x = tmp.charAt(j);var y = tmp.charAt((j + 13) % 26);
        map[x] = y;map[x.toUpperCase()] = y.toUpperCase();
    }
    for (j = 0; j < txt.length; j++) {
        var c = txt.charAt(j);
        buf += c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' ? map[c] : c;
    }
    return buf;
}

var decrypt = function decrypt(e) {
    var code = unescape(getF(tor(getF(e))));
    return code;
};

var Afdah = function () {
    function Afdah(props) {
        _classCallCheck(this, Afdah);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Afdah, [{
        key: "isLinkDie",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var axios, size;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                axios = this.libs.axios;

                                if (!(url.indexOf('.m3u') != -1)) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt("return", "NOR");

                            case 3:
                                _context.next = 5;
                                return this.getFileSize(url);

                            case 5:
                                size = _context.sent;
                                _context.prev = 6;


                                size = parseInt(+size);
                                // size = converter(+size, 'KB', 'GB');
                                // size = parseFloat(+size).toFixed(2);
                                return _context.abrupt("return", size);

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context["catch"](6);
                                return _context.abrupt("return", false);

                            case 14:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 11]]);
            }));

            function isLinkDie(_x) {
                return _ref.apply(this, arguments);
            }

            return isLinkDie;
        }()
    }, {
        key: "getFileSize",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var axios, res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                axios = this.libs.axios;
                                _context2.next = 3;
                                return axios.head(url);

                            case 3:
                                res = _context2.sent;
                                return _context2.abrupt("return", res.headers["content-length"]);

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getFileSize(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getFileSize;
        }()
    }, {
        key: "checkLive",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context3.next = 3;
                                return httpRequest.getCloudflare(url);

                            case 3:
                                html = _context3.sent;

                                html = html.data;
                                // if(html.includes(dieStatusText)) return true;
                                return _context3.abrupt("return", html);

                            case 6:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function checkLive(_x3) {
                return _ref3.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: "convertToEmbed",
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: "getLink",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url) {
                var _libs, httpRequest, cheerio, afdah, html, decryp, sources, arrPromise;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                afdah = this;
                                _context5.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context5.sent;

                                if (!(html == false)) {
                                    _context5.next = 7;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 7:
                                decryp = html.match(/decrypt\(\"([^\"]+)/i);

                                decryp = decryp != null ? decryp[1] : '';
                                decryp = decrypt(decryp);
                                decryp = decryp.match(/sources *: *\[([^\]]+)/i);
                                decryp = decryp != null ? decryp[1] : '';

                                if (!(decryp != '')) {
                                    _context5.next = 19;
                                    break;
                                }

                                sources = [];


                                decryp = eval("[" + decryp + "]");

                                arrPromise = decryp.map(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(value) {
                                        var htmlM3u8, listM3u8, size;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.next = 2;
                                                        return httpRequest.getHTML(value.file);

                                                    case 2:
                                                        htmlM3u8 = _context4.sent;
                                                        listM3u8 = htmlM3u8.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig);
                                                        _context4.next = 6;
                                                        return afdah.getSizeM3u8(listM3u8);

                                                    case 6:
                                                        size = _context4.sent;


                                                        sources.push({
                                                            label: 'NOR',
                                                            file: value.file,
                                                            type: "embed",
                                                            size: size
                                                        });

                                                    case 8:
                                                    case "end":
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, this);
                                    }));

                                    return function (_x5) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());
                                _context5.next = 18;
                                return Promise.all(arrPromise);

                            case 18:
                                return _context5.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "afdah"
                                    },
                                    result: sources
                                });

                            case 19:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getLink(_x4) {
                return _ref4.apply(this, arguments);
            }

            return getLink;
        }()
    }, {
        key: "getSizeM3u8",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(listLink) {
                var _this = this;

                var _libs2, httpRequest, cheerio, afdah, totalSize, arrM3u8, arrPromise;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                afdah = this;
                                totalSize = 0;
                                arrM3u8 = [];
                                arrPromise = listLink.map(function () {
                                    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(val) {
                                        var htmlM3u8, listM3u8, _i;

                                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                            while (1) {
                                                switch (_context6.prev = _context6.next) {
                                                    case 0:
                                                        if (!(val.indexOf('http') != -1)) {
                                                            _context6.next = 6;
                                                            break;
                                                        }

                                                        _context6.next = 3;
                                                        return httpRequest.getHTML(val);

                                                    case 3:
                                                        htmlM3u8 = _context6.sent;
                                                        listM3u8 = htmlM3u8.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig);


                                                        for (_i = 1; _i <= listM3u8.length; _i += 2) {

                                                            if (listM3u8[_i].indexOf('http') != -1) {

                                                                arrM3u8.push(listM3u8[_i]);
                                                            }
                                                        }

                                                    case 6:
                                                    case "end":
                                                        return _context6.stop();
                                                }
                                            }
                                        }, _callee6, _this);
                                    }));

                                    return function (_x7) {
                                        return _ref7.apply(this, arguments);
                                    };
                                }());
                                _context8.next = 7;
                                return Promise.all(arrPromise);

                            case 7:

                                arrPromise = arrM3u8.map(function () {
                                    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(val) {
                                        var size;
                                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                            while (1) {
                                                switch (_context7.prev = _context7.next) {
                                                    case 0:
                                                        _context7.prev = 0;
                                                        _context7.next = 3;
                                                        return afdah.isLinkDie(val);

                                                    case 3:
                                                        size = _context7.sent;


                                                        if (size) {

                                                            totalSize += +size;
                                                        }
                                                        _context7.next = 9;
                                                        break;

                                                    case 7:
                                                        _context7.prev = 7;
                                                        _context7.t0 = _context7["catch"](0);

                                                    case 9:
                                                    case "end":
                                                        return _context7.stop();
                                                }
                                            }
                                        }, _callee7, _this, [[0, 7]]);
                                    }));

                                    return function (_x8) {
                                        return _ref8.apply(this, arguments);
                                    };
                                }());

                                _context8.next = 10;
                                return Promise.all(arrPromise);

                            case 10:

                                totalSize = converter(totalSize, 'B', 'GB');
                                totalSize = parseFloat(totalSize).toFixed(2);
                                return _context8.abrupt("return", totalSize);

                            case 13:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function getSizeM3u8(_x6) {
                return _ref6.apply(this, arguments);
            }

            return getSizeM3u8;
        }()
    }]);

    return Afdah;
}();

thisSource.function = function (libs, settings) {
    return new Afdah({ libs: libs, settings: settings });
};
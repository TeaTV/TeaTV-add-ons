

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "checkLive",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.next = 3;
                                return httpRequest.post(url, {
                                    'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                                    'Referer': url

                                }, { 'play': 'continue', 'x': 0, 'y': 0 });

                            case 3:
                                html = _context.sent;
                                return _context.abrupt("return", html.data);

                            case 5:
                            case "end":
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
        key: "convertToEmbed",
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: "getLink",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, html, decryp, sources, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                _context3.next = 3;
                                return this.checkLive(url);

                            case 3:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 6;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 6:
                                decryp = html.match(/decrypt\(\"([^\"]+)/i);

                                decryp = decryp != null ? decryp[1] : '';

                                decryp = decrypt(decryp);
                                decryp = decryp.match(/sources *: *\[([^\]]+)/i);
                                decryp = decryp != null ? decryp[1] : '';

                                if (!(decryp != '')) {
                                    _context3.next = 18;
                                    break;
                                }

                                sources = [];


                                decryp = eval("[" + decryp + "]");

                                arrPromise = decryp.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.isLinkDie(value.file);

                                                    case 2:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {

                                                            sources.push({
                                                                label: 'NOR',
                                                                file: value.file,
                                                                type: "embed",
                                                                size: (Math.random() * (2.2 - 1.9) + 1.9).toFixed(2)
                                                            });
                                                        }

                                                    case 4:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 17;
                                return Promise.all(arrPromise);

                            case 17:
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "afdah"
                                    },
                                    result: sources
                                });

                            case 18:
                            case "end":
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

    return Afdah;
}();

thisSource.function = function (libs, settings) {
    return new Afdah({ libs: libs, settings: settings });
};
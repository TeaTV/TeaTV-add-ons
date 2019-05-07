

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Putload = function () {
    function Putload(props) {
        _classCallCheck(this, Putload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Putload, [{
        key: 'decode',
        value: function decode(p, a, c, k, e, d) {
            while (c--) {
                if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
            }return p;
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
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.next = 3;
                                return httpRequest.getHTML(url, {
                                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
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
                var _libs, httpRequest, cheerio, sources, arrDirect, htmlDetail, p, x, l1, l2, linkcdn, size, linkHls, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                arrDirect = [];
                                _context2.next = 5;
                                return this.checkLive(url);

                            case 5:
                                htmlDetail = _context2.sent;

                                if (!(htmlDetail == false)) {
                                    _context2.next = 8;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 8:
                                x = htmlDetail.split('return p}').pop();

                                x = 'p = this.decode' + x.split(')))')[0] + '))';
                                eval(x);
                                l1 = p.match(/(http.+\.m3u8)/);
                                l2 = p.match(/(http.+\.mp4)/g);

                                if (!(l2 != undefined)) {
                                    _context2.next = 26;
                                    break;
                                }

                                linkcdn = l2[0].split('"')[2];
                                size = false;
                                _context2.prev = 16;
                                _context2.next = 19;
                                return httpRequest.isLinkDie(linkcdn);

                            case 19:
                                size = _context2.sent;
                                _context2.next = 25;
                                break;

                            case 22:
                                _context2.prev = 22;
                                _context2.t0 = _context2['catch'](16);

                                size = false;

                            case 25:

                                if (size != false && size != 'NOR' && size != NaN) {
                                    sources.push({
                                        file: linkcdn, label: 'NOR', type: "direct", size: size
                                    });
                                }

                            case 26:
                                if (!(l1 != undefined)) {
                                    _context2.next = 32;
                                    break;
                                }

                                linkHls = l1[1];
                                _context2.next = 30;
                                return httpRequest.isLinkDie(linkHls);

                            case 30:
                                isDie = _context2.sent;


                                if (isDie != false) {
                                    sources.push({
                                        label: 'NOR',
                                        file: linkHls,
                                        type: "direct",
                                        size: (Math.random() * (2.2 - 1.9) + 1.9).toFixed(2)
                                    });
                                }

                            case 32:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Putload"
                                    },
                                    result: sources
                                });

                            case 33:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[16, 22]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Putload;
}();

thisSource.function = function (libs, settings) {
    return new Putload({ libs: libs, settings: settings });
};
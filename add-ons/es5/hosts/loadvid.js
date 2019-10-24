

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadVid = function () {
    function LoadVid(props) {
        _classCallCheck(this, LoadVid);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(LoadVid, [{
        key: "checkLive",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, idEmbed, embedApi, jsonEmbed, sources;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                idEmbed = url.match(/embed\/(.+)/i);

                                idEmbed = idEmbed != false ? idEmbed[1] : false;

                                if (!(idEmbed == false)) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return", false);

                            case 5:
                                embedApi = "https://loadvid.online/player?fid=" + idEmbed + "&page=embed";
                                _context.next = 8;
                                return httpRequest.getHTML(embedApi, {
                                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
                                });

                            case 8:
                                jsonEmbed = _context.sent;
                                _context.prev = 9;

                                jsonEmbed = JSON.parse(jsonEmbed);
                                _context.next = 16;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](9);
                                throw new Error("LINK DIE");

                            case 16:
                                if (!(jsonEmbed.status != true)) {
                                    _context.next = 18;
                                    break;
                                }

                                return _context.abrupt("return", false);

                            case 18:

                                jsonEmbed = jsonEmbed.html;

                                sources = jsonEmbed.match(/sources *\: *([^\]]+)/i);

                                sources = sources != null ? sources[1] + ']' : false;

                                if (!(sources == false)) {
                                    _context.next = 23;
                                    break;
                                }

                                return _context.abrupt("return", false);

                            case 23:
                                _context.prev = 23;

                                sources = JSON.parse(sources);
                                _context.next = 30;
                                break;

                            case 27:
                                _context.prev = 27;
                                _context.t1 = _context["catch"](23);
                                throw new Error("LINK DIE");

                            case 30:
                                return _context.abrupt("return", sources);

                            case 31:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 13], [23, 27]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: "getLink",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _this = this;

                var _libs2, httpRequest, cheerio, sources, arrLink, results, jsonDirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                sources = [];
                                arrLink = [];
                                results = [];
                                _context3.next = 6;
                                return this.checkLive(url);

                            case 6:
                                jsonDirect = _context3.sent;

                                if (!(jsonDirect == false)) {
                                    _context3.next = 9;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 9:
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
                                                        return httpRequest.isLinkDie(val.src);

                                                    case 4:
                                                        isDie = _context2.sent;
                                                        _context2.next = 9;
                                                        break;

                                                    case 7:
                                                        _context2.prev = 7;
                                                        _context2.t0 = _context2["catch"](1);

                                                    case 9:

                                                        if (isDie != false && isDie != 'NOR') {

                                                            results.push({
                                                                file: val.src, label: 'NOR', type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 10:
                                                    case "end":
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
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "CDN-Stream"
                                    },
                                    result: results
                                });

                            case 13:
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

    return LoadVid;
}();

thisSource.function = function (libs, settings) {
    return new LoadVid({ libs: libs, settings: settings });
};
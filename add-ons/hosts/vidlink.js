

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VidLink = function () {
    function VidLink(props) {
        _classCallCheck(this, VidLink);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(VidLink, [{
        key: "checkLive",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                var _libs, httpRequest, qs, html;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, qs = _libs.qs;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.next = 3;
                                return httpRequest.post("http://vidlink.org/streamdrive/info/" + id, {}, {
                                    browserName: "Chrome",
                                    platform: "MacIntel"
                                });

                            case 3:
                                html = _context.sent;

                                html = html.data;
                                // if(html.includes(dieStatusText)) return true;
                                return _context.abrupt("return", html);

                            case 6:
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
        value: function convertToEmbed(url) {

            // convert link detail to link embed
            // if input is embed then return input

            // let id = url.match(/\/embed\-([^\-]+)/i);
            // id = url != null ? url[1] : false;

            // if( id == false ) return url;

        }
    }, {
        key: "getRedirect",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var httpRequest;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                return _context2.abrupt("return", [{
                                    file: url,
                                    label: "HD",
                                    type: "embed",
                                    size: ""
                                }]);

                            case 2:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getRedirect(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getRedirect;
        }()
    }, {
        key: "getEmbed",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
                var _libs2, httpRequest, cheerio, sources, temp, urlParts, id, postResponse, data, resultArr, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                sources = [];
                                temp = [];
                                urlParts = url.split("/");
                                id = urlParts[urlParts.length - 1];
                                _context4.prev = 5;
                                _context4.next = 8;
                                return this.checkLive(id);

                            case 8:
                                postResponse = _context4.sent;

                                if (!(postResponse == false)) {
                                    _context4.next = 11;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 11:
                                data = postResponse.data;
                                resultArr = data.map(function (val, index) {
                                    if (val.status == 403) throw new Error("NOT LINK");

                                    temp.push({
                                        file: val.url,
                                        label: "HD",
                                        type: "embed"
                                    });
                                }).filter(function (val) {
                                    return val !== undefined;
                                });
                                arrPromise = temp.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.isLinkDie(val.file);

                                                    case 2:
                                                        isDie = _context3.sent;


                                                        if (isDie != false) {
                                                            val.size = isDie;
                                                            sources.push(val);
                                                        }

                                                    case 4:
                                                    case "end":
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this);
                                    }));

                                    return function (_x4) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 16;
                                return Promise.all(arrPromise);

                            case 16:
                                return _context4.abrupt("return", sources);

                            case 19:
                                _context4.prev = 19;
                                _context4.t0 = _context4["catch"](5);
                                throw new Error(_context4.t0);

                            case 22:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[5, 19]]);
            }));

            function getEmbed(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getEmbed;
        }()
    }, {
        key: "getLink",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url) {
                var _libs3, httpRequest, cheerio, sources;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio;
                                sources = [];

                                if (!url.includes('redirect')) {
                                    _context5.next = 9;
                                    break;
                                }

                                _context5.next = 5;
                                return this.getRedirect(url);

                            case 5:
                                sources = _context5.sent;
                                return _context5.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "vidlink"
                                    },
                                    result: sources
                                });

                            case 9:
                                _context5.next = 11;
                                return this.getEmbed(url);

                            case 11:
                                sources = _context5.sent;
                                return _context5.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "vidlink"
                                    },
                                    result: sources
                                });

                            case 13:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getLink(_x5) {
                return _ref5.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return VidLink;
}();

thisSource.function = function (libs, settings) {
    return new VidLink({ libs: libs, settings: settings });
};
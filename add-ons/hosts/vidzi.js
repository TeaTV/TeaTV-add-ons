

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidzi = function () {
    function Vidzi(props) {
        _classCallCheck(this, Vidzi);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidzi, [{
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
                                return httpRequest.getHTML(url);

                            case 3:
                                html = _context.sent;
                                return _context.abrupt("return", html);

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
        value: function convertToEmbed(url) {

            // convert link detail to link embed
            // if input is embed then return input

            // let id = url.match(/\/embed\-([^\-]+)/i);
            // id = url != null ? url[1] : false;

            // if( id == false ) return url;

        }
    }, {
        key: "getLink",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, sources, temp, html, player, data, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                temp = [];
                                _context3.next = 5;
                                return this.checkLive(url);

                            case 5:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 8;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 8:

                                html = html.substring(html.indexOf('jwplayer("vplayer").setup({'));
                                html = html.substring(0, 3 + html.indexOf("});"));
                                html = html.replace('jwplayer("vplayer").setup', "player = ");
                                _context3.prev = 11;

                                eval(html);
                                _context3.next = 18;
                                break;

                            case 15:
                                _context3.prev = 15;
                                _context3.t0 = _context3["catch"](11);
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "vidzi"
                                    },
                                    result: []
                                });

                            case 18:
                                data = player.sources;


                                data.map(function (val) {

                                    temp.push({
                                        label: val.file.indexOf("mp4") !== -1 ? "NOR" : "NOR",
                                        file: val.file,
                                        type: "embed"
                                    });
                                });

                                arrPromise = temp.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.isLinkDie(val.file);

                                                    case 2:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {
                                                            val.size = isDie;
                                                            sources.push(val);
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
                                _context3.next = 23;
                                return Promise.all(arrPromise);

                            case 23:
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "vidzi"
                                    },
                                    result: sources
                                });

                            case 24:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[11, 15]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidzi;
}();

thisSource.function = function (libs, settings) {
    return new Vidzi({ libs: libs, settings: settings });
};
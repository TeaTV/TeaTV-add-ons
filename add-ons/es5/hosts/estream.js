

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Estream = function () {
    function Estream(props) {
        _classCallCheck(this, Estream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Estream, [{
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

                                _context.prev = 1;
                                _context.next = 4;
                                return httpRequest.getHTML(url);

                            case 4:
                                html = _context.sent;
                                return _context.abrupt("return", html);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context["catch"](1);
                                throw new Error('LINK DIE');

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
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
                var _libs, httpRequest, cheerio, html, $, sources, temp, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                throw new Error("LINK DIE");

                            case 4:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 7;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 7:
                                $ = cheerio.load(html);
                                sources = [];
                                temp = [];


                                $("video source").each(function () {
                                    var label = $(this).attr("type") !== "video/mp4" ? "NOR" : $(this).attr("res") === "854x480" ? "480p" : "360p";

                                    temp.push({
                                        label: label,
                                        file: $(this).attr("src"),
                                        type: "embed"
                                    });
                                });

                                console.log(temp);

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
                                _context3.next = 15;
                                return Promise.all(arrPromise);

                            case 15:
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "estream"
                                    },
                                    result: sources
                                });

                            case 16:
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

    return Estream;
}();

thisSource.function = function (libs, settings) {
    return new Estream({ libs: libs, settings: settings });
};
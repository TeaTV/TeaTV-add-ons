

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Videozoo = function () {
    function Videozoo(props) {
        _classCallCheck(this, Videozoo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Videozoo, [{
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
                                return httpRequest.getHTML(url, {
                                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
                                });

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, sources, arrLink, htmlDetail, linkPlay;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                arrLink = [];
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
                                linkPlay = htmlDetail.match(/player\.load\( *\{\s*file\: *\"([^\"]+)/i);

                                linkPlay = linkPlay != null ? linkPlay[1] : false;

                                if (!(linkPlay != false)) {
                                    _context2.next = 13;
                                    break;
                                }

                                sources.push({
                                    label: 'NOR',
                                    file: linkPlay,
                                    type: "embed",
                                    size: 'NOR'
                                });

                                return _context2.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "Videozoo"
                                    },
                                    result: sources
                                });

                            case 13:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Videozoo;
}();

thisSource.function = function (libs, settings) {
    return new Videozoo({ libs: libs, settings: settings });
};
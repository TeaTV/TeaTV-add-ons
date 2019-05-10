

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidnode = function () {
    function Vidnode(props) {
        _classCallCheck(this, Vidnode);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidnode, [{
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, sources, arrDirect, htmlDetail, linkDirect, linkcdn, size, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                arrDirect = [];
                                _context3.next = 5;
                                return this.checkLive(url);

                            case 5:
                                htmlDetail = _context3.sent;

                                if (!(htmlDetail == false)) {
                                    _context3.next = 8;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 8:
                                linkDirect = htmlDetail.match(/playerInstance\.setup\(\{\s*sources\: *\[([^\]]+)/i);

                                linkDirect = linkDirect != null ? linkDirect[1] : '';
                                linkcdn = htmlDetail.match(/playerInstance\.load\(\{\s*file *\: *\"([^\"]+)/i);

                                linkcdn = linkcdn != null ? linkcdn[1] : '';

                                size = false;
                                _context3.prev = 13;
                                _context3.next = 16;
                                return httpRequest.isLinkDie(linkcdn);

                            case 16:
                                size = _context3.sent;
                                _context3.next = 22;
                                break;

                            case 19:
                                _context3.prev = 19;
                                _context3.t0 = _context3["catch"](13);

                                size = false;

                            case 22:

                                if (size != false && size != 'NOR' && size != NaN) {
                                    sources.push({
                                        file: linkcdn, label: val.label, type: "embed", size: size
                                    });
                                }

                                eval("arrDirect = [" + linkDirect + "]");

                                arrPromise = arrDirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        isDie = false;
                                                        _context2.prev = 1;
                                                        _context2.next = 4;
                                                        return httpRequest.isLinkDie(val.file);

                                                    case 4:
                                                        isDie = _context2.sent;
                                                        _context2.next = 10;
                                                        break;

                                                    case 7:
                                                        _context2.prev = 7;
                                                        _context2.t0 = _context2["catch"](1);

                                                        isDie = 'NOR';

                                                    case 10:

                                                        if (isDie != false && isDie != 'NOR') {

                                                            sources.push({
                                                                file: val.file, label: val.label, type: "embed", size: isDie
                                                            });
                                                        }

                                                    case 11:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 7]]);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 27;
                                return Promise.all(arrPromise);

                            case 27:
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "vidnode"
                                    },
                                    result: sources
                                });

                            case 28:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[13, 19]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidnode;
}();

thisSource.function = function (libs, settings) {
    return new Vidnode({ libs: libs, settings: settings });
};
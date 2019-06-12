

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidtodo = function () {
    function Vidtodo(props) {
        _classCallCheck(this, Vidtodo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidtodo, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.next = 3;
                                return httpRequest.getHTML(url);

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, sources, html, m, g, gPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                _context3.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 8;
                                    break;
                                }

                                console.log('vidtodo no link');
                                throw new Error("vidtodo LINK DIE");

                            case 8:

                                /*
                                let $ = cheerio.load(html);
                                let script = $('#content:last').next().text();
                                 //console.log(script); process.exit();
                                 let startIndex  = html.indexOf('jwplayer("vplayer").setup');
                                html            = html.substring(startIndex);
                                html            = html.substring(0, html.indexOf(".setVolume("));
                                html            = html.replace('jwplayer("vplayer").setup', "player = ");
                                html            += ";";
                                 var player;
                                eval(html);
                                */
                                m = html.match(/sources: \[([^\]]+)/);

                                if (!(m == undefined)) {
                                    _context3.next = 12;
                                    break;
                                }

                                console.log('vidtodo no link1');
                                throw new Error("vidtodo LINK DIE1");

                            case 12:

                                m = '[' + m[1].replace(/file:/g, '"file":') + ']';
                                m = m.replace(/label:/g, '"label":');
                                g = JSON.parse('' + m);

                                console.log(g);

                                gPromise = g.map(function () {
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
                                                            sources.push({
                                                                label: val.label,
                                                                file: val.file,
                                                                type: "direct",
                                                                size: isDie
                                                            });
                                                        }

                                                    case 4:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 19;
                                return Promise.all(gPromise);

                            case 19:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidtodo"
                                    },
                                    result: sources
                                });

                            case 20:
                            case 'end':
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

    return Vidtodo;
}();

thisSource.function = function (libs, settings) {
    return new Vidtodo({ libs: libs, settings: settings });
};
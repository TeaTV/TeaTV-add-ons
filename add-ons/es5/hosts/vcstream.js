

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vcstream = function () {
    function Vcstream(props) {
        _classCallCheck(this, Vcstream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vcstream, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 2:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.prev = 3;
                                _context.next = 6;
                                return httpRequest.getHTML(url);

                            case 6:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](3);
                                throw new Error('LINK DIE');

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 10]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, html, sources, m, fid, js, s, playLink, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                _context2.next = 3;
                                return this.checkLive(url);

                            case 3:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 6;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 6:
                                sources = [];
                                m = html.match(/fileID = '([^']+)/);

                                if (!(m == undefined)) {
                                    _context2.next = 10;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 10:
                                fid = m[1];
                                _context2.next = 13;
                                return httpRequest.getHTML('https://vcstream.to/player?fid=' + fid + '&page=embed');

                            case 13:
                                html = _context2.sent;
                                js = void 0;
                                _context2.prev = 15;

                                js = JSON.parse(html);
                                _context2.next = 22;
                                break;

                            case 19:
                                _context2.prev = 19;
                                _context2.t0 = _context2['catch'](15);
                                throw new Error('NOT_FOUND');

                            case 22:
                                if (js.status) {
                                    _context2.next = 24;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 24:

                                html = js.html;
                                m = html.match(/sources = ([^,]+)/);

                                if (!(m == undefined)) {
                                    _context2.next = 28;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 28:
                                s = m[1];

                                js = JSON.parse(s);

                                playLink = js[0].file;
                                _context2.next = 33;
                                return httpRequest.isLinkDie(playLink);

                            case 33:
                                isDie = _context2.sent;


                                if (isDie != false) {
                                    sources.push({
                                        label: 'NOR',
                                        file: playLink,
                                        type: "direct",
                                        size: (Math.random() * (2.2 - 1.9) + 1.9).toFixed(2)
                                    });
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vcstream"
                                    },
                                    result: sources
                                });

                            case 36:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[15, 19]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vcstream;
}();

thisSource.function = function (libs, settings) {
    return new Vcstream({ libs: libs, settings: settings });
};
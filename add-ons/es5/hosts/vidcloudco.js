

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidcloudco = function () {
    function Vidcloudco(props) {
        _classCallCheck(this, Vidcloudco);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidcloudco, [{
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, sources, urls, fid, playerUrl, html, js, link, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                urls = url.split('/');
                                fid = urls[4];
                                playerUrl = 'https://vidcloud.co/player?fid=' + fid + '&page=video';
                                _context2.next = 7;
                                return httpRequest.getHTML(playerUrl);

                            case 7:
                                html = _context2.sent;
                                js = void 0;
                                _context2.prev = 9;

                                js = JSON.parse(html);
                                _context2.next = 16;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](9);
                                throw new Error("vidcloudco LINK DIE");

                            case 16:

                                html = js['html'];
                                html = html.split('sources = [');
                                html = html[1];
                                html = html.split('],');
                                html = html[0];
                                html = JSON.parse(html);
                                link = html['file'];
                                _context2.next = 25;
                                return httpRequest.isLinkDie(link);

                            case 25:
                                isDie = _context2.sent;


                                if (isDie != false) {

                                    sources.push({
                                        label: 'NOR',
                                        file: link,
                                        type: "direct",
                                        size: (Math.random() * (2.2 - 1.9) + 1.3).toFixed(2)
                                    });
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Vidcloudco"
                                    },
                                    result: sources
                                });

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[9, 13]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidcloudco;
}();

thisSource.function = function (libs, settings) {
    return new Vidcloudco({ libs: libs, settings: settings });
};
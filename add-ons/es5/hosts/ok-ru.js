

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OK_RU = function () {
    function OK_RU(props) {
        _classCallCheck(this, OK_RU);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(OK_RU, [{
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
                                return httpRequest.get(url);

                            case 3:
                                html = _context.sent;

                                html = html.data;
                                // if(html.includes(dieStatusText)) return true;
                                return _context.abrupt('return', html);

                            case 6:
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
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _this = this;

                var _libs, httpRequest, cheerio, html, results, $, script, videos, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                _context3.next = 3;
                                return this.checkLive(url);

                            case 3:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 6;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 6:
                                _context3.prev = 6;
                                results = [];
                                $ = cheerio.load(html);
                                script = $('div[data-module=OKVideo]').attr('data-options');
                                _context3.prev = 10;

                                script = JSON.parse(script);
                                _context3.next = 17;
                                break;

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](10);
                                throw new Error("LINK DIE");

                            case 17:
                                videos = script.flashvars.metadata;
                                _context3.prev = 18;

                                videos = JSON.parse(videos);
                                _context3.next = 25;
                                break;

                            case 22:
                                _context3.prev = 22;
                                _context3.t1 = _context3['catch'](18);
                                throw new Error("LINK DIE");

                            case 25:
                                videos = videos.videos;

                                if (!(videos.length > 0)) {
                                    _context3.next = 30;
                                    break;
                                }

                                arrPromise = videos.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.isLinkDie(val.url);

                                                    case 2:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {

                                                            results.push({
                                                                file: val.url, label: val.name, type: "embed", size: isDie
                                                            });
                                                        }

                                                    case 4:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 30;
                                return Promise.all(arrPromise);

                            case 30:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "ok-ru"
                                    },
                                    result: results
                                });

                            case 33:
                                _context3.prev = 33;
                                _context3.t2 = _context3['catch'](6);
                                throw new Error(_context3.t2);

                            case 36:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[6, 33], [10, 14], [18, 22]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return OK_RU;
}();

thisSource.function = function (libs, settings) {
    return new OK_RU({ libs: libs, settings: settings });
};
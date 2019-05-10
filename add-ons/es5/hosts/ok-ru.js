

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
                                if (url.indexOf('//') === 0) url = 'https:' + url;

                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                _context3.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 7;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 7:
                                _context3.prev = 7;
                                results = [];
                                $ = cheerio.load(html);
                                script = $('div[data-module=OKVideo]').attr('data-options');
                                _context3.prev = 11;

                                script = JSON.parse(script);
                                _context3.next = 18;
                                break;

                            case 15:
                                _context3.prev = 15;
                                _context3.t0 = _context3['catch'](11);
                                throw new Error("LINK DIE");

                            case 18:
                                videos = script.flashvars.metadata;
                                _context3.prev = 19;

                                videos = JSON.parse(videos);
                                _context3.next = 26;
                                break;

                            case 23:
                                _context3.prev = 23;
                                _context3.t1 = _context3['catch'](19);
                                throw new Error("LINK DIE");

                            case 26:
                                videos = videos.videos;

                                if (!(videos.length > 0)) {
                                    _context3.next = 31;
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

                                                        console.log(isDie, 'okru-size');

                                                        if (isDie != false) {

                                                            results.push({
                                                                file: val.url, label: val.name, type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 5:
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
                                _context3.next = 31;
                                return Promise.all(arrPromise);

                            case 31:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "okru"
                                    },
                                    result: results
                                });

                            case 34:
                                _context3.prev = 34;
                                _context3.t2 = _context3['catch'](7);
                                throw new Error(_context3.t2);

                            case 37:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[7, 34], [11, 15], [19, 23]]);
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
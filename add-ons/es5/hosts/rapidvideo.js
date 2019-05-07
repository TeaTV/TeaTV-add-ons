

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RapidVideo = function () {
    function RapidVideo(props) {
        _classCallCheck(this, RapidVideo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(RapidVideo, [{
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
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);
                                throw new Error('NOT_FOUND');

                            case 12:
                                return _context.abrupt('return', html);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 9]]);
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
                var _libs, httpRequest, cheerio, arrVideoQuality, results, html, $, quality, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context3.next = 2;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 2:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                results = [];
                                _context3.next = 7;
                                return this.checkLive(url);

                            case 7:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 10;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 10:
                                $ = cheerio.load(html);
                                _context3.prev = 11;
                                quality = $('div[style*="height:30px; width:500px; margin:0 auto; color:#FFF; font-size:15px; line-height:30px; float:left;"]').find('a');


                                quality.each(function () {

                                    var linkQuality = $(this).attr('href');

                                    if (linkQuality.indexOf('http') != -1 && linkQuality.indexOf('&q=') != -1) {
                                        arrVideoQuality.push(linkQuality);
                                    }
                                });

                                arrPromise = arrVideoQuality.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var label, htmlDirect, $, linkDirect, isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        label = val.match(/\&q\=(.+)/i);

                                                        label = label != null ? label[1] : 'NOR';
                                                        _context2.next = 4;
                                                        return httpRequest.getHTML(val);

                                                    case 4:
                                                        htmlDirect = _context2.sent;
                                                        $ = cheerio.load(htmlDirect);
                                                        linkDirect = $('#videojs source').attr('src');
                                                        _context2.next = 9;
                                                        return httpRequest.isLinkDie(linkDirect);

                                                    case 9:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {

                                                            results.push({
                                                                file: linkDirect, label: label, type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 11:
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
                                _context3.next = 17;
                                return Promise.all(arrPromise);

                            case 17:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "rapidvideo"
                                    },
                                    result: results
                                });

                            case 20:
                                _context3.prev = 20;
                                _context3.t0 = _context3['catch'](11);
                                throw new Error(_context3.t0);

                            case 23:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[11, 20]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return RapidVideo;
}();

thisSource.function = function (libs, settings) {
    return new RapidVideo({ libs: libs, settings: settings });
};
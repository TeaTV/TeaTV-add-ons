

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
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

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
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, arrVideoQuality, results, html, $, quality, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                results = [];
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
                                $ = cheerio.load(html);
                                _context3.prev = 9;
                                quality = $('div[style*="height:23px; width:100%; margin:0 auto; color:#FFF; font-size:14px; line-height:23px; border-top:1px solid #0f0f0f;"]').find('a');


                                quality.each(function () {

                                    var linkQuality = $(this).attr('href');
                                    arrVideoQuality.push(linkQuality);
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
                                                                file: linkDirect, label: label, type: "embed", size: isDie
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
                                _context3.next = 15;
                                return Promise.all(arrPromise);

                            case 15:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "rapidvideo"
                                    },
                                    result: results
                                });

                            case 18:
                                _context3.prev = 18;
                                _context3.t0 = _context3['catch'](9);
                                throw new Error(_context3.t0);

                            case 21:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[9, 18]]);
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
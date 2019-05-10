

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidzi = function () {
    function Vidzi(props) {
        _classCallCheck(this, Vidzi);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidzi, [{
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
        value: function convertToEmbed(url) {

            // convert link detail to link embed
            // if input is embed then return input

            // let id = url.match(/\/embed\-([^\-]+)/i);
            // id = url != null ? url[1] : false;

            // if( id == false ) return url;

        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, sources, temp, html, $, evalhtml, test, m, x1, sv, hls, hlskey, domain, direct, hlslink, data, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                temp = [];
                                _context3.next = 5;
                                return this.checkLive(url);

                            case 5:
                                html = _context3.sent;
                                $ = cheerio.load(html);

                                if (!(html == false)) {
                                    _context3.next = 9;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 9:
                                evalhtml = $('script:contains(jwplayer.key)').next().html();

                                evalhtml = evalhtml.trim();
                                evalhtml += 'teatv';

                                test = evalhtml.replace('eval(', '').trim().replace(')teatv', '').trim();
                                _context3.prev = 13;
                                m = test.match(/mp4\|([^\|]+)/);
                                x1 = m[1];


                                m = test.match(/file\|([^\|]+)/);
                                sv = m[1];


                                m = test.match(/\|([a-z0-9]+)\|([a-z0-9]+)\|sources/);
                                hls = m[1];
                                hlskey = m[2];
                                domain = 'https://' + sv + '.vidzi.tv/';
                                direct = domain + x1 + '/v.mp4';
                                hlslink = '' + domain + hlskey + '/' + hls + ',' + x1 + ',.urlset/master.m3u8';
                                data = [direct, hlslink];
                                _context3.next = 30;
                                break;

                            case 27:
                                _context3.prev = 27;
                                _context3.t0 = _context3['catch'](13);
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidzi"
                                    },
                                    result: []
                                });

                            case 30:
                                arrPromise = data.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:

                                                        console.log(val);

                                                        _context2.next = 3;
                                                        return httpRequest.isLinkDie(val);

                                                    case 3:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {
                                                            sources.push({
                                                                label: 'NOR',
                                                                file: val,
                                                                type: "direct",
                                                                size: isDie
                                                            });
                                                        }

                                                    case 5:
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
                                _context3.next = 33;
                                return Promise.all(arrPromise);

                            case 33:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidzi"
                                    },
                                    result: sources
                                });

                            case 34:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[13, 27]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidzi;
}();

thisSource.function = function (libs, settings) {
    return new Vidzi({ libs: libs, settings: settings });
};
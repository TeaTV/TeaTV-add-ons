

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jetload = function () {
    function Jetload(props) {
        _classCallCheck(this, Jetload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Jetload, [{
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, arrVideoQuality, results, html, $, links, fname, srv, archive, fff, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context2.next = 2;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 2:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                results = [];
                                _context2.next = 7;
                                return this.checkLive(url);

                            case 7:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 10;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 10:
                                $ = cheerio.load(html);
                                _context2.prev = 11;


                                /*
                                let quality = $('div[style*="height:30px; width:500px; margin:0 auto; color:#FFF; font-size:15px; line-height:30px; float:left;"]').find('a');
                                  quality.each(function() {
                                     let linkQuality = $(this).attr('href');
                                     if(linkQuality.indexOf('http') != -1 && linkQuality.indexOf('&q=') != -1) {
                                        arrVideoQuality.push(linkQuality);
                                    }
                                    
                                });
                                 let arrPromise = arrVideoQuality.map(async function(val) {
                                     let label       = val.match(/\&q\=(.+)/i);
                                    label           = label != null ? label[1] : 'NOR';
                                    let htmlDirect  = await httpRequest.getHTML(val); 
                                    let $           = cheerio.load(htmlDirect);
                                    let linkDirect  = $('#videojs source').attr('src');
                                    let isDie       = await httpRequest.isLinkDie(linkDirect);
                                         if( isDie != false ) {
                                         results.push({
                                            file: linkDirect, label: label, type: "direct" , size: isDie
                                        });
                                     }
                                });
                                  await Promise.all(arrPromise);
                                */

                                links = [];
                                fname = $('#file_name').val();
                                srv = $('#srv_id').val();
                                archive = $('#archive').val();
                                fff = void 0;

                                if (!(archive == 1)) {
                                    _context2.next = 21;
                                    break;
                                }

                                fff = { data: 'https://ws04.jetload.net/v2/schema/archive/' + fname + '/master.m3u8' };
                                _context2.next = 25;
                                break;

                            case 21:
                                fname = fname + '.mp4';
                                _context2.next = 24;
                                return httpRequest.post('https://jetload.net/api/download', {}, {
                                    'file_name': fname,
                                    'srv': srv
                                });

                            case 24:
                                fff = _context2.sent;

                            case 25:
                                _context2.next = 27;
                                return httpRequest.isLinkDie(fff.data);

                            case 27:
                                isDie = _context2.sent;


                                if (isDie != false) {
                                    results.push({
                                        file: fff.data, label: 'NOR', type: "direct", size: isDie
                                    });
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Jetload"
                                    },
                                    result: results
                                });

                            case 32:
                                _context2.prev = 32;
                                _context2.t0 = _context2['catch'](11);
                                throw new Error(_context2.t0);

                            case 35:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[11, 32]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Jetload;
}();

thisSource.function = function (libs, settings) {
    return new Jetload({ libs: libs, settings: settings });
};


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
                var _libs, httpRequest, cheerio, sources, temp, html, $, evalhtml, test, player, data, arrPromise;

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


                                html = function (p, a, c, k, e, d) {
                                    while (c--) {
                                        if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
                                    }return p;
                                }('g("41").40({3z:"6://j.a.9/i/3y/3x/3w.3v",3u:[{h:"6://j.a.9/3t/3s,3r,3q,.3p/3o.3n"},{h:"6://j.a.9/3m/v.3l"}],3k:[{h:"/s.3j",3i:"3h"}],3g:"u%",3f:"6://3e.a.9/g-8.3.3/",3d:1,3c:3b,3a:39,38:{37:\'36\',35:\'6://34.33.32/31.30?2z=2y&2x=%2w%2v%27%w%2u%27%2t%2s%27%w%2r%27%2q&2p=[2o]&2n=\'+2m[\'2l\'],2k:10,2j:\'2i 2h 2g 2f 2e\'},2d:{2c:2b,2a:\'29\',28:\'26\',25:20},24:"u%"});4 f;4 23=0;4 22=0;g().21(\'1z\',b(x){t(x)});b t(x){$(\'1y.1x\').1w();r(f)1v;f=1;$.1u(\'/1t?1s=1r&1q=1&1p=s&1o=1n-1m-1l-1k-1j\',b(1i){});4 5=7.n(\'5\')[0];4 2=7.e(\'2\');2.d=\'m/l\';r(!7.1h(\'1g\')){2.q=\'6://1f.a.9/1e/1d/1c/1b.p\'}1a{2.q=\'6://a.9/19.p\'}5.c(2);4 18={17:{16:15,o:{d:\'o\',14:1,13:1,12:11}}};4 k=z;y(b(){4 5=7.n(\'5\')[0];4 2=7.e(\'2\');5.c(2);4 2=7.e(\'2\');2.d=\'m/l\';5.c(2)},k)}', 36, 146, '||script||var|head|https|document||tv|vidzi|function|appendChild|type|createElement|vvplay|jwplayer|file||srv40|delayInMilliseconds|javascript|text|getElementsByTagName|popunder|js|src|if|47va0a5722q8|doPlay|100||3A||setTimeout|100000||5000|interstitialDelay|period|times|26439|tag_id|settings|_wwwp|acash|else|ffd475751694698ee922d62f8093471c|75|d4|ff|ww46|ELPh5xRBi6P|getElementById|data|9bef03aa09780b7d400c16953e3853a3|1531385895|70|118|14377997|hash|file_code|ad_channel|ajax|op|dl|get|return|hide|video_ad|div|play||on|p014377997|tt14377997|width|fontsize|Verdana||fontFamily|FFFFFF|color|false|back|captions|XX|in|ad|this|Skip|skipmessage|skipoffset|vastRef|window|vastref|CACHE_BUSTERS|cb|7D|27540|27height|2C|27960|27width|7B|custom|c3d0b1a112694afdda3d7c78a14a5f12|key|xml|watch|com|vidcpm|www|tag|vast|client|advertising|900|hls_maxbackbufferlength|300|hls_maxbufferlength|hls_startfromlevel|static|base|height|thumbnails|kind|vtt|tracks|mp4|nbuqi67jay2qedz7nkbrltjsattrohz5ojqc4gbvvus4fd4rpcks6xluapka|m3u8|master|urlset|us4fd4rpcks6xluapka|7q4fd4rpckxjkh7pqqq|nbuqi67jay2qedz7nkbrltjsattrohz5ojqc4gbvv|hls2|sources|jpg|6v0net3kp6pm|02836|01|image|setup|vplayer'.split('|'));

                                html = html.substring(html.indexOf('jwplayer("vplayer").setup({'));
                                html = html.substring(0, 3 + html.indexOf("});"));

                                html += 'teatv';
                                html = html.replace('jwplayer("vplayer").setup(', "player = ");

                                html = html.replace('jwplayer("vplayer").setup({', '');
                                html = html.replace('});', '');
                                _context3.prev = 20;

                                eval(html);
                                _context3.next = 27;
                                break;

                            case 24:
                                _context3.prev = 24;
                                _context3.t0 = _context3['catch'](20);
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidzi"
                                    },
                                    result: []
                                });

                            case 27:
                                data = player.sources;


                                data.map(function (val) {

                                    temp.push({
                                        label: val.file.indexOf("mp4") !== -1 ? "NOR" : "NOR",
                                        file: val.file,
                                        type: "embed"
                                    });
                                });

                                arrPromise = temp.map(function () {
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
                                                            val.size = isDie;
                                                            sources.push(val);
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
                                _context3.next = 32;
                                return Promise.all(arrPromise);

                            case 32:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidzi"
                                    },
                                    result: sources
                                });

                            case 33:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[20, 24]]);
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
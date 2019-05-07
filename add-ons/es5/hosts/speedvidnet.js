

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Speedvid = function () {
    function Speedvid(props) {
        _classCallCheck(this, Speedvid);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Speedvid, [{
        key: "checkLive",
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
                                return _context.abrupt("return", html);

                            case 5:
                            case "end":
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
        key: "convertToEmbed",
        value: function convertToEmbed(url) {

            // convert link detail to link embed
            // if input is embed then return input

            // let id = url.match(/\/embed\-([^\-]+)/i);
            // id = url != null ? url[1] : false;

            // if( id == false ) return url;

        }
    }, {
        key: "getLink",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, m, id, newurl, sources, html, mode, hash, postHtml, $, link, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                m = url.match(/speedvid.net\/(.*)/);

                                if (!(m == undefined)) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error('LINK DIE');

                            case 4:
                                id = m[1];
                                newurl = "http://www.speedvid.net/dl?op=download_orig&id=" + id;
                                sources = [];
                                _context2.next = 9;
                                return this.checkLive(newurl);

                            case 9:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 12;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 12:
                                mode = html.match(/name="mode" value="([^"]+)/);
                                hash = html.match(/name="hash" value="([^"]+)/);

                                if (!(mode == undefined || hash == undefined)) {
                                    _context2.next = 16;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 16:
                                _context2.next = 18;
                                return httpRequest.post(newurl, {}, {
                                    'op': 'download_orig',
                                    'id': id,
                                    'mode': mode[1],
                                    'hash': hash[1]
                                });

                            case 18:
                                postHtml = _context2.sent;
                                $ = cheerio.load(postHtml.data);
                                link = $('.down_content span a').attr('href');

                                if (!(link != undefined)) {
                                    _context2.next = 26;
                                    break;
                                }

                                _context2.next = 24;
                                return httpRequest.isLinkDie(link);

                            case 24:
                                isDie = _context2.sent;

                                if (isDie != false) {

                                    sources.push({
                                        label: "NOR",
                                        file: link,
                                        type: "direct",
                                        size: isDie
                                    });
                                }

                            case 26:
                                return _context2.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "Speedvid"
                                    },
                                    result: sources
                                });

                            case 27:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Speedvid;
}();

thisSource.function = function (libs, settings) {
    return new Speedvid({ libs: libs, settings: settings });
};
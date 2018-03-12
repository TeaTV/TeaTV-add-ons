

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Openload = function () {
    function Openload(props) {
        _classCallCheck(this, Openload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Openload, [{
        key: "getOpenload",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, jsdom, JSDOM, jqueryUrl, html, jquery, dom, window, script, streamUrl, opl, isDie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, jsdom = _libs.jsdom;
                                JSDOM = jsdom.JSDOM;
                                jqueryUrl = "http://code.jquery.com/jquery-1.11.0.min.js";
                                _context.next = 5;
                                return httpRequest.getHTML(url);

                            case 5:
                                html = _context.sent;

                                if (!(html.indexOf('<h3>We’re Sorry!</h3>') > -1)) {
                                    _context.next = 8;
                                    break;
                                }

                                throw new Error("Invalid fileId");

                            case 8:
                                _context.next = 10;
                                return httpRequest.getHTML(jqueryUrl);

                            case 10:
                                jquery = _context.sent;
                                dom = new JSDOM(html, {
                                    runScripts: "outside-only"
                                });
                                window = dom.window;

                                window.eval(jquery);

                                script = html.substring(html.indexOf("ﾟωﾟﾉ= /｀ｍ´"));

                                script = script.substring(0, script.indexOf("</script>"));
                                window.eval(script);
                                script = script.substring(script.indexOf("$(document)"));
                                script = script.substring(script.indexOf("var"));
                                script = script.substring(0, script.indexOf("ﾟωﾟ"));
                                script = script.substring(0, script.lastIndexOf("});"));
                                script = script.replace("document.createTextNode.toString().indexOf('[native code')", "1");
                                script = script.replace("_0x3d7b02=[];", "");
                                window.eval(script);

                                streamUrl = window.document.getElementById("streamurj").innerHTML;
                                opl = "https://openload.co/stream/" + streamUrl + "?mime=true";
                                _context.next = 28;
                                return httpRequest.isLinkDie(opl);

                            case 28:
                                isDie = _context.sent;

                                if (!(isDie == false)) {
                                    _context.next = 31;
                                    break;
                                }

                                throw new Error("NOT LINK");

                            case 31:
                                return _context.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: [{ file: opl, label: "NOR", type: "embed", size: isDie }]
                                });

                            case 32:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getOpenload(_x) {
                return _ref.apply(this, arguments);
            }

            return getOpenload;
        }()
    }, {
        key: "checkLive",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context2.next = 3;
                                return httpRequest.getHTML(url);

                            case 3:
                                html = _context2.sent;
                                return _context2.abrupt("return", html);

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function checkLive(_x2) {
                return _ref2.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: "getUsingAPI",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs2, httpRequest, cryptoJs, html, token, apiResponse, _apiResponse$data, status, data, error, isDie;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cryptoJs = _libs2.cryptoJs;
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
                                token = cryptoJs.MD5(html + "teatv-openload").toString();
                                _context3.next = 9;
                                return httpRequest.post("https://api.teatv.net/api/v2/get_opl", {
                                    "Content-Type": "application/json"
                                }, JSON.stringify({
                                    data: html,
                                    token: token
                                }));

                            case 9:
                                apiResponse = _context3.sent;


                                // let isDie = await httpRequest.isLinkDie(apiResponse.data.data);
                                // if( isDie == false ) throw new Error("LINK DIE");

                                _apiResponse$data = apiResponse.data, status = _apiResponse$data.status, data = _apiResponse$data.data, error = _apiResponse$data.error;

                                if (!error) {
                                    _context3.next = 13;
                                    break;
                                }

                                throw new Error(error);

                            case 13:
                                if (!(status == 200)) {
                                    _context3.next = 20;
                                    break;
                                }

                                _context3.next = 16;
                                return httpRequest.isLinkDie(data);

                            case 16:
                                isDie = _context3.sent;

                                if (!(isDie == false)) {
                                    _context3.next = 19;
                                    break;
                                }

                                throw new Error("NOT LINK");

                            case 19:
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: [{ file: data, label: "NOR", type: "embed", size: isDie }]
                                });

                            case 20:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getUsingAPI(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getUsingAPI;
        }()
    }, {
        key: "convertToEmbed",
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: "getLink",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
                var _libs3, httpRequest, cheerio, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio;
                                data = void 0;
                                _context4.prev = 2;
                                _context4.next = 5;
                                return this.getOpenload(url);

                            case 5:
                                data = _context4.sent;
                                _context4.next = 14;
                                break;

                            case 8:
                                _context4.prev = 8;
                                _context4.t0 = _context4["catch"](2);

                                console.log(_context4.t0);
                                _context4.next = 13;
                                return this.getUsingAPI(url);

                            case 13:
                                data = _context4.sent;

                            case 14:
                                return _context4.abrupt("return", data);

                            case 15:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[2, 8]]);
            }));

            function getLink(_x4) {
                return _ref4.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Openload;
}();

thisSource.function = function (libs, settings) {
    return new Openload({ libs: libs, settings: settings });
};


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

    // async getOpenload(url) {

    //     const { httpRequest, jsdom }    = this.libs;
    //     const { JSDOM }                 = jsdom;
    //     const jqueryUrl                 = "http://code.jquery.com/jquery-1.11.0.min.js";
    //     let html                        = await httpRequest.getHTML(url);

    //     if (html.indexOf('<h3>We’re Sorry!</h3>') > -1) throw new Error("Invalid fileId");


    //     let jquery  = await httpRequest.getHTML(jqueryUrl);
    //     const dom   = new JSDOM(html, {
    //         runScripts: "outside-only"
    //     });

    //     const window = dom.window;
    //     window.eval(jquery);

    //     var script = html.substring(html.indexOf("ﾟωﾟﾉ= /｀ｍ´"));
    //     script = script.substring(0, script.indexOf("</script>"));
    //     window.eval(script);
    //     script = script.substring(script.indexOf("$(document)"));
    //     script = script.substring(script.indexOf("var"))
    //     script = script.substring(0, script.indexOf("ﾟωﾟ"))
    //     script = script.substring(0, script.lastIndexOf("});"))
    //     script = script.replace("document.createTextNode.toString().indexOf('[native code')", "1");
    //     script = script.replace("_0x3d7b02=[];", "");
    //     window.eval(script);

    //     let streamUrl   = window.document.getElementById("streamurj").innerHTML;
    //     let opl         = "https://openload.co/stream/" + streamUrl + "?mime=true";
    //     let isDie       = await httpRequest.isLinkDie(opl);

    //     if( isDie == false ) throw new Error("NOT LINK");
    //     return {
    //         host: {
    //             url: url,
    //             name: "openload"
    //         },
    //         result: [{ file: opl, label: "NOR", type: "embed", size: isDie }]
    //     }
    // }

    _createClass(Openload, [{
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

                                _context.prev = 1;
                                _context.next = 4;
                                return httpRequest.getHTML(url);

                            case 4:
                                html = _context.sent;
                                _context.next = 10;
                                break;

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context["catch"](1);
                                throw new Error('NOT_FOUND');

                            case 10:
                                return _context.abrupt("return", html);

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 7]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: "getUsingAPI",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cryptoJs, html, token, apiResponse, _apiResponse$data, status, data, error, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cryptoJs = _libs.cryptoJs;
                                html = false;
                                _context2.prev = 2;
                                _context2.next = 5;
                                return this.checkLive(url);

                            case 5:
                                html = _context2.sent;
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2["catch"](2);
                                throw new Error("LINK DIE");

                            case 11:
                                token = cryptoJs.MD5(html + "teatv-openload").toString();
                                _context2.next = 14;
                                return httpRequest.post("https://api.teatv.net/api/v2/get_opl", {
                                    "Content-Type": "application/json"
                                }, JSON.stringify({
                                    data: html,
                                    token: token
                                }));

                            case 14:
                                apiResponse = _context2.sent;


                                // let isDie = await httpRequest.isLinkDie(apiResponse.data.data);
                                // if( isDie == false ) throw new Error("LINK DIE");

                                _apiResponse$data = apiResponse.data, status = _apiResponse$data.status, data = _apiResponse$data.data, error = _apiResponse$data.error;

                                if (!error) {
                                    _context2.next = 18;
                                    break;
                                }

                                throw new Error(error);

                            case 18:
                                if (!(status == 200)) {
                                    _context2.next = 34;
                                    break;
                                }

                                isDie = false;
                                _context2.prev = 20;
                                _context2.next = 23;
                                return httpRequest.isLinkDie(data);

                            case 23:
                                isDie = _context2.sent;
                                _context2.next = 29;
                                break;

                            case 26:
                                _context2.prev = 26;
                                _context2.t1 = _context2["catch"](20);


                                console.log(String(_context2.t1));

                            case 29:
                                if (!(isDie == false)) {
                                    _context2.next = 31;
                                    break;
                                }

                                throw new Error("NOT LINK");

                            case 31:
                                return _context2.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: [{ file: data, label: "NOR", type: "embed", size: isDie }]
                                });

                            case 34:
                                return _context2.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: []
                                });

                            case 35:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 8], [20, 26]]);
            }));

            function getUsingAPI(_x2) {
                return _ref2.apply(this, arguments);
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
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs2, httpRequest, cheerio, data;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                _context3.prev = 1;
                                _context3.next = 4;
                                return this.getUsingAPI(url);

                            case 4:
                                data = _context3.sent;
                                return _context3.abrupt("return", data);

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3["catch"](1);
                                throw new Error(_context3.t0);

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 8]]);
            }));

            function getLink(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Openload;
}();

thisSource.function = function (libs, settings) {
    return new Openload({ libs: libs, settings: settings });
};
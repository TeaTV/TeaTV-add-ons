

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const converter     = require('byte-converter').converterBase2;

var VidLink = function () {
    function VidLink(props) {
        _classCallCheck(this, VidLink);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(VidLink, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, qs, htmlDetail, actionToken, urlParts, id, headers, bodys, html;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, qs = _libs.qs;
                                _context.next = 3;
                                return httpRequest.getHTML(url);

                            case 3:
                                htmlDetail = _context.sent;
                                actionToken = htmlDetail.match(/\'action\'\: *\'([^\']+)/i);

                                actionToken = actionToken != null ? actionToken[1] : '';
                                actionToken = actionToken.trim();

                                urlParts = url.split("/");
                                id = urlParts[urlParts.length - 1];
                                headers = {
                                    'accept': 'application/json, text/javascript, */*; q=0.01',
                                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'origin': 'https://vidlink.org',
                                    'referer': url,
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
                                    'x-requested-with': 'XMLHttpRequest'
                                };
                                bodys = {
                                    browserName: "Chrome",
                                    platform: "MacIntel",
                                    postID: id,
                                    action: actionToken
                                };
                                _context.next = 13;
                                return httpRequest.post('https://vidlink.org/streamdrive/info/' + id, headers, qs.stringify(bodys));

                            case 13:
                                html = _context.sent;


                                html = html.data;
                                // if(html.includes(dieStatusText)) return true;
                                return _context.abrupt('return', html);

                            case 16:
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
        key: 'getRedirect',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var httpRequest;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                return _context2.abrupt('return', [{
                                    file: url,
                                    label: "HD",
                                    type: "embed",
                                    size: ""
                                }]);

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getRedirect(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getRedirect;
        }()
    }, {
        key: 'getEmbed',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
                var _libs2, httpRequest, cheerio, sources, temp, window, postResponse, c35, item, _url, size, arrPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                sources = [];
                                temp = [];
                                window = {
                                    srcs: [],
                                    nsrc: [],
                                    checkSrc: function checkSrc() {}
                                };
                                _context4.prev = 4;
                                _context4.next = 7;
                                return this.checkLive(url);

                            case 7:
                                postResponse = _context4.sent;

                                if (!(postResponse == false)) {
                                    _context4.next = 10;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 10:
                                c35 = void 0;

                                eval(postResponse);
                                postResponse = window.srcs;

                                for (item in postResponse) {

                                    if (postResponse[item].type == 'video/mp4' && postResponse[item].status != 401) {
                                        _url = postResponse[item].src.match(/url\=([^\&]+)/i);

                                        _url = _url != null ? _url[1] : false;
                                        size = postResponse[item].src.match(/\&size\=([0-9]+)/i);

                                        size = size != null ? +size[1] : 0;

                                        if (_url != false) {
                                            _url = decodeURIComponent(_url);
                                            temp.push({ url: _url, size: size });
                                        }
                                        // temp.push('https://vidlink.org' + postResponse[item].src);
                                    }
                                }

                                arrPromise = temp.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.prev = 0;
                                                        _context3.next = 3;
                                                        return httpRequest.isLinkDie(val.url);

                                                    case 3:
                                                        isDie = _context3.sent;


                                                        if (isDie != false) {
                                                            sources.push({
                                                                file: val.url, label: 'NOR', type: "direct", size: 1.92
                                                            });
                                                        }
                                                        _context3.next = 9;
                                                        break;

                                                    case 7:
                                                        _context3.prev = 7;
                                                        _context3.t0 = _context3['catch'](0);

                                                    case 9:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this, [[0, 7]]);
                                    }));

                                    return function (_x4) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 17;
                                return Promise.all(arrPromise);

                            case 17:
                                return _context4.abrupt('return', sources);

                            case 20:
                                _context4.prev = 20;
                                _context4.t0 = _context4['catch'](4);
                                throw new Error(_context4.t0);

                            case 23:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[4, 20]]);
            }));

            function getEmbed(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getEmbed;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url) {
                var _libs3, httpRequest, cheerio, sources;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio;
                                sources = [];

                                if (!(url.indexOf('redirect') != -1)) {
                                    _context5.next = 9;
                                    break;
                                }

                                _context5.next = 5;
                                return this.getRedirect(url);

                            case 5:
                                sources = _context5.sent;
                                return _context5.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidlink"
                                    },
                                    result: sources
                                });

                            case 9:
                                _context5.next = 11;
                                return this.getEmbed(url);

                            case 11:
                                sources = _context5.sent;
                                return _context5.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "GoogleVideo"
                                    },
                                    result: sources
                                });

                            case 13:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getLink(_x5) {
                return _ref5.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return VidLink;
}();

thisSource.function = function (libs, settings) {
    return new VidLink({ libs: libs, settings: settings });
};
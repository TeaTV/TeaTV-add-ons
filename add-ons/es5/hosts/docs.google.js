

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    INFO: function INFO(id) {
        return 'https://docs.google.com/get_video_info?docid=' + id + '&authuser=0';
    }
};

var Google = function () {
    function Google(props) {
        _classCallCheck(this, Google);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Google, [{
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
                                return httpRequest.getHTML(url, {
                                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                                    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                                    'Cache-Control': 'max-age=0',
                                    'Connection': 'keep-alive',
                                    'Host': 'docs.google.com',
                                    'Upgrade-Insecure-Requests': 1,
                                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
                                });

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, qs, sources, listEncode, id, resultText, _resultText, fmt_stream_mapub, status, listLink, i;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, qs = _libs.qs;
                                sources = [];
                                listEncode = false;
                                id = url.match(/\/d\/([^\/]+)/i);

                                id = id != null ? id[1] : '';

                                _context2.next = 7;
                                return this.checkLive(URL.INFO(id));

                            case 7:
                                resultText = _context2.sent;

                                resultText = qs.parse(resultText);
                                _resultText = resultText, fmt_stream_mapub = _resultText.fmt_stream_mapub, status = _resultText.status;
                                listLink = fmt_stream_map.split(",");

                                for (i = 0; i < listLink.length; i++) {
                                    if (listLink[i].indexOf("18|") == 0) {
                                        sources.push({
                                            type: "embed",
                                            size: 'NOR',
                                            label: "360p",
                                            file: decodeURIComponent(listLink[i].substring(3))
                                        });
                                    }
                                    if (listLink[i].indexOf("22|") == 0) {
                                        sources.push({
                                            type: "embed",
                                            size: 'NOR',
                                            label: "720p",
                                            file: decodeURIComponent(listLink[i].substring(3))
                                        });
                                    }

                                    if (listLink[i].indexOf("59|") == 0) {
                                        sources.push({
                                            type: "embed",
                                            size: 'NOR',
                                            label: "480p",
                                            file: decodeURIComponent(listLink[i].substring(3))
                                        });
                                    }
                                    if (listLink[i].indexOf("37|") == 0) {
                                        sources.push({
                                            type: "embed",
                                            size: 'NOR',
                                            label: "1080p",
                                            file: decodeURIComponent(listLink[i].substring(3))
                                        });
                                    }
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "GoogleVideo"
                                    },
                                    result: sources
                                });

                            case 13:
                            case 'end':
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

    return Google;
}();

thisSource.function = function (libs, settings) {
    return new Google({ libs: libs, settings: settings });
};
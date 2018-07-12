

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://sezonlukdizi.net',
    SEARCH: function SEARCH(title, episode, season) {
        return 'http://sezonlukdizi.net/' + title + '/' + season + '-sezon-' + episode + '-bolum.html';
    },
    EMBED: 'http://sezonlukdizi.net/ajax/dataEmbed.asp'
};

var Sezonluk = function () {
    function Sezonluk(props) {
        _classCallCheck(this, Sezonluk);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Sezonluk, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title), season, episode);


                                this.state.detailUrl = urlSearch;
                                return _context.abrupt('return');

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, qs, hosts, arrMovieId, detailUrl, htmlDetail, $, linkEmbed, itemBackup, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                arrMovieId = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                linkEmbed = $('#embed iframe').attr('src');


                                try {

                                    if (linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1) {
                                        linkEmbed = 'http:' + linkEmbed;
                                    }

                                    linkEmbed && hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "sezonlukdizi"
                                        },
                                        result: {
                                            file: linkEmbed,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                } catch (error) {}

                                itemBackup = $('#playerMenu .menu .item');


                                itemBackup.each(function () {

                                    var id = $(this).attr('data-id');
                                    arrMovieId.push(id);
                                });

                                arrPromise = arrMovieId.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var bodyData, headerData, iframeHTML;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        bodyData = qs.stringify({
                                                            id: val
                                                        });
                                                        headerData = {
                                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                                        };
                                                        _context2.prev = 2;
                                                        _context2.next = 5;
                                                        return httpRequest.post(URL.EMBED, headerData, bodyData);

                                                    case 5:
                                                        iframeHTML = _context2.sent;

                                                        linkEmbed = iframeHTML.data.match(/src\=\"([^\"]+)/i);
                                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                                        if (linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1) {
                                                            linkEmbed = 'http:' + linkEmbed;
                                                        }

                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Sezonlukdizi"
                                                            },
                                                            result: {
                                                                file: linkEmbed,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context2.next = 14;
                                                        break;

                                                    case 12:
                                                        _context2.prev = 12;
                                                        _context2.t0 = _context2['catch'](2);

                                                    case 14:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[2, 12]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 17;
                                return Promise.all(arrPromise);

                            case 17:

                                //console.log(hosts); process.exit();

                                this.state.hosts = hosts;

                            case 18:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Sezonluk;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var sezon;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        sezon = new Sezonluk({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context4.next = 3;
                        return sezon.searchDetail();

                    case 3:
                        _context4.next = 5;
                        return sezon.getHostFromDetail();

                    case 5:
                        return _context4.abrupt('return', sezon.state.hosts);

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Sezonluk;
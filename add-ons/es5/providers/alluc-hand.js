

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://www.alluc.ee",
    SEARCH: function SEARCH(title, type) {
        var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var season = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var episode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (type == 'movie') {
            // if( page != false ) return `http://www.alluc.ee/stream/${title}+%23newlinks?page=${page}`;
            return 'http://www.alluc.ee/stream/' + title;
        }
        if (page != false) return 'http://www.alluc.ee/stream/' + title + '+s' + season + 'e' + episode + '?page=' + page;
        return 'http://www.alluc.ee/stream/' + title + '+s' + season + 'e' + episode;
    }
};

function algo_merge(stringHelper, title1, title2) {

    title1 = stringHelper.removeSpecialCharacters(title1, true);
    title2 = stringHelper.removeSpecialCharacters(title2, true);

    var arrTitle1 = title1.split(' ');
    var arrTitle1Temp = [];
    var arrTitle2 = title2.split(' ');
    var arrTitle2Temp = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arrTitle1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;


            if (item != ' ') {

                arrTitle1Temp.push(item);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = arrTitle2[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _item = _step2.value;


            if (_item != ' ') {

                arrTitle2Temp.push(_item);
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = arrTitle2Temp[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _item2 = _step3.value;


            title1 = title1.replace(_item2, '');
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    title1 = title1.trim();

    if (title1.length == 0) return true;
    return false;
};

// function ord(r) {
//     var t = r + "",
//         e = t.charCodeAt(0);
//     if (e >= 55296 && 56319 >= e) {
//         var o = e;
//         return 1 === t.length ? e : 1024 * (o - 55296) + (t.charCodeAt(1) - 56320) + 65536
//     }
//     return e
// }

// function hta(r) {
//     for (var t = r.toString(), e = "", o = 0; o < t.length; o += 2) e += String.fromCharCode(parseInt(t.substr(o, 2), 16));
//     return e
// }

// function strrev(r) {
//     return r.split("").reverse().join("")
// }

// function strswpcs(r) {
//     for (var t = "", e = 0; e < r.length; e++) t += r[e].match(/^[A-Za-z]$/) ? r[e] === r[e].toLowerCase() ? r[e].toUpperCase() : r[e].toLowerCase() : r[e];
//     return t
// }

// function decrypt(r, t, aaa, bbb, ccc, ddd, base64) {
//     var e = "",
//         o = r.substring(0, 3);
//     r = r.substring(3), "3" + aaa + "f" == o ? r = strrev(base64.decode(r)) : "f" + bbb + "0" == o ? r = hta(strrev(r)) : "6" + ccc + "3" == o ? r = base64.decode(r) : "5" + ddd + "a" == o && (r = base64.decode(r));
//     var s = 0;
//     for (s = 0; s < r.length; s++) {
//         var n = r.substr(s, 1),
//             a = t.substr(s % t.length - 1, 1);
//         n = Math.floor(ord(n) - ord(a)), e += n = String.fromCharCode(n)
//     }
//     return e
// }

function ord(r) {
    var t = r + "",
        e = t.charCodeAt(0);
    if (e >= 55296 && 56319 >= e) {
        var o = e;
        return 1 === t.length ? e : 1024 * (o - 55296) + (t.charCodeAt(1) - 56320) + 65536;
    }
    return e;
}

function hta(r) {
    for (var t = r.toString(), e = "", o = 0; o < t.length; o += 2) {
        e += String.fromCharCode(parseInt(t.substr(o, 2), 16));
    }return e;
}

function strrev(r) {
    return r.split("").reverse().join("");
}

function strswpcs(r) {
    for (var t = "", e = 0; e < r.length; e++) {
        t += r[e].match(/^[A-Za-z]$/) ? r[e] === r[e].toLowerCase() ? r[e].toUpperCase() : r[e].toLowerCase() : r[e];
    }return t;
}

function decrypt(r, t, aaa, bbb, ccc, ddd, base64) {
    var e = "",
        o = r.substring(0, 3);
    r = r.substring(3), "3" + aaa + "f" == o ? r = strrev(base64.decode(r)) : "f" + bbb + "0" == o ? r = hta(strrev(r)) : "6" + ccc + "3" == o ? r = base64.decode(strrev(r)) : "5" + ddd + "a" == o && (r = base64.decode(strswpcs(r)));
    var s = 0;
    for (s = 0; s < r.length; s++) {
        var n = r.substr(s, 1),
            a = t.substr(s % t.length - 1, 1);
        n = Math.floor(ord(n) - ord(a)), e += n = String.fromCharCode(n);
    }
    return e;
}

var AllucHand = function () {
    function AllucHand(props) {
        _classCallCheck(this, AllucHand);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(AllucHand, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, searchUrl, htmlSearch, $, result, urlDetail, item;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                searchUrl = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), type, 1, season, episode);
                                _context.next = 5;
                                return httpRequest.getCloudflare(searchUrl);

                            case 5:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                result = [];
                                urlDetail = [];
                                item = $('#resultitems .resblock');


                                item.each(function () {

                                    if (!$(this).hasClass('resblockx')) {

                                        var hrefMovie = URL.DOMAIN + $(this).find('.title a').attr('href');
                                        var title1 = $(this).find('.title a').text();
                                        var title2 = $(this).find('.sourcetitle').text();

                                        if (algo_merge(stringHelper, title, title1) || algo_merge(stringHelper, title, title2)) {

                                            if (type == 'movie') {

                                                if (title1.indexOf(year) != -1 || title2.indexOf(year) != -1 || hrefMovie.indexOf(year) != -1) {
                                                    urlDetail.push(hrefMovie);
                                                }
                                            } else if (type == 'tv') {

                                                if (title1.indexOf(season) != -1 && title1.indexOf(episode) != -1 && title2.indexOf(season) != -1 && title2.indexOf(episode) != -1) {

                                                    urlDetail.push(hrefMovie);
                                                }
                                            }
                                        }
                                    }
                                });

                                this.state.urlDetail = urlDetail;
                                return _context.abrupt('return');

                            case 13:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, base64, hosts, redirectLinks, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, item, htmlDetail, $, script, token, option, aaa, bbb, ccc, ddd, host;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.urlDetail) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                redirectLinks = [];
                                _iteratorNormalCompletion4 = true;
                                _didIteratorError4 = false;
                                _iteratorError4 = undefined;
                                _context2.prev = 8;
                                _iterator4 = this.state.urlDetail[Symbol.iterator]();

                            case 10:
                                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                    _context2.next = 33;
                                    break;
                                }

                                item = _step4.value;
                                _context2.next = 14;
                                return httpRequest.getCloudflare(item);

                            case 14:
                                htmlDetail = _context2.sent;

                                htmlDetail = htmlDetail.data;
                                $ = cheerio.load(htmlDetail);
                                script = $('.linktitleurl script').html();
                                token = $('#rawURLStextbox').text().trim();
                                option = htmlDetail.match(/decrypt\(\'[^\']+\' *\, *\'([^\']+)/i);

                                option = option != null ? option[1] : false;

                                aaa = htmlDetail.match(/var *aaa *\= ([0-9]+)/i);
                                bbb = htmlDetail.match(/var *bbb *\= ([0-9]+)/i);
                                ccc = htmlDetail.match(/var *ccc *\= ([0-9]+)/i);
                                ddd = htmlDetail.match(/var *ddd *\= ([0-9]+)/i);

                                aaa = aaa != null ? +aaa[1] : false;
                                bbb = bbb != null ? +bbb[1] : false;
                                ccc = ccc != null ? +ccc[1] : false;
                                ddd = ddd != null ? +ddd[1] : false;

                                if (token != false && aaa != false && bbb != false && ddd != false) {
                                    host = decrypt(token, option, aaa, bbb, ccc, ddd, base64);


                                    if (host.indexOf('http') != -1) {

                                        host !== false && hosts.push({
                                            provider: {
                                                url: item,
                                                name: "alluc-hand"
                                            },
                                            result: {
                                                file: host,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    }
                                }

                            case 30:
                                _iteratorNormalCompletion4 = true;
                                _context2.next = 10;
                                break;

                            case 33:
                                _context2.next = 39;
                                break;

                            case 35:
                                _context2.prev = 35;
                                _context2.t0 = _context2['catch'](8);
                                _didIteratorError4 = true;
                                _iteratorError4 = _context2.t0;

                            case 39:
                                _context2.prev = 39;
                                _context2.prev = 40;

                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }

                            case 42:
                                _context2.prev = 42;

                                if (!_didIteratorError4) {
                                    _context2.next = 45;
                                    break;
                                }

                                throw _iteratorError4;

                            case 45:
                                return _context2.finish(42);

                            case 46:
                                return _context2.finish(39);

                            case 47:

                                this.state.hosts = hosts;

                            case 48:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[8, 35, 39, 47], [40,, 42, 46]]);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return AllucHand;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var primeware;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        primeware = new AllucHand({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return primeware.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return primeware.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', primeware.state.hosts);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = AllucHand;
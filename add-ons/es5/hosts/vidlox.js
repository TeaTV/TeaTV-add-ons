

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VidLox = function () {
  function VidLox(props) {
    _classCallCheck(this, VidLox);

    this.libs = props.libs;
    this.settings = props.settings;
    this.state = {};
  }

  _createClass(VidLox, [{
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

                if (!html.includes("Video Was Deleted")) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', false);

              case 6:
                return _context.abrupt('return', html);

              case 7:
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
        var _libs, httpRequest, cheerio, newUrl, _parts, html, ClapprThumbnailsPlugin, LevelSelector, thumbs, ClapprSubtitle, player, result, isDie, isDie1, isDie2;

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
                newUrl = url;


                if (!newUrl.includes("embed")) {

                  // https://vidlox.tv/vunb9b0ihb8d
                  _parts = newUrl.split("/");

                  _parts[_parts.length - 1] = "embed-" + _parts[_parts.length - 1];
                  newUrl = _parts.join("/");
                }
                _context2.next = 7;
                return this.checkLive(newUrl);

              case 7:
                html = _context2.sent;

                if (!(html == false)) {
                  _context2.next = 10;
                  break;
                }

                throw new Error("LINK DIE");

              case 10:

                html = html.substring(html.indexOf("var player = new Clappr.Player"));
                html = html.substring(0, 3 + html.indexOf("});"));

                ClapprThumbnailsPlugin = "", LevelSelector = "", thumbs = "", ClapprSubtitle = "";


                html = html.replace("new Clappr.Player", "");
                html = html.replace("var player", "player");

                eval(html); // player
                result = void 0;


                if (!player.sources.length > 0) result = [{ label: "Error", file: "Link dead" }];

                if (!(player.sources.length === 2)) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 21;
                return httpRequest.isLinkDie(player.sources[1]);

              case 21:
                isDie = _context2.sent;

                result = [{ label: "NOR", file: player.sources[1], type: 'direct', size: isDie }];

              case 23:
                if (!(player.sources.length === 3)) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 26;
                return httpRequest.isLinkDie(player.sources[2]);

              case 26:
                isDie1 = _context2.sent;
                _context2.next = 29;
                return httpRequest.isLinkDie(player.sources[1]);

              case 29:
                isDie2 = _context2.sent;


                result = [{ label: "NOR", file: player.sources[2], type: 'direct', size: isDie1 }, { label: "SD", file: player.sources[1], type: 'direct', size: isDie2 }];

              case 31:
                return _context2.abrupt('return', {
                  host: {
                    url: url,
                    name: "vidlox"
                  },
                  result: result
                });

              case 32:
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

  return VidLox;
}();

thisSource.function = function (libs, settings) {
  return new VidLox({ libs: libs, settings: settings });
};
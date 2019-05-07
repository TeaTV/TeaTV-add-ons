

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
	DOMAIN: "http://rlsbb.ru",
	SEARCH: function SEARCH(title) {
		return 'http://search.rlsbb.ru/lib/search33526049118.php?phrase=' + title + '&pindex=1&rand=0.39701540485704356';
	},
	DOMAIN_DECODE: '',
	HEADERS: function HEADERS(referer) {
		return {
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
			'referer': referer
		};
	}
};

var getDomain = function getDomain(url) {
	var m = url.match(/\/\/([^\/]+)/);
	if (m == null) return 'xyzzyx.com';
	return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var firstChar = function firstChar(str, separator) {
	var matches = str.match(/\b(\w)/g);
	var acronym = matches.join(separator);

	return acronym;
};

var Rlsbb = function () {
	function Rlsbb(props) {
		_classCallCheck(this, Rlsbb);

		this.libs = props.libs;
		this.movieInfo = props.movieInfo;
		this.settings = props.settings;

		this.state = {};
	}

	_createClass(Rlsbb, [{
		key: 'searchDetail',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, realdebrid, detailUrl, videoUrl, tvshowVideoUrl, urlSearch, dataSearch, js, results, slug, i, m, post_name, prefix;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
								_movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, realdebrid = _movieInfo.realdebrid;

								if (!(realdebrid == undefined)) {
									_context.next = 4;
									break;
								}

								throw new Error("NO REAL DEBITCH HIHI");

							case 4:
								detailUrl = [];
								videoUrl = false;
								tvshowVideoUrl = false;
								_context.prev = 7;
								urlSearch = void 0;

								if (type == 'movie') {
									urlSearch = URL.SEARCH(title);
								} else {
									if (season < 10) season = '0' + season;
									if (episode < 10) episode = '0' + episode;
									urlSearch = URL.SEARCH(title.replace(/[\s':-]/g, '+') + '+s' + season + 'e' + episode);
									console.log(urlSearch);
								}
								_context.next = 12;
								return httpRequest.getHTML(urlSearch);

							case 12:
								dataSearch = _context.sent;
								js = JSON.parse(dataSearch);
								results = js['results'];
								slug = title.replace(/[\s:'"]+/g, '-').toLowerCase();

								for (i in results) {
									m = results[i];
									post_name = m['post_name'];


									if (type == 'movie') {
										if (post_name.indexOf(slug) === 0 && post_name.indexOf(year) != -1) {
											detailUrl.push(post_name);
										}
									} else {
										prefix = 's' + season + 'e' + episode;

										if (post_name.indexOf(slug) === 0 && post_name.indexOf(prefix) != -1) detailUrl.push(post_name);
									}
								}
								_context.next = 22;
								break;

							case 19:
								_context.prev = 19;
								_context.t0 = _context['catch'](7);

								console.log(String(_context.t0));

							case 22:

								this.state.detailUrl = detailUrl;
								return _context.abrupt('return');

							case 24:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[7, 19]]);
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
				var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, urls, hosts, detailUrl, supported, detailPromises, i, u, ulower, tlower, finds, f;

				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
								_movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

								if (this.state.detailUrl) {
									_context3.next = 4;
									break;
								}

								throw new Error("NOT_FOUND");

							case 4:
								urls = [];
								hosts = [];
								detailUrl = this.state.detailUrl;
								supported = ['rapidgator.net', 'ul.to', 'nitroflare.com'];
								detailPromises = detailUrl.map(function () {
									var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
										var fullUrl, dataSearch, hrefs, i, u, domain;
										return regeneratorRuntime.wrap(function _callee2$(_context2) {
											while (1) {
												switch (_context2.prev = _context2.next) {
													case 0:
														fullUrl = URL.DOMAIN + '/' + link;
														_context2.next = 3;
														return httpRequest.getHTML(fullUrl);

													case 3:
														dataSearch = _context2.sent;
														hrefs = dataSearch.match(/href="([^"]+)/g);

														for (i = 0; i < hrefs.length; i++) {
															u = hrefs[i].split('"');

															if (u != null) {
																u = u[1];
																domain = getDomain(u);

																if (supported.includes(domain)) urls.push(u);
															}
														}

													case 6:
													case 'end':
														return _context2.stop();
												}
											}
										}, _callee2, this);
									}));

									return function (_x) {
										return _ref3.apply(this, arguments);
									};
								}());
								_context3.next = 11;
								return Promise.all(detailPromises);

							case 11:

								for (i = 0; i < urls.length; i++) {
									u = urls[i];
									ulower = u.toLowerCase();
									tlower = title.toLowerCase();
									finds = [tlower.replace(/[\s:'"]+/ig, '.'), tlower.replace(/[\s:'"]+/ig, '-'), tlower.replace(/[\s:'"]+/ig, '_'), firstChar(tlower, '.'), firstChar(tlower, '_'), firstChar(tlower, '-')];

									for (f in finds) {
										if (ulower.indexOf(finds[f]) != -1 && ulower.indexOf('part') == -1) {
											if (hosts.length < 15) hosts.push({
												provider: {
													url: u,
													name: "RLS"
												},
												result: {
													file: u,
													label: "embed",
													type: "embed"
												}
											});
										}
									}
								}

								this.state.hosts = hosts;

							case 13:
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

	return Rlsbb;
}();

thisSource.function = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
		var httpRequest, source, bodyPost;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						httpRequest = libs.httpRequest;
						source = new Rlsbb({
							libs: libs,
							movieInfo: movieInfo,
							settings: settings
						});
						bodyPost = {
							name_source: 'moviepix',
							is_link: 0,
							type: movieInfo.type,
							season: movieInfo.season,
							episode: movieInfo.episode,
							title: movieInfo.title,
							year: movieInfo.year
						};
						_context4.next = 5;
						return source.searchDetail();

					case 5:

						if (!source.state.detailUrl) {
							bodyPost.is_link = 0;
						} else {
							bodyPost.is_link = 1;
						}
						_context4.next = 8;
						return source.getHostFromDetail();

					case 8:

						if (source.state.hosts.length == 0) {
							bodyPost.is_link = 0;
						} else {
							bodyPost.is_link = 1;
						}

						//await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

						return _context4.abrupt('return', source.state.hosts);

					case 10:
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

thisSource.testing = Rlsbb;
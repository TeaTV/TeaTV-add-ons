

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://yesmovies.to',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (page == false) {
            return 'https://yesmovies.to/search/' + title + '.html';
        }
        return 'https://yesmovies.to/search/' + title + '/page-' + page + '.html';
    },
    GET_INFO: function GET_INFO(slug) {
        return 'https://yesmovies.to/' + slug + '?is_login=false';
    },
    GET_EMBED: function GET_EMBED(id) {
        return 'https://yesmovies.to/ajax/movie_embed/' + id;
    },
    GET_HTML_EMBED: function GET_HTML_EMBED(id) {
        return 'https://yesmovies.to/ajax/v4_movie_episodes/' + id;
    }
};

var YesMovies = function () {
    function YesMovies(props) {
        _classCallCheck(this, YesMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(YesMovies, [{
        key: 'searchDetail',
        value: async function searchDetail() {
            var _libs = this.libs,
                httpRequest = _libs.httpRequest,
                cheerio = _libs.cheerio,
                stringHelper = _libs.stringHelper,
                base64 = _libs.base64;
            var _movieInfo = this.movieInfo,
                title = _movieInfo.title,
                year = _movieInfo.year,
                season = _movieInfo.season,
                episode = _movieInfo.episode,
                type = _movieInfo.type;
            var getYear = this.getYear,
                getHrefEpisode = this.getHrefEpisode;


            var hrefSearch = '';
            var detailUrl = false;

            if (type == 'movie') {
                hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
            } else {

                hrefSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title + '++season+' + season + '+episode+' + episode, '+'));
            }

            var htmlSearch = await httpRequest.getCloudflare(hrefSearch);
            var $ = cheerio.load(htmlSearch.data);
            var itemPage = $('.movies-list .ml-item');
            var arrInfo = [];

            itemPage.each(async function () {

                var hrefMovie = $(this).find('a').attr('href');
                var titleMovie = $(this).find('a .mli-info h2').text();
                var seasonMovie = titleMovie.match(/\- *season *([0-9]+)/i);
                seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                titleMovie = titleMovie.replace(/\([0-9]+\)/i, '');
                titleMovie = titleMovie.replace(/\- *season.*/i, '');
                titleMovie = titleMovie.trim();
                var slugGetInfo = $(this).find('a').attr('data-url');

                arrInfo.push({
                    hrefMovie: hrefMovie, titleMovie: titleMovie, seasonMovie: seasonMovie, slugGetInfo: slugGetInfo
                });
            });

            var arrPromise = arrInfo.map(async function (val) {

                var yearMovie = await getYear(val.slugGetInfo, cheerio, httpRequest);

                if (stringHelper.shallowCompare(title, val.titleMovie)) {

                    var htmlWatching = await httpRequest.getCloudflare(val.hrefMovie);
                    var $_2 = cheerio.load(htmlWatching.data);
                    var linkWatching = $_2('#mv-info .bwac-btn').attr('href');

                    if (type == 'movie' && year == yearMovie) {

                        detailUrl = linkWatching;
                    } else if (type == 'tv' && val.seasonMovie == season) {

                        detailUrl = linkWatching;
                    }
                }
            });

            await Promise.all(arrPromise);

            this.state.detailUrl = detailUrl;
            return;
        }
    }, {
        key: 'getYear',
        value: async function getYear(slug, cheerio, httpRequest) {

            var yearMovie = 0;
            var htmlGetInfo = await httpRequest.getCloudflare(URL.GET_INFO(slug), {
                'X-Requested-With': 'XMLHttpRequest',
                authority: 'yesmovies.to',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
            });

            var $ = cheerio.load(htmlGetInfo.data);
            var itemInfo = $('.jt-info');

            itemInfo.each(function () {

                var info = $(this).text();

                if (isNaN(+info) == false) {
                    yearMovie = +info;
                }
            });

            return yearMovie;
        }
    }, {
        key: 'getHostFromDetail',
        value: async function getHostFromDetail() {
            var _libs2 = this.libs,
                httpRequest = _libs2.httpRequest,
                cheerio = _libs2.cheerio,
                base64 = _libs2.base64;
            var _movieInfo2 = this.movieInfo,
                title = _movieInfo2.title,
                year = _movieInfo2.year,
                season = _movieInfo2.season,
                episode = _movieInfo2.episode,
                type = _movieInfo2.type;

            if (!this.state.detailUrl) throw new Error("NOT_FOUND");

            var hosts = [];
            var arrId = [];
            var detailUrl = this.state.detailUrl;
            var idMovies = detailUrl.match(/\-([0-9]+)\/watching\.html/i);
            idMovies = idMovies != null ? +idMovies[1] : 0;
            var htmlEmbed = await httpRequest.getCloudflare(URL.GET_HTML_EMBED(idMovies));
            var $ = cheerio.load(htmlEmbed.data.html);

            if (type == 'movie') {

                var idEmbed = $('.ep-item');

                idEmbed.each(function () {

                    var dataId = $(this).attr('data-id');
                    arrId.push(dataId);
                });
            } else if (type == 'tv') {

                var _idEmbed = $('.ep-item');

                _idEmbed.each(function () {

                    var dataId = $(this).attr('data-id');
                    var episodeMovie = $(this).find('a').attr('title');
                    episodeMovie = episodeMovie.match(/episode *([0-9]+)/i);
                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : -1;

                    if (episode == episodeMovie) {
                        arrId.push(dataId);
                    }
                });
            }

            var arrPromise = arrId.map(async function (val) {

                var jsonEmbed = await httpRequest.getCloudflare(URL.GET_EMBED(val));

                var linkEmbed = jsonEmbed.data.src;
                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "yesmovies"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            });

            await Promise.all(arrPromise);

            this.state.hosts = hosts;
            return;
        }
    }]);

    return YesMovies;
}();

thisSource.function = async function (libs, movieInfo, settings) {

    var yesmovies = new YesMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await yesmovies.searchDetail();
    await yesmovies.getHostFromDetail();
    return yesmovies.state.hosts;
};

thisSource.testing = YesMovies;
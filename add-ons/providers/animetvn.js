const URL = {
    DOMAIN: "http://animetvn.tv/",
    SEARCH: (title) => {
        return `http://animetvn.tv/tim-kiem/${encodeURIComponent(title)}.html`;
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};



class Animetvn {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }



    async searchDetail() {
        const { httpRequest, cheerio, stringHelper, qs }    = this.libs; 
        let { title, year, season, episode, type }      = this.movieInfo;


        if( season == 0 && type == 'tv' ) {
            season = title.match(/season *([0-9]+)/i);
            season = season != null ? +season[1] : '0';
            title  = title.replace(/season *[0-9]+/i, '');

            if( season == 0 ) {
                season = title.match(/ss *([0-9]+)/i);
                season = season != null ? +season[1] : '0';
                title  = title.replace(/ss *[0-9]+/i, '');
            }
        }

        let detailUrl = false;
        let videoUrl = false;
        let tvshowDetailUrl = false;

        let urlSearch = '';

        urlSearch = URL.SEARCH(title);

        let htmlSearch = await httpRequest.getHTML(urlSearch, URL.HEADERS);
        let $           = cheerio.load(htmlSearch);

        let itemSearch = $('.film-list .film_item');

        itemSearch.each(function() {

            let hrefMovie = $(this).find('.film_item_inner a').attr('href');
            let titleMovie = $(this).find('.data .title a').text();
            let seasonMovie = titleMovie.match(/\( *season *([0-9]+) *\)/i);
            seasonMovie     = seasonMovie != null ? +seasonMovie[1] : 0;
            titleMovie      = titleMovie.replace(/\( *season *[0-9]+ *\)/i, '').trim();
            titleMovie      = titleMovie.replace(/\(.*/i, '').trim();


            if( stringHelper.shallowCompare(title, titleMovie) ) {

            	videoUrl = hrefMovie;
            	return;
            }
        });

        if (videoUrl) {

        	let htmlVideo = await httpRequest.getHTML(videoUrl);
        	let $_2 	  = cheerio.load(htmlVideo);

        	tvshowDetailUrl = $_2('.play-now').attr('href');
        }

        if (tvshowDetailUrl) {

        	let htmlDetail = await httpRequest.getHTML(tvshowDetailUrl);
        	let $_2 	   = cheerio.load(htmlDetail);

        	let itemEpisode = $_2('.tapphim');

        	itemEpisode.each(function() {

        		let numberEpisode = $_2(this).text();
        		let hrefEpisode = $_2(this).attr('href');

        		if (numberEpisode == episode) {
        			detailUrl = hrefEpisode;
        			return;
        		}
        	});
        }


        this.state.detailUrl = detailUrl;
        return;
    }



    async getHostFromDetail() {
        const { httpRequest, cheerio, qs } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        const anime = this;

        let arrDirect = [];
        let hosts       = [];
        let {type}      = this.movieInfo;

        let htmlDetail = await httpRequest.getHTML(this.state.detailUrl);
        let pregDirect = htmlDetail.match(/sources *\: *([^\]]+)/i);

        if (pregDirect != null) {
        	pregDirect = pregDirect[1] + ']';

        	eval(`arrDirect = ${pregDirect}`);

        	for (let item in arrDirect) {
        		let linkDirect = arrDirect[item].file;
        		let label = arrDirect[item].label;

        		linkDirect && hosts.push({
                    provider: {
                        url: anime.state.detailUrl,
                        name: "Server 10 - Vietsub"
                    },
                    result: {
                        file: linkDirect,
                        label: label
                    }
                });
        	}
        }



        this.state.hosts = hosts;
        return;
    }



    isEmbed(link) {

        if( link.indexOf('statics2.vidcdn.pro') != -1 ) {
            return false;
        } else if( link.indexOf('stream2.m4ukido.com') != -1 ) {
            return false;
        } 


        return true;
    }


}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Animetvn({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Animetvn',
        is_link: 0,
        type: movieInfo.type,
        season: movieInfo.season,
        episode: movieInfo.episode,
        title: movieInfo.title,
        year: movieInfo.year
    };

    await source.searchDetail();

    if( !source.state.detailUrl ) {
        bodyPost.is_link = 0;
    } else {
        bodyPost.is_link = 1;
    }
    await source.getHostFromDetail();

    if( source.state.hosts.length == 0 ) {
        bodyPost.is_link = 0;
    } else {
        bodyPost.is_link = 1;
    }

    await httpRequest.post('http://afilm.filmhub.io:8889/api/monitor/sources', {}, bodyPost);

    return source.state.hosts;
}

exports.testing = Phimmoi;
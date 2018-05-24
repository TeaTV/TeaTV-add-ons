const URL = {

    DOMAIN: "http://321movies.club",
    SEARCH: (title) => {
    	return `http://321movies.club/search-movies/${title}.html`;
    }, 
    HEADERS: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin' : 'http://321movies.club',
        'Accept-Language': 'vi-VN,vi;q=0.8,fr-FR;q=0.6,fr;q=0.4,en-US;q=0.2,en;q=0.2',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

class ThreeMovies {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, cryptoJs, qs }  = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;

        let detailUrl       = false;
        let tvshowVideo 	= false;

        let urlSearch 		= '';
        if( type == 'movie' ) {

            urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        } else {
            urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+') + `+season+${season}`);
        }
        let htmlSearch 		= await httpRequest.getHTML(urlSearch);
        let $ 				= cheerio.load(htmlSearch);

        let itemSearch =  $('.tab-content .movies-list');


        itemSearch.each(function() {

        	let hrefMovie = $(this).find('a').attr('href');
        	let tip 	  = $(this).find('.ml-item a').attr('onmouseover');
        	tip 		  = tip.replace("Tip('", '');
        	tip 		  = tip.replace("', WIDTH, -300, FONTFACE, 'Arial, Tahoma', FONTSIZE, '13px')", "");


        	if (tip != false) {
        		let $_2 = cheerio.load(tip);
        		let titleMovie = $_2('.tipWrapper b i').text();
        		let yearMovie  = $_2('b:contains(Release)').text();
        		yearMovie	   = yearMovie.replace(/Release *\:/i, '').trim();
        		let seasonMovie = titleMovie.match(/season *([0-9]+)/i);
        		seasonMovie  	= seasonMovie != null ? +seasonMovie[1] : 0;
        		titleMovie 		= titleMovie.replace(/\:* *season *[0-9]+/i, '');
        		titleMovie 		= titleMovie.replace(/\( *[0-9]+ *\)/i, '');

        		if( stringHelper.shallowCompare(titleMovie, title) ) {

        			if( type == 'movie' && yearMovie == year ) {
        				detailUrl = hrefMovie;
        				return;
        			} else if( type == 'tv' && seasonMovie == season ) {

        				tvshowVideo = hrefMovie;
        				return;
        			}
        		}	
        	}
        });

        if( type == 'tv' && tvshowVideo != false )  {

        	let htmlVideo = await httpRequest.getHTML(tvshowVideo);
        	let $_2 		  = cheerio.load(htmlVideo);
        	let itemEpisode = $_2('#details .episode');

        	itemEpisode.each(function() {
        		let numberEpisode = $_2(this).text();
        		let hrefEpisode   = $_2(this).attr('href');

        		if( numberEpisode == episode ) {

        			detailUrl = hrefEpisode;
        			return;
        		}
        	});
        }

        this.state.detailUrl = detailUrl; 
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio, base64, _ } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);

        let decode = htmlDetail.match(/document\.write\(Base64\.decode\(\"([^\"]+)/i);
        decode     = decode != false ? decode[1] : false;

        if( decode != false ) {
        	decode = base64.decode(decode);
        	let iframe = decode.match(/src\=\"([^\"]+)/i);
        	iframe 	   = iframe != false ? iframe[1] : false;

        	iframe && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "321movies"
                },
                result: {
                    file: iframe,
                    label: "embed",
                    type: 'embed'
                }
            });
        }

        let arrBackup = [];
        let $ = cheerio.load(htmlDetail);
        let itemBackup = $('#total_version .server_line');

        itemBackup.each(function() {
        	let hrefDetail = $(this).find('.server_play a').attr('href');


        	arrBackup.push(hrefDetail);
        });	
        arrBackup = _.dropRight(arrBackup, arrBackup.length - 10);


        let arrPromise = arrBackup.map(async (val) => {

        	htmlDetail  = await httpRequest.getHTML(val);

	        decode = htmlDetail.match(/document\.write\(Base64\.decode\(\"([^\"]+)/i);
	        decode     = decode != false ? decode[1] : false;

	        if( decode != false ) {
	        	decode = base64.decode(decode);
	        	let iframe = decode.match(/src\=\"([^\"]+)/i);
	        	iframe 	   = iframe != false ? iframe[1] : false;

	        	iframe && hosts.push({
	                provider: {
	                    url: detailUrl,
	                    name: "321movies"
	                },
	                result: {
	                    file: iframe,
	                    label: "embed",
	                    type: 'embed'
	                }
	            });
	        }
        });

        await Promise.all(arrPromise);

        this.state.hosts = hosts;
    }
}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new ThreeMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: '321Movies',
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

    await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

    return source.state.hosts;
}



exports.testing = ThreeMovies;
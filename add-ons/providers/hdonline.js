const URL = {
    DOMAIN: "http://hdonline.vn",
    SEARCH: (title) => {
    	return `http://hdonline.vn/tim-kiem/${title}.html`;
    },
    HEADERS: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Connection': 'keep-alive',
        'Host': 'hdonline.vn',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    },
    HEADER_DIRECT: (rerfer='', cookie='') => {
            return {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Host': 'hdonline.vn',
                'Referer': rerfer,
                'Cookie': `jwplayer.captionconfig={"back":false,"fontSize":20,"fontFamily":"Arial","fontOpacity":100,"color":"#FFFFFF","backgroundColor":"#000","backgroundOpacity":50,"edgeStyle":"uniform","windowColor":"#FFF","windowOpacity":0,"delayTime":0,"textShadow":"#080808","captionSecondPos":"below"}; ${cookie}`, 
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
            }
    },
   	DOMAIN_EPISODE: (id, page=1) => {
       	return `http://hdonline.vn/episode/ajax?film=${id}&episode=&page=${page}&search=`;
    }
};



class Hdonline {
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

        let videoUrl = false;
        let detailUrl = false;
        let tvshowDetailUrl = false;

        let	urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title));
        let htmlSearch 	= await httpRequest.getHTML(urlSearch, URL.HEADERS);
        let $ 			= cheerio.load(htmlSearch);

        let itemSearch 	= $('#cat_tatca li');

        itemSearch.each(function() {

        	let hrefMovie  = URL.DOMAIN  + $(this).find('.tn-bxitem a').attr('href');
        	let titleMovie = $(this).find('.name-vi').text();
        	let seasonMovie = titleMovie.match(/season *([0-9]+)/i);
        	seasonMovie  	= seasonMovie != null ? +seasonMovie[1] : 0;
        	titleMovie 		= titleMovie.replace(/season *[0-9]+/i, '').trim();
        	let yearMovie   = $(this).find("p:contains(Năm sản xuất)").text();
        	yearMovie 	 	= yearMovie.match(/([0-9]+)/i);
        	yearMovie 		= yearMovie != null ? +yearMovie[1] : false;
            let status      = $(this).find('.bxitem-episodes span').text();
            status          = status ? status.trim().toLowerCase().replace('ậ', 'a') : '';


        	if( stringHelper.shallowCompare(title, titleMovie) ) {

        		if( type == 'movie' && yearMovie == year && !status ) {
        			detailUrl = hrefMovie;
        			return;
        		} else if( type == 'tv' && (status.indexOf('full') != -1 || status.indexOf('tap') != -1) && (season == seasonMovie || seasonMovie == 0) ) {
        			videoUrl = hrefMovie;
        			return;
        		}
        	}
        });

        if( videoUrl != false && type == 'tv' ) {

        	let arrPage = [];
        	let idEpisode = videoUrl.match(/([0-9]+)\.html/i);
        	idEpisode 	  = idEpisode != null ? idEpisode[1] : "0";

        	let htmlVideo = await httpRequest.getHTML(URL.DOMAIN_EPISODE(idEpisode));
        	let $_2  	  = cheerio.load(htmlVideo);

        	let itemEpisode = $_2('.paginationEpMovies a').last().attr('onclick');
        	let last_page     = 1; 


            if( itemEpisode ) { 
                last_page     = itemEpisode.match(/loadEpisode\( *\'.*\' *\, *([0-9]+)/i);
                last_page         = last_page != null ? +last_page[1] : 0;
            }

            for( let i = 1; i <= last_page; i++ ) {
                arrPage.push(i);
            }

            let arr_promise = arrPage.map(async (val) => {

                let href_page = URL.DOMAIN_EPISODE(idEpisode, val);
                let html_page = await httpRequest.getHTML(href_page);
                let $         = cheerio.load(html_page);

                let item_episode      = $('a');

                item_episode.each(function() {

                    let number_movie = $(this).text();
                    let href_movie   = $(this).attr('href');

                    if( href_movie != 'javascript:void(0)' && number_movie == episode ) {

                        href_movie = URL.DOMAIN + href_movie;
                        detailUrl = href_movie;
                        return;
                    }
                    
                });

            });

            await Promise.all(arr_promise);
        }


        this.state.detailUrl = detailUrl;
        return;
    }



    async getHostFromDetail() {

        const { httpRequest, cheerio, qs, gibberish } = this.libs;
        let { title, year, season, episode, type }      = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let hdonline= this;

        let arr_result = [];
        let arr_direct = [];

        let playerSetting = {
            sourceLinks: [],
            modelId: ''
        };


        let header     = await httpRequest.get(hdonline.state.detailUrl, URL.HEADER_DIRECT(hdonline.state.detailUrl)); 
        header 		= header.headers;
        header      = header['set-cookie'][1];
        header      = header.match(/([^\;]+)/i);
        header      = header != null ? header[1] + ';' : '';

        let html_video  = await httpRequest.getHTML(hdonline.state.detailUrl, URL.HEADER_DIRECT(hdonline.state.detailUrl));

        let player  = html_video.match(/\"playlist\" *\:([^\]]+)/i);
        player      = player != null ? player[1] + ']' : ']';
        player 		= JSON.parse(player);

        let arrValFile = [];

        let arr_promise = player.map(async (val) => {

        	let numberEpisode = val.title;
        	numberEpisode 	= numberEpisode.match(/([0-9]+)/i);
        	numberEpisode 	= numberEpisode != null ? +numberEpisode[1] : false;

        	if( numberEpisode == episode && type == 'tv' ) {

        		arrValFile.push(val);
        	} else if( type == 'movie' ) {
        		arrValFile.push(val);
        		return;
        	}
        });

        await Promise.all(arr_promise);


        arr_promise = arrValFile.map(async (val) => {

        	let href_get_direct = URL.DOMAIN + val.file + '&format=json';
            let data = await httpRequest.getHTML(href_get_direct, URL.HEADER_DIRECT(hdonline.state.detailUrl, header));
            
            data     = JSON.parse(data);
            href_get_direct     = URL.DOMAIN + val.file + '&_x=123&format=json';
            data = await httpRequest.getHTML(href_get_direct, URL.HEADER_DIRECT(hdonline.state.detailUrl, header));
            data     = JSON.parse(data);

           	data.file && hosts.push({
                provider: {
                    url: hdonline.state.detailUrl,
                    name: "Server 4 - Vietsub"
                },
                result: {
                    file: data.file,
                    label: 'HD',
                    type: 'direct'
                }
            }); 
            
            for( let item in data.level ) {

            	data.level[item].file && hosts.push({
	                provider: {
	                    url: hdonline.state.detailUrl,
	                    name: "Server 4 - Vietsub"
	                },
	                result: {
	                    file: data.level[item].file,
	                    label: data.level[item].label,
	                    type: 'direct'
	                }
            	}); 
                
            }
        });
        await Promise.all(arr_promise);


        this.state.hosts = hosts;
        return;
    }


}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Hdonline({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Hdonline',
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

exports.testing = Hdonline;
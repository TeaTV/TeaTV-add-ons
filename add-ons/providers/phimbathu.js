const URL = {
    DOMAIN: "http://phimbathu.com",
    SEARCH: (title) => {
    	return `http://phimbathu.com/tim-kiem.html?q=${title}`;
    },
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    },
    DOMAIN_THUYET_MINH: (id, vietsubId) => {
        return `http://phimbathu.com/ajax/getLinkPlayer/id/${id}/index/${vietsubId}`;
    }
};



class Phimbathu {
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

        let	urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let htmlSearch 	= await httpRequest.getHTML(urlSearch, URL.HEADERS);
        let $ 			= cheerio.load(htmlSearch);

        let itemSearch 	= $('#page-info .item');

        itemSearch.each(function() {

        	let hrefMovie  = URL.DOMAIN  + $(this).find('a').attr('href');
            let titleVi    = $(this).find('.name span').text();
        	let titleMovie = $(this).find('.name-real').text();
        	let yearMovie 		= titleMovie.match(/\( *([0-9]+)/i);
        	yearMovie 			= yearMovie != null ? +yearMovie[1] : false;
        	let seasonMovie 	= titleMovie.match(/season *([0-9]+)/i);
        	seasonMovie			= seasonMovie != null ? +seasonMovie[1] : 0;
        	titleMovie 			= titleMovie.replace(/season *[0-9]+ *\(* *[0-9]+ *\)*$/i, '').trim();
        	titleMovie 			= titleMovie.replace(/\( *[0-9]+ *\)/i, '').trim();
            let status          = $(this).find('.label').text().toLowerCase();
            let status_lower        = status.trim().replace('ậ', 'a');

            if( !titleMovie ) {
                titleMovie = titleVi;
            }

        	if( stringHelper.shallowCompare(title, titleMovie) ) {

        		if( type == 'movie' && status_lower.indexOf('full') == -1 && status_lower.indexOf('tap') == -1 && year == yearMovie  ) {
        			videoUrl = hrefMovie;
        			return;
        		} else if( type == 'tv' && (status_lower.indexOf('full') != -1 || status_lower.indexOf('tap') != -1) && (season == seasonMovie || seasonMovie == 0) ) {

        			videoUrl = hrefMovie;
        			return;
        		}
        	}
        });

        if( videoUrl != false ) {

        	let htmlVideo = await httpRequest.getHTML(videoUrl, URL.HEADERS);
        	let $_2  	  = cheerio.load(htmlVideo);


        	let hrefVideo = $_2('.btn-see').attr('href');

            if( hrefVideo.indexOf('phimbathu') == -1 ) {
                hrefVideo = URL.DOMAIN + hrefVideo;
            }

        	if( type == 'movie' && hrefVideo ) {
        		detailUrl = hrefVideo;
        	} else if( type == 'tv' && hrefVideo )  {

        		tvshowDetailUrl = hrefVideo;
        	}
        }

        if( type == 'tv' && tvshowDetailUrl ) {


        	let htmlDetail = await httpRequest.getHTML(tvshowDetailUrl);
        	let $_2 	= cheerio.load(htmlDetail);

        	let itemEpisode = $_2('#list_episodes a');

        	itemEpisode.each(function() {

        		let hrefEpisode   = $_2(this).attr('href');
        		let numberEpisode = $_2(this).text();	
        		numberEpisode 	  = numberEpisode.match(/([0-9]+)/i);
        		numberEpisode     = numberEpisode != null ? +numberEpisode[1] : false;

        		if( numberEpisode && numberEpisode == episode ) {
        			detailUrl = hrefEpisode;
        			return;
        		}

        	});
        }

        this.state.detailUrl = detailUrl;
        return;
    }



    async getHostFromDetail() {
        const { httpRequest, cheerio, qs, gibberish } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let {type}      = this.movieInfo;
        let phimbathu   = this;
        

        let playerSetting = {
           	sourceLinks: [],
           	modelId: ''
       	};

        let html_video  = await httpRequest.getHTML(this.state.detailUrl, URL.HEADERS);
        let $           = cheerio.load(html_video);
        let player      = html_video.match(/var *playerSetting *\=([^\$]+)/i);
        player      = player != null ? player[1] : '';

        eval(`playerSetting =  ${player}`);

        let key = `phimbathu.com4590481877${playerSetting.modelId}`;

        for( let item in playerSetting.sourceLinks ) {

            for( let item1 in playerSetting.sourceLinks[item].links ) {

                let link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);

                if( link_direct ) {

                	hosts.push({
	                    provider: {
	                        url: phimbathu.state.detailUrl,
	                        name: "Server 2 - Vietsub"
	                    },
	                    result: {
	                        file: link_direct,
	                        label: playerSetting.sourceLinks[item].links[item1].label,
	                        type: 'direct'
	                    }
	                });
                }
                
            }
            
        }


        // thuyetminh
        let arrServer = [];
        let idServer   = html_video.match(/\/ajax\/getLinkPlayer\/id\/([^\/]+)/i);
        idServer       = idServer != null ? idServer[1] : '';

        let itemServer = $('.server-item');

        itemServer.each(function() {

            let nameServer = $(this).find('.name span').text();

            if( nameServer && nameServer.trim() == 'Thuyết Minh' ) {

                let itemNumberServer = $(this).find('.option .btn');

                itemNumberServer.each(function() {
                    let numberServer = $(this).attr('data-index');
                    arrServer.push(numberServer);
                });
                
            }
            
        });


        let arrPromise = arrServer.map(async (val) => {

            let jsonThuyetMinh = await httpRequest.getHTML(URL.DOMAIN_THUYET_MINH(idServer, val));
            jsonThuyetMinh     = JSON.parse(jsonThuyetMinh);

            for( let item in jsonThuyetMinh.sourceLinks ) {

                for( let item1 in jsonThuyetMinh.sourceLinks[item].links ) {

                    let link_direct = gibberish.dec(jsonThuyetMinh.sourceLinks[item].links[item1].file, key);

                    if( link_direct ) {

                        hosts.push({
                            provider: {
                                url: phimbathu.state.detailUrl,
                                name: "Server 2 - Thuyet Minh"
                            },
                            result: {
                                file: link_direct,
                                label: jsonThuyetMinh.sourceLinks[item].links[item1].label,
                                type: 'direct'
                            }
                        });
                    }
                    
                }
                
            }
        });

        await Promise.all(arrPromise);

        this.state.hosts = hosts;
        return;
    }



}

exports.default = async (libs, movieInfo, settings) => {

    const phimbathu = new Phimbathu({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await phimbathu.searchDetail();
    await phimbathu.getHostFromDetail();
    return phimbathu.state.hosts;
}

exports.testing = Phimbathu;
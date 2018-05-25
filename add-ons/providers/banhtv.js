URL = {
    SOURCE: `banhtv`,
    DOMAIN: "http://banhtv.com",
    HEADERS: (rerfer='') => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'banhtv.com',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    SEARCH: (title) => {
        return `http://banhtv.com/tim-kiem.html?q=${encodeURI(title)}`;
    },
    DOMAIN_THUYET_MINH: (id, vietsubId) => {
        return `http://banhtv.com/ajax/getLinkPlayer/id/${id}/index/${vietsubId}`;
    }
};

class Banhtv {


    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }


    async searchDetail() {
        const { httpRequest, cheerio, stringHelper }   = this.libs; 
        let { title, year, season, episode, type }     = this.movieInfo;

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

        let banhtv = this;

        let detailUrl = false;
        let arrVideo = [];
        let videoUrl = false;
        let tvshowVideoUrl = false;

        let url_search      = URL.SEARCH(title);
        let html_search     = await httpRequest.getHTML(url_search, URL.HEADERS(url_search));
        let $               = cheerio.load(html_search);

        let item_page   = $('.list-film .item');

        item_page.each(function() {

        	let hrefVideo = $(this).find('a').attr('href');
            let status    = $(this).find('.label').text().toLowerCase();
            status        = status.replace('ậ', 'a');

        	if( hrefVideo ) {
                hrefVideo = URL.DOMAIN + hrefVideo;
                if( type == 'tv' && (status.indexOf('tap') != -1 || status.match(/[0-9]+ *\/ *[0-9]+/i)) )  {
                    arrVideo.push(hrefVideo);
                } else if( type == 'movie' && status.indexOf('tap') == -1 && !status.match(/[0-9]+ *\/ *[0-9]+/i) ) {
                    arrVideo.push(hrefVideo);
                }
        		
        		
        	}
        });


        let arrPromise = arrVideo.map(async function(val) {

        	let htmlVideo = await httpRequest.getHTML(val);
        	let $_2  		= cheerio.load(htmlVideo);

        	let hrefVideo 	= $_2('.btn-see').attr('href');
            let titleVi     = $_2('.image .text h1').text();
        	let titleMovie = $_2('.image .text h2').text();
        	let yearMovie 	= titleMovie.match(/\(* *([0-9]+) *\)*$/i); 
        	yearMovie 		= yearMovie != null ? +yearMovie[1] : false;
        	let seasonMovie = titleMovie.match(/\(* *season *([0-9]+) *\)*/i);
        	seasonMovie 	= seasonMovie != null ? +seasonMovie[1] : 0;
        	titleMovie 		= titleMovie.replace(/\(* *season *[0-9]+ *\)*/i, '');
        	titleMovie 		= titleMovie.replace(/\(* *[0-9]+ *\)*/i, '');

            if( !titleMovie ) {
                titleMovie = titleVi;
            }

        	if( stringHelper.shallowCompare(title, titleMovie) && hrefVideo ) {

                
        		hrefVideo = URL.DOMAIN + hrefVideo;
        		if( type == 'movie' && yearMovie && (yearMovie-1 == year || yearMovie == year || yearMovie+1 == year)  ) {

        			detailUrl = hrefVideo;
        			return;
        		} else if( type == 'tv' && (seasonMovie == season || seasonMovie == 0) ) {
        			tvshowVideoUrl = hrefVideo;
        			return;
        		}
        	}
        });

        await Promise.all(arrPromise);


        if( type == 'tv' && tvshowVideoUrl ) {

        	let htmlDetail = await httpRequest.getHTML(tvshowVideoUrl, URL.HEADERS(tvshowVideoUrl));
        	let $_2 	   = cheerio.load(htmlDetail);

        	let itemEpisode = $_2('#list_episodes li');

        	itemEpisode.each(function() {

        		let hrefEpisode = $_2(this).find('a').attr('href');
        		let numberEpisode  = $_2(this).find('a').text();
        		numberEpisode      = numberEpisode.match(/([0-9]+)/i);
        		numberEpisode 	   = numberEpisode != null ? +numberEpisode[1] : false;

        		if( numberEpisode == episode && hrefEpisode ) {

        			hrefEpisode = URL.DOMAIN + hrefEpisode;
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
        const {episode, type}                     = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let banhtv        	= this;

        let hosts       	= [];

        let playerSetting = {
            sourceLinks: [],
            modelId: ''
        };

        let html_video  = await httpRequest.getHTML(banhtv.state.detailUrl);
        let $           = cheerio.load(html_video); 
        let player      = html_video.match(/var *playerSetting *\=([^$]+)/i);
        player      = player != null ? player[1] : '';
        player      = player.replace(/var *bbPlayer\;/i, '');
        player      = player.replace(/var *playerNoAds *\= *function\(\) *\{/i, '');
        player      = player.replace('playerSetting["adsArray"] = [];', '');
        player      = player.replace('playerSetting["midArray"] = [];', '');
        player      = player.replace(`bbPlayer = new BPlayer('player');`, '');
        player      = player.replace(`bbPlayer.init(playerSetting);`, '');
        player      = player.replace(`$(".ads-under-player").remove();`, '');
        player      = player.replace(/\}$/i, '');
        player      = player.replace('var playerHasAds = function() {', '');
        player      = player.replace(`bbPlayer = new BPlayer('player');`, '');
        player      = player.replace(`bbPlayer.init(playerSetting);`, '');
        player      = player.replace(/\}$/i, '');
        player      = player.replace('hook_no_play_ads.push(playerNoAds);', '');
        player      = player.replace('hook_play_ads.push(playerHasAds);', '');

        eval(`playerSetting =  ${player}`);

        
        let key = `banhtv.com4590481877${playerSetting.modelId}`;
        for( let item in playerSetting.sourceLinks ) {

            for( let item1 in playerSetting.sourceLinks[item].links ) {

                let link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);

                if( link_direct ) {

                	hosts.push({
                        provider: {
                            url: banhtv.state.detailUrl,
                            name: "Server 5 - Vietsub"
                        },
                        result: {
                            file: link_direct,
                            label: playerSetting.sourceLinks[item].links[item1].label
                        }
                    });
                }
                
            }
            
        }


                // thuyetminh
        // let arrServer = [];
        // let idServer   = html_video.match(/\/ajax\/getLinkPlayer\/id\/([^\/]+)/i);
        // idServer       = idServer != null ? idServer[1] : '';

        // let itemServer = $('.server-item');

        // itemServer.each(function() {

        //     let nameServer = $(this).find('.name span').text();

        //     if( nameServer && nameServer.trim() == 'Thuyết Minh' ) {

        //         let itemNumberServer = $(this).find('.option .btn');

        //         itemNumberServer.each(function() {
        //             let numberServer = $(this).attr('data-index');
        //             arrServer.push(numberServer);
        //         });
                
        //     }
            
        // });

        // let arrPromise = arrServer.map(async (val) => {

        //     let jsonThuyetMinh = await httpRequest.getHTML(URL.DOMAIN_THUYET_MINH(idServer, val));
        //     jsonThuyetMinh     = JSON.parse(jsonThuyetMinh);


        //     for( let item in playerSetting.sourceLinks ) {

        //         for( let item1 in playerSetting.sourceLinks[item].links ) {

        //             let link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);

        //             if( link_direct ) {

        //                 hosts.push({
        //                     provider: {
        //                         url: banhtv.state.detailUrl,
        //                         name: "Server 5 - Thuyet Minh"
        //                     },
        //                     result: {
        //                         file: link_direct,
        //                         label: playerSetting.sourceLinks[item].links[item1].label
        //                     }
        //                 });
        //             }
                    
        //         }
                
        //     }
        // });

        // await Promise.all(arrPromise);

        this.state.hosts = hosts;
        return;
    }

}


exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Banhtv({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Banhtv',
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


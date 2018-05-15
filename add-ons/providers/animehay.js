URL = {
    SOURCE: `animehay`,
    DOMAIN: "http://animehay.tv",
    HEADERS: (rerfer='') => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'animehay.tv',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    HEADER_SCRIPT: (cookie='', rerfer='') => {
        return {
            'Accept': '*/*',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Cookie': cookie,
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    SEARCH: (title) => {
        return `http://animehay.tv/tim-kiem?q=${encodeURI(title)}`;
    }
};



class Animehay {




    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }


    async searchDetail() {
        const { httpRequest, cheerio, stringHelper }    = this.libs; 
        let { title, year, season, episode, type }          = this.movieInfo;

        let banhtv = this;

        let detailUrl = false;
        let arrVideo = [];
        let videoUrl = false;
        let tvshowVideoUrl = false;

        if( type == 'movie' )  throw new Error('NOT FOUND');

        let url_search      = URL.SEARCH(title);
        let html_search     = await httpRequest.getHTML(url_search, URL.HEADERS(url_search));
        let $               = cheerio.load(html_search);

        let item_page   = $('.ah-row-film .ah-col-film');

        item_page.each(function() {

        	let hrefVideo = $(this).find('.ah-effect-film a').attr('href');
        	let title_en = $(this).find('.name-film').text();
        	let seasonMovie = title_en.match(/ss([0-9]+)/i);
        	seasonMovie 	= seasonMovie != null ? +seasonMovie[1] : 0;
        	title_en 		= title_en.replace(/ss[0-9]+/i, '');

        	if( stringHelper.shallowCompare(title_en, title) ) {
        		videoUrl = hrefVideo;
        		return;
        	}
        });

        if( type == 'tv' && videoUrl != false ) {

        	let htmlVideo = await httpRequest.getHTML(videoUrl, URL.HEADERS()); 
        	let $_2       = cheerio.load(htmlVideo);
        	let linkDetail = $_2('.button-one').attr('href');

        	if ( linkDetail ) {
        		htmlVideo = await httpRequest.getHTML(linkDetail, URL.HEADERS());
        		$_2 	  = cheerio.load(htmlVideo);

        		let listEpisode = $_2('.ah-wf-le ul li');


        		listEpisode.each(function () {
        			let numberEpisode = $_2(this).find('a').text();
        			let hrefEpisode = $_2(this).find('a').attr('href');

                    console.log(numberEpisode, hrefEpisode);
        			if( hrefEpisode && numberEpisode == episode ) {
        				detailUrl = hrefEpisode;
        				return;
        			}
        		});
        	}
        }

        this.state.detailUrl = detailUrl;
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio, qs, gibberish } = this.libs;
        const {episode, type}                     = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let animehay        	= this;

        let hosts       	= [];

        let infoLoad = {
            links: []
        };
        let serverLoad = {};
        let loadVideo = (a,b,c,d,e) => {};
        let loadVideo2 = (a,b,c,d,e) => {};


        let html_video  = await httpRequest.get(this.state.detailUrl, URL.HEADERS());
        let headers     = html_video.headers['set-cookie'];

        let $           = cheerio.load(html_video.data);
        let cookie      = headers[0].replace(/\;.*/i, '') + ';';

        let hrefScript  = $('.ah-wf-head script[async=true]').attr('src');
        let script      = await httpRequest.getHTML(hrefScript, URL.HEADER_SCRIPT(cookie, animehay.state.detailUrl)); 

        script          = script.replace(/var *infoLoad/i, 'infoLoad');
        script          = script.replace(/var *serverLoad/i, 'serverLoad');

        eval(script);


        if( infoLoad.links.length > 0 ) {

            for (let item in infoLoad.links) {
                if( infoLoad.links[item].file ) {
                	hosts.push({
                        provider: {
                            url: animehay.state.detailUrl,
                            name: "Server 7"
                        },
                        result: {
                            file: infoLoad.links[item].file,
                            label: infoLoad.links[item].label
                        }
	                });
                }
            }
        }

        if( serverLoad ) {

            for ( let item in serverLoad ) {

                for( let item2 in serverLoad[item] )   {

                    if( serverLoad[item][item2].file ) {
	                   	hosts.push({
	                        provider: {
	                            url: animehay.state.detailUrl,
	                            name: "Server 7"
	                        },
	                        result: {
	                            file: serverLoad[item][item2].file,
	                            label: serverLoad[item][item2].label
	                        }
	                    });
                    }
                }
                
            }
        }

        // let playerSetting = {
        //     sourceLinks: [],
        //     modelId: ''
        // };

        // let html_video  = await httpRequest.getHTML(banhtv.state.detailUrl);
        
        // let player      = html_video.match(/var *playerSetting *\=([^$]+)/i);
        // player      = player != null ? player[1] : '';
        // player      = player.replace(/var *bbPlayer\;/i, '');
        // player      = player.replace(/var *playerNoAds *\= *function\(\) *\{/i, '');
        // player      = player.replace('playerSetting["adsArray"] = [];', '');
        // player      = player.replace('playerSetting["midArray"] = [];', '');
        // player      = player.replace(`bbPlayer = new BPlayer('player');`, '');
        // player      = player.replace(`bbPlayer.init(playerSetting);`, '');
        // player      = player.replace(`$(".ads-under-player").remove();`, '');
        // player      = player.replace(/\}$/i, '');
        // player      = player.replace('var playerHasAds = function() {', '');
        // player      = player.replace(`bbPlayer = new BPlayer('player');`, '');
        // player      = player.replace(`bbPlayer.init(playerSetting);`, '');
        // player      = player.replace(/\}$/i, '');
        // player      = player.replace('hook_no_play_ads.push(playerNoAds);', '');
        // player      = player.replace('hook_play_ads.push(playerHasAds);', '');

        // eval(`playerSetting =  ${player}`);

        
        // let key = `banhtv.com4590481877${playerSetting.modelId}`;
        // for( let item in playerSetting.sourceLinks ) {

        //     for( let item1 in playerSetting.sourceLinks[item].links ) {

        //         let link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);

        //         if( link_direct ) {

        //         	hosts.push({
        //                 provider: {
        //                     url: banhtv.state.detailUrl,
        //                     name: "Server 5"
        //                 },
        //                 result: {
        //                     file: link_direct,
        //                     label: playerSetting.sourceLinks[item].links[item1].label
        //                 }
        //             });
        //         }
                
        //     }
            
        // }

        this.state.hosts = hosts;
        return;
    }

}


exports.default = async (libs, movieInfo, settings) => {

    const anime = new Animehay({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await anime.searchDetail();
    await anime.getHostFromDetail();
    return anime.state.hosts;
}


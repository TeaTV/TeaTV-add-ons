const URL = {
    DOMAIN: "http://phimbathu.com",
    SEARCH: (title) => {
    	return `http://phimbathu.com/tim-kiem.html?q=${title}`;
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

        let videoUrl = false;
        let detailUrl = false;
        let tvshowDetailUrl = false;

        let	urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let htmlSearch 	= await httpRequest.getHTML(urlSearch, URL.HEADERS);
        let $ 			= cheerio.load(htmlSearch);

        let itemSearch 	= $('#page-info .item');

        itemSearch.each(function() {

        	let hrefMovie  = URL.DOMAIN  + $(this).find('a').attr('href');
        	let titleMovie = $(this).find('.name-real').text();
        	let yearMovie 		= titleMovie.match(/\( *([0-9]+)/i);
        	yearMovie 			= yearMovie != null ? +yearMovie[1] : false;
        	let seasonMovie 	= titleMovie.match(/season *([0-9]+)/i);
        	seasonMovie			= seasonMovie != null ? +seasonMovie[1] : false;
        	titleMovie 			= titleMovie.replace(/season *[0-9]+ *\(* *[0-9]+ *\)*$/i, '').trim();
        	titleMovie 			= titleMovie.replace(/\( *[0-9]+ *\)/i, '').trim();

        	if( stringHelper.shallowCompare(title, titleMovie) ) {

        		if( type == 'movie' && yearMovie == year && !seasonMovie ) {
        			videoUrl = hrefMovie;
        			return;
        		} else if( type == 'tvshow' && seasonMovie && seasonMovie == season ) {
        			videoUrl = hrefMovie;
        			return;
        		}
        	}
        });

        if( videoUrl != false ) {

        	let htmlVideo = await httpRequest.getHTML(videoUrl, URL.HEADERS);
        	let $_2  	  = cheerio.load(htmlVideo);


        	let hrefVideo = $_2('.btn-see').attr('href');

        	if( type == 'movie' && hrefVideo ) {
        		detailUrl = URL.DOMAIN + hrefVideo;
        	} else if( type == 'tvshow' && hrefVideo )  {

        		tvshowDetailUrl = detailUrl;
        	}
        }

        if( type == 'tvshow' && tvshowDetailUrl ) {

        	let htmlDetail = await httpRequest.getHTML(tvshowDetailUrl);
        	let $_2 	= cheerio.load(htmlDetail);

        	let itemEpisode = $_2('#list_episodes');

        	itemEpisode.each(function() {

        		let hrefEpisode   = $_2(this).find('a').attr('href');
        		let numberEpisode = $_2(this).find('a').text();	
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
	                        name: "phimbathu"
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
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

        let animehay = this;

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

        try {
            let html_video  = await httpRequest.getHTML(animehay.state.detailUrl, URL.HEADERS());
            // let headers     = html_video.headers['set-cookie'];


            let $           = cheerio.load(html_video);
            let cookie      = '';

            let hrefScript  = $('.ah-wf-head script[async=true]').attr('src');
            let script      = await httpRequest.getHTML(hrefScript, URL.HEADER_SCRIPT(cookie, animehay.state.detailUrl)); 

            script          = script.replace(/var *infoLoad/i, 'infoLoad');
            script          = script.replace(/var *serverLoad/i, 'serverLoad');

            console.log(script); 

            eval(script);

            console.log(infoLoad, serverLoad);
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
        } catch(error) {
            console.log(String(error));
        }
        



        this.state.hosts = hosts;
        return;
    }

}


exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Animehay({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Animehay',
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


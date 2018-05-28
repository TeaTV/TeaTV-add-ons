const URL = {
    DOMAIN: "http://vuighe.net",
    SEARCH: (title) => {
    	return `http://vuighe.net/tim-kiem/${encodeURI(title)}`;
    }, 
    DOMAIN_EPISODE: (id) => {
        return `http://vuighe.net/api/v2/films/${id}/episodes?sort=name`;
    },
    DOMAIN_EMBED: (id, id_episode) => {
        return `http://vuighe.net/api/v2/films/${id}/episodes/${id_episode}`;
    },
    HEADERS: () => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Referer': 'http://vuighe.net/anime',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    HEADERS_RERFER: (rerfer='') => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Referer': rerfer,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    }
};



class Vuighe {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }



    async searchDetail() {
        const { httpRequest, cheerio, stringHelper, qs }    = this.libs; 
        let { title, year, season, episode, type, title_vi }      = this.movieInfo;


        // if( season == 0 && type == 'tv' ) {
        //     season = title.match(/season *([0-9]+)/i);
        //     season = season != null ? +season[1] : '0';
        //     title  = title.replace(/season *[0-9]+/i, '');

        //     if( season == 0 ) {
        //         season = title.match(/ss *([0-9]+)/i);
        //         season = season != null ? +season[1] : '0';
        //         title  = title.replace(/ss *[0-9]+/i, '');
        //     }
        // }

        let videoMovieUrl  	= [];
        let arrHrefEpisode = []; 
        let videoTvshowUrl 	= false;
        let videoUrl 	   	= false;
        let detailUrl 		= [];
        let tvshowDetailUrl = false;


        let	urlSearch = URL.SEARCH(title);
        let htmlSearch 	= await httpRequest.getHTML(urlSearch, URL.HEADERS);
        let $ 			= cheerio.load(htmlSearch);

        let itemSearch 	= $('.tray-item');

        itemSearch.each(function() {

        	let hrefMovie  	= $(this).find('a').attr('href');
        	let titleMovie 	= $(this).find('.tray-item-title').text();

        	if( hrefMovie && stringHelper.shallowCompare(title, titleMovie) || stringHelper.shallowCompare(title_vi, titleMovie) ) {

        		videoTvshowUrl = URL.DOMAIN + hrefMovie;
        	}
        });


       	if( type == 'tv' && videoTvshowUrl != false ) {

       		let htmlVideo = await httpRequest.getHTML(videoTvshowUrl, URL.HEADERS);
       		let $_2 	  = cheerio.load(htmlVideo);

       		let film_id   = $_2('#filmPage').attr('data-id');

       		let domainEpisode = URL.DOMAIN_EPISODE(film_id);
       		let json_detail = await httpRequest.get(domainEpisode, URL.HEADERS_RERFER(videoTvshowUrl));

            if( json_detail.data ) {

            	json_detail = json_detail.data.data;
            	for( let item in json_detail ) {

            		let urlEpisode = URL.DOMAIN + json_detail[item].link;
            		let numberEpisode = json_detail[item].name;

            		if( numberEpisode == episode ) {

            			detailUrl = urlEpisode;
            		}
            	}
            }
       	}

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, qs, gibberish } = this.libs;
        const {type} 								  = this.movieInfo;

    	if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let vuighe   	= this;

        let htmlVideo = await httpRequest.getHTML(vuighe.state.detailUrl, URL.HEADERS_RERFER(vuighe.state.detailUrl));
        let $ 		  = cheerio.load(htmlVideo);
       	let filmId 	  = $('#filmPage').attr('data-id');
       	let episodeId  = $('#filmPage').attr('data-episode-id');

       	let url_episode = URL.DOMAIN_EMBED(filmId, episodeId);
        let json_embed  = await httpRequest.get(url_episode, URL.HEADERS_RERFER(vuighe.state.detailUrl));


        if( json_embed.data.sources ) {


            for( let item in json_embed.data.sources ) {

                if( json_embed.data.sources[item].length > 0 )  {

                    for( let item1 in json_embed.data.sources[item] ) {

                    	json_embed.data.sources[item][item1].src && hosts.push({
                            provider: {
                                url: vuighe.state.detailUrl,
                                name: "Server 10 - Vietsub"
                            },
                            result: {
                                file: json_embed.data.sources[item][item1].src,
                                label: json_embed.data.sources[item][item1].quality,
                                type: 'direct'
                            }
                        });
                    }
                }
            }
        }

        this.state.hosts = hosts;
        return;
    }



}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Vuighe({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Vuighe',
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

exports.testing = Vuighe;
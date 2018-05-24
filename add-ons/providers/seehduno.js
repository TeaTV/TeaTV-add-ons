const URL = {   
    DOMAIN: `https://seehd.uno`,
    SEARCH: (title, page=false) => {
        if( page == false ) {
            return `https://seehd.uno/?s=${title}`;
        }
        return `https://seehd.uno/page/${page}/?s=${title}`;
    }
};

class SeehdUno {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let htmlSearch  = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')));
        let $           = cheerio.load(htmlSearch.data);
        let page        = $('#paginador .paginado ul li');

        if( page.length <= 0 ) {
            page = 1;
        } else {
            page = page.last().find('a').attr('href');
            page = page.match(/\/page\/([0-9]+)/i);
            page = page != null ? +page[1] : 1;
        }

        await this.getDetailUrl(page, this.state);

        return;
    }


    async getDetailUrl(page, state) {

        const { httpRequest, cheerio, stringHelper, base64 }    = this.libs; 
        const { title, year, season, episode, type }            = this.movieInfo;

        // let arrNumber = [];
        
        // for( let i = 1; i <= page; i++ )  {

        //     arrNumber.push(i);
        // }

        // let arrPromise = arrNumber.map(async function(val) {

            let htmlSearch  = await httpRequest.getCloudflare(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), 1));
            let $           = cheerio.load(htmlSearch.data);
            let itemSearch  = $('.peliculas .items .item');

            itemSearch.each(function() {


                let hrefMovies      = $(this).find('a').attr('href');
                let yearMovies      = $(this).find('.fixyear .year').text();
                let titleMovies     = $(this).find('.fixyear h2').text();
                let seasonMovies    = titleMovies.match(/season *([0-9]+)/i);
                let episodeMovies   = titleMovies.match(/season *[0-9]+ *episode *([0-9]+)/i);
                seasonMovies 	    = seasonMovies  != null ? +seasonMovies[1]  : false;
                episodeMovies 	    = episodeMovies != null ? +episodeMovies[1] : false; 
                titleMovies         = titleMovies.replace('Watch', '').replace('Online', '').replace('Free', '').trim();
                titleMovies         = titleMovies.replace(/\([0-9]+\)/i, '').trim();

                if( seasonMovies != false && episodeMovies != false ) {

                    titleMovies = titleMovies.replace(/\– *season.*/i, '').trim();
                }
                
                if( stringHelper.shallowCompare(title, titleMovies) ) {

                    if( type == 'movie' && +yearMovies == year ) {

                        state.detailUrl = hrefMovies;
                    } else if( type == 'tv' && seasonMovies == season && episodeMovies == episode ) {
                        
                        state.detailUrl = hrefMovies;
                    }
                }
            });


            // if( val == page ) {
            //     return;
            // }

        // });

        // await Promise.all(arrPromise);
        return;        
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.getCloudflare(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail.data);
        let itemEmbed   = $('#player2 .movieplay');

        itemEmbed.each(function() {

            let script  = $(this).find('script').html();
		    let token   = script.match(/str *\= *\'([^\']+)/i);
            token 	    = token != null ? token[1] : false;
            
            if( token ) {

                token           = unescape(token.replace(/@/g,'%'));
                let linkEmbed   = token.match(/src *\= *\"([^\"]+)/i);
                linkEmbed       = linkEmbed != null ? linkEmbed[1] : false;

                linkEmbed !== false && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "seehduno"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            }
        });

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

        const httpRequest = libs.httpRequest;

    const source = new SeehdUno({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'SeehdUno',
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


exports.testing = SeehdUno;
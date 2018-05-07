URL = {
    SOURCE: `bilutv`,
    DOMAIN: "http://bilutv.com",
    HEADERS: (rerfer='') => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'bilutv.com',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    },
    SEARCH: (title) => {
        return `http://bilutv.com/tim-kiem.html?q=${encodeURI(title)}`;
    }
};



class Bilutv {




    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }


    async searchDetail() {
        const { httpRequest, cheerio, stringHelper }    = this.libs; 
        let { title, year, season, episode, type }          = this.movieInfo;

        let bilu = this;

        let link_detail = '';
        let link_watch  = '';
        let link_epsiode = '';

        let url_search      = URL.SEARCH(title);
        let html_search     = await httpRequest.getHTML(url_search, URL.HEADERS(url_search));
        let $               = cheerio.load(html_search);

        let item_page   = $('.list-film .film-item');

        item_page.each(function() {

            let status      = $(this).find('.current-status').text().toLowerCase();
            let href_detail = URL.DOMAIN + $(this).find('a').attr('href');
            let title_vi    = $(this).find('.title .name').text();
            let title_movie = $(this).find('.title .real-name').text();
            let season_movie     = title_movie.match(/season *([0-9]+)/i);
            season_movie    = season_movie != null ? +season_movie[1] : -1;
            title_movie     = title_movie.replace(/\( *season *[0-9]+ *\)/i, '').trim();
            let year_movie  = title_movie.match(/\(([0-9]+)\)/i);
            year_movie      = year_movie != null ? +year_movie[1] : 0;
            title_movie     = title_movie.replace(/\([0-9]+\)/i, '').trim();

            let status_lower        = status.trim().replace('ậ', 'a');
            
            if( stringHelper.shallowCompare(title, title_movie) ) {

                if( type == 'movie' && status_lower.indexOf('full') == -1 && status_lower.indexOf('tap') == -1 && year == year_movie ) {
                    link_detail = href_detail;
                    return;
                } else if( type == 'tv' && (status_lower.indexOf('full') != -1 || status_lower.indexOf('tap') != -1) && season == season_movie ) {
                    link_detail = href_detail;
                    return;
                }
            }
        });
        
        if( link_detail == '' ) {
            throw new Error('NOT FIND');
        }

        let html_watch = await httpRequest.getHTML(link_detail, URL.HEADERS(link_detail));
        let $_2         = cheerio.load(html_watch);

        link_watch      = URL.DOMAIN +  $_2('.film-info .poster a').attr('href');

        if( !link_watch ) {
            throw new Error('NOT lINK WATCH');
        }

        if( type == 'tv' ) {

            let html_episode = await httpRequest.getHTML(link_watch, URL.HEADERS(link_watch));
            let $_3          = cheerio.load(html_episode);

            let item_episode    =$_3('#list_episodes li');


            item_episode.each(function() {

                let number_episode = $_3(this).find('a').text();
                let href_episode   = URL.DOMAIN + $_3(this).find('a').attr('href');

                if( episode == number_episode ) {
                    link_epsiode = href_episode;
                    return;
                }
            });

            if( link_epsiode == '' ) {
                throw new Error('NOT LINK EPISODE')
            }

            link_watch = link_epsiode;
        }

        this.state.detailUrl = link_watch;
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio, qs, encrypt } = this.libs;
        const {episode, type}                     = this.movieInfo;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let bilu        = this;

        let hosts       = [];

        let playerSetting = {
            sourceLinks: [],
            modelId: ''
        };

        let html_video  = await httpRequest.getHTML(bilu.state.detailUrl, URL.HEADERS(bilu.state.detailUrl));
        let player      = html_video.match(/var *playerSetting *\=([^\$]+)/i);
        player      = player != null ? player[1] : '';

        eval(`playerSetting =  ${player}`);

        let key = `bilutv.com4590481877${playerSetting.modelId}`;
        for( let item in playerSetting.sourceLinks ) {

            for( let item1 in playerSetting.sourceLinks[item].links ) {

                let link_direct = encrypt.dec(playerSetting.sourceLinks[item].links[item1].file, key);

                if( link_direct && link_direct.indexOf('s.bilutv.com') == -1    &&
                    link_direct.indexOf('api.bilutv.com/test') == -1            && 
                    link_direct.indexOf('s5.bilutv.com') == -1 && link_direct.indexOf('api.bilutv.com/getst') == -1 )  {

                    link_direct && hosts.push({
                        provider: {
                            url: bilu.state.detailUrl,
                            name: "bilutv"
                        },
                        result: {
                            file: link_direct,
                            label: playerSetting.sourceLinks[item].links[item1].label
                        }
                    });

                }
            }
        }

        this.state.hosts = hosts;
        return;
    }

}


exports.default = async (libs, movieInfo, settings) => {

    const bilu = new Bilutv({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await bilu.searchDetail();
    await bilu.getHostFromDetail();
    return bilu.state.hosts;
}


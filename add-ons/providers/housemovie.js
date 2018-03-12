const URL = {
    DOMAIN: `http://housemovie.to`,
    SEARCH: (title) => {
        return `http://housemovie.to/search?q=${title}`
    }
};

class HouseMovies {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl       = false;

        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let htmlSearch      = await httpRequest.getHTML(urlSearch);
        let $               = cheerio.load(htmlSearch);

        let itemSearch      = $('.items_preview .main_list li');

        itemSearch.each(function() {

            let hrefMovie   = URL.DOMAIN +  $(this).find('.fig_holder').attr('href');
            let titleMovie  = $(this).find('.item_name').text();
            let yearMovie   = $(this).find('.item_ganre').text();
            yearMovie       = yearMovie.match(/([0-9]+)/i);
            yearMovie       = yearMovie != null ? +yearMovie[1] : -1;
            

            if( stringHelper.shallowCompare(title, titleMovie) && yearMovie == year ) {

                detailUrl = hrefMovie;
                return;
            }
        });

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts = [];

        let detailUrl   = this.state.detailUrl;

        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);

        let itemEmbed   = $('.btn_play');
        

        itemEmbed.each(function() {

            try {

                let token        = $(this).attr('data-player_link'); 
                let linkEmbed    = base64.decode(token);
     
                linkEmbed && hosts.push({
                     provider: {
                         url: detailUrl,
                         name: "housemovies"
                     },
                     result: {
                         file: linkEmbed,
                         label: "embed",
                         type: "embed"
                     }
                });
            } catch(error) {}

        });

        this.state.hosts = hosts;
        return;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const houseMovies = new HouseMovies({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await houseMovies.searchDetail();
    await houseMovies.getHostFromDetail();
    return houseMovies.state.hosts;
}


exports.testing = HouseMovies;
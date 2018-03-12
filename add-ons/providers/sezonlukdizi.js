const URL = {
    DOMAIN: `http://sezonlukdizi.net`,
    SEARCH: (title, episode, season) => {
        return `http://sezonlukdizi.net/${title}/${season}-sezon-${episode}-bolum.html`;
    },
    EMBED: `http://sezonlukdizi.net/ajax/dataEmbed.asp`
};

class Sezonluk {
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
        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title), season, episode);

        this.state.detailUrl= urlSearch;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64, qs } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let arrMovieId  = [];

        let detailUrl   = this.state.detailUrl;

        let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail);
        let linkEmbed   = $('#embed iframe').attr('src');

        try {

            if( linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1 ) {
                linkEmbed   = 'http:' + linkEmbed;
            }
    
            linkEmbed && hosts.push( {
                provider: {
                    url: this.state.detailUrl,
                    name: "sezonlukdizi"
                },
                result: {
                    file: linkEmbed,
                    label: "embed",
                    type: "embed"
                }
            });
        } catch(error) {}


        let itemBackup  = $('#playerMenu .menu .item');

        itemBackup.each(function() {

            let id      = $(this).attr('data-id');
            arrMovieId.push(id);
        });

        let arrPromise = arrMovieId.map(async function(val) {

            let bodyData    = qs.stringify({
                id: val
            });
            let headerData  = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            };

            try {

                let iframeHTML  = await httpRequest.post(URL.EMBED, headerData, bodyData);
                linkEmbed       = iframeHTML.data.match(/src\=\"([^\"]+)/i);
                linkEmbed       = linkEmbed != null ? linkEmbed[1] : false;

                if( linkEmbed.indexOf('http:') == -1 && linkEmbed.indexOf('https:') == -1 ) {
                    linkEmbed   = 'http:' + linkEmbed;
                }
    
                linkEmbed && hosts.push({
                    provider: {
                        url: detailUrl,
                        name: "Sezonlukdizi"
                    },
                    result: {
                        file: linkEmbed,
                        label: "embed",
                        type: "embed"
                    }
                });
            } catch(error) {}

        });

        await Promise.all(arrPromise);
        
        console.log(hosts); process.exit();

        this.state.hosts = hosts;
    }

}

exports.default = async (libs, movieInfo, settings) => {

    const sezon = new Sezonluk({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await sezon.searchDetail();
    await sezon.getHostFromDetail();
    return sezon.state.hosts;
}


exports.testing = Sezonluk;
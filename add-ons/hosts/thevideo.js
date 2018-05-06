class TheVideo {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};


    }

    async checkLive(url) {

        let { httpRequest } = this.libs;

        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.getHTML(url, {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
        });
        // if(html.includes(dieStatusText)) return true;
        return html;
    }

    convertToEmbed(url) {
        
        // convert link detail to link embed
        // if input is embed then return input

        // let id = url.match(/\/embed\-([^\-]+)/i);
        // id = url != null ? url[1] : false;

        // if( id == false ) return url;

    }

    async getLink(url) {

        const { httpRequest, cheerio } = this.libs;
        let sources = [];

        let htmlDetail = await this.checkLive(url);

        if( htmlDetail == false ) throw new Error("LINK DIE");


        let thief   = htmlDetail.match(/var *thief *\=\ *'([^\']+)/i);
        thief       = thief != null ? thief[1] : '';

        let jwConfig= `https://thevideo.website/vsign/player/${thief}`;
        let htmlJwConfig    = await httpRequest.getHTML(jwConfig);

        let vt      = htmlJwConfig.match(/jwConfig\|([^\|]+)/i);
        vt          = vt != null ? vt[1] : '';

        let linkPlay = htmlDetail.match(/sources *: *\[([^\]]+)/i);
        linkPlay = linkPlay != null ? linkPlay[1] : '';

        linkPlay = eval(`[${linkPlay}]`);
        
        let arrPromise = linkPlay.map(async function(value) {

            let linkDirect  = `${value.file}?direct=false&ua=1&vt=${vt}`;
            let isDie       = await httpRequest.isLinkDie(linkDirect);

            if( isDie != false ) {

                sources.push({
                    file: linkDirect, label: value.label, type: "embed" , size: isDie
                });
            }
            
        });

        await Promise.all(arrPromise);

        
        return {
            host: {
                url: url,
                name: "thevideo"
            },
            result: sources
        }
    }
}

exports.default = (libs, settings) => new TheVideo({ libs, settings });
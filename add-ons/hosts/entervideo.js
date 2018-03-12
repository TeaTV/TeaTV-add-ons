class EnterVideo {

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
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'entervideo.net',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
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


        let $           = cheerio.load(htmlDetail);
        let linkDirect  = $('source').attr('src');
        
        try {

            console.log(linkDirect);
            let isDie       = await httpRequest.isLinkDie(linkDirect);
    
            if( isDie != false ) {

                sources.push({
                    file: linkDirect, label: 'NOR', type: "embed" , size: isDie
                });
            }

            
            return {
                host: {
                    url: url,
                    name: "entervideo"
                },
                result: sources
            }
        } catch (error) {
            throw new Error('NOT LINK');
        }
        
    }
}

exports.default = (libs, settings) => new EnterVideo({ libs, settings });
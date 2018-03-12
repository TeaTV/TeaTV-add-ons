class ViduShare {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};

    }

    async checkLive(url) {

        let { httpRequest } = this.libs;

        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.getRedirectUrl(url);
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

        let arr     = [];
        let result  = await this.checkLive(url); 

        if( result == false ) throw new Error("LINK DIE");

        let isDie = await httpRequest.isLinkDie(result);

        if( isDie != false ) {
            arr = [
                { file: result,
                label: 'HD', type: 'direct', size: isDie }
            ];
        } else {
            arr = [];
        }

        return {
            host: {
                url: url,
                name: "vidushare"
            },
            result: sources
        }

    }
}

exports.default = (libs, settings) => new ViduShare({ libs, settings });
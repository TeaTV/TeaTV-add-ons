class Vidstreaming {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};

    }

    async checkLive(url) {

        let { httpRequest } = this.libs;

        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.getHTML(url);
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

        if(url.indexOf("//") === 0) {
            url = "http:" + url;
        }
        let sources = [];
        let html    = await this.checkLive(link);

        if( html == false ) throw new Error("LINK DIE");

        let $       = cheeri.load(html);
        let file    = $("video").attr("src");

        let isDie   = await httpRequest.isLinkDie(file);

        if( isDie != false ) {
            sources =[{ file, label: "NOR", type: 'embed', size: isDie }]; 
        }  else {
            sources = [];
        }

        return {
            host: {
                url: url,
                name: "vidstreaming"
            },
            result: sources
        }

    }
}

exports.default = (libs, settings) => new Vidstreaming({ libs, settings });
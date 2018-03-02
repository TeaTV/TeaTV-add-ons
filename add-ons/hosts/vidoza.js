class Vidoza {

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

        let sources     = [];
        let html        = await this.checkLive(url);

        if( html == false )  throw new Error("LINK DIE");

        let startIndex  = html.indexOf('jwplayer("vplayer").setup');
        html            = html.substring(startIndex);
        html            = html.substring(0, html.indexOf(".setVolume("));
        html            = html.replace('jwplayer("vplayer").setup', "player = ");
        html            += ";";

        var player;
        eval(html);
        let data = player.sources;

        let arrPromise = data.map( async val => {
            
            let isDie = await httpRequest.isLinkDie(val.file);

            if( isDie != false ) {

                sources.push({
                    label: val.file.indexOf("mp4") !== -1 ? val.label : "NOR",
                    file: val.file,
                    type: "embed",
                    size: isDie
                });
            }
        

        });

        await Promise.all(arrPromise);

        return {
            host: {
                url: url,
                name: "vidoza"
            },
            result: sources
        }

    }
}

exports.default = (libs, settings) => new Vidoza({ libs, settings });
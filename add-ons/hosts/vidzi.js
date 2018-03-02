class Vidzi {

    constructor(props) {

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};

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

        let sources = [];
        let temp    = [];
        let html    = await this.checkLive(url);

        if( html == false ) throw new Error("LINK DIE");

        html = html.substring(html.indexOf('jwplayer("vplayer").setup({'));
        html = html.substring(0, 3 + html.indexOf("});"));
        html = html.replace('jwplayer("vplayer").setup', "player = ");
        var player;

        try {
            eval(html);
        }catch(e) {

            return {
                host: {
                    url: url,
                    name: "vidzi"
                },
                result: []
            }
        }
        
        let data = player.sources;

        data.map(val => {
        
            temp.push({
                label: val.file.indexOf("mp4") !== -1 ? "NOR" : "NOR",
                file: val.file,
                type: "embed"
            });
        });

        let arrPromise = temp.map(async function(val) {

            let isDie = await httpRequest.isLinkDie(val.file);

            if( isDie != false )  {
                val.size = isDie;
                sources.push(val);
            }
        });

        await Promise.all(arrPromise);

        return {
            host: {
                url: url,
                name: "vidzi"
            },
            result: sources
        }

    }
}

exports.default = (libs, settings) => new Vidzi({ libs, settings });
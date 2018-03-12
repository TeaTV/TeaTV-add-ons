class VidLink {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};

    }

    async checkLive(id) {

        let { httpRequest, qs } = this.libs;

        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.post(`http://vidlink.org/streamdrive/info/${id}`, {}, {
            browserName: "Chrome",
            platform: "MacIntel" 
        });
        html = html.data;
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

    async getRedirect(url) {

        const { httpRequest } = this.libs;

        return [{
            file: url,
            label: "HD",
            type: "embed",
            size: ""
        }];

    } 

    async getEmbed(url) {

        const { httpRequest, cheerio } = this.libs;

        let sources     = [];
        let temp        = [];

        let urlParts    = url.split("/");
        let id          = urlParts[urlParts.length - 1];

        try {

            let postResponse = await this.checkLive(id);

            if( postResponse == false )  throw new Error("LINK DIE");

            for( let item in postResponse ) {

                if( postResponse[item].type == 'video/mp4' ) {
                    temp.push(postResponse[item].url);
                }
                
            }

            let arrPromise = temp.map(async function(val) {

                try {

                    let isDie = await httpRequest.isLinkDie(val);
    
                    if( isDie != false )  {
                        sources.push({
                            file: val, label: 'NOR', type: "direct" , size: isDie
                        });
                    }
                } catch(error) {}
                
            });
    
            await Promise.all(arrPromise); 

            return sources;
            

        } catch(err) {
            throw new Error(err)
        }
    }

    async getLink(url) {

        const { httpRequest, cheerio } = this.libs;

        let sources = [];

        if( url.includes('redirect') ) {
           
            sources = await this.getRedirect(url);
            return {
                host: {
                    url: url,
                    name: "vidlink"
                },
                result: sources
            } 
        } else {

            sources = await this.getEmbed(url);
            return {
                host: {
                    url: url,
                    name: "GoogleVideo"
                },
                result: sources
            }
        }
        
    }
}

exports.default = (libs, settings) => new VidLink({ libs, settings });
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

        let sources = [];
        let temp    = [];

        let urlParts = url.split("/");
        let id = urlParts[urlParts.length - 1 ];
        try {

            let postResponse = await this.checkLive(id);

            if( postResponse == false )  throw new Error("LINK DIE");

            let { data } = postResponse;

            let resultArr = data.map((val, index) => {
                if(val.status == 403) throw new Error("NOT LINK");

                temp.push({
                    file: val.url,
                    label: "HD",
                    type: "embed" 
                });

            }).filter(val => val !== undefined);

            let arrPromise = temp.map(async function(val) {

                let isDie = await httpRequest.isLinkDie(val.file);
    
                if( isDie != false )  {
                    val.size = isDie;
                    sources.push(val);
                }
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
                    name: "vidlink"
                },
                result: sources
            }
        }


    }
}

exports.default = (libs, settings) => new VidLink({ libs, settings });
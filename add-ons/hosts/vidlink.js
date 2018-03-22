class VidLink {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};

    }

    async checkLive(url) {

        let { httpRequest, qs } = this.libs;

        let htmlDetail  = await httpRequest.getHTML(url);
        let actionToken = htmlDetail.match(/\'action\'\: *\'([^\']+)/i);        
        actionToken     = actionToken != null ? actionToken[1] : '';
        actionToken     = actionToken.trim();


        let urlParts    = url.split("/");
        let id          = urlParts[urlParts.length - 1];

        let headers = {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'content-length': '144',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://vidlink.org',
            'referer': url,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest'
        }

        let bodys = {
            browserName: "Chrome",
            platform: "MacIntel",
            postID: id,
            action: actionToken
        }


        let html = await httpRequest.post(`https://vidlink.org/streamdrive/info/${id}`, headers, qs.stringify(bodys));

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

        

        try {

            let postResponse = await this.checkLive(url);

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

        if( url.indexOf('redirect') != -1 ) {
            
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
class OK_RU {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};
    }

    async checkLive(url) {

        let { httpRequest } = this.libs;

        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.getCloudflare(url);
        html     = html.data;
        // if(html.includes(dieStatusText)) return true;
        return html;
    }

    convertToEmbed() {
        
        // convert link detail to link embed
        // if input is embed then return input
    }

    async getLink(url) {
        
        const { httpRequest, cheerio } = this.libs;

        let html    = await this.checkLive(url);
        if( html == false ) throw new Error("LINK DIE");

        try {

            let results = [];
            let $       = cheerio.load(html);
            let script  = $('.vp_video div[data-module=OKVideo]').attr('data-options');
            script      = JSON.parse(script);
            let videos  = script.flashvars.metadata;
            videos      = JSON.parse(videos);
            videos      = videos.videos;
    
            if( videos.length > 0 ) {
    
                let arrPromise = videos.map(async (val) => {
    
                    let isDie       = await httpRequest.isLinkDie(val.url);
    
                    if( isDie != false ) {

                        results.push({
                            file: val.url, label: val.name, type: "embed" , size: isDie
                        });
                    }
                });
    
                await Promise.all(arrPromise);
            }
    
    
            return {
                host: {
                    url: url,
                    name: "ok-ru"
                },
                result: results
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}

exports.default = (libs, settings) => new OK_RU({ libs, settings });
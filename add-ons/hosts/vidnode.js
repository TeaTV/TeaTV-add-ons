class Vidnode {

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
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
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
        let arrDirect   = [];

        let htmlDetail = await this.checkLive(url);

        if( htmlDetail == false ) throw new Error("LINK DIE");

        
        let linkDirect  = htmlDetail.match(/playerInstance\.setup\(\{\s*sources\: *\[([^\]]+)/i);
        linkDirect      = linkDirect != null ? linkDirect[1] : '';
        let linkcdn     = htmlDetail.match(/playerInstance\.load\(\{\s*file *\: *\"([^\"]+)/i);
        linkcdn         = linkcdn != null ? linkcdn[1] : '';

        let size = false;
        try {
            size = await httpRequest.isLinkDie(linkcdn);
        } catch(e) {
            size = false;
        }

        if( size != false && size != 'NOR' && size != NaN ) {
            sources.push({
                file: linkcdn, label: val.label, type: "embed" , size: size
            });
        }


        eval(`arrDirect = [${linkDirect}]`);

        let arrPromise = arrDirect.map(async function(val) {

            let isDie = false;
            try {
                isDie       = await httpRequest.isLinkDie(val.file);
            } catch(e) {
                isDie = 'NOR';
            }
            

            if( isDie != false && isDie != 'NOR' ) {

                sources.push({
                    file: val.file, label: val.label, type: "embed" , size: isDie
                });
            }
        });


        await Promise.all(arrPromise);
        
        return {
            host: {
                url: url,
                name: "vidnode"
            },
            result: sources
        }
    }
}

exports.default = (libs, settings) => new Vidnode({ libs, settings });
class Teamdk {

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
        var arrLink = [];

        let htmlDetail  = await this.checkLive(url);

        if( htmlDetail == false )throw new Error("LINK DIE");

        let linkPlay    = htmlDetail.match(/sources: \[([^\]]+)/i);
        linkPlay        = linkPlay != null ? linkPlay[1] : false;

        if( linkPlay != false ) {

            linkPlay = `arrLink = [${linkPlay}]`;
            eval(linkPlay);
            
            if( arrLink.length > 0 ) {
        
                let arrPromise = arrLink.map(async function(value) {
                    
                    let isDie = await httpRequest.isLinkDie(value.file);

                    if( isDie != false ) {

                        sources.push({
                            label: value.label,
                            file: value.file,
                            type: "embed",
                            size: isDie
                        });
                    }
                    
                });

                await Promise.all(arrPromise);
                
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
}

exports.default = (libs, settings) => new Teamdk({ libs, settings });
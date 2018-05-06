class Openload {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};
    }

    // async getOpenload(url) {

    //     const { httpRequest, jsdom }    = this.libs;
    //     const { JSDOM }                 = jsdom;
    //     const jqueryUrl                 = "http://code.jquery.com/jquery-1.11.0.min.js";
    //     let html                        = await httpRequest.getHTML(url);

    //     if (html.indexOf('<h3>We’re Sorry!</h3>') > -1) throw new Error("Invalid fileId");


    //     let jquery  = await httpRequest.getHTML(jqueryUrl);
    //     const dom   = new JSDOM(html, {
    //         runScripts: "outside-only"
    //     });

    //     const window = dom.window;
    //     window.eval(jquery);

    //     var script = html.substring(html.indexOf("ﾟωﾟﾉ= /｀ｍ´"));
    //     script = script.substring(0, script.indexOf("</script>"));
    //     window.eval(script);
    //     script = script.substring(script.indexOf("$(document)"));
    //     script = script.substring(script.indexOf("var"))
    //     script = script.substring(0, script.indexOf("ﾟωﾟ"))
    //     script = script.substring(0, script.lastIndexOf("});"))
    //     script = script.replace("document.createTextNode.toString().indexOf('[native code')", "1");
    //     script = script.replace("_0x3d7b02=[];", "");
    //     window.eval(script);

    //     let streamUrl   = window.document.getElementById("streamurj").innerHTML;
    //     let opl         = "https://openload.co/stream/" + streamUrl + "?mime=true";
    //     let isDie       = await httpRequest.isLinkDie(opl);

    //     if( isDie == false ) throw new Error("NOT LINK");
    //     return {
    //         host: {
    //             url: url,
    //             name: "openload"
    //         },
    //         result: [{ file: opl, label: "NOR", type: "embed", size: isDie }]
    //     }
    // }
    
    async checkLive(url)  {
    
        let { httpRequest } = this.libs;
    
        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.getHTML(url);
        // if(html.includes(dieStatusText)) return true;
        return html;
    }
    
    async getUsingAPI (url) {
    
        const { httpRequest, cryptoJs } = this.libs;
    
        let html = false;
        try {
            html                      = await this.checkLive(url);
        } catch(error) {
            throw new Error("LINK DIE");
        }
    
        const token         = cryptoJs.MD5(html + "teatv-openload").toString();
        const apiResponse   = await httpRequest.post("https://api.teatv.net/api/v2/get_opl", {
            "Content-Type": "application/json"
        }, JSON.stringify({
            data: html,
            token: token
        }));
    
        // let isDie = await httpRequest.isLinkDie(apiResponse.data.data);
        // if( isDie == false ) throw new Error("LINK DIE");
        
        const { status, data, error } = apiResponse.data;
        if(error) throw new Error(error);
        if(status == 200) {

            let isDie = false;
            try {
                isDie       = await httpRequest.isLinkDie(data);
            } catch(error) {}
            if( isDie == false ) throw new Error("NOT LINK");

            return {
                host: {
                    url: url,
                    name: "openload"
                },
                result: [{ file: data, label: "NOR", type: "embed", size: isDie }]
            }
        }
        
    }
    convertToEmbed() {
        
        // convert link detail to link embed
        // if input is embed then return input
    }

    async getLink(url) {

        const { httpRequest, cheerio } = this.libs;

        try {
            let data = await this.getUsingAPI(url);

            return data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

exports.default = (libs, settings) => new Openload({ libs, settings })
class RapidVideo {

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

    convertToEmbed() {
        
        // convert link detail to link embed
        // if input is embed then return input
    }

    async getLink(url) {
        
        const { httpRequest, cheerio } = this.libs;

        let arrVideoQuality     = [];
        let results             = [];
        let html                = await this.checkLive(url);

        if( html == false ) throw new Error("LINK DIE");

        let $                   = cheerio.load(html);
        
        try {

            let quality = $('div[style*="height:23px; width:100%; margin:0 auto; color:#FFF; font-size:14px; line-height:23px; border-top:1px solid #0f0f0f;"]').find('a');

            quality.each(function() {

                let linkQuality = $(this).attr('href');
                arrVideoQuality.push(linkQuality);
            });


            let arrPromise = arrVideoQuality.map(async function(val) {

                let label       = val.match(/\&q\=(.+)/i);
                label           = label != null ? label[1] : 'NOR';

                let htmlDirect  = await httpRequest.getHTML(val); 
                let $           = cheerio.load(htmlDirect);
                let linkDirect  = $('#videojs source').attr('src');
                let isDie       = await httpRequest.isLinkDie(linkDirect);
    
                if( isDie != false ) {

                    results.push({
                        file: linkDirect, label: label, type: "embed" , size: isDie
                    });
                 }
            });


            await Promise.all(arrPromise);

            return {
                host: {
                    url: url,
                    name: "rapidvideo"
                },
                result: results
            }
        
        } catch(error) {
            throw new Error(error);
        }
    }
}

exports.default = (libs, settings) => new RapidVideo({ libs, settings });
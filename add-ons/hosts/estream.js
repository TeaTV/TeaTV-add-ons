class Estream {

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

        let html    = await this.checkLive(url);

        if( html == false ) throw new Error("LINK DIE");

        let $       = cheerio.load(html);
        let sources = [];
        let temp    = [];

        $("video source").each(function() {
            var label =
            $(this).attr("type") !== "video/mp4"
                ? "NOR"
                : $(this).attr("res") === "854x480" ? "480p" : "360p";

            temp.push({
                label: label,
                file: $(this).attr("src"),
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
                name: "estream"
            },
            result: sources
        }
    }
}

exports.default = (libs, settings) => new Estream({ libs, settings });
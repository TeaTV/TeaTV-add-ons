class CloneMe {

    constructor(props) {

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    async checkLive(url) {

        let { httpRequest } = this.libs;

        // you fill the die status text
        const dieStatusText = "";
        let html = await httpRequest.getHTML(url);
        if(html.includes(dieStatusText)) return true;
        return html;
    }

    convertToEmbed(url) {

        // convert link detail to link embed
        // if input is embed then return input
        return url;
    }

    async getLink(url) {

        const { httpRequest, cheerio } = this.libs;
        let html = await checkLive(url);
        if(html === false) throw new Error("LINK DIE");
        // your code here
    }
}

module.exports = (lib, settings) => new CloneMe({ lib, settings });
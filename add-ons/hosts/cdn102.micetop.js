class Micetop {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};
    }

    convertToEmbed() {
        
        // convert link detail to link embed
        // if input is embed then return input
    }

    async getLink(url) {

        const { httpRequest, cheerio } = this.libs;
        
        let results = [];
        let isDie   = 'NOR';

        try {
            isDie       = await httpRequest.isLinkDie(url);
        } catch(error) {}
    
        if( isDie != false && isDie != 'NOR' ) {

            results.push({
                file: url, label: 'NOR', type: "direct" , size: isDie
            });
        }

        return {
            host: {
                url: url,
                name: "CDN"
            },
            result: results
        }

    }
}

exports.default = (libs, settings) => new Micetop({ libs, settings });
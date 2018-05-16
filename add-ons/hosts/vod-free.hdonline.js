class VodFree {

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

        url = url.replace(/\?pi=.*/i, '');

        let isDie = 'NOR';
        try {
            isDie       = await this.isLinkDie(url);
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

    async isLinkDie(url) {

    	const {converter} = this.libs;

        let sizeMb     = await this.getFileSize(url);
        
        try {

            sizeMb = converter(+sizeMb, 'MB', 'GB');
            sizeMb = parseFloat(+sizeMb).toFixed(2);

            return sizeMb;
        } catch(e) {

            return false;
        }
    }

    async getFileSize(url) {

    	const { axios } = this.libs;

        let res = await axios.head(url);
        return res.headers["content-length"];
    }
}

exports.default = (libs, settings) => new VodFree({ libs, settings });
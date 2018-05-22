class ToCloud {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};
    }

    async checkLive(url) {

        let { httpRequest } = this.libs;


        let html = await httpRequest.getHTML(url);
        let sources = html.match(/sources *\: *([^\]]+)/i);
        sources 	= sources != null ? sources[1] + ']' : false;

        if( sources == false ) return false;


        eval(`sources = ${sources}`);


        return sources;
    }

    convertToEmbed() {
        
        // convert link detail to link embed
        // if input is embed then return input
    }

    async getLink(url) {
        
        const { httpRequest, cheerio } = this.libs;

        let arrVideoQuality     = [];
        let results             = [];
        let jsonDirect                = await this.checkLive(url);

        if( jsonDirect == false ) throw new Error("LINK DIE");

        
        try {


        	let arrPromise = jsonDirect.map(async (val) => {

        		let isDie = 'NOR';
		        try {
		            isDie       = await httpRequest.isLinkDie(val.file);
		        } catch(error) {}
		    
		        if( isDie != false && isDie != 'NOR' ) {

		            results.push({
		                file: val.file, label: 'NOR', type: "direct" , size: isDie
		            });
		        }
        	});

            await Promise.all(arrPromise);

            return {
                host: {
                    url: url,
                    name: "Cloud"
                },
                result: results
            }
        
        } catch(error) {
            throw new Error(error);
        }
    }
}

exports.default = (libs, settings) => new ToCloud({ libs, settings });
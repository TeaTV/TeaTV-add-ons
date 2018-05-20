class UploadHeaven {

    constructor(props) {

        this.libs       = props.libs;
        this.settings   = props.settings;
        this.state      = {};
    }

    async checkLive(url) {

        let { httpRequest, cheerio } = this.libs;


        let urlPost = 'https://uploadhaven.com/video/getSource';
        let headers = {
        	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        	'content-type': 'application/json;charset=UTF-8',
        	'accept': 'application/json, text/plain, */*',
        	'authority': 'uploadhaven.com',
        	'referer': url
        };

        try {

        	let html = await httpRequest.getHTML(url);
	        let token = html.match(/\'token\' *\: *\'([^\']+)/i);
	        token     = token != null ? token[1] : false;

	        if( token == false ) return false;

	       	let jsonEmbed = await httpRequest.post(urlPost, headers, {
	       		referrer: '',
	       		token: token
	       	});
	       	jsonEmbed 	= jsonEmbed.data;

	       	jsonEmbed = jsonEmbed.source;
	       	return jsonEmbed;
        } catch(error) {
        	return false;
        }

    }

    convertToEmbed() {
        
        // convert link detail to link embed
        // if input is embed then return input
    }

    async getLink(url) {
        
        const { httpRequest, cheerio } = this.libs;

        let results = [];
        let embed    = await this.checkLive(url);

        if( embed == false ) throw new Error("LINK DIE");

        try {

        	let isDie       = await httpRequest.isLinkDie(embed);
    
            if( isDie != false ) {

                results.push({
                    file: embed, label: "embed", type: "embed" , size: isDie
                });
            }
    
    
            return {
                host: {
                    url: url,
                    name: "Stream"
                },
                result: results
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}

exports.default = (libs, settings) => new UploadHeaven({ libs, settings });
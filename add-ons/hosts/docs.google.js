const URL = {
    INFO : (id) => {
        return `https://docs.google.com/get_video_info?docid=${id}&authuser=0`;
    }
};


class Google {

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
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'docs.google.com',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
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

        const { httpRequest, cheerio, qs } = this.libs;
        let sources         = [];
        let listEncode      = false;

        let id      = url.match(/\/d\/([^\/]+)/i);
        id          = id != null ? id[1] : '';

        let resultText = await this.checkLive(URL.INFO(id));
        resultText      = qs.parse(resultText);
        let { fmt_stream_map, status } = resultText;

        let listLink = fmt_stream_map.split(",");
        for (let i = 0; i < listLink.length; i++) {
            if (listLink[i].indexOf("18|") == 0) {
                sources.push({
                    type: "embed",
                    size: 'NOR',
                    label: "360p",
                    file: decodeURIComponent(listLink[i].substring(3))
              });
            }
            if (listLink[i].indexOf("22|") == 0) {
                sources.push({
                    type: "embed",
                    size: 'NOR',
                    label: "720p",
                    file: decodeURIComponent(listLink[i].substring(3))
              });
            }

            if (listLink[i].indexOf("59|") == 0) {
                sources.push({
                    type: "embed",
                    size: 'NOR',
                    label: "480p",
                    file: decodeURIComponent(listLink[i].substring(3))
              });
            }
            if (listLink[i].indexOf("37|") == 0) {
                sources.push({
                    type: "embed",
                    size: 'NOR',
                    label: "1080p",
                    file: decodeURIComponent(listLink[i].substring(3))
              });
            }
          }
        

          return {
            host: {
                url: url,
                name: "GoogleVideo"
            },
            result: sources
        } 

    }
        
}

exports.default = (libs, settings) => new Google({ libs, settings });

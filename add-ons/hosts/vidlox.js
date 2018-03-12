class VidLox {

    constructor(props) {

        this.libs     = props.libs;
        this.settings = props.settings;
        this.state    = {};

    }


    async checkLive(url) {

        let { httpRequest } = this.libs;

        // you fill the die status text
        // const dieStatusText = "";
        let html = await httpRequest.getHTML(url);

        if (html.includes("Video Was Deleted")) {
          return false;
        }
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

        let newUrl = url;

        if (!newUrl.includes("embed")) {

          // https://vidlox.tv/vunb9b0ihb8d
          let _parts                = newUrl.split("/");
          _parts[_parts.length - 1] = "embed-" + _parts[_parts.length - 1];
          newUrl                    = _parts.join("/");
        }
        let html = await this.checkLive(newUrl);

        if( html == false ) throw new Error("LINK DIE");

        html    = html.substring(html.indexOf("var player = new Clappr.Player"));
        html    = html.substring(0, 3 + html.indexOf("});"));

        var ClapprThumbnailsPlugin  = "",
          LevelSelector             = "",
          thumbs                    = "",
          ClapprSubtitle            = "";

        html = html.replace("new Clappr.Player", "");
        html = html.replace("var player", "player");
        var player;
        eval(html); // player
        let result;

        if (!player.sources.length > 0)
          result = [{ label: "Error", file: "Link dead" }];
        if (player.sources.length === 2) {
          result = [{ label: "NOR", file: player.sources[1], type: 'embed', size: 'NOR' }];
        }

        if (player.sources.length === 3) {
            
          result = [
            { label: "NOR", file: player.sources[2], type: 'embed', size: 'NOR'  },
            { label: "SD", file: player.sources[1], type: 'embed', size: 'NOR'  }
          ];
        }

        return {
            host: {
                url: url,
                name: "vidlox"
            },
            result: result
        }


    }
}

exports.default = (libs, settings) => new VidLox({ libs, settings });
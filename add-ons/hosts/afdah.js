let END_OF_INPUT = -1;
let arrChrs = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/");
let reversegetFChars = new Array;
for (let i = 0; i < arrChrs.length; i++) {
    reversegetFChars[arrChrs[i]] = i
}
let getFStr;
let getFCount;

function ntos(e) {
    e = e.toString(16);
    if (e.length == 1) e = "0" + e;
    e = "%" + e;
    return unescape(e)
}

function readReversegetF() {
    if (!getFStr) return END_OF_INPUT;
    while (true) {
        if (getFCount >= getFStr.length) return END_OF_INPUT;
        let e = getFStr.charAt(getFCount);
        getFCount++;
        if (reversegetFChars[e]) {
            return reversegetFChars[e]
        }
        if (e == "A") return 0
    }
    return END_OF_INPUT
}

function readgetF() {
    if (!getFStr) return END_OF_INPUT;
    if (getFCount >= getFStr.length) return END_OF_INPUT;
    let e = getFStr.charCodeAt(getFCount) & 255;
    getFCount++;
    return e
}

function setgetFStr(e) {
    getFStr = e;
    getFCount = 0
}

function getF(e) {
    setgetFStr(e);
    let t = "";
    let n = new Array(4);
    let r = false;
    while (!r && (n[0] = readReversegetF()) != END_OF_INPUT && (n[1] = readReversegetF()) != END_OF_INPUT) {
        n[2] = readReversegetF();
        n[3] = readReversegetF();
        t += ntos(n[0] << 2 & 255 | n[1] >> 4);
        if (n[2] != END_OF_INPUT) {
            t += ntos(n[1] << 4 & 255 | n[2] >> 2);
            if (n[3] != END_OF_INPUT) {
                t += ntos(n[2] << 6 & 255 | n[3])
            } else {
                r = true
            }
        } else {
            r = true
        }
    }
    return t
}

function tor(txt) {
    let map = []
    let tmp = "abcdefghijklmnopqrstuvwxyz"
    let buf = ""
    for (j = 0; j < tmp.length; j++) {
        let x = tmp.charAt(j); let y = tmp.charAt((j + 13) % 26)
        map[x] = y; map[x.toUpperCase()] = y.toUpperCase()
    }
    for (j = 0; j < txt.length; j++) {
        let c = txt.charAt(j)
        buf += (c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' ? map[c] : c)
    }
    return buf
}


const decrypt = (e) => {
    var code = unescape(getF(tor((getF(e)))));
    return code;
}

class Afdah {

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
            'User-Agent':' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
        });
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

        let decryp  = html.match(/decrypt\(\"([^\"]+)/i);
        decryp      = decryp != null ? decryp[1] : '';


        decryp      = decrypt(decryp);
        decryp      = decryp.match(/sources *: *\[([^\]]+)/i);
        decryp      = decryp != null ? decryp[1] : '';


        if( decryp != '' ) {
            
            let sources = [];
        
            decryp          = eval(`[${decryp}]`);

            let arrPromise  =  decryp.map( async function(value) {
                
                let isDie = await httpRequest.isLinkDie(value.file);
                
                if( isDie != false ) {

                    sources.push({
                        label: 'NOR',
                        file: value.file,
                        type: "embed",
                        size: (Math.random() * (2.2 - 1.9) + 1.9).toFixed(2)
                    });
                }
    
            });

            await Promise.all(arrPromise);
            
            return {
                host: {
                    url: url,
                    name: "afdah"
                },
                result: sources
            } 
      
        }

    }
}

exports.default = (libs, settings) => new Afdah({ libs, settings });
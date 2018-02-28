require('cross-fetch/polyfill');
const cloudscraper  = require('cloudscraper');
const axios         = require('axios');
const StringDecoder = require('string_decoder').StringDecoder;
const converter     = require('byte-converter').converterBase2;

class Request {
    constructor() {
        this.request = fetch;
    }

    async getHTML(url, headers) {
        try {
            let response = await fetch(url, { headers });
            let html = await response.text();
            return html;
        } catch(err) {
            throw new Error(err);
        }
        
    }

    async getJSON(url, headers) {
        try {
            let response = await fetch(url, { headers });
            let json = await response.json();
            return json;
        } catch(err) {
            throw new Error(err);
        }
    }

    async get(url, headers={}) {
        try {
            let response = await fetch(url, { headers });
            let textOrJSONString = await response.text();
            try {
                textOrJSONString = JSON.parse(textOrJSONString);
            }catch(e) {}
            
            return {headers: response.headers._headers,data: textOrJSONString};
        } catch(err) {
            throw new Error(err);
        }
        return {headers: {}, data: {}};
    }


    async getHeader(url) {
        try {

            let response = await fetch(url); 
            return response.headers._headers;
        } catch(e) {
            return {};
        }
    }

    async post(url, headers={}, bodyString) {
        try {
            let response = await fetch(url, { 
                method: "POST",
                headers: headers,
                body: bodyString
            });

            let textOrJSONString = await response.text();

            try {
                textOrJSONString = JSON.parse(textOrJSONString);
            }catch(e) {}
            
            return {headers: response.headers._headers ,data: textOrJSONString};
        } catch (err) {
            throw new Error(err);
        }
        return {headers: {}, data: {}};
    }

    async getRedirectUrl(url) {
        try {
            let response = await axios.request({
                url: url,
                method: 'head',
                headers: {
                    Range: `bytes=0-0`
                },
                maxRedirects: 0
            });
            let { request } = response;
            if(request == undefined) return false;
            // let url = request.res.headers.location;
            return request.responseURL;
            
        } catch(err) {
            // dont know why it's in error for nodejs

            let { request } = err;
            if(request == undefined) return false;
            let url = request.res.headers.location;

            return url;
        }
    }

    getCloudflare(url, headers){

        return new Promise((resolve, reject) => {
            cloudscraper.request({
                    method: 'GET',
                    url: url,
                    encoding: 'utf8'
                }, function(err, response, body) {
                    let textOrJSONString = body;

                    try {
                        textOrJSONString = JSON.parse(body);
                    } catch(parseError) {}

                    return resolve({ headers: response.headers, data:textOrJSONString });
                }
            )
        })
    }

    postCloudflare(url, headers, bodyString) {
        return new Promise((resolve, reject) => {
            cloudscraper.post(url, bodyString,
                function(err, response, body) {
                    let textOrJSONString = body;
                    try {
                        textOrJSONString = JSON.parse(body);
                    } catch(parseError) {}
                    return resolve({ headers: headers, data: textOrJSONString });
                }
            )
        })
    }

    async isLinkDie(url) {

        let headers     = await this.getHeader(url);
        let contentType = headers['content-type'][0];
        const size      = headers['content-length'][0];

        try {

            if( contentType.indexOf('video') == -1 && contentType.indexOf('mp4') == -1 ) return false;

            let sizeMb      = converter(+size, 'B', 'MB');

            if( sizeMb <= 20 ) return false;
            sizeMb = parseInt(+sizeMb);  
            if( sizeMb >= 1000 ) {
                sizeMb = converter(+size, 'B', 'GB');
                sizeMb = parseFloat(+sizeMb).toFixed(2);
                return `${sizeMb} GB`;
            }
            
            return parseFloat(+sizeMb).toFixed(2) + ' MB';
        } catch(e) {
            return false;
        }
         
    }
}

module.exports = exports.default = new Request();
require('cross-fetch/polyfill');
const cloudscraper      = require('cloudscraper');
const axios             = require('axios');
const StringDecoder     = require('string_decoder').StringDecoder;
const converter         = require('byte-converter').converterBase2;
const remoteFileSize    = require('remote-file-size');
const qs                = require('qs');

const parseHeaderBody = (headers, body) => {
    let result = {
        headers: headers || {},
        body: body
    };
    let contentType = result.headers["content-type"] || result.headers["Content-Type"];

    if(contentType == undefined) {
        result.headers["content-type"] = "application/x-www-form-urlencoded";
        result.body = typeof body === 'object' ? qs.stringify(body) : body;
        return result;
    }

    if(contentType.includes("x-www-form-urlencoded")) {
        result.body = typeof body === 'object' ? qs.stringify(body) : body;
        return result;
    }

    if(contentType.includes("json")) {
        result.body = typeof body === 'object' ? JSON.stringify(body) : body;
        return result;
    }

}

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
            
            return {headers: response ? response.headers._headers : {},data: textOrJSONString};
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

    async post(url, headers={}, body) {
        let parsed = parseHeaderBody(headers, body);
        try {

            let response = await fetch(url, { 
                method: "POST",
                headers: parsed.headers,
                body: parsed.body
            });

            let textOrJSONString = await response.text();

            try {
                textOrJSONString = JSON.parse(textOrJSONString);
            }catch(e) {}
            
            return {headers:  response ? response.headers._headers : {}  ,data: textOrJSONString};
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

    getCloudflare(url, headers=false){

        return new Promise((resolve, reject) => {

            let options = {
                method: 'GET',
                url: url,
                encoding: 'utf8'
            };

            if( headers != false ) {
                options.headers = headers;
            } 

            cloudscraper.request(options, function(err, response, body) {
                    let textOrJSONString = body;

                    try {
                        textOrJSONString = JSON.parse(body);
                    } catch(parseError) {}

                    
                    return resolve({ headers: response ? response.headers : {}, data:textOrJSONString });
                }
            )
        })
    }


    redirectCloudflare(url){

        return new Promise((resolve, reject) => {
            cloudscraper.request({
                    method: 'GET',
                    url: url,
                    encoding: 'utf8'
                }, function(err, response, body) {
                    return resolve(response);
                }
            )
        })
    }

    postCloudflare(url, headers, body) {
        let parsed = parseHeaderBody(headers, body);
        return new Promise((resolve, reject) => {
            const options = {
                url: url,
                method: "POST",
                headers: parsed.headers,
                body: parsed.body
            };
            cloudscraper.request(options,
                function(err, response, resBody) {
                    let textOrJSONString = resBody;
                    try {
                        textOrJSONString = JSON.parse(resBody);
                    } catch(parseError) {}
                    return resolve({ headers: headers, data: textOrJSONString });
                }
            );
        })
    }

    async isLinkDie(url) {

        if( url.indexOf('.m3u') != -1 ) return "NOR";

        let size     = await this.getFileSize(url);
        
        try {

            let sizeMb      = converter(+size, 'B', 'MB');

            if( sizeMb <= 20 ) return false;

            sizeMb = parseInt(+sizeMb);  
            sizeMb = converter(+size, 'B', 'GB');
            sizeMb = parseFloat(+sizeMb).toFixed(2);
            return sizeMb;
        } catch(e) {

            return false;
        }
    }

    getFileSize(url) {

        return new Promise((relsove, reject) => {

            remoteFileSize(url, function(err, size) {

                if( err ) reject(err);
                relsove(size);
            });
        });
    }
}

module.exports = exports.default = new Request();
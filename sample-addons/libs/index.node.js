module.exports = exports.default = {
    cheerio         : require('cheerio-without-node-native'),
    jsdom           : require('jsdom'),
    httpRequest     : require('./http_request/request.node'),
    cryptoJs        : require('crypto-js'),
    _               : require('lodash'),
    axios           : require('axios'),
    stringHelper    : require('./string_helper'),
    base64          : require('base-64'),
    remoteFileSize  : require('remote-file-size'),
    qs              : require('qs')
};

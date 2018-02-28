## Host add-ons structure

each host add-on has to be in one file, and it `module.exports` a function that return an `object`

```javascript
module.exports = (lib, settings) => {

    return {
        checkLive: async function (url) {},
        convertToEmbed: function(url) {},
        getLink: async function(url) {}     
    }
}
```

Input:
- `libs`: our provided libs (more in detail below)

- `settings`: `object`
    + `platform`: `string`, one of { `nodejs`, `android`, `ios` }
    + any other data add-on required

Output: `object`
- `checkLive`: `function`
    + input: `string`
    + output: `Promise`
        + `.then`: `callback function`
            + input: `false` when link dies, `html string` when link lives
        + `.catch`: `error`
- `convertToEmbed`: `function`
    + input: `string`
    + output: `string`
- `getLink`: `function`
    + input: `string`
    + output: `Promise`
        + `.then`: `callback function`
            + input: `object`
                + host: `object`
                    + `url`: `string`
                    + `name`: `string`
                + result: `array of objects`
                    + `label`: `string`, one of { `SD`, `HD`, `360p`, `480p`, `720p`, `NOR` } (use `NOR` when dont have any information)
                    + `file`: `string` (url)
                    + `size`: `string` (return `NOR` if can't get `size`)
        + `.catch`: `error` when get links error

We recommend you to use class, and in this class, we're gonna have method `checkLive`, `convertToEmbed`, `getLink`

```javascript
module.exports = (lib, settings) => new CloneMe({ lib, settings });
```

## Provider add-ons structure

each host add-on has to be in one file, and it `module.exports` a function that return a `Promise`

```javascript
module.exports = async (libs, movieInfo, settings) => {

    // your code here
    return array;
}
```

Input:
- `libs`: our provided libs (more in detail below)

- `movieInfo`: `object`
    + `type`: `string`, one of {  `movie`, `tv`, `anime` }
    + `title`: `string`
    + `year`: `number`
    + `season`: `number`
    + `episode`: `number`

- `settings`: `object`
    + `platform`: `string`, one of { `nodejs`, `android`, `ios` }
    + any other data add-on required

Output: `Promise`
- `.then`: `callback function`
    + input: `array of objects`
        + `provider`: `object`
            + `url`: `string`
            + `name`: `string`
        + `result`: `object`
            + `file`: `string`
            + `label`: `string`
            + `type`: `string`, one of { `embed`, `direct` }
- `.catch`: `error`

## Libs

Format: `object`

    cheerio         : require('cheerio-without-node-native'),
    jsdom           : require("jsdom"),
    httpRequest     : custom module,
    cryptoJs        : require("crypto-js"),
    _               : require('lodash'),
    axios           : require('axios'),
    stringHelper    : custo module,
    request         : require('request'),
    base64          : require('base-64')

We provide many libraries to call http request, for your most convenient. But we highly recommend you to use our custom module `httpRequest`. Other libraries might not be included in the future releases.

List of supported http libraries
- axios
- fetch (you can use right out of the box)
- request (you should avoid using this one, since it doesn't support Promise and not available on other enviroment).

- `httpRequest`: `object`
    + `request`: `fetch` (`httpRrequest.request` is identical to `fetch`)
    + `getHTML`: `function`
        + `input`: 
            + `url`: `string`
            + `headers`: `headers objects`
        + `output`: `Promise`
            + `.then`: `callback function`
                + input: `string` (text or html of reponse)
            + `.catch`: `error`
    + `getJSON`: `function`
        + input: 
            + `url`: `string`
            + `headers`: `headers objects`
        + output: `Promise`
            + `.then`: `callback function`
                + input: `object` (json object of reponse)
            + `.catch`: `error`
    + `get`: `function`
        + input: 
            + `url`: `string`
            + `headers`: `headers objects`
        + output: `Promise`
            + `.then`: `callback function`
                + input: `object`
                    + `data`: `string` or `object` (html or json)
                    + `headers`: `headers object`
            + `.catch`: `error`
    + `post`: `function`
        + input: 
            + `url`: `string`
            + `headers`: `headers objects`
            + `bodyString`: `string`
                + note that you have to match with `content-type` headers 
        + output: `Promise`
            + `.then`: `callback function`
                + input: `object`
                    + `data`: `string` or `object` (html or json)
                    + `headers`: `headers object`
            + `.catch`: `error`
    + `getHeader`: `function`
        + input: 
            + `url`: `string`
        + output: `Promise`
            + `.then`: `callback function`
                + input: `headers object`
            + `.catch`: `error`
    + `getRedirectUrl`: `function`
        + input: 
            + `url`: `string`
        + output: `Promise`
            + `.then`: `callback function`
                + input: `url`
            + `.catch`: `error`
    + `getCloudflare`: like `get`, but pass cloudflare
    + `postCloudflare`: like `post`, but paass cloudflare
    + `isLinkDie`: `function`
        + input: 
            + `url`: `string`
        + output: `Promise`
            + `.then`: `callback function`
                + input: `string size`
            + `.catch`: `error`

- `stringHelper`: `object`
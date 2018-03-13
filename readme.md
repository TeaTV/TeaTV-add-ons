## Dear users

TeaTV will have add-ons system. This is our new documentation for contributing add-ons.

Note: The documentation is not finished and will be updated.

## What are add-ons and what do they do?

Add-ons are some kind of code that was developed by third-party developers. Add-ons can locally & remotely be installed in TeaTV Desktop.

TeaTV Add-ons have one main purpose and that's providing more sources to get more links and get better movie watching experience.

With some basic knowledge of programming, you can totally make somes add-ons, use it to enjoy the movies you like.

## Contribution guide

TeaTV application searches movie/tv/anime links on the web (using __Nodejs__):
1. Step 1 (Provider Crawler): From input information, search across supported providers for embed links
2. Step 2 (Url Resolver): Convert embed links (host) to direct links.

Note:
- `provider`: free movie online website, like `5movies.to`, `www.primewire.ag`
- `host`: video hosting website, like `openload`, `streamango`
- `link`: 
    + `embed link`: video link that only plays on web, like `https://openload.co/embed/aoiV82o6DQ0`
    + `direct link`: video link that returns a video file, can be played on player, like `http://vjs.zencdn.net/v/oceans.mp4`

There are two kinds of add-ons: 
- __provider__: to support one more provider 
- __host__: to support on more host

### Add-ons structure

One add-on come with two files: 

> manifest.json
  - structure: `object`
    + `add_on_type`: `string`, { `provider`, `host` }
    + `domain`: `array`, [ `string` ]
    + `version`: `string` (Format `0.0.0`, doesn't allow text like `beta`)
    + `url`: `string` (url of host_or_provider_name.js)
    + `type`: `array`, [`string` { `tv`, `movie`, `anime` }], only when `add_on_type` == `provider`
    + `request_data`: `any object`, use for requesting addition data (like api keys)
    
> host_or_provider_name.js

The structure of code in `host_or_provider_name.js` will be shown in sample code. There are some notes:
- No require/import allow, we provide some libraries and you can do many things with it. In case you need more library, contact us or bundle them into one file (but we advise against it). Remeber: No require/import allow.
- You can use Javascript ES6, with async/await support, but have to use "module.exports"
- To get started, clone out sample code repo, and start from there


### Where can I find providers & hosts

- Google
- Our [Todo providers](https://github.com/TeaTV/TeaTV-macOS/blob/master/misc/todo_providers.json) list & [Todo hosts](https://github.com/TeaTV/TeaTV-macOS/blob/master/misc/todo_host.json) list

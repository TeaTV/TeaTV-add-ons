const URL = {
    DOMAIN: `http://xpau.se`,
    SEARCH: (title) => {
        return `http://xpau.se/search.php?dayq=${title}`;
    },
    HEADERS: (rerfer) => {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'xpau.se',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
        };
    }
};

class Xpau {
    constructor(props) {
        this.libs       = props.libs;
        this.movieInfo  = props.movieInfo;
        this.settings   = props.settings;
        this.state      = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, base64 } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;

        let detailUrl       = false;
        let urlSearch       = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
        let htmlSearch      = await httpRequest.getHTML(urlSearch, URL.HEADERS(urlSearch));
        let $               = cheerio.load(htmlSearch);
        let itemSearch      = $('.topic_table');

        itemSearch.each(function() {

            let hrefMovie   = URL.DOMAIN + '/' + $(this).find('.topic_head a').attr('href');
            let titleMovie  = $(this).find('.topic_head a p font').text();
            let yearMovie   = titleMovie.match(/\(([0-9]+)\)/i);
            yearMovie       = yearMovie != null ? +yearMovie[1] : 0;
            titleMovie      = titleMovie.replace(/\([0-9]+\)/i, '').trim();


            if( stringHelper.shallowCompare(title, titleMovie) && yearMovie == year ) {
                detailUrl = hrefMovie;
                return;
            }

        });

        this.state.detailUrl = detailUrl;
        return;
    }


    async getHostFromDetail() {

        const { httpRequest, cheerio, base64 } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");


        let detailUrl       = this.state.detailUrl;

        try {

            let hosts = [];
            let htmlDetail  = await httpRequest.getHTML(this.state.detailUrl, URL.HEADERS(this.state.detailUrl));
            let $           = cheerio.load(htmlDetail);
            let linkWait    = URL.DOMAIN + $('#playthevid').attr('href');

            // console.log(`link wait`, linkWait);
            htmlDetail      = await httpRequest.getHTML(linkWait, URL.HEADERS(linkWait));
            $               = cheerio.load(htmlDetail);
            let linkSkip    = URL.DOMAIN + $('#skipper').attr('href');

            // console.log('1', linkSkip);

            htmlDetail      = await httpRequest.getHTML(linkSkip, URL.HEADERS(linkSkip));
            $               = cheerio.load(htmlDetail);
            let linkWatch   = URL.DOMAIN + $('#iwatcher3').attr('src');

            // console.log('2', linkWatch);

            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       = URL.DOMAIN + $('#iwatcher4').attr('src');


            // console.log('3', linkWatch);


            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       = URL.DOMAIN + $('#iwatcher5').attr('src');

            // console.log('4', linkWatch);

            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch    = URL.DOMAIN + $('#iwatcher6').attr('src');

            // console.log('5', linkWatch);

            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       = URL.DOMAIN + $('#iwatcher7').attr('src');

            // console.log('6', linkWatch);

            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       = URL.DOMAIN + $('#iwatcher8').attr('src');

            // console.log('7', linkWatch);

            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       = URL.DOMAIN + $('#iwatcher9').attr('src');

            // console.log('8', linkWatch);

            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       = URL.DOMAIN + $('#iwatcher10').attr('src');

            // console.log('9', linkWatch);


            htmlDetail      = await httpRequest.getHTML(linkWatch, URL.HEADERS(linkWatch));
            $               = cheerio.load(htmlDetail);
            linkWatch       =   $('#iwatcher11').attr('src');

            // console.log('10', linkWatch);

            linkWatch && hosts.push({
                provider: {
                    url: detailUrl,
                    name: "xpau"
                },
                result: {
                    file: linkWatch,
                    label: "embed",
                    type: "embed"
                }
            });

            this.state.hosts = hosts;
            return;
        } catch(e) {
            throw new Error(e);
        }

    }

}

exports.default = async (libs, movieInfo, settings) => {

    const xpau = new Xpau({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await xpau.searchDetail();
    await xpau.getHostFromDetail();
    return xpau.state.hosts;
}


exports.testing = Xpau;
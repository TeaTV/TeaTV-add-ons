const URL = {
    DOMAIN: "http://afdah.to",
    SEARCH: `http://afdah.to/wp-content/themes/afdah/ajax-search2.php`,
    HEADERS: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin' : 'http://afdah.to',
        'Accept-Language': 'vi-VN,vi;q=0.8,fr-FR;q=0.6,fr;q=0.4,en-US;q=0.2,en;q=0.2',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

class Afdah {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, cryptoJs, qs }  = this.libs; 
        let { title, year, season, episode, type }              = this.movieInfo;

        let detailUrl       = false;
        const bodyRequest   = {
            process: cryptoJs.AES.encrypt(title + '|||' + 'title', 'Watch Movies Online').toString()
        };

        let htmlSearch  = await httpRequest.post(URL.SEARCH ,URL.HEADERS, qs.stringify(bodyRequest));
        let $           = cheerio.load(htmlSearch.data);
        let itemSearch  = $('ul li');

        itemSearch.each( function() {

            let titleAfdah 	    = $(this).find('a').text().replace(/\([0-9]+\)/i, '').trim();
			let id 				= $(this).find('a').attr('href');
			let yearAfdah 		= $(this).find('a').text().match(/\(([0-9]+)\)/i);
            yearAfdah 			= yearAfdah != null ? +yearAfdah[1] : 0;

            if( stringHelper.shallowCompare(titleAfdah, title) && yearAfdah == year ) {
                detailUrl = `${URL.DOMAIN}${id}`;
            }
        });

        this.state.detailUrl = detailUrl; 
        return;
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");

        let hosts       = [];
        let detailUrl   = this.state.detailUrl;
        let htmlDetail  = await httpRequest.get(this.state.detailUrl);
        let $           = cheerio.load(htmlDetail.data);
        let servers     = ['cont_1', 'cont_3', 'cont_4', 'cont_5'];

        servers.forEach((item) => {

            if( item == 'cont_5' ) {

                $(`#cont_5 div table`).each( function() {

                    let embed = $(this).find('a').attr('href');
                    hosts.push({
                        provider: {
                            url: detailUrl,
                            name: "afdah"
                        },
                        result: {
                            file: embed,
                            label: "embed",
                            type: "embed"
                        }
                    })
                });
            } else {

                let embed 	= $(`#${item} .jw-player`).attr('data-id');
			    if( embed != undefined ) {

				    embed 		= URL.DOMAIN + embed;
					hosts.push({
                        provider: {
                            url: detailUrl,
                            name: "afdah"
                        },
                        result: {
                            file: embed,
                            label: "embed",
                            type: "embed"
                        }
                    })
				}
            }
        });

        this.state.hosts = hosts;
    }
}

exports.default = async (libs, movieInfo, settings) => {

    const httpRequest = libs.httpRequest;

    const source = new Afdah({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });

    let bodyPost = {
        name_source: 'Afdah',
        is_link: 0,
        type: movieInfo.type,
        season: movieInfo.season,
        episode: movieInfo.episode,
        title: movieInfo.title,
        year: movieInfo.year
    };

    await source.searchDetail();

    if( !source.state.detailUrl ) {
        bodyPost.is_link = 0;
    } else {
        bodyPost.is_link = 1;
    }
    await source.getHostFromDetail();

    if( source.state.hosts.length == 0 ) {
        bodyPost.is_link = 0;
    } else {
        bodyPost.is_link = 1;
    }

    await httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

    return source.state.hosts;
}



exports.testing = Afdah;
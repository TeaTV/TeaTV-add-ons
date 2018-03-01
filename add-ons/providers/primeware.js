const URL = {
    DOMAIN: "http://www.primewire.ag",
    SEARCH: keyword => `http://www.primewire.ag/index.php?search_keywords=${keyword}&key=d6077aeec4e85692&search_section=1`,
    DETAIL: (type, id, dummyText, season, episode) => {
        if(type === 'tv') return `http://www.primewire.ag/${type}-${id}-${dummyText}/season-${season}-episode-${episode}`;
        return `http://www.primewire.ag/watch-${id}-${dummyText}`;
    }
};

class Primeware {
    constructor(props) {
        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.varHelper = {
            urlSlug(string, spaceCharacter) {
                return string.replace(/\s/g, spaceCharacter);
            },
            extractIdFromSlug(string) {
                // example: /watch-9594-The-Big-Bang-Theory-online-free
                let matchArr = string.match(/([0-9])\w+/g);
                if(matchArr !== null) return matchArr[0];
                return false;
            }
        };
        this.state = {};
    }

    async searchDetail() {
        const { httpRequest, cheerio } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;
        let searchUrl = URL.SEARCH(this.varHelper.urlSlug(title, "+"));
        let htmlSearch = await httpRequest.getHTML(searchUrl);
        let $ = cheerio.load(htmlSearch);
        let result = [];
        $(".index_item.index_item_ie").each(function(){
            result.push({
                slug: $(this).find("a").attr("href"),
                titleAndYear: $(this).find("a").attr("title").replace("Watch ", "")
            });
        });
        let titleAndYear = `${title} (${year})`.toLowerCase();
        for (let i=0; i<result.length; i++) {
            if(result[i].titleAndYear.toLowerCase() == titleAndYear) {
                let id = this.varHelper.extractIdFromSlug(result[i].slug);
                if(id !== false) {
                    this.state.detailUrl = URL.DETAIL(type, id, this.varHelper.urlSlug(title, "-"), season, episode);
                    return;
                }
            }
        }
    }

    async getHostFromDetail() {
        const { httpRequest, cheerio } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");
        console.log(this.state.detailUrl);
        let htmlDetail = await httpRequest.getHTML(this.state.detailUrl);
        let $ = cheerio.load(htmlDetail);
        let redirectLinks = [];
        let hosts = [];
        $(".movie_version_link").each(function(index){
            if(index === 0) return;
            redirectLinks.push(URL.DOMAIN + $(this).find("a").attr("href"))
        });
        // console.log(redirectLinks);
        let promiseArr = redirectLinks.map(async val => {
            let host = await httpRequest.getRedirectUrl(val);
            host !== false && hosts.push({
                provider: {
                    url: this.state.detailUrl,
                    name: "primeware"
                },
                result: {
                    file: host,
                    label: "embed",
                    type: "embed"
                }
            });
        });
        await Promise.all(promiseArr);
        this.state.hosts = hosts;
    }
}

module.exports = async (libs, movieInfo, settings) => {

    const primeware = new Primeware({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await primeware.searchDetail();
    await primeware.getHostFromDetail();
    return primeware.state.hosts;
}
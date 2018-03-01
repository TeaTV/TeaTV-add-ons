const URL = {
    DOMAIN: "",
    SEARCH: "",
    HEADERS: {
        'Origin' : '',
        'Accept-Language': 'vi-VN,vi;q=0.8,fr-FR;q=0.6,fr;q=0.4,en-US;q=0.2,en;q=0.2',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

class CloneMe {

    constructor(props) {

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    async searchDetail() {

        const { httpRequest, cheerio, stringHelper, cryptoJs } = this.libs; 
        let { title, year, season, episode, type } = this.movieInfo;
        let detailUrl = false;

        // your code here


        this.state.detailUrl = detailUrl; 
        return;
    }

    async getHostFromDetail() {
        
        const { httpRequest, cheerio } = this.libs;
        if(!this.state.detailUrl) throw new Error("NOT_FOUND");
        console.log(this.state.detailUrl);

        // you code here

        this.state.hosts = hosts;
    }
}

module.exports = async (libs, movieInfo, settings) => {

    const cloneMe = new CloneMe({
        libs: libs,
        movieInfo: movieInfo,
        settings: settings
    });
    await cloneMe.searchDetail();
    await cloneMe.getHostFromDetail();
    return cloneMe.state.hosts;
}
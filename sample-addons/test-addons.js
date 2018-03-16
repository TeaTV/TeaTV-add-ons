const libs = require("../libs/index.node");

const cloneMeHost = require("./hosts/_clone_me").default;
const cloneMeProvider = require("./providers/_clone_me").default;

const testHost = async (host, url) => {

    let getLinkFromHost = await host(libs, { platform: "nodejs" }).getLink(url);
    return getLinkFromHost;
}

const testProvider = async (provider, movieInfo) => {

    let data = await provider(libs, movieInfo, { platform: "nodejs" });
    return data;
}

(async () => {

  let data = await testProvider(cloneMeProvider, {
      type: 'movie',
      title: "Coco",
      season: 4,
      episode: 1,
      year: 2017
  });

  console.log(data);

})();
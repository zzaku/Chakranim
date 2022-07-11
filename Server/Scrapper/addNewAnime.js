const puppeteer = require("puppeteer-extra");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const axios = require('axios').default;
puppeteer.use(AdblockerPlugin());
const fs = require('fs');
require('events').EventEmitter.defaultMaxListeners = 200;

module.exports = async function isThereNewAnime (name) {
  let data = []
  await axios.get(`https://chakranimes.herokuapp.com/vod/animes?name=${name}`).then(response => data.push(response.data))
  return data
};


const puppeteer = require("puppeteer-extra");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const axios = require('axios').default;
puppeteer.use(AdblockerPlugin());
const fs = require('fs');
require('events').EventEmitter.defaultMaxListeners = 200;

module.exports = async function isThereNewAnime () {
  let data = []
  await axios.get('http://localhost:4000/vod/allanimes/check/').then(response => data.push(response.data))
  return data
};


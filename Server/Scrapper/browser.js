const puppeteer = require("puppeteer-extra");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const {executablePath} = require('puppeteer')

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(AdblockerPlugin());
puppeteer.use(StealthPlugin());

async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: true,
	        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
	        'ignoreHTTPSErrors': true,
			executablePath: executablePath()
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};
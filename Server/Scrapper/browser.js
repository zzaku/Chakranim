const puppeteer = require("puppeteer-extra");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(AdblockerPlugin());
puppeteer.use(StealthPlugin());

async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: true,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true,
            executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", 
            userDataDir: "C:/Users/admin/AppData/Local/Google/Chrome/User Data/Default",
            args: [
            '--window-size=1920,1080',
            ],
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};
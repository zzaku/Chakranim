const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance, previousScrappedAnimeInstance){
	let browser;
	let previousScrappedAnime;
	try{
		browser = await browserInstance;
		previousScrappedAnime = await previousScrappedAnimeInstance;
		await pageScraper.scraper(browser, previousScrappedAnime);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = {
	pageScraper: (browserInstance, previousScrappedAnime) => scrapeAll(browserInstance, previousScrappedAnime),
}
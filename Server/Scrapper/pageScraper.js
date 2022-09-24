const axios = require('axios').default;
const isThereNbrEp = require('./addNewAnime')

const scraperObject = {
    url: 'https://vostfree.tv',
    async scraper(browser){
        let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		// Navigate to the selected page
		await page.goto(this.url, {waitUnitl: 'networkidle2'});
        let scrapedData = [];
		// Wait for the required DOM to be rendered
		await page.waitForSelector('#left-movies-tabs8 > li');
        let seeAllList = await page.$("#left-movies-tabs8 > li > a");
        await page.waitForTimeout(1000)
        await seeAllList.click();
		await page.waitForSelector('#dle-content > div.movie-poster');
        await page.waitForSelector("#dle-content > div.navigation > a:nth-child(3) > span");   
        let sections = await page.$$eval("#dle-content > div.navigation > div > a", list => {let tab = []; list.map(elem => tab.push(parseInt(elem.textContent))); return tab.slice(-1)[0]})
        async function verify(scrapped){
            for (let i = scrapped.length - 1; i >= 0; i--) {

                let previousScrappedAnime = await isThereNbrEp(encodeURIComponent(scrapped[i].name))

                if(previousScrappedAnime[0].length === 0){
                    scrapped[i].newAnime = true
                    scrapped[i].nouveau_Episode = false
                } else {
                    for(let alreadyGet of previousScrappedAnime[0]){
                            if(
                                (scrapped[i].name === alreadyGet.name || alreadyGet.name === "One Piece") && scrapped[i].langue === alreadyGet.langue && 
                                scrapped[i].saison === alreadyGet.saison 
                                && (scrapped[i].nbr_episode === alreadyGet.nombre_episode || scrapped[i].nbr_episode === alreadyGet.nombre_episode_final)
                                ){
                                     scrapped[i].needtoremove = true
                            } else if(
                                scrapped[i].name === alreadyGet.name && scrapped[i].langue === alreadyGet.langue && 
                                scrapped[i].saison === alreadyGet.saison 
                                && (scrapped[i].nbr_episode !== alreadyGet.nombre_episode || scrapped[i].nbr_episode !== alreadyGet.nombre_episode_final)
                                ){
                                                scrapped[i].newEp = true
                                                scrapped[i].newAnime = false
                                                scrapped[i].nouveau_Episode = false
    
                            } else {
                                                continue;
                        }
                     }
                }
            }
              let scrappedVerified = scrapped.filter(elem => !elem.needtoremove)
              return scrappedVerified
          }

        let listSection = (url) => new Promise(async(resolve, reject) => {
            let newPage = await browser.newPage();
            await newPage.goto(url);
            let Anime = await newPage.$$eval('#dle-content > div.movie-poster', animes => {

                let AnimesofSection = []

                for(anime of animes){
                    link = anime.querySelector('div.play > a').href
                    nameOfAnime = anime.querySelector('div.info > div.title').textContent
                    let temp = nameOfAnime.split(" ")
                    let name = temp.slice(0, temp.length-1).join(' ')
                    desc = anime.querySelector('div.info > div.desc').textContent
                    img = anime.querySelector('span.image > img').src
                    nbrEp = anime.querySelector("#dle-content div.alt > div.year > b") === null ? 0 : anime.querySelector("#dle-content div.alt > div.year > b").textContent
                    genre = anime.querySelector('div.info > ul.additional > li.type').nextElementSibling
                    genreList = genre.querySelectorAll('a');
                    saison = anime.querySelector(" div.kp > b") === null ? "Film" : anime.querySelector(" div.kp > b").textContent
                    LesGenres = []
                        for(cat of genreList){
                            LesGenres.push(cat.textContent)
                        }
                    langue = anime.querySelector('div.quality').textContent
                    AnimesofSection.push({name, desc, img, LesGenres, saison, langue, link, 'nbr_episode': parseInt(nbrEp)})
                }
                return AnimesofSection;
            });
            resolve(verify(Anime))
            await newPage.close();
        });

        let allAnimesLinks = []
        console.log("Cherche les nouveaux animes et episodes disponibles...")
        for(let i = 0; i < sections; i++){
            let currentSectionData = await listSection(`https://vostfree.tv/lastnews/page/${i+1}/`);
            console.log(currentSectionData)
			allAnimesLinks.push(currentSectionData)
		}
        console.log("Fin de la recherche.")

        const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

        let pagePromise = (link, nombre_ep) => new Promise(async(resolve, reject) => {

			let newPage = await browser.newPage();
            await newPage.goto(link);
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.waitForSelector('#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_next');
            await newPage.waitForTimeout(1000)
            let select = await newPage.$("div.jq-selectbox-wrapper > div")
            await newPage.waitForSelector('div.jq-selectbox-wrapper > div')
            await select.click();
            let fromStart = await newPage.$("div.jq-selectbox__dropdown > ul > li")
            await fromStart.click();
            await newPage.waitForTimeout(1000)
            let anime = await newPage.$$eval('#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_selector_box > div.jq-selectbox-wrapper > select > option', async(ep) => {
                let datas = [];
                let genre = [];
                let links = [];
                let image = document.querySelector("div.slide-poster > img").src
                let temp_banniere = document.querySelector("#dle-content > div.watch-top > div");
                let temp_banniere2 = temp_banniere.style.backgroundImage;
                let banniere = temp_banniere2.split('"')[1]
                let nameOfAnime = document.querySelector("div.slide-middle > h1").textContent
                let temp = nameOfAnime.split(" ")
                let name = temp.slice(0, temp.length-1).join(' ')
                let desc = document.querySelector("div.slide-middle > div").textContent
                let LesGenres = document.querySelectorAll("div.slide-middle > ul > li > a")
                let nombre_episode = ep.length;
                let isThereNbrEp = document.querySelector("#dle-content > div.watch-top > div > div > div > div.slide-poster > div")
                let nbrEp2 = isThereNbrEp ? parseInt(document.querySelector("#dle-content > div.watch-top > div > div > div > div.slide-poster > div").textContent.split(' ')[1]) : 0
                let duree = document.querySelector("div.slide-info > p:nth-child(3) > b") ? document.querySelector("div.slide-info > p:nth-child(3) > b").textContent.trim() : document.querySelector("div.slide-info > p:nth-child(2) > b") ? document.querySelector("div.slide-info > p:nth-child(2) > b").textContent.trim() : document.querySelector("div.slide-info > p:nth-child(1) > b") ? document.querySelector("div.slide-info > p:nth-child(1) > b").textContent.trim() : ""
                let date = document.querySelector("div.slide-middle > ul:nth-child(2) > li > b:nth-child(2) > a").textContent
                for(cat of LesGenres){
                    genre.push(cat.textContent)
                }
                let langue = nameOfAnime.split(" ").slice(-1).toString() === 'FRENCH' || nameOfAnime.split(" ").slice(-1).toString() === 'French' || 
                nameOfAnime.split(" ").slice(-1).toString() === 'VF' ? 'VF' : nameOfAnime.split(" ").slice(-1).toString() === 'VOSTFR' && genre[0] !== "Films VF-VOSTFR" ||
                genre[0] === "Animes VOSTFR" && nameOfAnime.split(" ").slice(-1).toString() !== 'vf' || genre[0] === "Animes VOSTFR" && nameOfAnime.split(" ").slice(-1).toString() !== 'VF' || 
                genre[0] === "Animes VOSTFR" && nameOfAnime.split(" ").slice(-1).toString() !== 'VOSTFR' ||
                nameOfAnime.split(" ").slice(-1).toString() === 'Vostfr' || nameOfAnime.split(" ").slice(-1).toString() === 'VO' ? 'VOSTFR' : nameOfAnime.split(" ").slice(-1).toString() === 'VOSTFR' && genre[0] === "VF-VOSTFR" ? "VF" : "VF"
                let laSaison = document.querySelector("div.slide-middle > ul > li:nth-child(2) > b:nth-child(2)")
                let saison = laSaison ? laSaison.textContent : 'Film';
                let Vudeo;
                let VIP;
                    if(ep.length >= 270 && ep.length < 400 && nbrEp2 >= 270 && nbrEp2 < 1200){
                        for(let i = -1; i < Math.trunc(ep.length/2); i++){
                            if(i == -1 ){
                                continue;
                            }
                            let next = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_next");
                            let a = document.querySelectorAll("div[style='display: block;'] > div")
                            let buttons = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`).length
                            a.forEach(el => {el.textContent == 'Vudeo' ? Vudeo = el : null; el.textContent == 'VIP' ? VIP = el : null})
                            for (let j = 0; j < buttons; j++){
                                let linkOfVideo = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_content > iframe").src
                                let buttonVOD = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`)[j]
                                buttonVOD.click();
                                links.push({"format_VOD": buttonVOD.textContent, "episode": ep[i].textContent, "lien": linkOfVideo});
                            }        
                            next.click();
                        }
                    } else if(ep.length >= 300 && ep.length < 1500){
                        let next = document.querySelector("div.new_player_next");
                        let saison = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_series_count > a")
                            let a = document.querySelectorAll("div[style='display: block;'] > div")
                            a.forEach(el => {el.textContent == 'Vudeo' ? Vudeo = el : null; el.textContent == 'VIP' ? VIP = el : null})
                            let buttons = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`).length
                                let linkOfVideo = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_content > iframe").src
                                let buttonVOD = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`)[0]
                                links.push({"format_VOD": "prochainement", "episode": "prochainement", "lien": "prochainement"});
                            next.click();
                    } else {
                        let next = document.querySelector("div.new_player_next");
                        let saison = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_series_count > a")
                        for(let i = -1; i < ep.length; i++){
                            if(i == -1 ){
                                continue;
                            }
                            let a = document.querySelectorAll("div[style='display: block;'] > div")
                            a.forEach(el => {el.textContent == 'Vudeo' ? Vudeo = el : null; el.textContent == 'VIP' ? VIP = el : null})
                            let buttons = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`).length
                            for (let j = 0; j < buttons; j++){
                                let linkOfVideo = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_content > iframe").src
                                let buttonVOD = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`)[j]
                                buttonVOD.click();
                                links.push({"format_VOD": buttonVOD.textContent, "episode": ep[i].textContent, "lien": linkOfVideo});
                            }        
                            next.click();
                        }
                    }
                    ep.length >= 450 || nbrEp2 >= 450 ? datas.push({name, desc, image, banniere, genre, langue, saison, nombre_episode, links, 'need_suite': true, duree, date}) : datas.push({name, desc, image, banniere, genre, langue, saison, nombre_episode, links,'need_suite': false, duree, date});
                    
                return datas
            });
			resolve(anime);
			await newPage.close();
		});

        let pagePromiseEpSupThan450 = (link, bro) => new Promise(async(resolve, reject) => {
			
			let newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
			await newPage.goto(link);
            await newPage.waitForSelector('#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_next');
            await newPage.waitForTimeout(1000)
            let select = await newPage.$("div.jq-selectbox-wrapper > div")
            await newPage.waitForSelector('div.jq-selectbox-wrapper > div')
            await select.click();
            await newPage.waitForTimeout(1000)
            let anime = await newPage.$$eval('#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_selector_box > div.jq-selectbox-wrapper > select > option', async(ep) => {
                let datas = [];
                let genre = []
                let nextLinks = []
                let image = document.querySelector("div.slide-poster > img").src
                let nameOfAnime = document.querySelector("div.slide-middle > h1").textContent
                let temp = nameOfAnime.split(" ")
                let name = temp.slice(0, temp.length-1).join(' ')
                let desc = document.querySelector("div.slide-middle > div").textContent
                let LesGenres = document.querySelectorAll("div.slide-middle > ul > li > a")
                let nombre_episode = ep.length
                function delay(time) {
                    return new Promise(function(resolve) { 
                        setTimeout(resolve, time)
                    });
                 }
                for(cat of LesGenres){
                    genre.push(cat.textContent)
                }
                let langue = nameOfAnime.split("").slice(4) === 'FRENCH' ? 'VF' : 'VOSTFR'
                let laSaison = document.querySelector("div.slide-middle > ul > li:nth-child(2) > b:nth-child(2)")
                let saison = laSaison ? 'Saison: ' + laSaison.textContent : 'Film';
                let Mytv = document.querySelector("div[style='display: block;'] > div.new_player_mytv");
                    let sibnet = document.querySelector("div[style='display: block;'] > div.new_player_sibnet");
                    let uqload = document.querySelector("div[style='display: block;'] > div.new_player_uqload");
                    let linkOfVideo = document.querySelector('#film_iframe').src
                    let Vudeo;
                    let VIP;
                    let isThereNbrEp = document.querySelector("#dle-content > div.watch-top > div > div > div > div.slide-poster > div")
                    let nbrEp2 = isThereNbrEp ? parseInt(document.querySelector("#dle-content > div.watch-top > div > div > div > div.slide-poster > div").textContent.split(' ')[1]) : 0
                    let select = document.querySelector("div.jq-selectbox-wrapper > div");
                    let lasPart = Math.trunc(ep.length/2)
                    let fromPreviousPart = document.querySelector(`div.jq-selectbox__dropdown > ul > li:nth-child(${lasPart})`)
                    await select.click();
                    await fromPreviousPart.click();
                    if(ep.length >= 270 && ep.length < 400 && nbrEp2 >= 270 && nbrEp2 < 1200){
                        for(let i = lasPart; i < ep.length; i++){
                            if(i == -1 ){
                                continue;
                            }
                            let next = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_next");
                            let a = document.querySelectorAll("div[style='display: block;'] > div")
                            a.forEach(el => {el.textContent == 'Vudeo' ? Vudeo = el : null; el.textContent == 'VIP' ? VIP = el : null})
                            let buttons = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`).length
                            for (let j = 0; j < buttons; j++){
                                let linkOfVideo = document.querySelector("#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_content > iframe").src
                                let buttonVOD = document.querySelectorAll(`div.new_player_bottom > div[style='display: block;'] > div`)[j]
                                buttonVOD.click();
                                nextLinks.push({"format_VOD": buttonVOD.textContent, "episode": ep[i].textContent, "lien": linkOfVideo});
                            }        
                            next.click();
                        }
                    } else if(ep.length >= 300 && ep.length < 1500 || nbrEp2 >= 300 && nbrEp2 < 1500) {
                                nextLinks.push({"format_VOD": "prochainement", "episode": "prochainement", "lien": "prochainement"});
                    }
                datas.push({nextLinks, 'lastPart': true});
                return datas
            });
			
			resolve(anime);
			await newPage.close();
		});

        console.log("Scrapp et envoie a l'API les animes trouvés...")
        for(elems of allAnimesLinks){
            for(link in elems){
                if(elems[link]){
                    if(elems[name] !== "One Piece"){
                        let currentPageData1;
                        let currentPageData2;
                        let suite = elems[link].nbr_episode >= 300
                        let newEp = elems[link].newEp
                        let newAnimeAvailable = elems[link].newAnime
                        let nouveau_Episode_Available = elems[link].nouveau_Episode
                        currentPageData1 = await pagePromise(elems[link].link, elems[link].nbr_episode);
                        await page.waitForTimeout(getRandomFloat(1, 5))
                        if(elems[link].nbr_episode >= 200){
                            currentPageData2 = await pagePromiseEpSupThan450(elems[link].link)
                        } 
                        suite ? await axios.post('https://chakranimes.herokuapp.com/vod/allanimes/', {
                            name: currentPageData1[0].name,
                            desc: currentPageData1[0].desc,
                            image: currentPageData1[0].image,
                            banniere: currentPageData1[0].banniere,
                            genre: currentPageData1[0].genre,
                            langue: currentPageData1[0].langue,
                            saison: currentPageData1[0].saison,
                            nombre_episode: currentPageData1[0].nombre_episode,
                            nombre_episode_final: elems[link].nbr_episode,
                            need_suite: currentPageData1[0].need_suite,
                            lastPart: currentPageData2[0].lastPart,
                            nextLinks: currentPageData2[0].nextLinks,
                            links: currentPageData1[0].links,
                            nouveau_Episode: nouveau_Episode_Available,
                            newAnime: newAnimeAvailable ? true : false,
                            newEp: newEp,
                            duree: currentPageData1[0].duree,
                            date: currentPageData1[0].date
                        }) 
                        : 
                        await axios.post('https://chakranimes.herokuapp.com/vod/allanimes/', {
                            name: currentPageData1[0].name,
                            desc: currentPageData1[0].desc,
                            image: currentPageData1[0].image,
                            banniere: currentPageData1[0].banniere,
                            genre: currentPageData1[0].genre,
                            langue: currentPageData1[0].langue,
                            saison: currentPageData1[0].saison,
                            nombre_episode: currentPageData1[0].nombre_episode,
                            nombre_episode_final: elems[link].nbr_episode,
                            need_suite: currentPageData1[0].need_suite,
                            lastPart: false,
                            nextLinks: null,
                            links: currentPageData1[0].links,
                            nouveau_Episode: nouveau_Episode_Available,
                            newAnime: newAnimeAvailable,
                            newEp: newEp,
                            duree: currentPageData1[0].duree,
                            date: currentPageData1[0].date
                        })
                    }
                }
            }
		}
        console.log("Fin du scrapping.")
        return
    }
}

module.exports = scraperObject;
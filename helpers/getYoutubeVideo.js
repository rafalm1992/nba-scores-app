const puppeteer = require('puppeteer')

const getYoutubeVideoDataJson = (query) => {
    return new Promise( async(resolve, reject) => {
            const browser = await puppeteer.launch({headless: true,   'args' : [
              '--no-sandbox',
              '--disable-setuid-sandbox'
            ]});
            const page = await browser.newPage();
            await page.goto('https://www.youtube.com/');
            await page.type('input#search', query)
            await page.click('#search-icon-legacy')
            await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
            await page.waitForSelector('ytd-page-manager#page-manager')
            const videos = await page.$$('ytd-thumbnail.ytd-video-renderer')
            await videos[0].click()
            await page.waitForSelector('.html5-video-container')
            await page.waitFor(500)
            await page.screenshot({path: 'example.png'});
            await page.waitFor(1000)
            let url = await page.evaluate('document.URL')
            let title = await page.evaluate('document.title.slice(0, document.title.length-10)')
            await page.waitFor(300)
            let videoId = await page.evaluate('document.URL.slice(-11)')
            await page.waitFor(300)
            let image = `https://img.youtube.com/vi/${videoId}/0.jpg`
            let timestamp = new Date().getSeconds()
            let URLdata = Object.assign({}, {url, title, image, videoId, timestamp})
            await browser.close();
      if ( URLdata ) {
        resolve(URLdata);
      } else {
        reject({status: "getYoutubeVideoDataJson service is unavailable"});
      }
    });
  };


const getVideoJsonData = () => {
    return URLdata
}
module.exports = {getYoutubeVideoDataJson}






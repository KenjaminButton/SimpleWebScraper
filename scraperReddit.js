const puppeteer = require('puppeteer')
let scraped_headlines = [];
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
})
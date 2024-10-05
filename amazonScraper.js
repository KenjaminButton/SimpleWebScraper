/*
Amazon Best Sellers Page
https://www.amazon.com/best-sellers/zgbs

Multiple Top Products wrapped in selector a-carousel
#CardInstancewM97O-VtaXLzHaSxF9-Ecg > div > div > div > div.a-row.a-carousel-controls.a-carousel-row.a-carousel-has-buttons > div > div.a-carousel-col.a-carousel-center


*/

import puppeteer from "puppeteer-core"

async function run(params) {
  let browser;
  try {
    // const auth = 'USERNAME:PASSWORD'
    const auth = 'DONTSTEALMYLOGINANDPW'
    browser = await puppeteer.connect({
      browserWSEndpoint: `DONTSTEALMYLOGINANDPW`
    })

    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(2 * 60 * 1000)

    await page.goto('https://www.amazon.com/best-sellers/zgbs')
    const selector = '.a-carousel'
    await page.waitForSelector(selector)
    const el = await page.$(selector)
    const text = await el.evaluate( e => e.innerHTML)
    console.log("text:::", text)


    const body = await page.$('body')

    const html = await page.evaluate( () => 
      document.documentElement.outerHTML
    )
    console.log(html)

    

    return
  } catch(e) {
    console.error('scrape failed', e)
  } finally {
    // automatically closes the browser when done
    await browser?.close() 
  }
}

run()
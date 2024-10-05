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

    await page.goto('https://amazon.com')

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
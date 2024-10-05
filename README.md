[How to Web Scrape With JavaScript & Node.js + CAPTCHAs Tips](https://www.scraperapi.com/blog/web-scraping-javascript-tutorial/)

- Step 3: Fetch the HTML Code Using Axios
- Step 4: Select the Elements You Want to Collect
- Step 5: Parse the HTML Using Cheerio
- Step 6: Scraping Dynamic Pages? Here’s What to Do
- Step 7: Using ScraperAPI for Faster Data Scraping
- Step 8: Integrating ScraperAPI with Axios requests
- Step 9: Integrating ScraperAPI with Puppeteer


- [x] Learn how to build a JavaScript web scraper and make it find a specific string of data on both static and dynamic pages.
- [x] [Cheerio](https://cheerio.js.org/docs/intro) is a jQuery implementation for Node.js that makes it easier to select, edit, and view DOM elements.

## Using ScraperAPI for Faster Data Scraping

- ScraperAPI handles everything with a single API call.

- [x] Web scraping for single Nike product completed
- [x] Web scraping for HackerNews title and link completed
- [] Web scraping for Amazon 

## Industrial Scale Scraping

[Industrial Scale Scraping](https://www.youtube.com/watch?v=qo_fUjb02ns&ab_channel=BeyondFireship)

1. Need Automated IP Address Rotation [BrightData](https://brightdata.com/) Signup
2. npm install puppeteer-core which is the automation library without the browser itself

```js
    await page.goto('https://www.amazon.com/best-sellers/zgbs')
    const selector = '.a-carousel'
    await page.waitForSelector(selector)
    const el = await page.$(selector)
    const text = await el.evaluate( e => e.innerHTML)
    console.log("text:::", text) // ChatGPT: Given the following HTML, how would I extract the product name and price using puppeteer?
```

 - ChatGPT: GIven the following HTML, how would I extract the product name and price using puppeteer?
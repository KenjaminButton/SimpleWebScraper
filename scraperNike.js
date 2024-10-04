const axios = require('axios')
const cheerio = require('cheerio')

const url1 = 'https://www.nike.com/t/air-penny-2-mens-shoes-67X3rk/DV0817-001'

axios(url1).then( 
  response => {
  const html = response.data
  // console.log(html)
  const $ = cheerio.load(html)
  const salePrice = $('[data-testid="currentPrice-container"]').first().text()
  console.log(salePrice, typeof salePrice)
  } 
).catch(
  console.error
)

{/* <span class="nds-text mr2-sm css-tbgmka e1yhcai00 text-align-start appearance-body1Strong color-primary display-inline weight-regular" data-testid="currentPrice-container">$110.97</span> */}


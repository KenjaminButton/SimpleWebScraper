const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const PROXY_USERNAME = 'scraperapi'; // Your proxy username
const PROXY_PASSWORD = 'STEALSOMEONEELSESSCRAPERAPIKEY'; // Replace with your scraperAPI key
const PROXY_SERVER = 'proxy-server.scraperapi.com';
const PROXY_SERVER_PORT = '8001';

// Array to hold the scraped headlines
let scraped_headlines = [];

(async () => {
    // Launch a new browser instance with Puppeteer
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true, // Ignore HTTPS certificate errors
        args: [
            `--proxy-server=http://${PROXY_SERVER}:${PROXY_SERVER_PORT}`, // Use the specified proxy
            '--ignore-certificate-errors' // Also ignore certificate errors
        ]
    });

    const page = await browser.newPage(); // Open a new page in the browser

    // Authenticate using proxy credentials
    await page.authenticate({
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD,
    });

    try {
        // Navigate to Hacker News
        await page.goto('https://news.ycombinator.com/', { timeout: 180000 });
        
        // Get the entire HTML of the page
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        // console.log("bodyHTML", bodyHTML)
        let $ = cheerio.load(bodyHTML); // Load the HTML into Cheerio for manipulation

        // Use the correct selector to get the titleline spans
        let article_headlines = $('.titleline'); // Select all elements with class 'titleline'
        
        // Check if any titles were found
        if (article_headlines.length === 0) {
            console.log('No articles found with the specified selector.');
        } else {
            console.log(`Found ${article_headlines.length} articles.`); // Log the number of articles found
        }

        // Iterate over the selected elements to extract titles and links
        article_headlines.each((index, element) => {
            // Find the anchor tag within the current titleline element
            const titleElement = $(element).find('a'); // Get the first <a> tag inside the current titleline
            
            // Get the title text and trim any whitespace
            let title = titleElement.text().trim();

            // Get the href attribute of the anchor tag (the link)
            let link = titleElement.attr('href');

            // Ensure link is valid; prepend base URL if it's missing the scheme
            if (link && link.startsWith('/')) {
                link = 'https://news.ycombinator.com' + link; // Make link absolute
            }

            // Store the title and link in the scraped_headlines array
            scraped_headlines.push({
                'title': title, // Store the title
                'link': link // Store the link
            });
        });
    } catch (err) {
        console.log('Error encountered:', err); // Log any encountered errors
    } finally {
        await browser.close(); // Close the browser once done
    }

    // Output the scraped headlines
    console.log(scraped_headlines);
})();

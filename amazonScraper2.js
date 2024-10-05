// Import the puppeteer library for controlling headless browsers
import puppeteer from 'puppeteer';

// Define an asynchronous function using an Immediately Invoked Function Expression (IIFE)
(async () => {
    // Launch a new browser instance (headless mode by default)
    const browser = await puppeteer.launch(); 
    
    // Open a new page (tab) in the browser
    const page = await browser.newPage(); 

    // Navigate to the Amazon Best Sellers page and wait until the network is idle (all resources are loaded)
    await page.goto(`https://www.amazon.com/best-sellers/zgbs`, {waitUntil: 'networkidle2'}); 

    // Execute JavaScript in the context of the page to extract product names and prices
    const products = await page.evaluate(() => {
        // Select all elements with the class name 'a-carousel-card' that represent products
        const productElements = document.querySelectorAll('.a-carousel-card');
        // Initialize an empty array to store product details
        let productsArray = [];

        // Iterate over each product element
        productElements.forEach((product) => {
            // Find the product name element by its class name and save it to a variable
            const nameElement = product.querySelector('.p13n-sc-truncate-desktop-type2'); 
            // Find the product price element by its class name and save it to a variable
            const priceElement = product.querySelector('._cDEzb_p13n-sc-price_3mJ9Z'); 

            // Check if both the name and price elements exist
            if (nameElement && priceElement) {
                // Get the inner text (name) of the product and trim any extra whitespace
                const name = nameElement.innerText.trim(); 
                // Get the inner text (price) of the product and trim any extra whitespace
                const price = priceElement.innerText.trim(); 
                // Push an object containing the name and price into the productsArray
                productsArray.push({ name, price }); 
            }
        });

        // Return the array of products back to the main script
        return productsArray; 
    });

    // Output the array of products to the console
    console.log(products); 

    // Close the browser instance to free up resources
    await browser.close(); 
})();

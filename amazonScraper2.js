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

/*
Expected Results

[
  {
    name: 'Stanley Quencher H2.0 FlowState Stainless Steel Vacuum Insulated Tumbler with Lid and Straw for Water, Iced Tea or Coffee,…',
    price: '$35.00'
  },
  {
    name: 'Hanes EcoSmart Fleece, Cotton-Blend Pullover, Crewneck Sweatshirt for Men (1 Or 2 Pack)',
    price: '$11.00'
  },
  {
    name: 'Apple iPhone 12, 64GB, Black - Fully Unlocked (Renewed)',
    price: '$289.00'
  },
  {
    name: 'Apple AirPods 2 with Charging Case - White (Renewed)',
    price: '$79.99'
  },
  {
    name: 'Apple iPhone 11, 64GB, Black - Unlocked (Renewed)',
    price: '$226.58'
  },
  {
    name: 'Apple iPhone SE 2nd Generation, US Version, 64GB, Black - Unlocked (Renewed)',
    price: '$125.00'
  },
  {
    name: 'Apple iPhone 12 Mini, 64GB, Blue - Unlocked (Renewed)',
    price: '$215.00'
  },
  {
    name: 'Apple iPad (10.2-Inch, Wi-Fi, 32GB) - Space Gray (Renewed)',
    price: '$147.00'
  },
  {
    name: 'Mighty Patch™ Original patch from Hero Cosmetics - Hydrocolloid Acne Pimple Patch for Covering Zits and Blemishes in Face and Skin,…',
    price: '$11.97'
  },
  {
    name: 'Clean Skin Club Clean Towels XL™, 100% USDA Biobased Face Towel, Disposable Face Towelette, Makeup Remover Dry Wipes,…',
    price: '$17.95'
  },
  {
    name: 'Neutrogena Makeup Remover Wipes, Ultra-Soft Cleansing Facial Towelettes for Waterproof Makeup, Alcohol-Free, Plant-Based, Twin…',
    price: '$9.79'
  },
  {
    name: 'eos Shea Better Body Lotion- Vanilla Cashmere, 24-Hour Moisture Skin Care, Lightweight & Non-Greasy, Made with Natural…',
    price: '$8.98'
  },
  {
    name: 'essence | Lash Princess False Lash Effect Mascara | Volumizing & Lengthening | Cruelty Free & Paraben Free',
    price: '$4.99'
  },
  {
    name: 'Amazon Basics Hypoallergenic 100% Cotton Rounds, 100 Count',
    price: '$2.67'
  },
  {
    name: 'Hearth and Homestead: Handmade Whipped Tallow Balm (Unscented/Herb-Infused) - Organic Body Butter with Infused Olive…',
    price: '$29.99'
  },
  {
    name: 'Custom Inside our Feeling 2 Characters Out costumes Emotional Shirt Design Custom Tees, Funny Characters',
    price: '$13.89'
  },
  {
    name: 'Massive Beads Black Tourmaline - Super Protection - Handmade Yoga Stretch Elastic Bracelet Natural Stone Crystal Healing Power…',
    price: '$9.99'
  },
  {
    name: 'Sweet Water Decor Hello Fall Soy Candles - Fall Candle with Hot Cider, Cinnamon, Cloves, and Nutmeg Scent for Home - Soy…',
    price: '$16.99'
  },
  {
    name: '14K Gold Filled Small Hoop Earrings for Cartilage Nose, Tiny Thin 7mm Piercing Hoop Ring 22 Gauge',
    price: '$7.98'
  },
  {
    name: 'Lipfidence Lip Lightening Cream for Dark Lips|Lip Lightener for Smokers and Non-Smokers | Help fade lip discoloration with Alpha Arbutin &…',
    price: '$22.99'
  },
  {
    name: 'Amazon Basics Neoprene Dumbbell Hand Weights',
    price: '$21.99'
  },
  {
    name: 'LifeStraw Personal Water Filter for Hiking, Camping, Travel, and Emergency Preparedness',
    price: '$17.47'
  },
  {
    name: 'Stanley IceFlow Stainless Steel Tumbler - Vacuum Insulated Water Bottle for Home, Office or Car Reusable Cup with Straw Leak…',
    price: '$35.00'
  },
  {
    name: 'Amazon Basics High Density Foam Roller for Exercise and Recovery',
    price: '$13.99'
  },
  {
    name: 'Fit Simplify Resistance Loop Exercise Bands with Instruction Guide and Carry Bag, Set of 5',
    price: '$9.98'
  },
  {
    name: 'LHKNL Headlamp Flashlight, 1200 Lumen Ultra-Light Bright LED Rechargeable Headlight with White Red Light,2-Pack Waterproof…',
    price: '$19.99'
  }
]

*/
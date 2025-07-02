// Simple browser automation to test the pages
const puppeteer = require('puppeteer');

async function testPages() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  try {
    console.log('Testing Zoom Whitening page...');
    await page.goto('http://localhost:8080/services/zoom-whitening', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 5000 });
    
    const title = await page.title();
    const h1Text = await page.$eval('h1', el => el.textContent);
    
    console.log('Zoom Whitening Page Title:', title);
    console.log('Zoom Whitening H1:', h1Text);
    
    console.log('\nTesting Front Teeth Veneers blog...');
    await page.goto('http://localhost:8080/choosing-veneers-for-the-front-4-teeth', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 5000 });
    
    const blogTitle = await page.title();
    const blogH1Text = await page.$eval('h1', el => el.textContent);
    
    console.log('Blog Page Title:', blogTitle);
    console.log('Blog H1:', blogH1Text);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  testPages();
}
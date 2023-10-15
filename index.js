// get city, state, zip code, median household income for 2021 and 2000
// land area
// latitude and longitude

// const puppeteer = require('puppeteer');

import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // now you can see the browser running
  const page = await browser.newPage();

  await page.goto('https://www.city-data.com/');

  await page.setViewport({width: 1080, height: 1024});

  await page.type('#intelligent_search', 'fort collins colorado');

  await page.keyboard.press('Enter');

  const textSelector = await page.waitForSelector('.city');
  const fullTitle = await textSelector?.evaluate(element => element.textContent);

  console.log(fullTitle);

  await browser.close();
})();
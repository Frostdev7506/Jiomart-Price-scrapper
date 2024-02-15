const puppeteer = require("puppeteer");
const express = require("express");

exports.fetchJiomartVegetablesDataController = async (req, res) => {
  const url =
    "https://www.jiomart.com/c/groceries/fruits-vegetables/fresh-vegetables/229";
  const data = await scrapeProduct(url);
  res.json(data);
};
async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const priceElement = await page.$(
    ".plp-card-details-price span.jm-heading-xxs.jm-mb-xxs"
  );
  const price = await page.evaluate((el) => el.textContent, priceElement);

  // Select all elements that match the given selector
  const priceElements = await page.$$(
    ".plp-card-details-price span.jm-heading-xxs.jm-mb-xxs"
  );

  // Iterate over each element to extract its text content
  const prices = await Promise.all(
    priceElements.map(async (element) => {
      return await page.evaluate((el) => el.textContent.trim(), element);
    })
  );

  const nameElement = await page.$(
    ".plp-card-details-name.line-clamp.jm-body-xs.jm-fc-primary-grey-80"
  );
  const name = await page.evaluate((el) => el.textContent, nameElement);

  // Select all elements that match the given selector
  const nameElements = await page.$$(
    ".plp-card-details-name.line-clamp.jm-body-xs.jm-fc-primary-grey-80"
  );

  // Iterate over each element to extract its text content
  const names = await Promise.all(
    nameElements.map(async (element) => {
      return await page.evaluate((el) => el.textContent.trim(), element);
    })
  );

  const output = names.map((name, index) => {
    return { name: name, price: prices[index] };
  });

  await browser.close();
  return output;
}

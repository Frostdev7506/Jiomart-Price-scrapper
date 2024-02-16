const puppeteer = require("puppeteer");
const express = require("express");

require("dotenv").config();

exports.fetchJiomartVegetablesDataController = async (req, res) => {
  const url =
    "https://www.jiomart.com/c/groceries/fruits-vegetables/fresh-vegetables/229";
  const PriceElements = ".plp-card-details-price span.jm-heading-xxs.jm-mb-xxs";
  const NameElements =
    ".plp-card-details-name.line-clamp.jm-body-xs.jm-fc-primary-grey-80";
  const data = await scrapeProduct(url, PriceElements, NameElements);
  res.json(data);
};
exports.fetchJiomartFruitsDataController = async (req, res) => {
  const url =
    "https://www.jiomart.com/c/groceries/fruits-vegetables/fresh-fruits/220";
  const PriceElements = ".plp-card-details-price span.jm-heading-xxs.jm-mb-xxs";

  const NameElements =
    ".plp-card-details-name.line-clamp.jm-body-xs.jm-fc-primary-grey-80";
  const data = await scrapeProduct(url, PriceElements, NameElements);
  res.json(data);
};

exports.fetchJiomartAttaDataController = async (req, res) => {
  const url =
    "https://www.jiomart.com/c/groceries/staples/atta-flours-sooji/26";
  const PriceElements = ".plp-card-details-price span.jm-heading-xxs.jm-mb-xxs";

  const NameElements =
    ".plp-card-details-name.line-clamp.jm-body-xs.jm-fc-primary-grey-80";
  const data = await scrapeProduct(url, PriceElements, NameElements);
  res.json(data);
};

async function scrapeProduct(url, PriceElements, NameElements) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  await page.goto(url);

  // Select all elements that match the given selector
  const priceElements = await page.$$(PriceElements);

  // Iterate over each element to extract its text content
  const prices = await Promise.all(
    priceElements.map(async (element) => {
      return await page.evaluate((el) => el.textContent.trim(), element);
    })
  );

  // Select all elements that match the given selector
  const nameElements = await page.$$(NameElements);

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

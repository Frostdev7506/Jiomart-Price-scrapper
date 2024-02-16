// routes/jiomartRoutes.js
const express = require("express");
const router = express.Router();

// Import controllers
const {
  fetchJiomartVegetablesDataController,
  fetchJiomartFruitsDataController,
  fetchJiomartAttaDataController,
} = require("../controller/scrapeController");

// Define routes
router.get("/jiomartfreshfruits", fetchJiomartFruitsDataController);
router.get("/jiomartfreshvegies", fetchJiomartVegetablesDataController);
router.get("/jiomartatta", fetchJiomartAttaDataController);

module.exports = router;

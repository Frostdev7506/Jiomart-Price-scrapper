// routes/jiomartRoutes.js
import express, { Router } from "express";
const router: Router = express.Router();

// Import controllers
import {
  fetchJiomartVegetablesDataController,
  fetchJiomartFruitsDataController,
  fetchJiomartAttaDataController,
} from "../controller/scrapeController";

// Define routes
router.get("/jiomartfreshfruits", fetchJiomartFruitsDataController);
router.get("/jiomartfreshvegies", fetchJiomartVegetablesDataController);
router.get("/jiomartatta", fetchJiomartAttaDataController);

export default router;

import express from "express";
import { createFoodSupplyRecord, feedFoodSupply, getFoodSupply } from "../controllers/foodsupply.controller.js";

const router = express.Router();

router.post("/create", createFoodSupplyRecord );
router.get("/getall", getFoodSupply);
router.post("/update", feedFoodSupply);

export default router;
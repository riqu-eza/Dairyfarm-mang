import express from "express";
import { create, getAllLivestock } from "../controllers/livestock.controller.js";

const router = express.Router();

router.post("/add", create)
router.get("/getall", getAllLivestock)

export default router;
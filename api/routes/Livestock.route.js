import express from "express";
import { create } from "../controllers/livestock.controller.js";

const router = express.Router();

router.post("/add", create)

export default router;
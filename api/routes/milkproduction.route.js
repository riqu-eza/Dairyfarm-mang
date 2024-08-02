import express  from "express";
import { create, getAllMilkProduction, getByDate } from "../controllers/milkproduction.controller.js";

const router = express.Router();

router.post("/add", create)
router.get("/getProduction", getAllMilkProduction)
router.get('/date/:date', getByDate);

export default router;
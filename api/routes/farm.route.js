import express from "express";
import { signin, signup , subuser } from "../controllers/farm.contoller.mjs";

const router = express.Router();

router.post("/create", signup)
router.post("/signin", signin)
router.post("/subuser", subuser)

export default router;
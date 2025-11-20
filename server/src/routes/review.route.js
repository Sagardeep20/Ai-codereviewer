import express from "express";
import { analyzeCode } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/review", analyzeCode);

export default router;

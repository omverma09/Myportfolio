import express, { Router } from "express";
import {getSkills, addSkills} from "../controllers/skills.controller.js"
import { adminAuth } from "../middelewares/auth.meddleware.js";

const router = express.Router();

router.get("/get-Skills", getSkills); //For all users
router.post("/add-Skills", addSkills); // only admin

export default router;
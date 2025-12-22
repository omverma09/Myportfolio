import express, { Router } from "express";
import {getSkills, addSkills} from "../controllers/skills.controller.js"

const router = express.Router();

router.get("/get-skill", getSkills); //For all users
router.post("/add-skill", addSkills); // only admin

export default router;
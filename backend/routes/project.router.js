import express, { Router } from "express";
import upload from "../config/cloudinary.config.js";
import { addProjects, getProject } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/get-project", getProject);
router.post("/add-project", upload.single("image"), addProjects);

export default router;
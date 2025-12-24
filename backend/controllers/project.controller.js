import Project from "../models/projects.model.js"

export const getProject = async(req, res) => {
    try {
        const projects = await Project.find({});
        // console.log(projects);

        res.status(200).json(projects);
    } catch (error) {
        console.log(error.message);
    }
}

export const addProjects = async (req, res) => {

    try {
        const { title, tech, desc, github, live } = req.body;

        if (!title || !tech || !desc || !github || !live) {
            return res.status(400).json({ message: "All fields required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const project = await Project.create({
            title,
            tech,
            desc,
            image: req.file.path, // Cloudinary URL
            github,
            live
        });
        res.status(201).json({
            message: "Project added sucessfully",
            data: project
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tech: {
        type: [String], // string array
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String, // image URL
        required: true
    },
    github: {
        type: String,
        required: true
    },
    live: {
        type: String,
    }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },

        longDescription: {
            type: String,
            trim: true,
        },

        techStack: {
            type: [String],
            required: [true, "Tech stack is required"],
            validate: {
                validator: (arr) => arr.length > 0,
                message: "At least one technology is required",
            },
        },

        category: {
            type: String,
            enum: [
                "Full Stack",
                "Frontend",
                "Backend",
                "API",
                "Mobile",
                "Other",
            ],
            default: "Full Stack",
        },

        status: {
            type: String,
            enum: ["completed", "in-progress", "archived"],
            default: "completed",
        },

        githubUrl: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, "Enter a valid URL"],
        },

        liveUrl: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, "Enter a valid URL"],
        },

        imageUrl: {
            type: String,
            trim: true,
        },

        features: {
            type: [String],
            default: [],
        },

        challenges: {
            type: String,
            trim: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.index({ featured: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ order: 1 });

module.exports = mongoose.model("Project", projectSchema);
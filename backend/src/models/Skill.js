const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Skill name is required"],
            trim: true,
            unique: true,
            maxlength: [50, "Skill name cannot exceed 50 characters"],
        },

        icon: {
            type: String,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "Frontend",
                "Backend",
                "Database",
                "DevOps",
                "Tools",
                "Other",
            ],
            required: [true, "Category is required"],
        },

        proficiency: {
            type: Number,
            min: [1, "Proficiency must be at least 1"],
            max: [100, "Proficiency cannot exceed 100"],
            default: 80,
        },

        order: {
            type: Number,
            default: 0,
        },

        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

skillSchema.index({ category: 1 });
skillSchema.index({ isVisible: 1 });
skillSchema.index({ order: 1 });

module.exports = mongoose.model("Skill", skillSchema);
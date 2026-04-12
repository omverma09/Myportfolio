const Skill = require("../models/Skill");
const {
    successResponse,
    errorResponse,
} = require("../utils/apiResponse");

const getAllSkills = async (req, res, next) => {
    try {
        const { category, isVisible, sort = "order" } = req.query;

        const filter = {};

        if (category) filter.category = category;

        if (req.user?.role === "admin") {
            if (isVisible !== undefined) {
                filter.isVisible = isVisible === "true" || isVisible === true;
            }
        } else {
            filter.isVisible = true;
        }

        const skills = await Skill.find(filter).sort(sort).lean();

        const grouped = skills.reduce((acc, skill) => {
            const cat = skill.category || "Other";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill);
            return acc;
        }, {});

        return successResponse(res, 200, "Skills fetched successfully", {
            skills,
            grouped,
            total: skills.length,
        });

    } catch (err) {
        next(err);
    }
};

const getSkillById = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id).lean();

        if (!skill) {
            return errorResponse(res, 404, "Skill not found");
        }

        return successResponse(res, 200, "Skill fetched successfully", skill);

    } catch (err) {
        next(err);
    }
};

const createSkill = async (req, res, next) => {
    try {
        const { name, icon, category, proficiency, order, isVisible } = req.body;

        // Check for duplicate skill name
        const exists = await Skill.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (exists) {
            return errorResponse(
                res,
                400,
                `Skill "${name}" already exists`
            );
        }

        const skill = await Skill.create({
            name,
            icon,
            category,
            proficiency,
            order,
            isVisible,
        });

        return successResponse(res, 201, "Skill created successfully", skill);

    } catch (err) {
        next(err);
    }
};

const updateSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return errorResponse(res, 404, "Skill not found");
        }

        // Check name conflict with another skill
        if (req.body.name && req.body.name !== skill.name) {
            const exists = await Skill.findOne({
                name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
                _id: { $ne: req.params.id },
            });

            if (exists) {
                return errorResponse(
                    res,
                    400,
                    `Skill "${req.body.name}" already exists`
                );
            }
        }

        const updated = await Skill.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        return successResponse(res, 200, "Skill updated successfully", updated);

    } catch (err) {
        next(err);
    }
};

const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return errorResponse(res, 404, "Skill not found");
        }

        await Skill.findByIdAndDelete(req.params.id);

        return successResponse(res, 200, "Skill deleted successfully");

    } catch (err) {
        next(err);
    }
};

const toggleVisibility = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return errorResponse(res, 404, "Skill not found");
        }

        skill.isVisible = !skill.isVisible;
        await skill.save();

        return successResponse(
            res,
            200,
            `Skill ${skill.isVisible ? "visible" : "hidden"} successfully`,
            skill
        );

    } catch (err) {
        next(err);
    }
};

const bulkCreateSkills = async (req, res, next) => {
    try {
        const { skills } = req.body;

        if (!Array.isArray(skills) || skills.length === 0) {
            return errorResponse(res, 400, "Skills array is required");
        }

        const created = await Skill.insertMany(skills, {
            ordered: false,
            rawResult: true,
        });

        return successResponse(
            res,
            201,
            `${created.insertedCount} skills created successfully`,
            { insertedCount: created.insertedCount }
        );

    } catch (err) {
        if (err.code === 11000) {
            return successResponse(
                res,
                201,
                "Skills created (some duplicates skipped)",
                { insertedCount: err.result?.nInserted || 0 }
            );
        }
        next(err);
    }
};

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
    toggleVisibility,
    bulkCreateSkills,
};
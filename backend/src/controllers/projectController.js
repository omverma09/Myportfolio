const Project = require("../models/Project");
const {
    successResponse,
    errorResponse,
    paginatedResponse,
} = require("../utils/apiResponse");

const getAllProjects = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            status,
            featured,
            sort = "-createdAt",
        } = req.query;

        const filter = {};

        if (category) filter.category = category;
        if (status) filter.status = status;

        if (featured !== undefined) {
            filter.featured = featured === "true" || featured === true;
        }

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const [projects, total] = await Promise.all([
            Project.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limitNum)
                .lean(),
            Project.countDocuments(filter),
        ]);

        return paginatedResponse(
            res,
            projects,
            pageNum,
            limitNum,
            total,
            "Projects fetched successfully"
        );

    } catch (err) {
        next(err);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).lean();

        if (!project) {
            return errorResponse(res, 404, "Project not found");
        }

        return successResponse(
            res,
            200,
            "Project fetched successfully",
            project
        );

    } catch (err) {
        next(err);
    }
};

const createProject = async (req, res, next) => {
    try {
        const {
            title,
            description,
            longDescription,
            techStack,
            category,
            status,
            githubUrl,
            liveUrl,
            features,
            challenges,
            featured,
            order,
        } = req.body;

        let imageUrl = "";
        if (req.file) {
            imageUrl = req.file.path;
        }

        const project = await Project.create({
            title,
            description,
            longDescription,
            techStack,
            category,
            status,
            githubUrl,
            liveUrl,
            imageUrl,
            features,
            challenges,
            featured,
            order,
        });

        return successResponse(
            res,
            201,
            "Project created successfully",
            project
        );

    } catch (err) {
        next(err);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return errorResponse(res, 404, "Project not found");
        }

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        return successResponse(
            res,
            200,
            "Project updated successfully",
            updated
        );

    } catch (err) {
        next(err);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return errorResponse(res, 404, "Project not found");
        }

        await Project.findByIdAndDelete(req.params.id);

        return successResponse(res, 200, "Project deleted successfully");

    } catch (err) {
        next(err);
    }
};

const toggleFeatured = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return errorResponse(res, 404, "Project not found");
        }

        project.featured = !project.featured;
        await project.save();

        return successResponse(
            res,
            200,
            `Project ${project.featured ? "marked as" : "removed from"} featured`,
            project
        );

    } catch (err) {
        next(err);
    }
};

const reorderProjects = async (req, res, next) => {
    try {
        const { projects } = req.body;

        if (!Array.isArray(projects) || projects.length === 0) {
            return errorResponse(res, 400, "Projects array is required");
        }

        const bulkOps = projects.map(({ id, order }) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order } },
            },
        }));

        await Project.bulkWrite(bulkOps);

        return successResponse(res, 200, "Projects reordered successfully");

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    reorderProjects,
};
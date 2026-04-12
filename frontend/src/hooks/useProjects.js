import { useState, useEffect, useCallback } from "react";
import { projectService } from "../services/projectService";
import { getErrorMessage } from "../utils";

// ── All Projects Hook ─────────────────────────────
export const useProjects = (initialParams = {}) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState(initialParams);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await projectService.getAll(params);
            const data = res.data;

            // Support both { data: [] } and plain array responses
            setProjects(Array.isArray(data) ? data : data.data ?? []);
            setTotalCount(data.total ?? data.length ?? 0);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        loading,
        error,
        totalCount,
        refetch: fetchProjects,
        setParams,
    };
};

// ── Featured Projects Hook ────────────────────────
export const useFeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeatured = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await projectService.getFeatured();
            const data = res.data;

            setFeaturedProjects(Array.isArray(data) ? data : data.data ?? []);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeatured();
    }, [fetchFeatured]);

    return {
        featuredProjects,
        loading,
        error,
        refetch: fetchFeatured,
    };
};

// ── Single Project Hook ───────────────────────────
export const useProjectById = (id) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProject = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);

            const res = await projectService.getById(id);
            const data = res.data;

            setProject(data.data ?? data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return { project, loading, error, refetch: fetchProject };
};
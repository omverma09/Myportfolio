import { useState, useEffect, useCallback } from "react";
import { skillService } from "../services/skillService";
import { getErrorMessage } from "../utils";

// All Skills Hook
export const useSkills = (initialParams = {}) => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useState(initialParams);

    const fetchSkills = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await skillService.getAll(params);
            const data = res.data;

            setSkills(Array.isArray(data) ? data : data.data ?? []);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    return {
        skills,
        loading,
        error,
        refetch: fetchSkills,
        setParams,
    };
};

// Grouped Skills Hook
// Returns skills grouped by their category field
export const useGroupedSkills = () => {
    const { skills, loading, error, refetch } = useSkills();

    const grouped = skills.reduce((acc, skill) => {
        const cat = skill.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    return { grouped, loading, error, refetch };
};
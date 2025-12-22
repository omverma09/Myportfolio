import { useState } from "react";
import axios from "axios";
import server from "../environment";

export default function AddSkill() {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
;
    const submitHandler = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("adminToken");

        if (!token) {
            alert("Please login first! No admin token found.");
            console.error("adminToken not found in localStorage");

            // Debug: Show what's actually in localStorage
            console.log("Available keys in localStorage:");
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                console.log(`- ${key}: ${localStorage.getItem(key)?.substring(0, 30)}...`);
            }

            return;
        }

        console.log("Token retrieved successfully:", token.substring(0, 20) + "...");

        // Backend expects array, so wrap in array
        axios.post(
            `${server}/api/skill/add-skill`,
            { name, icon }, // Array of skills
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                console.log("Success:", res.data);
                alert("Skill added successfully!");
                // Reset form
                setName("");
                setIcon("");
            })
            .catch(err => {
                console.error("Error:", err);

                if (err.response) {
                    console.log("Status:", err.response.status);
                    console.log("Data:", err.response.data);

                    if (err.response.status === 401) {
                        alert("Unauthorized! adminToken may be invalid or expired.");
                        // Clear invalid token
                        localStorage.removeItem("adminToken");
                    } else if (err.response.status === 400) {
                        alert("Bad request: " + (err.response.data.message || "Check your data"));
                    }
                } else {
                    alert("Network error. Check backend server.");
                }
            });
    };

    return (
        <form className="add-skill-form" onSubmit={submitHandler}>
            <h2 className="add-skill-title">Add Skill</h2>

            <input
                className="add-skill-input"
                type="text"
                placeholder="Skill Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="add-skill-input"
                type="text"
                placeholder="CDN Icon URL"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
            />

            <button className="add-skill-btn" type="submit">Add</button>
        </form>

    );
}

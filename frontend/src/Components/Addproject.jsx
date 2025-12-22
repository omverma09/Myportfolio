import React, { useState } from "react";
import axios from "axios";
import server from "../environment";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("");
  const [image, setImage] = useState(null);
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [preview, setPreview] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Login first then add project");
      console.error("Admin not found");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tech", tech);
    formData.append("image", image);
    formData.append("github", github);
    formData.append("live", live);

    try {
      const res = await axios.post(
        `${server}/api/project/add-project`, formData
      );

      alert("Project added successfully ✅");
      console.log(res.data);
      window.location.reload();

      // clear form
      setTitle("");
      setDesc("");
      setTech("");
      setImage(null);
      setPreview(null);
      setGithub("");
      setLive("");
    } catch (error) {
      console.log(error);
      alert("Error adding project");
    }
  };

  return (
    <div className="container mt-4 w-50">
      <div className="card p-3 shadow-lg">
        <h4 className="text-center mb-4">Add Project</h4>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Project Title"
            className="form-control mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Project Description"
            className="form-control mb-2"
            rows="2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            type="text"
            placeholder="Technologies Used (React, Node, MongoDB)"
            className="form-control mb-2"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            placeholder="Choose an Image"
            className="form-control mb-2"
            // value={img}
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          <input
            type="text"
            placeholder="GitHub Repo Link"
            className="form-control mb-2"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />

          <input
            type="text"
            placeholder="Live Project Link"
            className="form-control mb-2"
            value={live}
            onChange={(e) => setLive(e.target.value)}
          />

          {preview && (
            <img src={preview} alt="preview" className="preview-img" />
          )}
          <button className="btn btn-primary w-100">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
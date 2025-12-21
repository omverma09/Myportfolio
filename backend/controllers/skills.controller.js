import Skill from "../models/skills.model.js"

//For fetching skill
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//For adding new skill
export const addSkills = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: "All fields required" });
    }
    const skill = await Skill.create({ name, icon });

    res.status(201).json({
      message: "Skill added successfully",
      data: skill,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//for register.
export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existAdmin = await Admin.findOne({ email });
        if (existAdmin) {
            return res.status(409).json({ message: "Admin already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const admin = Admin.create({ email, password: hashedPass });

        res.json({
            message: "Admin register successfuly",
            admin: {
                id: admin._id,
                email: admin.email
            },
        });
    } catch (error) {
        console.log(error.message);
    }
}
//for login.
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Agar user ne form empty ho.
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Admin exist krta hai ki nhi.
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                message: "You are not admin"
            })
        }

        // password match krta hai ki nhi.
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Token generate.
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: "admin"  // IMPORT
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        //Responce..
        res.json({
            message: "Login is sucessfull",
            token,
        })
    } catch (error) {
        console.log(error.message);
    }

};

// for logout
export const logOut = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // true in production (https)
        sameSite: "strict",
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}

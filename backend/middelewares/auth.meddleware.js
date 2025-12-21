import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Login required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // admin check
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
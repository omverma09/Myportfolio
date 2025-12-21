import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
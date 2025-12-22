import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import adminRoute from "./routes/admin.router.js"
import skillsRoute from "./routes/skills.router.js"
import projectRoute from "./routes/project.router.js"

const app = express()
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl).then(() => {
  console.log("connected to mongoDB Atlas..");
}).catch((e) => {
  console.log(e.message);
})

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/skill", skillsRoute);
app.use("/api/project", projectRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
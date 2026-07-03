require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Resume Analyzer Backend Running 🚀"
    });
});

app.use("/upload", uploadRoutes);
app.use("/api/analyze", analyzeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
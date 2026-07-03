const { readPDF } = require("../services/pdfService");
const { getAISuggestions } = require("../services/geminiService");

const analyzeResume = async (req, res) => {

    try {

        const text = await readPDF(req.file.path);
        const jobDescription = req.body.jobDescription || "";

        console.log("TEXT LENGTH:", text.length);

        const skills = [
            "python",
            "sql",
            "excel",
            "power bi",
            "powerbi",
            "pandas",
            "numpy",
            "scikit",
            "machine learning",
            "data analysis",
            "data visualization",
            "statistics",
            "mysql",
            "git",
            "github"
        ];

        let score = 0;
        let jobMatch = 0;
        let strengths = [];
        let improvements = [];

        skills.forEach(skill => {

            if (text.toLowerCase().includes(skill)) {

                score += 8;
                strengths.push(skill);

            }

        });
        if (jobDescription.trim() !== "") {

    const jd = jobDescription.toLowerCase();

    let matched = 0;

    skills.forEach(skill => {

        if (
            jd.includes(skill) &&
            text.toLowerCase().includes(skill)
        ) {
            matched++;
        }

    });

    const total = skills.filter(skill => jd.includes(skill)).length;

    jobMatch = total === 0
        ? 100
        : Math.round((matched / total) * 100);

}

        if (!text.toLowerCase().includes("python"))
            improvements.push("Add Python Skills");

        if (!text.toLowerCase().includes("sql"))
            improvements.push("Add SQL Skills");

        if (!text.toLowerCase().includes("power bi"))
            improvements.push("Add Power BI Skills");

        if (!text.toLowerCase().includes("project"))
            improvements.push("Add More Projects");

        if (score > 100)
            score = 100;

        const aiSuggestions = await getAISuggestions(text);

        res.json({
            score,
            jobMatch,
            strengths,
            improvements,
            aiSuggestions
           
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    analyzeResume
};
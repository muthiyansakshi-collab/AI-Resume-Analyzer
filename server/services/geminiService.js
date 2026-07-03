const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAISuggestions = async (resumeText) => {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
You are a professional ATS Resume Analyzer.

Analyze the following resume.

Return in this format:

ATS Score:
Strengths:
Missing Skills:
Suggestions:
Interview Tips:

Resume:

${resumeText}
`;

        const result = await model.generateContent(prompt);

        return result.response.text();

    } catch (error) {

        console.log(error);

        return "AI Analysis Failed.";

    }

};

module.exports = {
    getAISuggestions
};
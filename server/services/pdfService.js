const fs = require("fs");
const pdf = require("pdf-parse");

const readPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);

        const data = await pdf(dataBuffer);

        console.log("TEXT LENGTH:", data.text.length);
        console.log(data.text);

        return data.text;

    } catch (error) {
        console.log("PDF Error:", error);
        return "";
    }
};

module.exports = {
    readPDF
};
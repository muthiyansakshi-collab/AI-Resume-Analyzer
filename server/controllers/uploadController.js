const fs = require("fs");

const uploadResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully!",
      fileName: req.file.filename,
      path: req.file.path
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  uploadResume
};

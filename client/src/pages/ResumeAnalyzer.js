import { useState } from "react";
import UploadBox from "../components/UploadBox";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import jsPDF from "jspdf";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const uploadResume = async () => {

    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      alert("Upload Failed");

    }

  };
 

  const analyzeResume = async () => {

    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(
        "http://localhost:5000/api/analyze",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);
      alert("Analysis Failed");

    }

    setLoading(false);

  };
const downloadReport = () => {

  if (!result) return;

  const doc = new jsPDF();

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AI Resume Analyzer Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`ATS Score: ${result.score}/100`, 20, y);

  y += 15;

  doc.setFont("helvetica", "bold");
  doc.text("Skills Found:", 20, y);

  doc.setFont("helvetica", "normal");

  result.strengths.forEach(skill => {

    y += 8;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(`• ${skill}`, 25, y);

  });

  y += 15;

  if (y > 280) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.text("Suggestions:", 20, y);

  doc.setFont("helvetica", "normal");

  result.improvements.forEach(item => {

    y += 8;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(`• ${item}`, 25, y);

  });

  if (result.aiSuggestions) {

    y += 15;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text("AI Analysis:", 20, y);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(result.aiSuggestions, 170);

    lines.forEach(line => {

      y += 8;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(line, 20, y);

    });

  }

  doc.save("ATS_Report.pdf");

};
  return (
    <div>

      <nav className="navbar navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold fs-3">
          <i className="bi bi-file-earmark-person-fill me-2"></i>
          AI Resume Analyzer
          </span>
        </div>
      </nav>

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-lg p-4">

              <h2 className="text-center mb-4 fw-bold text-primary">
              <i className="bi bi-robot me-2"></i>
              Analyze Your Resume
              </h2>

              <p className="text-center text-muted mb-4">
              Upload your resume and compare it with the Job Description using AI.
              </p>

              <UploadBox
                file={file}
                setFile={setFile}
              />
              <textarea
              className="form-control mt-3"
              rows="6"
              placeholder="Paste Job Description Here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>


              <button
                className="btn btn-success w-100 mt-3"
                onClick={uploadResume}
              >
                 <i className="bi bi-upload me-2"></i>
                 Upload Resume
              </button>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={analyzeResume}
              >
                {loading ? (
                <>
               <span className="spinner-border spinner-border-sm me-2"></span>
               Analyzing...
               </>
               ) : (
  <>
    <i className="bi bi-cpu me-2"></i>
    Analyze Resume
  </>
               )}
              </button>
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={downloadReport}
              >
              <i className="bi bi-download me-2"></i>
               Download ATS Report
              </button>

            </div>

            {result && (

              <div className="card shadow-lg mt-4 p-4">

                
                <h3 className="text-success text-center">
                  ⭐ ATS Score : {result.score}/100
                </h3>

                <ProgressBar
                  now={result.score}
                  label={`${result.score}%`}
                  className="mb-4"
                />
                <h4 className="text-primary text-center mt-3">
    🎯 Job Match : {result.jobMatch}%
</h4>

                <div className="row">

                  <div className="col-md-6">

                    <div className="card border-success shadow-sm p-3 mb-3">

                      <h4>✅ Skills Found</h4>

                      <ul>
                        {result.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="card border-warning shadow-sm p-3 mb-3">

                      <h4>💡 Suggestions</h4>

                      <ul>
                        {result.improvements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                    </div>

                  </div>

                </div>

                {result.aiSuggestions && (

                  <div className="card border-primary shadow-sm p-3 mt-3">

                    <h4>🤖 AI Analysis</h4>

                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        fontFamily: "inherit"
                      }}
                    >
                      {result.aiSuggestions}
                    </pre>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );

}

export default ResumeAnalyzer;
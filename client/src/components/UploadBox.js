import { useDropzone } from "react-dropzone";

function UploadBox({ file, setFile }) {

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    }
  });

  return (
    <div
      {...getRootProps()}
      className="border border-primary rounded p-4 mb-3 text-center bg-light"
      style={{ cursor: "pointer" }}
    >
      <input {...getInputProps()} />

      <h5>📂 Drag & Drop Resume Here</h5>

      <p>or Click to Upload PDF / DOCX</p>

      {file && (
        <p className="text-success fw-bold">
          ✅ Selected File: {file.name}
        </p>
      )}
    </div>
  );
}

export default UploadBox;
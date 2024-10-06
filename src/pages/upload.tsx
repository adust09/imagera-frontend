import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosClient.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage(response.data.message);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMessage("Upload failed");
      }
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

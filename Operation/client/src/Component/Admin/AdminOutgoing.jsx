import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Button } from 'antd';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [files, setFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(''); // Declare pdfFile state

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_URL');
      const data = await response.json();
      setFiles(data.response); // Assuming the response contains an array of files
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleViewPdf = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/file/${fileId}`);
      const data = await response.json();
      if (data.response) {
        // If the file data is successfully fetched from the backend
        const fileUrl = data.response.fileUrl; // Adjust this based on your backend response structure
        setPdfFile(fileUrl); // Set the PDF file URL to be displayed in the PDF viewer
      } else {
        // If the file data is not found or an error occurs
        setPdfError('PDF file not found'); // Set an appropriate error message
        setPdfFile(''); // Clear the PDF file URL
      }
    } catch (error) {
      console.error('Error fetching PDF file:', error);
      setPdfError('Error fetching PDF file'); // Set an appropriate error message
      setPdfFile(''); // Clear the PDF file URL
    }
  };

  return (
    <div className="container">
      <div className="table-container">
        <table className="table table-bordered caption-top">
          <caption>List of Documents</caption>
          <thead className="table-dark">
            <tr>
              <th scope="col">Doc Code</th>
              <th scope="col">Recipient</th>
              <th scope="col">Details</th>
              <th scope="col">Date of Letter</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id}>
                <td>{file.Doc_code}</td>
                <td>{file.recipient}</td>
                <td>{file.description}</td>
                <td>{file.date}</td>
                <td>{file.status}</td>
                <td>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={() => handleViewPdf(file._id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        )}
      </div>
    </div>
  );
}

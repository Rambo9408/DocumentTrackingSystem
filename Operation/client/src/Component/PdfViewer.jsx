import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';

function PdfViewer() {
  const { filename } = useParams(); // Make sure you receive the filename parameter correctly
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState('');
  const [pdfError, setPdfError] = useState('');

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        console.log('Filename:', filename);
        if (!filename) {
          throw new Error('No filename provided');
        }

        const response = await axios.get(`http://localhost:3000/uploads/${filename}`, {
          responseType: "blob",
        });

        if (!response.data) {
          throw new Error('No PDF data received');
        }

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        setPdfFile(pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setPdfError('Error fetching PDF. Please try again later.');
      }
    };

    fetchPdf();
  }, [filename]);

  return (
    <div className="container">
      <div className="viewer">
        {pdfFile ? (
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        ) : pdfError ? (
          <div className="error">{pdfError}</div>
        ) : (
          <div className="loading">Loading PDF...</div>
        )}
      </div>
    </div>
  );
}

export default PdfViewer;
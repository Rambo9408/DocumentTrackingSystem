import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";

import "./home.css";

export default function Outgoing() {
  const [documentsList, setDocumentsList] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [endedCount, setEndedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/file");
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setDocumentsList(response.data);
          setPendingCount(response.data.pending ? response.data.pending.length : 0);
          setEndedCount(response.data.ended ? response.data.ended.length : 0);
        } else {
          console.error("Error fetching documents: Response data is not an array");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleCompose = () => {
    navigate("/compose");
  };

  const handleView = (doc) => {
    navigate(`/PdfViewer/${doc.filename}`);
  };

  return (
    <div>
        <div className="table-container">
        <table className="table table-bordered caption-top">
          <caption>List of Documents</caption>
          <thead className="table-dark">
            <tr>
              <th scope="col">Doc Code</th>
              <th scope="col">Recipient</th>
              <th scope="col">Details</th>
              <th scope="col">Date of Letter</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {documentsList.length > 0 ? (
              documentsList.map((doc) => (
                <tr key={doc.filename}>
                  <td>{doc.Doc_code}</td>
                  <td>{doc.recipient}</td>
                  <td>{doc.details}</td>
                  <td>{doc.date}</td>
                  <td>
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={() => handleView(doc)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No documents found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

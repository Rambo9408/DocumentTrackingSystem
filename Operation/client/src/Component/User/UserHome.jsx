import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";

import "./home.css";

export default function UserHome() {
  const [documentsList, setDocumentsList] = useState([]);
  const [incomingCount, setIncomingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);
  const [endedCount, setEndedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/file");
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setDocumentsList(response.data);
          setIncomingCount(response.data.incoming ? response.data.incoming.length : 0);
          setPendingCount(response.data.pending ? response.data.pending.length : 0);
          setReceivedCount(response.data.received ? response.data.received.length : 0);
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
    navigate("/user/compose");
  };

  const handleView = (doc) => {
    navigate(`/PdfViewer/${doc.filename}`);
  };

  return (
    <div>
      <div className="black-box">
        <div className="blue-box">
          <div className="leaves">
            <h4>Incoming Documents</h4>
            <h4>{incomingCount}</h4>
          </div>
        </div>
        <div className="yellow-box">
          <div className="leaves">
            <h4>Pending Documents</h4>
            <h4>{pendingCount}</h4>
          </div>
        </div>
        <div className="green-box">
          <div className="leaves">
            <h4>Received Documents</h4>
            <h4>{receivedCount}</h4>
          </div>
        </div>
        <div className="red-box">
          <div className="leaves">
            <h4>Ended Documents</h4>
            <h4>{endedCount}</h4>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCompose}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
          Compose
        </button>
      </div>

      <div className="table-container">
        <table className="table table-bordered caption-top">
          <caption>List of Documents</caption>
          <thead className="table-dark">
            <tr>
              <th scope="col">Doc Code</th>
              <th scope="col">Sender</th>
              <th scope="col">Recipient</th>
              
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {documentsList.length > 0 ? (
              documentsList.map((doc) => (
                <tr key={doc.filename}>
                  <td>{doc.Doc_code}</td>
                  <td>{doc.sender}</td>
                  <td>{doc.recipient}</td>
                  
                  <td>{doc.status}</td>
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
                <td colSpan="6" className="text-center">
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

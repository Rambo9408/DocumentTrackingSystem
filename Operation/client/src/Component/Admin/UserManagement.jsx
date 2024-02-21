import React, { useEffect, useState } from "react";
import "./admin.css";
import { Button } from "react-bootstrap";
import Register from "../Register";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

// Define fetchUserList function outside the component
const fetchUserList = async (searchValue) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users?search=${searchValue}`);
    return response.data.map(user => ({
      value: user.id,
      label: user.name,
    }));
  } catch (error) {
    console.error('Error fetching user list:', error);
    return [];
  }
};

export default function UserManagement() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userslist, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data
        setUsers(response.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(true); // Keep loading as true if there's an error
      });
  }, []);

  const handleDelete = (userId) => {
    console.log(userId);
    axios
      .post("http://localhost:3000/api/user/delete", { userId })
      .then((res) => {
        console.log(res.data);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      })
      .catch((error) => {
        console.error(error);
        setError("Error deleting user. Please try again later.");
      });
  };

  const handleUpdate = (userId) => {
    console.log("Update user with ID:", userId);
    // Implement update functionality here
  };

  return (
    <div>
      <div className="Listheader">
        <h2>User List</h2>
        <span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setModalIsOpen(true);
            }}
            style={{ marginLeft: "10px" }}
          >
            Add New User
          </button>
        </span>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
        >
          <button
            className="cancel-button"
            id="form-open"
            onClick={() => setModalIsOpen(false)}
          >
            Close Modal
          </button>
          <Register />
        </Modal>
      </div>
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="table table-bordered caption-top">
            <thead className="table-dark">
              <tr>
                {/* <th scope="col">User Id</th> */}
                <th scope="col">Full Name</th>
                <th scope="col">Username</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userslist.map((user) => (
                <tr key={user._id}>
                  {/* <td scope="row"></td> */}
                  <td>{user.fullname}</td>
                  <td>{user.username}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button onClick={() => handleUpdate(user._id)}>
                      Update
                    </Button>
                    <Button onClick={() => handleDelete(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

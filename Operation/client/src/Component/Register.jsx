import './register.css';
import { useState } from "react";
import { validateEmail } from "./utils";
import axios from 'axios';

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

export default function Register() {
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("role");
  const [dateOfJoining, setDateOfJoining] = useState(new Date().toISOString().substr(0, 10));

  const getIsFormValid = () => {
    return (
      userId &&
      fullName &&
      validateEmail(email) &&
      password.length >= 8 &&
      role !== "role" &&
      username &&
      contact
    );
  };

  const clearForm = () => {
    setUserId("");
    setFullName("");
    setUsername("");
    setContact("");
    setEmail("");
    setPassword("");
    setRole("role");
    setDateOfJoining(new Date().toISOString().substr(0, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = '';
    if (role === 'user') { 
      url = 'http://localhost:3000/api/user/register';
    } else if (role === 'admin') { 
      url = 'http://localhost:3000/api/admin/register';
    }

    axios.post(url, {
      userId,
      fullName,
      username,
      contact,
      email,
      password,
      role,
      dateOfJoining
    })
    .then(({ data }) => {
      console.log(data);
      alert("Account created!");
      clearForm();
    })
    .catch(err => {
      console.error(err);
      alert("Error creating account. Please try again.");
    });
  };

  return (
    <div className="RegistrationApp">
      <form onSubmit={handleSubmit} className="registrationForm">
        <h2>REGISTRATION FORM</h2>
        <div className="formRow">
          <div className="Field">
            <label>User ID <sup>*</sup></label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
            />
          </div>
          <div className="Field">
            <label>Full name <sup>*</sup></label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
            />
          </div>
        </div>
        <div className="formRow">
          <div className="Field">
            <label>Username <sup>*</sup></label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="Field">
            <label>Contact <sup>*</sup></label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact"
              type="number"
            />
          </div>
        </div>
        <div className="formRow">
          <div className="Field">
            <label>Email address <sup>*</sup></label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>Password <sup>*</sup></label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {password.length > 0 && password.length < 8 && <PasswordErrorMessage />}
          </div>
        </div>
        <div className="formRow">
          <div className="Field">
            <label>Role <sup>*</sup></label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="Field">
            <label>Date of joining <sup>*</sup></label>
            <input
              value={dateOfJoining}
              type="date"
              onChange={(e) => setDateOfJoining(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" disabled={!getIsFormValid()}>
          Create account
        </button>
      </form>
    </div>
  );
}

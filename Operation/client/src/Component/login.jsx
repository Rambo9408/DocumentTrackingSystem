import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Don't forget to import axios

const roles = [
  { value: "user", text: "User" },
  { value: "admin", text: "Admin" },
];

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

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0].value);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let url = "";
      if (role === "admin") {
        url = "http://localhost:3000/api/admin/adminlogin";
      } else if (role === "user") {
        url = "http://localhost:3000/api/admin/userlogin";
      } else {
        console.error("Invalid role");
        return;
      }

      const response = await axios.post(url, {
        username,
        password,
        role,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Redirect to /admin if the user logs in as an admin
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate(`/${role}`);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <a href={`http://localhost:3000`} className="nav_logo">
            <img
              src="https://images-workbench.99static.com/alRM7OHaLHbw-HDzd4AS1YnD8CU=/http://s3.amazonaws.com/projects-files/18/1847/184768/da7b63f4-dac3-557b-2589-4412be10ab47.png"
              alt="Document Tracker Logo"
            />
          </a>
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#" className="nav_link">
                Home
              </a>
              <a href="#" className="nav_link">
                Product
              </a>
              <a href="#" className="nav_link">
                Services
              </a>
              <a href="#" className="nav_link">
                Contact
              </a>
            </li>
          </ul>
          <button
            className="button"
            id="form-open"
            onClick={() => setModalIsOpen(true)}
          >
            Login
          </button>
        </nav>
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="container modal-container">
          <div className="row modal-row">
            <div className="offset-4 col-3">
              <h2>Login</h2>
            </div>
            <div className="offset-2 col-3">
              <button
                className="cancel-button"
                id="form-open"
                onClick={() => setModalIsOpen(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
          <div className="role-select">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <form
            className="form login_form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="row modal-row">
              Username
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="row modal-row">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row modal-row">
              <button type="submit">Login</button>
            </div>
            <div className="row modal-row">
              New User?{" "}
              <Link to="/register" style={{ width: "20%" }}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </Modal>

       <div className="details_container bg-white rounded shadow overflow-hidden">
        <h2>About Project</h2>
        <p>
          The Document Tracking System (DTS) app is designed to streamline and
          enhance the management of documents within an organization. It offers
          a centralized platform for tracking, organizing, and accessing various
          types of documents, improving efficiency, accountability, and
          compliance.
        </p>
      </div>

      {/* Responsive Cards */}
      <div className="responsive_cards">
        <div className="card">
          <a href="#">
            <img
              src="https://w7.pngwing.com/pngs/576/642/png-transparent-data-analysis-analytics-management-big-data-data-processing-business-template-text-people-thumbnail.png"
              alt="Card 1"
            />
          </a>
          <div className="card-statement">
            <p>Searching the Documents</p>
          </div>
        </div>
        <div className="card">
          <a href="#">
            <img
              src="https://w7.pngwing.com/pngs/477/619/png-transparent-man-sitting-in-front-of-computer-monitors-network-operations-center-network-monitoring-management-information-security-operations-center-business-analyst-computer-network-service-people-thumbnail.png"
              alt="Card 2"
            />
          </a>
          <div className="card-statement">
            <p>Managing the Documents</p>
          </div>
        </div>
        <div className="card">
          <a href="#">
            <img
              src="https://w7.pngwing.com/pngs/653/323/png-transparent-customer-relationship-management-business-customer-service-rent-miscellaneous-angle-text-thumbnail.png"
              alt="Card 3"
            />
          </a>
          <div className="card-statement">
            <p>B2C Relations</p>
          </div>
        </div>
      </div>
      {/* </section> */}

      {/* Footer */}
      <div className="footer">
        {/* Footer content */}
        <div className="footer">
          <div className="container-custom">
            <div className="footer-content-wrap">
              <div className="footer-left-block">
                <div className="footer-acknowledgement">
                  <a>
                    <img
                      src="https://scontent.fblr22-2.fna.fbcdn.net/v/t39.30808-6/342022383_889796985425626_4868738027538509982_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=rcVR7DWzTmYAX--GebK&_nc_ht=scontent.fblr22-2.fna&oh=00_AfBBrbSvWxNw5YR6WVYx96zS9d5Rjk-s0bKZG5PSTaG11Q&oe=65D2B2A5"
                      loading="lazy"
                      alt="InCheq logo"
                      height="20"
                      className="footer-logo"
                    />
                    <p className="footer-logo-text">DOCUMENT TRACKING SYSTEM</p>
                  </a>
                  <div className="body-small">
                    Our Document Tracking System provides a seamless solution
                    for managing your documents efficiently. Designed with
                    user-friendliness and reliability in mind, our system allows
                    you to keep track of your documents with ease. Whether it's
                    tracking document workflows, ensuring compliance, or
                    streamlining document access, our platform offers the tools
                    you need to stay organized and productive. Built with
                    passion and commitment, we strive to be your trusted partner
                    in document management. For inquiries or support, please
                    contact us at [Your Contact Information]. Powered by
                    cutting-edge technology, our system is continuously evolving
                    to meet your evolving needs.
                  </div>
                </div>
              </div>
              <div className="footer-right-block">
                <div className="footer-social">
                  <div
                    className="footer-icons-wrap"
                    style={{ display: "flex" }}
                  >
                    <a
                      href="https://www.facebook.com/incheq.co"
                      target="_blank"
                      className="social-icon-block w-inline-block"
                    >
                      <img
                        src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac703f4433e644d297d_icon-social-facebook.svg"
                        loading="lazy"
                        alt="facebook icon"
                        className="social-icon"
                      />
                      <div className="bg-btn-animate is-social"></div>
                    </a>
                    <a
                      href="https://twitter.com/incheq_aus"
                      target="_blank"
                      className="social-icon-block w-inline-block"
                    >
                      <img
                        src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac73d90a44d405c1067_icon-social-twitter.svg"
                        loading="lazy"
                        alt="twitter icon"
                        className="social-icon"
                      />
                      <div className="bg-btn-animate is-social"></div>
                    </a>
                    <a
                      href="https://www.instagram.com/incheq.co/"
                      target="_blank"
                      className="social-icon-block w-inline-block"
                    >
                      <img
                        src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac78d8367ec0922c640_icon-social-instagram.svg"
                        loading="lazy"
                        alt="t"
                        className="social-icon"
                      />
                      <div className="bg-btn-animate is-social"></div>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/incheq-co/"
                      target="_blank"
                      className="social-icon-block w-inline-block"
                    >
                      <img
                        src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac7889b6aa4dfc8bf31_icon-social-linkedin.svg"
                        loading="lazy"
                        alt="linkedin icon"
                        className="social-icon"
                      />
                      <div className="bg-btn-animate is-social"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="copyright-right">
                <div className="body-xs">© 2023 CDAC. All Rights Reserved</div>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor">
          <div
            data-w-id="9f54bfc6-d3fa-a651-f09d-f4c94a566b55"
            className="cursor-dot"
          >
            <div className="cursor-dot-small"></div>
          </div>
          <div className="w-embed">
            <style></style>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

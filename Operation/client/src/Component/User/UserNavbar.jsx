import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div className="d-flex align-items-center" ref={ref} onClick={onClick}>
    <div className="icon-background">
      <FontAwesomeIcon icon={faCircleUser} />
    </div>
  </div>
));

function UserNavbar() {
  const navigate = useNavigate(); // Use useHistory directly from react-router

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/user">
          Document Tracking System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText" style={{ "position": "relative", "justifyContent": "end" }}>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">
                <Link className="dropdown-item" to="/user" exact activeClassName="active">
                  Incoming
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <Link className="dropdown-item" to="/user/outgoing" activeClassName="active">
                  Outgoing
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">
                <Link className="dropdown-item" to="/user/my-account" activeClassName="active">
                  My Account
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;

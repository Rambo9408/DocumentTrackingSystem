import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserNavbar from "./Component/User/UserNavbar";
import UserHome from "./Component/User/UserHome";
import AdminNavbar from "./Component/Admin/AdminNavbar";
import AdminOutgoing from "./Component/Admin/AdminOutgoing";
import AdminHome from "./Component/Admin/AdminHome";
import UserManagement from "./Component/Admin/UserManagement";
import Outgoing from "./Component/User/Outgoing";
import Compose from "./Component/User/compose";
import Login from "./Component/login";
import Register from "./Component/Register";
import PdfViewer from "./Component/PdfViewer";

function App() {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  function handleLogin(token) {
    setToken(token);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                token.message === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/user" />
                )
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/PdfViewer/:filename" element={<PdfViewer />} />
          <Route
            path="/user"
            element={
              token ? (
                <>
                  <UserNavbar />
                  <UserHome />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              token && token.message === "admin" ? (
                <>
                  <AdminNavbar />
                  <AdminHome />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/user/outgoing"
            element={
              token ? (
                <>
                  <UserNavbar />
                  <Outgoing />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/user/compose"
            element={
              token ? (
                <>
                  <UserNavbar />
                  <Compose />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/usermanage"
            element={
              token && token.message === "admin" ? (
                <>
                  <AdminNavbar />
                  <UserManagement />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/outgoing"
            element={
              token && token.message === "admin" ? (
                <>
                  <AdminNavbar />
                  <AdminOutgoing />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

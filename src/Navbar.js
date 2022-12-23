import React from "react";
import { useNavigate } from "react-router-dom";
import bookmyshowlogo from "./images/bookmyshow.png";

function Navbar(props) {
  let navigate = useNavigate();
  let doLogout = () => {
    localStorage.removeItem("react_app_token");
    navigate("/");
  };
  return (
    <nav class="navbar navbar-expand-lg bg-info">
      <div class="container-fluid">
        <img
          src={bookmyshowlogo}
          width="140"
          height="50"
          className="d-inline-block align-top"
          alt="book my show logo"
        />

        <div className="d-flex flex-wrap">
          <h4 class=" navbar-text text-light">{props.data}</h4>
          <button className="m-2 btn btn-secondary " onClick={doLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

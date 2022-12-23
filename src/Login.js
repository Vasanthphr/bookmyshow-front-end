import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import UserContext from "./usercontext";
import bookmyshowlogo from "./images/bookmyshow.png";

function Login() {
  let contextData = useContext(UserContext);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      role: "",
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const user = await axios.post(`${config.api}`, values);
        localStorage.setItem("react_app_token", user.data.token);
        alert(user.data.message);
        contextData.setUserName(values.username);
        if (user.data.message === `Successfully Logged In!!`) {
          console.log(values.role);
          if (values.role === "Admin") {
            navigate("/admin-dashboard");
          } else if (values.role === "User") {
            navigate("/dashboard");
          } else {
            alert("Please try Admin/User (Case Sensitive)");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container-fluid ">
      <div className="logo-background">
        <img
          src={bookmyshowlogo}
          className="bookmy-show-logo"
          alt="No image"
        />
      </div>
      <div className="col">
      <div className="row sign-in-field">
          <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
              <label for="username" class="form-label">
                Enter Role (Admin/User)
              </label>
              <input
                type="text"
                class="form-control input-box"
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">
                UserName
              </label>
              <input
                type="text"
                class="form-control input-box"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control input-box"
                id="exampleInputPassword1"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p className="form-label">
                <Link to="/resetpassword"> Forget Password?</Link>
              </p>
            </div>

            <button type="submit" class="btn btn-danger">
              Submit
            </button>

            <div class="mb-3">
              <p class="form-label">
                Don't have account,<Link to="/register">Click here</Link> to
                SignUP
              </p>
            </div>
          </form>
        </div>
        <div className="user-paswords">
        <strong className="heading-pass">For Testing:</strong>
          <br />
         <div className="user-details">
         Role: User
          <br />
          username:kumar
          <br />
          password: user@123
         </div>
          <br />
         <div className="admin-details">
         Role: Admin
          <br />
          username: Vasanth
          <br />
          password: admin@123
         </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;

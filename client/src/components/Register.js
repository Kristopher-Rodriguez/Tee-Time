import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setConfirmReg("Thank you for registering, you can now log in!");
        setErrors({});
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <div className="card my-4 mx-auto" style={{ width: "355px" }}>
        <h1 className="card-header bg-success text-white text-center">
          Register
        </h1>
        {confirmReg ? (
          <p className="mt-2 text-center text-success">{confirmReg}</p>
        ) : null}
        <form onSubmit={register}>
          <div className="d-flex flex-column justify-content-around align-items-center p-2 m-1">
            <label htmlFor="userName" className="fw-bold me-2">
              Username:
            </label>
            {errors.userName ? <span className="fw-bold text-danger my-1">{errors.userName.message}</span> : null}
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center p-2 m-1">
            <label htmlFor="email" className="fw-bold me-2">
              Email:
            </label>
            {errors.email ? <span className="fw-bold text-danger my-1">{errors.email.message}</span> : null}
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center p-2 m-1">
            <label htmlFor="password" className="fw-bold me-2">
              Password:
            </label>
            {errors.password ? <span className="fw-bold text-danger my-1">{errors.password.message}</span> : null}
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center p-2 m-1">
            <label htmlFor="confirmPassword" className="fw-bold me-2">
              Confirm Password:
            </label>
            {errors.confirmPassword ? (
              <span className="fw-bold text-danger my-1">{errors.confirmPassword.message}</span>
            ) : null}
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="text-center m-2">
            <button className="btn btn-primary">&#9971; Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

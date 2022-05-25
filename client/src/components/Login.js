import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res, "res");
        console.log(res.data, "is res data!");
        navigate("/dashboard/:userName");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <>
      <div className="card my-4 mx-auto" style={{ width: "322px" }}>
        <h1 className="card-header bg-success text-center text-white">Login</h1>
        <p className="text-danger">{errorMessage ? errorMessage : ""}</p>
        <form onSubmit={login}>
          <div className="d-flex justify-content-center align-items-center p-2 m-1">
            <label className="fw-bold me-2">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center p-2 m-1">
            <label className="fw-bold me-2">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center m-2">
            <button className="btn btn-primary">Login &#9971;</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

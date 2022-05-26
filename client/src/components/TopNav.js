import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Collapse } from "bootstrap";
import logo from "../img/logo.png";
import banner from "../img/banner_main.jpg";
import axios from "axios";

const TopNav = () => {
  const [userId, setUserId] = useState("");
  const [toggle, setToggle] = useState(false);
  const collapseRef = useRef();
  const navigate = useNavigate();

  const navBarCollapse = () => {
    let myCollapse = collapseRef.current;
    let bsCollapse = new Collapse(myCollapse, { toggle: false });
    toggle ? bsCollapse.show() : bsCollapse.hide();
    setToggle((toggle) => !toggle);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/one`, { withCredentials: true })
        .then((response)=>{
            console.log(response.data);
            setUserId(response.data._id);
        })
        .catch((error)=>{
            console.log(error)
        })
}, [])

  const logout = (e) => {
    axios
      .post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="d-flex navbar-brand">
            <img className="w-50 mt-1 me-1" src={logo} alt="tee-time logo" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            onClick={navBarCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="mx-2 nav-item">
                <Link className="text-decoration-none nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="mx-2 nav-item">
                <Link className="text-decoration-none nav-link" to="/addround">
                  Add Round
                </Link>
              </li>
              <li className="mx-2 nav-item">
                <Link
                  onClick={logout}
                  className="text-decoration-none nav-link"
                  to="/"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;

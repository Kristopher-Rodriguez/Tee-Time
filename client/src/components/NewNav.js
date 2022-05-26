import { Link } from "react-router-dom";
import logo from "../img/logo.png";

//this isn't used yet

const NewNav = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={logo} alt="tee-time-logo" className="mx-auto" />
      </div>
      <div className="mb-4 container d-flex justify-content-around">
        <button className="btn btn-success">Dashboard</button>
        <button className="btn btn-success">Add Round</button>
        <button className="btn btn-success">Log Out</button>
      </div>
    </>
  );
};

export default NewNav;

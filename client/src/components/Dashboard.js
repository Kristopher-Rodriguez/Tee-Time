import React, {useEffect, useState}from "react";
import axios from "axios";



const Dashboard = (props) => {

  //get the states fom App.js
const {allRounds, setAllRounds} = props;


  //Request all the data for the rounds
useEffect(() =>{
  axios.get('http://localhost:8000/api/rounds/all')
      .then((response) =>{
        console.log(response.data);
        setAllRounds(response.data)
    })
      .catch((error) => {
        console.log("Error getting allRounds data from DB");
      })
}, [setAllRounds])

  return (
    <div className="bg-light container">
      <div className="">
        <table className="table table-striped table-hover">
          <thead className="table-success">
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5/21/2022</td>
              <td>The nice one</td>
              <td>77</td>
              <div className="d-flex">
                <td>Edit |</td>
                <td>Delete</td>
              </div>
            </tr>
            <tr>
              <td>5/21/2022</td>
              <td>The nice one</td>
              <td>77</td>
              <div className="d-flex">
                <td>Edit |</td>
                <td>Delete</td>
              </div>
            </tr>
            <tr>
              <td>5/21/2022</td>
              <td>The nice one</td>
              <td>77</td>
              <div className="d-flex">
                <td>Edit |</td>
                <td>Delete</td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row ">
        <div className="col"></div>
        <div className="col">
          <p className="bg-success text-light rounded p-2 text-center fw-bold mt-4 mb-5">
            Current Handicap: 5
          </p>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Dashboard;

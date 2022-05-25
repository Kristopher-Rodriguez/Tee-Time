import React from 'react';
import {useEffect, useState}from "react";
import {Link} from "react-router-dom";
import axios from "axios";





const Dashboard = (props) => {

  //get the states fom App.js
const {allRounds, setAllRounds} = props;
const [userRounds, setUserRounds] = useState([]);
const [userName, setUserName] = useState("")
const [deletedId, setDeletedId] = useState("");


    //Get user
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/one`, { withCredentials: true })
            .then((response)=>{
                console.log(response.data);
                setUserName(response.data.userName);
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [deletedId])
    // console.log(userName);

    //Get user rounds
        useEffect(() => {
            if (userName) {
                // console.log("THERE IS A USERNAME", userName)
            axios.get(`http://localhost:8000/api/rounds/${userName}`, { withCredentials: true })
                .then((response)=>{
                    console.log(response.data)
                    setUserRounds(response.data)
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }, [userName, deletedId])
        // console.log("USER ROUNDS", userRounds)

  //Delete round
  const deleteRound = (idToDelete)=> {
      console.log(idToDelete);
      axios.delete(`http://localhost:8000/api/rounds/${idToDelete}`, { withCredentials: true })
          .then(response => {
              console.log(response.data)
              setDeletedId(idToDelete);
          })
          .catch((error)=>{
              console.log(error);
          })
  }

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
          {userRounds.map((round, index)=>{
            return (
                <tr key={index}>
                  <td>{round.date}</td>
                  <td>{round.course}</td>
                  <td>{round.score}</td>
                  <td className="d-flex">
                        <button className="btn">Edit</button>
                        <button className="btn"
                            onClick={event => {deleteRound(round._id)}}
                        >Delete
                        </button>
                  </td>
                </tr>
            )
          })}


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
      <div>
      </div>
    </div>
  );
};

export default Dashboard;

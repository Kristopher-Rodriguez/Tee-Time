import React from 'react';
import {useEffect, useState}from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import date from 'date-and-time';






const Dashboard = (props) => {

  //get the states fom App.js
const {allRounds, setAllRounds} = props;
const [userRounds, setUserRounds] = useState([]);
const [userId, serUserId] = useState("")
const [deletedId, setDeletedId] = useState("");


    //Get user
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/one`, { withCredentials: true })
            .then((response)=>{
                console.log(response.data);
                serUserId(response.data._id);
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [deletedId])
    // console.log("USER NAME", userId);

    //Get user rounds
        useEffect(() => {
            if (userId) {
                // console.log("THERE IS A USERNAME", userId)
            axios.get(`http://localhost:8000/api/rounds/user/${userId}`, { withCredentials: true })
                .then((response)=>{
                    console.log(response.data)
                    setUserRounds(response.data)
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }, [userId, deletedId])
    // console.log("ROUNDS", userRounds)


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
              const now = new Date(round.date)
            return (
                <tr key={index}>
                  <td className="align-middle">{date.format(now, 'ddd, MM DD YYYY')}</td>
                  <td className="align-middle">{round.course}</td>
                  <td className="align-middle">{round.score}</td>
                  <td className="d-flex align-middle">
                        <Link to={`/editround/${round._id}`}>
                        <button className="btn btn-primary m-1">Edit</button>
                        </Link>
                        <button className="btn btn-danger m-1"
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
            Current Handicap: Coming Soon
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

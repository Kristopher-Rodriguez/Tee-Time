import React from 'react';
import {useEffect, useState}from "react";
import {Link} from "react-router-dom";
import axios from "axios";





const Dashboard = (props) => {

  //get the states fom App.js
// const [allRounds, setAllRounds] = useState([]);
const {allRounds, setAllRounds} = props;
const [deletedId, setDeletedId] = useState("")



  //Request all the data for the rounds
  useEffect(()=>{
    axios.get('http://localhost:8000/api/rounds/all')
        .then((response)=>{
          console.log(response.data);
          setAllRounds(response.data);
        })
        .catch((error)=>{
          console.log(`Error in ALL ROUNDS axios request`);
        })
  }, [deletedId]);

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
          {/*{allRounds}*/}
          {allRounds.map((round, index)=>{
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

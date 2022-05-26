import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRound = () => {
  const { id } = useParams();

  const [date, setDate] = useState("");
  const [course, setCourse] = useState("");
  const [courseRating, setCourseRating] = useState("");
  const [slopeRating, setSlopeRating] = useState("");
  const [holesPlayed, setHolesPlayed] = useState(18);
  const [par, setPar] = useState("");
  const [score, setScore] = useState("");
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/one", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8000/api/rounds/${id}`, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        setDate(data.date);
        setCourse(data.course);
        setCourseRating(data.CourseRating);
        setSlopeRating(data.slopeRating);
        setHolesPlayed(data.holesPlayed);
        setPar(data.par);
        setScore(data.score);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const updateRoundHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/api/rounds/${id}`,
        {
          date,
          course,
          courseRating,
          slopeRating,
          holesPlayed,
          par,
          score,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("success", res.data);
        navigate(`/user/dashboard/${user.userName}`);
      })
      .catch((err) => {
        console.log(err.response);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <div className="card mx-auto mt-1" style={{ width: "322px" }}>
        <div className="container mx-auto card-header bg-success text-light text-center">
          <h2 className="">Edit Round</h2>
        </div>
        <form
          onSubmit={updateRoundHandler}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <label className="fw-bold" htmlFor="date">
            Date:
          </label>
          {errors.date && (
            <p className="mt-1 fw-bold text-danger">{errors.date.message}</p>
          )}
          <input
            onChange={(e) => setDate(e.target.value)}
            className="m-2"
            type="date"
            id="date"
            value={date}
          />
          <label className="fw-bold" htmlFor="course">
            Course:
          </label>
          {errors.course && (
            <p className="mt-1 fw-bold text-danger">{errors.course.message}</p>
          )}
          <input
            onChange={(e) => setCourse(e.target.value)}
            className="m-2"
            type="text"
            id="course"
            value={course}
          />
          <label className="fw-bold" htmlFor="course-rating">
            Course Rating:
          </label>
          {errors.courseRating && (
            <p className="mt-1 fw-bold text-danger">
              {errors.courseRating.message}
            </p>
          )}
          <input
            onChange={(e) => setCourseRating(e.target.value)}
            className="m-2"
            type="number"
            id="course-rating"
            value={courseRating}
          />
          <label className="fw-bold" htmlFor="slope-rating">
            Slope Rating:
          </label>
          {errors.slopeRating && (
            <p className="mt-1 fw-bold text-danger">
              {errors.slopeRating.message}
            </p>
          )}
          <input
            onChange={(e) => setSlopeRating(e.target.value)}
            className="m-2"
            type="number"
            id="slope-rating"
            value={slopeRating}
          />
          <label className="fw-bold" htmlFor="holes-played">
            Holes Played:
          </label>
          <select
            onChange={(e) => setHolesPlayed(e.target.value)}
            name="holes-played"
            id="holes-played"
            value={holesPlayed}
          >
            <option value="18">18</option>
            <option value="9">9</option>
          </select>
          <label className="fw-bold mt-2" htmlFor="par">
            Par:
          </label>
          {errors.par && (
            <p className="mt-1 fw-bold text-danger">{errors.par.message}</p>
          )}
          <input
            onChange={(e) => setPar(e.target.value)}
            className="m-2"
            type="number"
            id="par"
            value={par}
          />
          <label className="fw-bold" htmlFor="your-score">
            Your Score:
          </label>
          {errors.score && (
            <p className="mt-1 fw-bold text-danger">{errors.score.message}</p>
          )}
          <input
            onChange={(e) => setScore(e.target.value)}
            className="m-2"
            type="number"
            id="your-score"
            value={score}
          />
          <button className="btn btn-primary my-2">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EditRound;

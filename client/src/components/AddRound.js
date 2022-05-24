const AddRound = () => {
  return (
    <>
      <div className="card mx-auto mt-1" style={{ width: "322px" }}>
        <div className="container mx-auto card-header bg-success text-light text-center">
          <h2 className="">Add Round</h2>
        </div>
        <form className="d-flex flex-column align-items-center justify-content-center">
          <label className="fw-bold" htmlFor="date">
            Date:
          </label>
          <input className="m-2" type="date" id="date" />
          <label className="fw-bold" htmlFor="course">
            Course:
          </label>
          <input className="m-2" type="text" id="course" />
          <label className="fw-bold" htmlFor="course-rating">
            Course Rating:
          </label>
          <input className="m-2" type="number" id="course-rating" />
          <label className="fw-bold" htmlFor="slope-rating">
            Slope Rating:
          </label>
          <input className="m-2" type="number" id="slope-rating" />
          <label className="fw-bold" htmlFor="holes-played">
            Holes Played:
          </label>
          <select name="holes-played" id="holes-played">
            <option value="18">18</option>
            <option value="9">9</option>
          </select>
          <label className="fw-bold mt-2" htmlFor="par">
            Par:
          </label>
          <input className="m-2" type="number" id="par" />
          <label className="fw-bold" htmlFor="your-score">
            Your Score:
          </label>
          <input className="m-2" type="number" id="your-score" />
          <button className="btn btn-primary my-2">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddRound;

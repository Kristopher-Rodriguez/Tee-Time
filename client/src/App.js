import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// import components
import TopNav from "./components/TopNav";
import Dashboard from "./components/Dashboard";
import BottomBar from "./components/BottomBar";
import AddRound from "./components/AddRound";
import EditRound from "./components/EditRound";
import LogReg from "./views/LogReg";

function App() {
  //states
  const [allRounds, setAllRounds] = useState([]);

  return (
    <div className="bg-light App">
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<LogReg />} />
          <Route
            path="/dashboard"
            element={<Dashboard
                allRounds={allRounds}
                setAllRounds={setAllRounds}
            />}

          />
          <Route path="/addround" element={<AddRound />} />
          <Route path="/editround/:id" element={<EditRound />} />
        </Routes>
        <BottomBar />
      </BrowserRouter>
    </div>
  );
}

export default App;

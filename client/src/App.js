import 'bootstrap/dist/css/bootstrap.min.css';

// import components
import TopNav from './components/TopNav'
import Dashboard from "./components/Dashboard";
import BottomBar from "./components/BottomBar";

function App() {
    return (
        <div>
            <TopNav/>
            <Dashboard/>
            <BottomBar/>
        </div>
    );
}

export default App;

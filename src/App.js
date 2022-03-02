import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./components/dashboard.js";
import Login from "./components/login.js";
// import Logout from "./components/login.js";
import Home from "./components/home.js";
import CreateAction from "./components/create-action";
import ViewActions from "./components/view-actions";
import CallAndLocationChecks from "./components/call-location-check-view";

import ViewActionNotes from "./components/view-action-notes";
import TripPloting from "./components/trip-ploting";

import Navbar from "./components/UI/Navbar/Navbar";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            {/* <Route path='/Logout' element={<Logout />} /> */}
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/create-action/" element={<CreateAction />} />
            <Route path="/view-actions/" element={<ViewActions />} />
            <Route path="/view-action-notes/" element={<ViewActionNotes />} />    
            <Route path="/call-location-check-view/" element={<CallAndLocationChecks />} />
            <Route path="/trip-ploting/" element={<TripPloting />} />        
          </Routes >
        </div>
      </Router>
    </div>
  );
}

export default App;

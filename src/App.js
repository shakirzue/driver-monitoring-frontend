import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  useNavigate
} from "react-router-dom";

import Dashboard from "./components/dashboard.js";
import Login from "./components/login.js";
// import Logout from "./components/login.js";
import Home from "./components/home.js";
import CreateAction from "./components/create-action";
import ViewActions from "./components/view-actions";

function App() {
  return (
    <div className="App">     
      <Router>
        <div>
          <Routes>   
            <Route path='/' element={<Home />} />         
            <Route path='/Login' element={<Login />} />
            {/* <Route path='/Logout' element={<Logout />} /> */}
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/create-action/" element={<CreateAction />} />
            <Route path="/view-actions/" element={<ViewActions />} />           
          </Routes >
        </div>
      </Router>
    </div>
  );
}

export default App;

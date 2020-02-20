import React, { useEffect } from "react";
import "./css/App.css";
import "./navbar.scss";
// import "./Auth.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

//components
import Home from "./components/Home";
import Login from "./components/Login/Login.js";
import UserData from "./components/UserData/UserData.jsx";
import Register from "./components/Register/Registration.jsx";

//utilities
import { logout } from "./actions/actions";
import { pathNames } from "./reducers/reducers";
import PrivateRoute from "./utils/PrivateRoute";
import radarImg from "./images/radar-chart.png";

// function App() {
const App = ({ logout, reFetch }) => {
  useEffect(() => {
    console.log("App update");
  }, [reFetch]);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img className="radar-logo" src={radarImg} alt="" />
          {/*  */}
          <div className="navBar">
            <Link to={pathNames.Home}>Home</Link>
            <Link to="/userdata">UserData</Link>
            <Link to={pathNames.Home} onClick={logout}>
              Logout
            </Link>
          </div>
        </header>
        <div>
          <Route exact path={pathNames.Home} component={Home} />
          <Route exact path={pathNames.Login} component={Login} />
          <Route exact path={pathNames.Register} component={Register} />
          {/* <PrivateRoute exact path="UserData" component={UserData} /> */}
          <Route exact path="/userdata" component={UserData} />
          {/*  */}
        </div>
        {/*  */}
      </Router>
    </div>
  );
};

export default connect(null, { logout })(App);

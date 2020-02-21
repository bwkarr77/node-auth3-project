import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//custom files..
import "../css/App.css";
import Login from "./Login/Login.js";
import Register from "./Register/Registration";
import { pathNames } from "../reducers/reducers";

console.log(pathNames);

const Home = () => {
  return (
    <div>
      Home
      <div className="loginWindow">
        <div className="testWindow">
          <h2>LOGIN:</h2>
          <Link to={pathNames.Login}>Login</Link>
          <Route exact path={pathNames.Login} component={Login} />
          <h4>_________________</h4>
          <h3>REGISTER:</h3>
          <Link to={pathNames.Register}>Register</Link>
          <Route exact path={pathNames.Register} component={Register} />
        </div>
      </div>
    </div>
  );
};

export default Home;
// export default connect(null, { logout })(Home);

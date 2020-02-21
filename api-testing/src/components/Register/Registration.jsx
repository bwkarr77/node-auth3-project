import React, { useEffect } from "react";
import { connect } from "react-redux";
import { register, handleChange } from "../../actions/actions";

const pushDir1 = "/spidergraph";

const Register = ({
  history,
  credentials,
  handleChange,
  register,
  error,
  token,
  didRegister
}) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route++

  useEffect(() => {
    if (!!token) {
      localStorage.setItem("token", token);
      history.push(pushDir1);
    }
  }, [token]);

  console.log("didRegister:", didRegister);

  return (
    <div>
      <h2>Register:</h2>
      <form onSubmit={e => register(e, credentials)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={e => handleChange(e, "credentials")}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={e => handleChange(e, "credentials")}
        />
        <input
          type="department"
          name="department"
          placeholder="department"
          value={credentials.department}
          onChange={e => handleChange(e, "credentials")}
        />
        <button>Log In</button>
      </form>
      {didRegister ? (
        <h3>Registration Success!!</h3>
      ) : (
        <h3>Registration Not Complete...</h3>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  credentials: state.credentials,
  error: state.error,
  token: state.token,
  didRegister: state.didRegister
});

export default connect(mapStateToProps, { register, handleChange })(Register);

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { startEdit, deleteUnit, getData } from "../../actions/actions";

const UserCard = ({
  userData,
  startEdit,
  deleteUnit,
  state,
  getData,
  reFetch,
  token,
  isFetch,
  credentials
}) => {
  console.log("userData.userData:", userData);
  return (
    <div className="user-card">
      {/* <h3>UserData:</h3> */}
      <p>Name: {userData.username}</p>
      <p>Department: {userData.department}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.error,
  state: state,
  reFetch: state.reFetch,
  token: state.token,
  isFetch: state.isFetching,
  //   userData: state.userData,
  credentials: state.credentials
});

export default connect(mapStateToProps, { startEdit, deleteUnit, getData })(
  UserCard
);

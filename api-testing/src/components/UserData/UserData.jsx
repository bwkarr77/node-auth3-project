import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserCard from "./UserCard.jsx";
import "./userdata.scss";

import { startEdit, deleteUnit, getData } from "../../actions/actions";

const UserData = ({
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
  // const { labels, datasets } = userData;
  useEffect(() => {
    getData();
    console.log("UserData.getData()", credentials);
  }, []);

  console.log(
    "userData, token:",
    token,
    "\nuserData:",
    userData,
    "\nstate:",
    state
  );
  return (
    <div className="userdata">
      <h3>UserData:</h3>
      {userData ? (
        <ul>
          {userData.map(ele => {
            console.log(".foreach:", ele.id);
            return (
              <li>
                <div>
                  {/* Users: {ele.username}, Department: {ele.department} */}
                  <UserCard userData={ele} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>loading....</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.error,
  state: state,
  reFetch: state.reFetch,
  token: state.token,
  isFetch: state.isFetching,
  userData: state.userData,
  credentials: state.credentials
});

export default connect(mapStateToProps, { startEdit, deleteUnit, getData })(
  UserData
);

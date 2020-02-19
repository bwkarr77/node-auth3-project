import React, { useEffect } from "react";
import { connect } from "react-redux";

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
    <div>
      <h3>UserData:</h3>
      {userData ? (
        <ul>
          {userData.map(ele => {
            console.log(".foreach:", ele.id);
            return (
              <li>
                Users: {ele.username}, Department: {ele.department}
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
/*
      <div className="data-header">
        <span className="branch-title">Dataset Names</span>
        {/* mapping branch names 
        {labels.map(branchName => (
          <span key={branchName} className="branch-names">
            {branchName}
          </span>
        ))}
      </div>
      {!datasets ? (
        <h5>Loading...</h5>
      ) : (
        <ul>
          {datasets.map(dataset => (
            <li key={`dataset${dataset.id}`} onClick={() => startEdit(dataset)}>
              <button
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteUnit(dataset);
                }}
              >
                -
              </button>
              <span className="dataset-names">{dataset.label}</span>
              {dataset.data.map((value, index) => (
                <span key={`${dataset.id},${index}`} className="data">
                  {value}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

*/

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

import React from "react";
import { connect } from "react-redux";
// import { SketchPicker } from "react-color";
//Aplpha/Block/Chrome/Circle/Compact/Github/Hue/Material/Photoshop/Sketch/Slider/Swatches/Twitter+Picker
//  https://www.npmjs.com/package/react-color

import { startEdit, deleteUnit } from "../../../actions/actions";

// import "../dataHandling.css";

const UserData = ({ userData, startEdit, deleteUnit, state, derpData }) => {
  const { labels, datasets } = userData;
  console.log("userData:", userData);
  return (
    <div>
      <h3>UserData:</h3>
      {/* <SketchPicker /> */}
      <div className="data-header">
        <span className="branch-title">Dataset Names</span>
        {/* mapping branch names */}
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

const mapStateToProps = state => ({
  error: state.error,
  state: state,
  derpData: state.userData.datasets
});

export default connect(mapStateToProps, { startEdit, deleteUnit })(UserData);

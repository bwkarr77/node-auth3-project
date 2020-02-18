import React, { useEffect } from "react";
import { ButtonToolbar, DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

import { data } from "../dummycomps/Data";
import "../../css/Data.css";
import "./DataHandling.scss";

import NewBranch from "./NewBranch/NewBranch";
import NewDataSet from "./NewData/NewDataSet";
import UserData from "./UserData/UserData";
import EditData from "./EditData/EditData.jsx";
import Graphs from "../radarHandling/Graphs";

import {
  setData,
  deleteUnit,
  startEdit,
  saveEdit,
  handleChange,
  addData,
  logout,
  cancelEdit,
  getData,
  addBranch
} from "../../actions/actions";

const labelArr = data.labels;

const DataSubmission = ({
  //mapStateToProps
  isEditing,
  reFetch,
  userData,
  //import from '../actions/actions
  startEdit,
  cancelEdit,
  getData,
  userData2
}) => {
  useEffect(() => {
    getData(userData);
  }, [reFetch]);
  // useEffect(() => {
  //   getData(userData2);
  //   console.log("DataSumbission>getData", userData2.graphs);
  // }, [reFetch]);

  const dropDown1 = "Drop Down 1";
  return (
    <div className="dataField-container">
      {!isEditing ? (
        <button onClick={() => startEdit()}>Edit Data</button>
      ) : (
        <button onClick={() => cancelEdit()}>Cancel Edit</button>
      )}
      <DropdownButton
        title={dropDown1}
        id={`dropdown-variants-${dropDown1}`}
        key={dropDown1}
        className="dropdown-button"
      >
        <div className="dropdown-option-show">
          <Dropdown.Item eventKey="1">%</Dropdown.Item>
          <Dropdown.Item eventKey="2">Scale</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Point Limit
          </Dropdown.Item>
        </div>
        {/* clean up below?? */}
      </DropdownButton>
      {/* Testing.... */}
      <Graphs />
      {/* End Testing.... */}
      <section className="data-display">
        <UserData userData={userData} />
      </section>
      {isEditing ? ( //if isEditing = true...
        <section className="newDataset">
          <EditData userData={userData} />
        </section>
      ) : (
        // if isEditing = false...
        <section className="newDataset">
          <NewDataSet userData={userData} />
        </section>
      )}
      <section className="newBranch">
        <NewBranch />
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  // data: state.chartData.datasets,
  isEditing: state.isEditing,
  dataToEdit: state.dataToEdit,
  newData: state.newData,
  newBranch: state.newBranch,
  reFetch: state.reFetch,
  userData: state.userData,
  state: state,
  userData2: state.userData2
});

export default connect(mapStateToProps, {
  setData,
  deleteUnit,
  startEdit,
  saveEdit,
  handleChange,
  addData,
  logout,
  cancelEdit,
  getData
})(DataSubmission);

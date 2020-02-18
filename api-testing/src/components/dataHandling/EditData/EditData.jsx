import React from "react";
import { connect } from "react-redux";

import {
  startEdit,
  cancelEdit,
  saveEdit,
  handleChange
} from "../../../actions/actions";

const EditData = ({
  //from.. somewhere...
  // id,
  //mapStateToProps
  userData,
  dataToEdit,
  //don't need the below...
  newBranch,
  newData,
  //import from actions
  startEdit,
  cancelEdit,
  saveEdit,
  handleChange
}) => {
  const id = 0;
  console.log(dataToEdit);

  return (
    <div className="editData_container">
      <h3>EDIT DATA HERE...</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          saveEdit(dataToEdit);
        }}
      >
        <input
          name="userName"
          type="text"
          className="editDataset-name"
          onChange={e => handleChange(e, "editData")}
          value={dataToEdit.userName} //only shows 0 id now
        />
        <input
          name="dataLabel"
          type="text"
          className="editDataset-name"
          onChange={e => handleChange(e, "editData")}
          value={dataToEdit.dataLabel} //only shows 0 id now
        />
        <div className="editDataset-data">
          {dataToEdit.datasets.map((dataValue, index) => {
            return (
              <div>
                <input
                  id={index}
                  name={`branches`}
                  type="text"
                  className="editData-input"
                  value={dataToEdit.branches[index]}
                  onChange={e => {
                    // console.log(e.target, index);
                    handleChange(e, "editData");
                  }}
                />
                :
                <input
                  id={index}
                  name={`datasets`}
                  type="number"
                  min="0"
                  max="100"
                  className="editData-input"
                  value={dataValue}
                  onChange={e => {
                    // console.log(e.target, index);
                    handleChange(e, "editData");
                  }}
                />
              </div>
            );
          })}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.error,
  newBranch: state.newBranch,
  newData: state.newData,
  userData: state.userData,
  dataToEdit: state.dataToEdit
});

export default connect(mapStateToProps, {
  startEdit,
  saveEdit,
  handleChange,
  cancelEdit
})(EditData);

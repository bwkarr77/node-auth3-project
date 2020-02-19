// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

//var names with all caps lock represents global variables
export const GLOBAL_VAR_1 = "GLOBAL_VAR_1";
export const GLOBAL_VAR_2 = "GLOBAL_VAR_2";
export const GLOBAL_VAR_3 = "GLOBAL_VAR_3";

export const GETDATASTART = "GETDATASTART";
export const GETDATASUCCESS = "GETDATASUCCESS";
export const GETDATAFAIL = "GETDATAFAIL";

export const LOGINSTART = "LOGINSTART";
export const LOGINSUCCESS = "LOGINSUCCESS";
export const LOGINFAIL = "LOGINFAIL";

export const REGISTERSTART = "REGISTERSTART";
export const REGISTERSUCCESS = "REGISTERSUCCESS";
export const REGISTERFAIL = "REGISTERFAIL";

export const EDITDATASTART = "EDITDATASTART";
export const EDITDATASUCCESS = "EDITDATASUCCESS";
export const EDITDATAFAIL = "EDITDATAFAIL";

export const ADDDATASTART = "ADDDATASTART";
export const ADDDATASUCCESS = "ADDDATASUCCESS";
export const ADDDATAFAIL = "ADDDATAFAIL";

export const ADDBRANCHSTART = "ADDBRANCHSTART";
export const ADDBRANCHSUCCESS = "ADDBRANCHSUCCESS";
export const ADDBRANCHFAIL = "ADDBRANCHFAIL";

export const HANDLENEWDATASET = "HANDLENEWDATASET";
export const HANDLECHANGE_NEWBRANCH = "HANDLECHANGE_NEWBRANCH";
export const HANDLECHANGE = "HANDLECHANGE";
export const LOGOUT = "LOGOUT";
export const DELETEUNIT = "DELETEUNIT";
export const CANCELEDIT = "CANCELEDIT";

const apiBase = "http://localhost:9753/api";
const apiGet = `${apiBase}/restricted/users`;
const apiRegister = `${apiBase}/auth/register`;
const apiLogin = `${apiBase}/auth/login`;
const apiPost = `${apiBase}posts/1`;

const testInfo = {
  testName: "Steve",
  testPass: "Password"
};

//===delete above here once api is up...

//login actions
export const login = (event, credentials) => dispatch => {
  event.preventDefault();
  console.log("login", credentials);
  dispatch({ type: LOGINSTART });
  axiosWithAuth()
    .post(apiLogin, credentials)
    .then(res => {
      console.log("actions.jsx > login > .then:", res.data);
      dispatch({ type: LOGINSUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log("actions.jsx > login > .err", err);
      return dispatch({ type: LOGINFAIL, payload: err });
    });
};

//register actions
export const register = (event, credentials) => dispatch => {
  event.preventDefault();
  dispatch({ type: REGISTERSTART });
  axiosWithAuth()
    .post(apiRegister, credentials)
    .then(res => {
      console.log("actions.jsx > register > .then", res);
      dispatch({ type: REGISTERSUCCESS, payload: res.data.payload });
    })
    .catch(err => {
      console.log("actions.jsx > register > .err", err);
      return dispatch({ type: REGISTERFAIL, payload: err });
    });
};

//get data from api
export const getData = () => dispatch => {
  //====
  console.log("getData start..");
  console.log(localStorage.getItem("token"));
  dispatch({ type: GETDATASTART });
  axiosWithAuth()
    .get(`${apiGet}`)
    .then(res => {
      console.log("apiGet:", res.data, res);
      dispatch({ type: GETDATASUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log("actions > getData.err:", err);
      return dispatch({ type: GETDATAFAIL });
    });
};

//Add data
export const addData = (event, newData) => dispatch => {
  event.preventDefault();
  dispatch({ type: ADDDATASTART });
  console.log("addData:", newData);
  axiosWithAuth()
    .post(`${apiPost}`, newData)
    .then(res => dispatch({ type: ADDDATASUCCESS, payload: res.data.payload }))
    //=====
    .catch(err => {
      console.log("actions > addData.err: ", err);
      return dispatch({ type: ADDDATAFAIL, payload: err });
    });
};

//Edit existing data
export const startEdit = () => ({
  type: EDITDATASTART
});
export const saveEdit = data => dispatch => {
  console.log("actions>saveEdit:\n", data);
  axiosWithAuth()
    .put(`${apiPost}`, data)
    .then(res => {
      console.log("actions>saveEdit Success!,\n", data, "\nres:", res);
      dispatch({ type: EDITDATASUCCESS, payload: data });
      console.log("!===============CHANGE actions> saveEdit================!");
      // dispatch({ type: EDITDATASUCCESS, payload: res.data.payload })
    })
    .catch(err => {
      console.log("actions > saveEdit.err:", err);
      return dispatch({ type: EDITDATAFAIL, payload: err });
    });
};
export const cancelEdit = () => ({
  type: CANCELEDIT
});

export const handleChange = (event, formType) => {
  return {
    type: HANDLECHANGE,
    payload: { target: event.target, form: formType }
  };
};
export const logout = () => dispatch => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};
export const setData = list => ({
  type: setData,
  payload: list
});
export const deleteUnit = unit => dispatch => {
  console.log(`unit:`, unit, `\n.id:,`, unit.id);
  //unit = {id: #, label: '', data: [], others...}
  /*
  axiosWithAuth()
    // .delete(`${apiData}/${unit.id}`)
    // .then(res => dispatch({ type: DELETEUNIT, payload: res.data.payload }))
    //-----
    .delete(apiPosts)
    .then(res => dispatch({ type: DELETEUNIT, payload: unit }))
    //-----
    .catch(err => {
      console.log("actions > deleteUnit.err: ", err);
    });
    */
};

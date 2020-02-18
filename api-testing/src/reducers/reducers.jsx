// reducers.jsx for being explicit in instructions
import {
  //logging in to api...
  LOGINSTART,
  LOGINSUCCESS,
  LOGINFAIL,
  //getting data...
  GETDATASTART,
  GETDATASUCCESS,
  GETDATAFAIL,
  //registering to api...
  REGISTERSTART,
  REGISTERSUCCESS,
  REGISTERFAIL,
  //edit data from api...
  EDITDATASTART,
  EDITDATASUCCESS,
  EDITDATAFAIL,
  //add data to api...
  //some more names
  HANDLECHANGE,
  LOGOUT,
  DELETEUNIT,
  CANCELEDIT
} from "../actions/actions";

export const pathNames = {
  Home: "/",
  Login: "/login",
  Register: "/register"
};

const initialState = {
  error: "",
  //logging in
  isLoggingIn: false,
  isRegistering: false,
  didRegister: false,
  credentials: {
    username: "",
    password: "",
    department: ""
  },
  token: "",
  //getting data from API or similar
  isFetching: false,
  //data storage
  userData: {
    userName: "",
    labels: [],
    datasets: [{ id: "", label: "", data: [] }]
  },
  userData2: {
    graphs: [
      {
        id: "",
        title: "",
        description: "",
        userName: "",
        labels: [],
        datasets: [
          {
            id: "",
            dataset_label: "",
            data: []
          }
        ]
      }
    ]
  },
  //adding data
  isAdding: false,
  newData: {
    //new dataset
    label: "",
    data: []
  },
  isNewBranch: false,
  newBranch: "",
  //editing data
  isEditing: false,
  initialData: {
    data: []
  },
  dataToEdit: {
    userName: "",
    dataLabel: "",
    branches: [],
    datasets: []
  },
  //other categories...
  reFetch: false
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //==========Registration Functions========
    case REGISTERSTART:
      console.log("REGISTER connect to api....");
      return {
        ...state,
        error: "",
        isRegistering: true,
        didRegister: false
      };
    case REGISTERSUCCESS:
      console.log("REGISTER success! token:", payload);
      return {
        ...state,
        error: "",
        isRegistering: false,
        token: payload,
        didRegister: true
      };
    case REGISTERFAIL:
      console.log("REGISTER failed :(");
      return {
        ...state,
        error: payload,
        isRegistering: false,
        didRegister: false
      };
    //======Login Functions========
    case LOGINSTART:
      console.log("logging in to api....");
      return {
        ...state,
        error: "",
        isLoggingIn: true
      };
    case LOGINSUCCESS:
      console.log("login success!", payload);
      return {
        ...state,
        error: "",
        isLoggingIn: false,
        token: payload.token
      };
    case LOGINFAIL:
      console.log("login failed :(");
      return {
        ...state,
        error: payload,
        isLoggingIn: false
      };
    //=====Getting data from api=====
    case GETDATASTART:
      return {
        ...state,
        error: "",
        isFetching: true
      };
    case GETDATASUCCESS:
      console.log(
        "reducers>GETDATASUCCESS>payload, userData, newData:\n",
        payload,
        "\n",
        state.userData,
        "\n",
        state.newData
      );
      return {
        ...state,
        error: "",
        isFetching: false,
        userData: payload[0],
        userData2: payload[1]
      };
    case GETDATAFAIL:
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    //======editing data from api======
    case EDITDATASTART:
      console.log("EDITDATASTART:\n", payload);
      const id = 0;
      return {
        ...state,
        isEditing: true,
        err: "",
        dataToEdit: {
          userName: state.userData.userName,
          branches: state.userData.labels,
          dataLabel: state.userData.datasets[id].label,
          datasets: state.userData.datasets[id].data
        }
      };
    case EDITDATASUCCESS:
      console.log(payload);
      /*
      return {
        ...state,
        err: "",
        isEditing: false,
        dataToEdit: {},
        reFetch: !state.reFetch
      };
      */
      console.log(
        "=============CHANGE reducer>EDITDATASUCCESS=================="
      );
      const id1 = 0;
      return {
        ...state, //spread operator
        err: "",
        isAdding: false,
        reFetch: !state.reFetch,
        newData: {
          label: "",
          data: []
        },
        isEditing: false,
        userData: {
          ...state.userData,
          userName: payload.userName,
          labels: payload.branches,
          datasets: state.userData.datasets.map((dataset, index) => {
            if (index === id1) {
              console.log("index matches!!!", dataset);
              return {
                ...state.userData.datasets[index],
                label: payload.dataLabel,
                data: payload.datasets
              };
            }
            return dataset;
          })
        }
      };
    case EDITDATAFAIL:
      return {
        ...state,
        isEditing: false,
        err: "",
        dataToEdit: {}
      };
    //===Handle Change=====
    case HANDLECHANGE:
      //
      let branchLength = state.userData.labels.length;
      if (state.newData.data.length === 0) {
        for (let i = 0; i < branchLength; i++) {
          state.newData.data[i] = 0;
        }
      }
      //switch case due to too many cases
      switch (
        payload.form //different management depending on the form
      ) {
        //checks payload.form for 'newBranch'
        case "newBranch":
          return {
            ...state,
            newBranch: payload.target.value
          };
        //checks payload.form for 'newData'
        case "newData":
          return {
            ...state,
            [payload.form]:
              payload.target.name === "label"
                ? //IF target.name === 'label', then...
                  (console.log("is newData, is label"),
                  {
                    ...state[payload.form],
                    [payload.target.name]: payload.target.value
                  })
                : //IF target.name != 'label', then...
                  (console.log("is newData, not label"),
                  {
                    ...state[payload.form],
                    data: state[payload.form].data.map((dataVal, index) => {
                      if (index == payload.target.id) {
                        console.log("index matches!!");
                        return payload.target.value;
                      }
                      return dataVal;
                    })
                  })
          }; //===end case "newData"======
        //checks payload.form for 'editData'
        case "editData":
          if (
            payload.target.name !== "datasets" &&
            payload.target.name !== "branches"
          ) {
            //if target.name != branches OR datasets...
            return {
              ...state,
              dataToEdit: {
                ...state.dataToEdit,
                [payload.target.name]: payload.target.value
              }
            };
          } else {
            //if target.name = branches OR datasets...
            return {
              ...state,
              dataToEdit: {
                ...state.dataToEdit,
                [payload.target.name]: state.dataToEdit[
                  payload.target.name
                ].map((dataVal, index) => {
                  if (index == payload.target.id) {
                    console.log("index matches!!");
                    return payload.target.value;
                  }
                  return dataVal;
                })
              }
            };
          }
        case "credentials":
          return {
            ...state,
            [payload.form]: {
              ...state[payload.form],
              [payload.target.name]: payload.target.value
            }
          }; //===end case "credentials"======
        default:
          console.log("default: payload", payload);
          return {
            ...state,
            [payload.form]: payload.target.value
          };
      }

    //==========================
    //==========================
    case CANCELEDIT:
      return {
        ...state,
        isEditing: false,
        dataToEdit: {},
        error: ""
      };
    case DELETEUNIT:
      return {
        ...state,
        reFetch: !state.reFetch,
        userData: {
          ...state.userData,
          datasets: state.userData.datasets.filter((dataset, index) => {
            if (dataset.id === payload.id) {
              return false;
            } else {
              return true;
            }
          })
        }
      };
    case LOGOUT:
      return {
        ...state,
        error: "",
        //logging in
        isLoggingIn: false,
        isRegistering: false,
        credentials: [],
        token: "",
        //getting data from API or similar
        isFetching: false,
        //data storage
        userData: {
          labels: [],
          datasets: [{ id: "", label: "", data: [] }]
        },
        // is_Array1: [],
        // is_Object1: {},
        //adding data
        isAdding: false,
        newData: {
          label: "",
          data: []
        },
        isNewBranch: false,
        newBranch: [],
        //editing data
        isEditing: false,
        initialData: {
          data: []
        },
        dataToEdit: {},
        //other categories...
        reFetch: false
      };
    default:
      return state;
  }
};

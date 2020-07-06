import axios from "axios";

import {
IS_AUTH, GET_DM_USERS
} from "./types";


//axios.defaults.baseURL = "https://demos.shawndsilva.com/list-wala"
// Uncomment the above with the baseurl where you host this app in prod, leave as-is for development

//Check if user is already logged in


const headers = {
  headers: {
    "Authorization":"Bearer "+localStorage.getItem("LRC_Token")
  }
};

export const isAuth = (myToken) => (dispatch) => {
  axios.defaults.headers.common["Authorization"] =
  "Bearer " + myToken;

  axios.get("/api/auth/user")
  .then((res) =>{
    // if(res.status === 201) {
      console.log("IS AUTH USER DATA RESPONSE");
      console.log(res.data);
      dispatch({type:IS_AUTH, payload: res.data});
    // }
  })
  .catch((err) => {

  });
}

export const getDmUsers =  () => (dispatch) => {
  axios.get("/api/allusers", headers)
  .then((res) =>{
    console.log(res.data);
    const users = res.data;
    dispatch({type:GET_DM_USERS, payload:users});
  })
  .catch((err) => {
  });

}

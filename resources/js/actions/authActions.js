import axios from "axios";
import { returnStatus } from "./statusActions";
import {echoInit} from "./../components/utils/echoHelpers";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
  ADD_NOTIFICATION,
  ACCEPT_REQUEST_SUCCESS,
  ADD_CHANNEL_SUCCESS
} from "./types";


//axios.defaults.baseURL = "https://demos.shawndsilva.com/list-wala"
// Uncomment the above with the baseurl where you host this app in prod, leave as-is for development

//Check if user is already logged in
export const getUser = () => (dispatch, getState) => {

  axios
  .get("/api/auth/user",{withCredentials:true})
  .then((res) =>{
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    })
    
    const state = getState();  
  const userId = state.auth.currUser.id;
  console.log("CURR USER FROM AUTH ACTIONS");

  console.log(userId);
    initNotificationAndEventChannels(userId, dispatch);
  })
  .catch((err) => {
    dispatch({
      type: AUTH_FAIL
    });
    console.log(err);
  });

  

}


//Register New User
export const register = ({ name, email, password }, history) => (dispatch) => {
  // Headers
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/auth/register", body, headers)
    .then((res) =>{
      dispatch(returnStatus(res.data, res.status, 'REGISTER_SUCCESS'))
      dispatch({
        type: REGISTER_SUCCESS,
      });
      // dispatch({ type: IS_LOADING })
    })
    .catch((err) => {
      console.log("FROM REGISTRATION");
      console.log(err.response.data);
      dispatch(returnStatus(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: REGISTER_FAIL
      });
      // dispatch({ type: IS_LOADING })
    });
};

//Login User
export const login = ({ email, password }, history) => (dispatch, getState) => {
  // Headers
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", body, headers)
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch({ type: IS_LOADING });
      dispatch(getUser());

      // Initializes echo with token received upon login
      const state = getState();
      // const token = state.auth.token;
      // echoInit(token);
      // dispatch(history.push("/chat"));
      axios
      .get(`/api/online/${state.auth.currUser.id}`, headersObj, {withCredentials:true})
      
    }
    )
    .catch((err) => {
      dispatch(returnStatus(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      });
      // dispatch({ type: IS_LOADING })
    });
};

//Logout User and Destroy session
export const logout = (id, channel_id) => (dispatch) => {
  window.Echo.leave("chat")
  axios
  .get(`/api/offline/${id}`, {withCredentials:true});
  window.Echo.leave(`chat.channel.${channel_id}`)
  window.Echo.disconnect();
    axios
    .get("/api/auth/logout", { withCredentials: true })
    .then((res) =>{
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    }
    )
    .catch((err) => {
      console.log(err);
    });

}

export const makeHeaders = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;
  // console.log(token);
  // Headers
  const headersObj = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  // if (token) {
  //   headersObj.headers["Authorization"] = "Bearer " + token;
  // }

  return headersObj;
};


const initNotificationAndEventChannels = (userId, dispatch  ) => {
  window.Echo.private(`App.User.${userId}`)
  .notification((notification) => {
    console.log("NOTIFICATION BELOW");
    console.log(notification);
    dispatch({ type: ADD_NOTIFICATION, payload: notification});
  });

  window.Echo.join(`event.acceptRequest.${userId}`).listen(
    "AcceptRequest",
    event => {
        console.log("ACCEPT REQUEST EVENT OUTPUT BELOW");
        console.log(event);
        if(event[1] == 'FRND') {
          dispatch({ type: ACCEPT_REQUEST_SUCCESS, payload: event[0] });
      } else {
          dispatch({ type: ADD_CHANNEL_SUCCESS, payload: event[0] });
      }
    });
}
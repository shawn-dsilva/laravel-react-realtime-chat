import Echo from "laravel-echo";
import {
    ADD_NOTIFICATION,
    ACCEPT_REQUEST_SUCCESS,
    ADD_CHANNEL_SUCCESS
} from "./../../actions/types";


export const echoInit = token => {
    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        disableStats: true,
        forceTLS: false
    });

    window.Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + token;
    window.Echo.options.auth = {
        headers: {
            Authorization: "Bearer " + token
        }
    };

    window.Echo.join("chat");
};

export const sendMessage = ( message, channel_id, channel_type) => {
    const body = JSON.stringify({ message, channel_id, channel_type });

    const postHeaders = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("LRC_Token"),
            "Content-Type": "application/json"
        }
    };
    axios
        .post("/api/messages", body, postHeaders)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map(error => {
                console.log(error.toString());
            });
        });
};

export const initNotificationAndEventChannels = (userId, dispatch ) => {
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
            dispatch({ type: ACCEPT_REQUEST_SUCCESS, payload: data });
        } else {
            dispatch({ type: ADD_CHANNEL_SUCCESS, payload: channel });
        }
      });
}
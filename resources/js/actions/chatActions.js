import axios from "axios";

import {
    IS_AUTH,
    GET_DM_USERS,
    GET_MESSAGES,
    SET_SELECTED_CHANNEL,
    CLEAR_MESSAGES,
    ADD_MESSAGE
} from "./types";

//axios.defaults.baseURL = "https://demos.shawndsilva.com/list-wala"
// Uncomment the above with the baseurl where you host this app in prod, leave as-is for development

//Check if user is already logged in

const headers = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("LRC_Token")
    }
};

const postHeaders = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("LRC_Token"),
        "Content-Type": "application/json"
    }
};


export const isAuth = () => dispatch => {
    // axios.defaults.headers.common["Authorization"] =
    // "Bearer " + myToken;

    axios
        .get("/api/auth/user", headers)
        .then(res => {
            // if(res.status === 201) {
            console.log("IS AUTH USER DATA RESPONSE");
            console.log(res.data);
            dispatch({ type: IS_AUTH, payload: res.data });
            // }
        })
        .catch(err => {});
};

export const getDmUsers = () => dispatch => {
    axios
        .get("/api/allusers", headers)
        .then(res => {
            console.log(res.data);
            const users = res.data;
            dispatch({ type: GET_DM_USERS, payload: users });
        })
        .catch(err => {});
};

export const getMessages = selectedChannel => dispatch => {
    console.log("CURRENTLY SELECTED CHANNEL BELOW");
    console.log(selectedChannel);

    axios
        .get(`/api/messages/${selectedChannel.id}`, headers)
        .then(res => {
            console.log("GET MESSAGES OUTPUT BELOW");
            console.log(res.data);
            const messages = res.data;
            dispatch({ type: GET_MESSAGES, payload: messages });
        })
        .catch(err => {});
};
export const dmSelectAction = id => {
    return (dispatch, getState) => {
        window.Echo.leave("chat.channel.5");
        const body = `{ "receiver": ${id} }`;
        axios
            .post("/api/directmessage", body, postHeaders)
            .then(res => {
                dispatch({ type: SET_SELECTED_CHANNEL, payload: res.data });

                window.Echo.join(`chat.dm.${id}`)
                .listen("MessageSent", (event) => {
                    console.log(event);
                    const message = {
                      user: event.user,
                      message: event.message.message
                    }
                    dispatch({type:ADD_MESSAGE, payload:message})
                 });
                const state = getState();
                const selectedChannel = state.chat.selectedChannel;
                console.log("GET STATE SELECTED CHANNEL");
                console.log(state);
                dispatch(getMessages(selectedChannel));

            })
            .catch(err => {
                // const errors = err.response.data.errors;
                // console.log(errors);
                // Object.values(errors).map( error => {
                //   console.log(error.toString());
                // });
            });
    };
};

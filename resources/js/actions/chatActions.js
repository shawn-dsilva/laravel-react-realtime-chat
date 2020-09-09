import axios from "axios";
import {makeHeaders} from "./authActions";
import {
    IS_AUTH,
    GET_DM_USERS,
    GET_MESSAGES,
    SET_SELECTED_CHANNEL,
    CLEAR_MESSAGES,
    ADD_MESSAGE,
    SET_USERS_IN_ROOM,
    ADD_USER_TO_ROOM,
    USER_LEAVES_ROOM,
    CREATE_CHANNEL_SUCCESS,
    GET_CHANNELS
} from "./types";

//axios.defaults.baseURL = "https://demos.shawndsilva.com/list-wala"
// Uncomment the above with the baseurl where you host this app in prod, leave as-is for development

//Check if user is already logged in

const headers = {
    headers: {
        Authorization: "Bearer " + localStorage.LRC_Token
    }
};

const postHeaders = {
    headers: {
        "Authorization": "Bearer " + localStorage.LRC_Token,
        "Content-Type": "application/json"
    }
};

// export const isAuth = () => dispatch => {
//     // axios.defaults.headers.common["Authorization"] =
//     // "Bearer " + myToken;

//     axios
//         .get("/api/auth/user", headers)
//         .then(res => {
//             // if(res.status === 201) {
//             console.log("IS AUTH USER DATA RESPONSE");
//             console.log(res.data);
//             dispatch({ type: IS_AUTH, payload: res.data });
//             // }
//         })
//         .catch(err => {});
// };

export const getDmUsers = () => (dispatch, getState) => {
    axios
        .get("/api/allusers", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log(res.data);
            const users = res.data;
            dispatch({ type: GET_DM_USERS, payload: users });
        })
        .catch(err => {});
};

export const getChannels = () => (dispatch, getState) => {
    axios
        .get("/api/getchannels", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            const channels = res.data;
            dispatch({ type: GET_CHANNELS, payload: channels });
        })
        .catch(err => {});
};

export const getMessages = selectedChannel => (dispatch, getState) => {
    console.log("CURRENTLY SELECTED CHANNEL BELOW");
    console.log(selectedChannel);

    axios
        .get(`/api/messages/${selectedChannel.id}`, makeHeaders(getState), {withCredentials:true})
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
        // Leave general channel

        window.Echo.leave("chat.channel.5");

        // Make Post request containing ID of recepient.
        // If a Chat Room containing only these two users exists.
        // It will be returned, else a new chatroom will be created
        // for only these two users and  returned

        const body = `{ "receiver": ${id} }`;
        axios
            .post("/api/directmessage", body, makeHeaders(getState), {withCredentials:true})
            .then(res => {
                // selectedChannel state is set to chatroom/channel object in response
                dispatch({ type: SET_SELECTED_CHANNEL, payload: res.data });

                // Join the chatroom in Echo
                window.Echo.join(`chat.dm.${res.data.id}`).listen(
                    "MessageSent",
                    event => {
                        console.log(event);
                        const message = {
                            user: event.user,
                            message: event.message.message
                        };
                        dispatch({ type: ADD_MESSAGE, payload: message });
                    }
                );

                // Get current updated State
                const state = getState();
                const selectedChannel = state.chat.selectedChannel;

                //getMessages(selectedChannel) works only inside dispatch()
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

export const channelSelect = id => {
    window.Echo.leave("chat.channel.5");

    return (dispatch, getState) => {

        dispatch({ type: SET_SELECTED_CHANNEL, payload: id });
        const selectedChannelInState = getState().chat.selectedChannel;

        dispatch(getMessages(selectedChannelInState));

        window.Echo.join(`chat.channel.${selectedChannelInState.id}`)
            .here(users => {
                users.forEach(user => (user.name += "FROM.HERE()"));
                dispatch({ type: SET_USERS_IN_ROOM, payload: users });
            })
            .joining(user => {
                dispatch({ type: ADD_USER_TO_ROOM, payload: user });

                // this.setState( function (state, props) {
                //   const isInState = state.users.some( (existingUser) => existingUser.id === user.id);

                //   if(isInState) {
                //     return state;
                //   } else {
                //     return [...this.state.users, user ]
                //   }
                // });

                const message = {
                    user: user,
                    message: "Joined",
                    status: true
                };

                if (selectedChannelInState.type === "channel") {
                    dispatch({ type: ADD_MESSAGE, payload: message });
                }
            })
            .leaving(user => {
                dispatch({ type: USER_LEAVES_ROOM, payload: user });

                const message = {
                    user: user,
                    message: "Left",
                    status: true
                };
                if (selectedChannelInState.type === "channel") {
                    dispatch({ type: ADD_MESSAGE, payload: message });
                }
            })
            .listen("MessageSent", event => {
                console.log("IN FRONT END MESSAGE SENT");
                console.log(event);
                const message = {
                    user: event.user,
                    message: event.message.message
                };
                dispatch({ type: ADD_MESSAGE, payload: message });
            });
    };
};


export const CreateChannel = channelData => (dispatch,getState) => {
    axios
        .post("/api/createchannel", channelData, makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log(res.data);
            const channel = res.data;
            dispatch({ type: CREATE_CHANNEL_SUCCESS, payload: channel });
        })
        .catch(err => {});
}

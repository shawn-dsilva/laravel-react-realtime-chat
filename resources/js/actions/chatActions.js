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
    GET_CHANNELS,
    SEND_REQUEST_SUCCESS,
    ADD_NOTIFICATION,
    ACCEPT_REQUEST_SUCCESS,
    GET_ALL_USERS,
    GET_NOTIFICATIONS,
    GET_ALL_NOTIFICATIONS,
    NOTIF_MARK_AS_READ,
    GET_ALL_CHANNELS,
    ADD_CHANNEL_SUCCESS,
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
        .get("/api/getfriendslist", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log(res.data);
            const users = res.data;
            dispatch({ type: GET_DM_USERS, payload: users });
        })
        .catch(err => {});
};


export const getUsersList = () => (dispatch, getState) => {
    axios
        .get("/api/allusers", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log("GET ALL USERS DATA BELOW");
            console.log(res.data);
            const users = res.data;
            dispatch({ type: GET_ALL_USERS, payload: users });
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

        axios
        .get("/api/getallchannels", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            const channels = res.data;
            dispatch({ type: GET_ALL_CHANNELS, payload: channels });
        })
        .catch(err => {});

        axios
        .get("/api/getfriendslist", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log("FRIENDS LIST BELOW");
            console.log(res.data);
        })
        .catch(err => {});
};

export const getMessages = selectedChannel => (dispatch, getState) => {
    console.log("CURRENTLY SELECTED CHANNEL BELOW");
    console.log(selectedChannel);

    axios
        .get(`/api/messages/${selectedChannel}`, makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log("GET MESSAGES OUTPUT BELOW");
            console.log(res.data);
            const messages = res.data;
            dispatch({ type: GET_MESSAGES, payload: messages });
        })
        .catch(err => {});
};

export const dmSelectAction = (channel_id, username) => {
    return (dispatch, getState) => {
        // Leave general channel

        window.Echo.leave("chat.channel.5");

        // Make Post request containing ID of recepient.
        // If a Chat Room containing only these two users exists.
        // It will be returned, else a new chatroom will be created
        // for only these two users and  returned

                const channel = { "id": channel_id, "type":"dm", "name":username};
                dispatch({ type: SET_SELECTED_CHANNEL, payload: channel });

                // Join the chatroom in Echo
                window.Echo.join(`chat.dm.${channel_id}`).listen(
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
                dispatch(getMessages(selectedChannel.id));
    };
};

export const channelSelect = (channel_id, channel_name, desc, owner_id, owner) => {

    return (dispatch, getState) => {
        const prevId = getState().chat.selectedChannel.id;
        window.Echo.leave(`chat.channel.${prevId}`);

        const channel = { "id": channel_id, "type":"channel", "name": channel_name, "desc": desc, "owner_id":owner_id, "owner":owner};

        dispatch({ type: SET_SELECTED_CHANNEL, payload: channel });
        const selectedChannelInState = getState().chat.selectedChannel;

        dispatch(getMessages(selectedChannelInState.id));

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

export const makeRequest = id => (dispatch,getState) => {

    const body = `{ "receiver": ${id} }`;

    console.log("makeRequest() ID BELOW");
    console.log(id);
    axios
        .post("/api/makerequest", body, makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log(res.data);
            const request = res.data;
            dispatch({ type: SEND_REQUEST_SUCCESS, payload: request });
        })
        .catch(err => {});
}

export const joinChannelRequest = (id, type) => (dispatch,getState) => {

    const body = `{ "receiver": ${id}}`;

    console.log("makeRequest() ID BELOW");
    console.log(id);
    axios
        .post("/api/joinchannel", body, makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log(res.data);
            const request = res.data;
            if(request != 'Join Request Sent') {
                dispatch({ type: ADD_CHANNEL_SUCCESS, payload: request });
            }
        })
        .catch(err => {});
}

export const inviteToChannel = (user_id, channel_id) => (dispatch,getState) => {

    const body = { receiver: user_id, channel_id: channel_id};

    axios
        .post("/api/invitetochannel", body, makeHeaders(getState), {withCredentials:true})
        .then(res => {
            const response = res.data;
            console.log("INVITE TO CHANNEL RESPONSE BELOW")
            console.log(response)
        })
        .catch(err => {});
}



export const getNotifications = () => (dispatch, getState) => {
    axios
        .get("/api/notifications", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            const notifications = res.data;
            console.log("GET NOTIFICATIONS OUTPUT BELOW");
            console.log(notifications);
            dispatch({ type: GET_NOTIFICATIONS, payload: notifications });
        })
        .catch(err => {});
};



export const acceptRequest = (id, type ) => (dispatch,getState) => {


    axios
        .get(`/api/acceptinvite/${id}`, makeHeaders(getState), {withCredentials:true})
        .then(res => {
            console.log("FROM /acceptrequest");
            console.log(res.data);
            const response = res.data;
            if(response.type != 'private' ) {
                dispatch({ type: ACCEPT_REQUEST_SUCCESS, payload: response });
            } else if (type == 'INVT') {
                dispatch({ type: ADD_CHANNEL_SUCCESS, payload: response });

            }

        })
        .catch(err => {});
}


export const getAllNotifications = () => (dispatch, getState) => {
    axios
        .get("/api/allnotifications", makeHeaders(getState), {withCredentials:true})
        .then(res => {
            const notifications = res.data;
            console.log("GET ALL NOTIFICATIONS OUTPUT BELOW");
            console.log(notifications);
            dispatch({ type: GET_ALL_NOTIFICATIONS, payload: notifications });
        })
        .catch(err => {});
};

export const markAsRead = (id) => (dispatch, getState) => {
    axios
    .get(`/api/markasread/${id}`, makeHeaders(getState), {withCredentials:true})
    .then(res => {
        console.log("MARK AS READ OUTPUT BELOW");
        dispatch({ type: NOTIF_MARK_AS_READ, payload: res.data });
    })
    .catch(err => {});
}

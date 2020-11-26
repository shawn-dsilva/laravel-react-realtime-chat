import {
    IS_AUTH,
    GET_MESSAGES,
    SET_MESSAGES,
    ADD_MESSAGE,
    CLEAR_MESSAGES,
    SET_USERS_IN_ROOM,
    GET_DM_USERS,
    ADD_USER_TO_ROOM,
    USER_LEAVES_ROOM,
    SET_SELECTED_CHANNEL,
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
    IS_ONLINE
} from "../actions/types";

const initialState = {
    messages: [],
    message: {},
    selectedChannel: {},
    usersInRoom: [],
    dmUsers: [],
    usersList: [],
    currUser: {},
    channels: [],
    allChannels: [],
    requests: [],
    notifications: [],
    unreadNotifs: 0,
    allNotifications: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case IS_AUTH:
            return {
                ...state,
                currUser: action.payload
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: []
            };
        case SET_USERS_IN_ROOM:
            return {
                ...state,
                usersInRoom: action.payload
            };
        case GET_DM_USERS:
            return {
                ...state,
                dmUsers: action.payload
            };

        case GET_ALL_USERS:
            return {
                ...state,
                usersList: action.payload
            };
        case ADD_USER_TO_ROOM:
            return {
                ...state,
                usersInRoom: state.usersInRoom.concat(action.payload)
            };
        case USER_LEAVES_ROOM:
            return {
                ...state,
                usersInRoom: state.usersInRoom.filter(
                    user => user.id !== action.payload.id
                )
            };
        case GET_CHANNELS:
            return {
                ...state,
                channels: action.payload
            };

        case GET_ALL_CHANNELS:
            return {
                ...state,
                allChannels: action.payload
            };
        case SET_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannel: action.payload
            };
        case CREATE_CHANNEL_SUCCESS:
        case ADD_CHANNEL_SUCCESS:
            console.log("in create channel success branch");
            return {
                ...state,
                channels: state.channels.concat(action.payload)
            };
        case SEND_REQUEST_SUCCESS:
            console.log("in create request success branch");
            return {
                ...state,
                requests: state.requests.concat(action.payload)
            };

        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload.notifications,
                unreadNotifs: action.payload.unread_count
            };

        case GET_ALL_NOTIFICATIONS:
            return {
                ...state,
                allNotifications: action.payload
            };

        case ADD_NOTIFICATION:
            console.log("in create request success branch");
            console.log(action.payload);
            const payload = {
                data: action.payload,
                id: action.payload.id,
                read_at: null
            };
            return {
                ...state,
                notifications: state.notifications.concat(payload),
                unreadNotifs: state.unreadNotifs + 1
            };
        case ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                dmUsers: state.dmUsers.concat(action.payload)
            };
        case NOTIF_MARK_AS_READ:
            console.log(action.payload);
            return {
                ...state,
                unreadNotifs: state.unreadNotifs - 1,
                notifications: state.notifications.map(notification => {
                    if (notification.data.id == action.payload[0].data.id) {
                        console.log(notification);
                        notification.read_at = action.payload[0].read_at;
                        return notification;
                    } else {
                        return notification;
                    }
                })
            };
        case IS_ONLINE:
            console.log(action.payload);
            return {
                ...state,
                dmUsers: state.dmUsers.map(dmuser => {
                    if(dmuser.users[0].id == action.payload) {
                        dmuser.users[0].is_online = 1;
                        return dmuser;
                    } else {
                        return dmuser;
                    }
                })
            }
        default:
            return state;
    }
}

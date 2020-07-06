import {
    IS_AUTH,
    GET_MESSAGES,
    SET_MESSAGES,
    ADD_MESSAGE,
    CLEAR_MESSAGES,
    GET_USERS_IN_ROOM,
    GET_DM_USERS,
    ADD_USER_TO_ROOM,
    USER_LEAVES_ROOM,
    SET_SELECTED_CHANNEL
} from "../actions/types";

const initialState = {
    messages: [],
    message:{},
    selectedChannel:{},
    usersInRoom:[],
    dmUsers:[],
    currUser:{}

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
                selectedChannel: []
            };
        case GET_USERS_IN_ROOM:
            return {
                ...state,
                usersInRoom: action.payload
            };
        case GET_DM_USERS:
            return {
                ...state,
                dmUsers: action.payload
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
                    user => user.id !== action.payload
                )
            };
        case SET_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannel: action.payload
            };
        default:
            return state;
    }
}
import axios from 'axios';
import { GET_LIST, GET_SINGLE_LIST, CREATE_LIST,
  DELETE_LIST, CREATE_TODO, DELETE_TODO, GET_TODO,
CREATE_ITEM, STATUS_ITEM, STATUS_TODO, ADD_DESC, INVALID_INPUT } from './types'

 //axios.defaults.baseURL = "https://demos.shawndsilva.com/list-wala"
// Uncomment the above with the baseurl where you host this app in prod, leave as-is for development


export const getList = () => (dispatch) => {
  axios
    .get("/api/lists", { withCredentials:true })
    .then((res) =>
      dispatch({
        type: GET_LIST,
        payload: res.data
      })
    )
};

export const createNewList = (name) => (dispatch) => {
  axios
    .post("/api/lists", { name: name }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: CREATE_LIST,
        payload: res.data
      })
    )
};

export const getSingleList = (id) => (dispatch) => {
  axios
    .get("/api/lists/" + id, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: GET_SINGLE_LIST,
        payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: INVALID_INPUT,
          payload: err.data
        })
      )
};

export const deleteOneList = (id) => (dispatch) => {
  axios
    .delete("/api/lists/" + id, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: DELETE_LIST,
        payload: id
      })
    )
};

export const createNewTodo = (listId, name) => (dispatch) => {
  axios
    .post("/api/lists/" + listId , { name: name }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: CREATE_TODO,
        payload: res.data
      })
    )
};

export const getOneTodo = (listId, todoId) => (dispatch) => {
  axios
    .get("/api/lists/" + listId + "/todo/" + todoId, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: GET_TODO,
        payload: res.data
      })
    )
};

export const deleteOneTodo = (listId, todoId) => (dispatch) => {
  axios
    .delete("/api/lists/" + listId + '/todo/' + todoId, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: DELETE_TODO,
        payload: todoId
      })
    )
};

export const addNewItem = (listId, todoId, name) => (dispatch) => {
  axios
    .post("/api/lists/" + listId + '/todo/' + todoId , { name: name }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: CREATE_ITEM,
        payload: res.data
      })
    )
};

export const markDone = (listId, todoId, checklistId, isDone) => (dispatch) => {
  axios
    .put("/api/lists/" + listId + '/todo/' + todoId + '/item/' + checklistId, {isDone: isDone}, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: STATUS_ITEM,
        payload: res.data
      })
    )
};

export const changeStatus = (listId, todoId, status) => (dispatch) => {
  axios
    .put("/api/lists/" + listId + '/todo/' + todoId , {status: status}, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: STATUS_TODO,
        payload: res.data
      })
    )
};

export const addDesc = (listId, todoId, desc) => (dispatch) => {
  axios
    .put("/api/lists/" + listId + '/todo/' + todoId + '/desc', { desc: desc }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: ADD_DESC,
        payload: res.data
      })
    )
};

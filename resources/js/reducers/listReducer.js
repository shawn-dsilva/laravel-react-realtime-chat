import {
  GET_LIST,
  GET_SINGLE_LIST,
  CREATE_LIST,
  DELETE_LIST,
  CREATE_TODO,
  DELETE_TODO,
  GET_TODO,
  CREATE_ITEM,
  STATUS_ITEM,
  STATUS_TODO,
  ADD_DESC,
  INVALID_INPUT,
} from "../actions/types";


const initialState = {
  items:[],
  currList:{},
  newList:{},
  currTodo: {},
  error: false
};

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_SINGLE_LIST:
      return {
        ...state,
        currList: action.payload,
        error:false
      };

    case INVALID_INPUT:
      return {
        ...state,
        error: true
      }

    case GET_LIST:
      return {
        ...state,
        items: action.payload
      };

    case CREATE_LIST:
        return {
          ...state,
          items: [...state.items, action.payload ]
        };

    case DELETE_LIST:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };

    case CREATE_TODO:
        return {
          ...state,
          currList: {
            ...state.currList,
            todos: [...state.currList.todos, action.payload ]
          }
        };

    case GET_TODO:
      return {
        ...state,
        currTodo: action.payload.todos[0]
      };

    case DELETE_TODO:
        return {
          ...state,
          // NEW OBJECT of currList is being returned.
          // To preserve properties of currList, current state also has to be added
          // to new currList object
          currList: { ...state.currList,
            todos: state.currList.todos.filter(todo => todo._id !== action.payload)
          }
        };

    case CREATE_ITEM:
        return {
          ...state,
          currTodo: {
            ...state.currTodo,
            checklist: [...state.currTodo.checklist, action.payload ]
          }
        };

    case STATUS_ITEM:
        return {
          ...state,
          currTodo: {
            ...state.currTodo,
            //checklist: [...state.currTodo.checklist, action.payload ]
             checklist: state.currTodo.checklist.map( item => item._id === action.payload._id ?
              {...item, isDone: action.payload.isDone} : item )
            }
          };
    case STATUS_TODO:
          return {
            ...state,
            currTodo: {
              ...state.currTodo,
              status: action.payload
            },
            currList: {
              ...state.currList,
              todos: state.currList.todos.map( todo => todo._id === state.currTodo._id ?
                {...todo, status: action.payload}: todo )
            }
          };
    case ADD_DESC:
          return {
            ...state,
            currTodo: {
              ...state.currTodo,
              desc: action.payload
            },
            currList: {
              ...state.currList,
              todos: state.currList.todos.map( todo => todo._id === state.currTodo._id ?
                {...todo, desc: action.payload}: todo )
            }
          };
    default:
        return state;
  }

}
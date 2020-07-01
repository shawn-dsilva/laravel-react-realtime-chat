import { combineReducers} from 'redux';
// import errorReducer from './errorReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import statusReducer from './statusReducer';
import listReducer from './listReducer';


export default combineReducers({
    // error: errorReducer,
    auth: authReducer,
    ui: uiReducer,
    status: statusReducer,
    list: listReducer
});
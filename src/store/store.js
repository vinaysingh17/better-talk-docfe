import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk"; 
import appReducer from './reducers/appReducer';
import docReducer from './reducers/docReducer';
import joinReducer from './reducers/joinReducer';
import userReducer from './reducers/userReducer';
import chatReducer from './reducers/chatReducer';
import forumReducer from './reducers/forumReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
    app: appReducer,
    doc: docReducer,
    join: joinReducer,
    user: userReducer,
    chat: chatReducer,
    forum: forumReducer,
    notification: notificationReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
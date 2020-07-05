import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userReducer from './user.js';
import postReducer from './posts.js';
import commentReducer from './comments';

export default function createRootReducer(history) {
return combineReducers({
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    router: connectRouter(history)
})
}
import * as constants from '../constants';
import axios from 'axios';

export default {
    saveUserInputLogin(value) {
        return {
            type: constants.USER_INPUT_LOGIN_CHANGED,
            payload: value
        }
    },
    saveUserInputPassword(value) {
        return {
            type: constants.USER_INPUT_PASSWORD_CHANGED,
            payload: value
        }
    },
    onLogin () {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_USER_LOGIN_LOADING,
            });
            try {
                const res = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/login',
                    data: {
                          "password": store.user.password,
                             "email": store.user.email
                    }
                });
                const token = res.data.token;
                localStorage.setItem('jwt', token);
                    dispatch({
                    type: constants.USER_TRY_TO_LOG_IN,
                    payload: res.data
                });

            } catch (error) {
                dispatch({
                    type: constants.AUTHENTICATION_ERROR,
                    payload: error.response.data.message
                        //'Invalid email or password'
                });
            }

        }
    },
    onLogout() {
        localStorage.clear();
        return {
            type: constants.USER_TRY_TO_LOG_OUT
        }
    },
    fetchUsers() {
        return async (dispatch, getState) => {
            dispatch({
                type: constants.GET_USERS_LOADING,
            });

            try {
                const response = await axios.get('http://localhost:3000/info_allUsers');
                dispatch({
                    type: constants.GET_USERS_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_USERS_FAIL,
                    payload: e.response.data.message,
                });
            }
        };
    },
    deleteAccount(value){
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.USER_TRY_DELETE_ACCOUNT,
                payload: value
            });
            try {
                const response = await axios({
                    method: 'get',
                    url: `http://localhost:3000/user_delete/${value}`,
                    headers: {
                        'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    }
                });
                    dispatch({
                        type: constants.USER_DELETED_ACCOUNT,
                        payload: response.data
                    })}

            catch (e) {
                dispatch({
                    type: constants.USER_GET_ERROR_DELETE,
                    payload: e.response.data.message,
                });
            }
        };
    }
}

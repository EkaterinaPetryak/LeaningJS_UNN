import * as constants from '../constants';
import axios from 'axios';

export default {
    //Ввод данных
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
    saveUserInputUserName(value) {
        return {
            type: constants.USER_INPUT_NAME_CHANGED,
            payload: value
        }
    },
    saveUserInputSurname(value) {
        return {
            type: constants.USER_INPUT_SURNAME_CHANGED,
            payload: value
        }
    },
    saveUserInputBirthday(value) {
        return {
            type: constants.USER_INPUT_BIRTHDAY_CHANGED,
            payload: value
        }
    },
    //Пользователь хочет зарегестрироваться
    onRegistration(){
        return {
            type: constants.USER_WANT_REGISTRATION,
        }
    },
    //Регистрация пользователя
    onRegistered() {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_USER_REGISTRATION_LOADING,
            });
            try {
                const res = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/user/register',
                    data: {
                        "password": store.user.password,
                        "email": store.user.email,
                        "userName": store.user.userName,
                        "userSurname": store.user.userSurname,
                        "birthday": store.user.birthday
                    }
                });
                dispatch({
                    type: constants.GET_USER_REGISTERED,
                    payload: res.data.userId
                });

            } catch (error) {
                dispatch({
                    type: constants.GET_USER_REGISTRATION_FAIL,
                    payload: error.response.data.message
                });
            }
        }
    },
    //Хотим изменить данные
    onWantUpdateUser(value){
        return {
            type: constants.USER_WANT_UPDATE_DATA,
            payload: value,
        }
    },
    //Изменение данных
    onUpdateUser() {
        return async (dispatch, getState) => {
            const store = getState();
            console.log('!!!!!!!!!!!', store.user.token, store.user.userMongoId);
            dispatch({
                type: constants.GET_USER_UPDATING_DATA,
            });
            try {
                const res = await axios({
                    method: 'post',
                    url: `http://localhost:3000/info_update/${store.user.userMongoId}`,
                    data: {
                        "userName": store.user.userName,
                        "userSurname": store.user.userSurname,
                        "birthday": store.user.birthday
                    },
                    headers: {
                        'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    }
                });
                dispatch({
                    type: constants.GET_USER_UPDATED_DATA,
                    payload: res.data
                });

            } catch (error) {
                dispatch({
                    type: constants.GET_USER_UPDATE_DATA_FAIL,
                    payload: error.response.data.message
                });
            }
        }
    }
}

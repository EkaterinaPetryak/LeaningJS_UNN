import * as constants from '../constants';

const initialState = {
    token: localStorage.getItem('jwt')||'',
    selectTokenUser:'',
    email: '',
    password:'',
    userName:'',
    userSurname:'',
    birthday:'',
    userId:'',
    userMongoId:'',
    isSuccessResponse:'',
    isSuccessDelResponse:'',
    isRegisteredLoading:false,
    isRegistered:false,
    isLoggedIn: false,
    isLoggedInLoading: false,
    isUserUpdateLoading: false,
    isUserWantUpdateData: false,
    isSuccessUpdateUser: false,
    userWantRegistration: false,
    users: [],
    isLoading: false,
    isDeleteAccount: false,
    isDeletingAccount: false,
    errMsg: '',
    errMsgAuth:'',
    errMsgDel:'',
    pages:[
        {pageId: 4, name: 'Главная', path:'/', vision: 'visible'},
        {pageId: 1, name: 'Статьи', path:'/articles', vision: 'visible'},
        {pageId: 2, name: 'Пользователи', path:'/users', vision: 'visible'},
        {pageId: 3, name: 'Вход', path:'/comeIn', vision: 'visible'},
        {pageId: 123, name: 'Выход', path:'/goOut'},
    ]
};


export default function userReducer(state=initialState, action) {
    switch (action.type) {
        //Пользователь логинется
        case constants.USER_INPUT_LOGIN_CHANGED:
            return {
                ...state,
                email: action.payload
            };
        case constants.USER_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload
            };
        case constants.GET_USER_LOGIN_LOADING:
            return {
                ...state,
                isLoggedInLoading: true
            };
        case constants.USER_TRY_TO_LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                userName: action.payload.userName,
                userSurname: action.payload.userSurname,
                userId: action.payload.userId,
                birthday: action.payload.birthday,
                pages: [
                    {pageId: 4, name: `Привет, ${action.payload.userName}` ,vision: 'visible'},
                    {pageId: 0, name: 'Главная', path:'/',vision: 'visible'},
                    {pageId: 1, name: 'Статьи', path:'/articles', vision: 'visible'},
                    {pageId: 2, name: 'Пользователи', path:'/users',vision: 'visible'},
                    {pageId: 3, name: 'Вход', path:'/comeIn'},
                    {pageId: 123, name: 'Выход', path:'/goOut',vision: 'visible' },
                ],
                errMsgAuth: ''

            };
        case constants.AUTHENTICATION_ERROR:
            return {
                ...state,
                errMsgAuth: action.payload
            };
        case constants.USER_TRY_TO_LOG_OUT:
            return {
                ...state,
                userLogin: '',
                isLoggedIn: false,
                pages: [
                    {pageId: 0, name: 'Главная', path:'/',vision: 'visible'},
                    {pageId: 1, name: 'Статьи', path:'/articles', vision: 'visible'},
                    {pageId: 2, name: 'Пользователи', path:'/users',vision: 'visible'},
                    {pageId: 3, name: 'Вход', path:'/comeIn', vision: 'visible'},
                    {pageId: 123, name: 'Выход', path:'/goOut'},
                ],
                token: localStorage.clear()
            };
            //Загрузка пользователей
        case  constants.GET_USERS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case  constants.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                errMsg: ''
            };
        case constants.GET_USERS_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isLoading: false
            };
            //Пользователь хочет зарегестрироваться
        case constants.USER_WANT_REGISTRATION:
            return {
                ...state,
                userWantRegistration:true,
            };

            //Регистрация пользователей
        case constants.USER_INPUT_NAME_CHANGED:
            return {
                ...state,
                userName: action.payload
            };
        case constants.USER_INPUT_SURNAME_CHANGED:
            return {
                ...state,
                userSurname: action.payload
            };
        case constants.USER_INPUT_BIRTHDAY_CHANGED:
            return {
                ...state,
                birthday: action.payload
            };
        case constants.GET_USER_REGISTRATION_LOADING:
            return {
                ...state,
                isRegisteredLoading: true
            };
        case constants.GET_USER_REGISTERED:
            return {
                ...state,
                isRegistered: true,
                isRegisteredLoading: false,
                userWantRegistration:false,
                userId: action.payload,
                errMsgAuth:false,
                errMsg: '',
            };
        case constants.GET_USER_REGISTRATION_FAIL:
            return {
                ...state,
                errMsg: action.payload
            };
         //Удаление аккаунта
        case constants.USER_TRY_DELETE_ACCOUNT:
            return {
                ...state,
                isDeleteAccount: false,
                isDeletingAccount: true,
                userMongoId: action.payload,
            };
        case constants.USER_DELETED_ACCOUNT:
            return {
                ...state,
                isDeletingAccount: false,
                isDeleteAccount: true,
                isSuccessDelResponse: action.payload,
                errMsgDel: '',
                token: localStorage.clear(),

            };
            case constants.USER_GET_ERROR_DELETE:
            return {
                ...state,
                isDeletingAccount: false,
                isDeleteAccount: false,
                errMsgDel: action.payload
            };
            //Пользователь хочет обновить данные
        case constants.USER_WANT_UPDATE_DATA:
            return {
                ...state,
                isUserWantUpdateData: true,
                userMongoId: action.payload
            };
            //Обновление данных
        case constants.GET_USER_UPDATING_DATA:
            return {
                ...state,
                isUserUpdateLoading: true,
            };
        case constants.GET_USER_UPDATED_DATA:
            return {
                ...state,
                // isUserWantUpdateData: false,
                isUserUpdateLoading: false,
                isSuccessUpdateUser: true,
                isSuccessResponse: action.payload,
                errMsg: '',
                pages: [
                    {pageId: 4, name: `Привет, ${action.payload.userName||state.userName}` ,vision: 'visible'},
                    {pageId: 0, name: 'Главная', path:'/',vision: 'visible'},
                    {pageId: 1, name: 'Статьи', path:'/articles', vision: 'visible'},
                    {pageId: 2, name: 'Пользователи', path:'/users',vision: 'visible'},
                    {pageId: 3, name: 'Вход', path:'/comeIn'},
                    {pageId: 123, name: 'Выход', path:'/goOut', vision: 'visible'},
                ],
            };
        case constants.GET_USER_UPDATE_DATA_FAIL:
            return {
                ...state,
                isUserUpdateLoading: false,
                isSuccessUpdateUser: false,
                errMsg: action.payload,
            };


        default:
            return state
    }
}
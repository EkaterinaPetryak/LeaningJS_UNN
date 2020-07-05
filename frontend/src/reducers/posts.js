import * as constants from '../constants';

const initialState = {
    posts: [],
    likes:'',
    post:'',
    isPostId: '',
    title:'',
    isFormPostLoading:false,
    isPostWrittenLoading: false,
    isPostLoading: false,
    isPostSelectLoading: false,
    isPosted: false,
    userNameByPost:'',
    isPostDeleting: false,
    isPostDeleted:false,
    updatePost: false,
    openFormThisPost: false,
    errLike: '',
    errorState:'',
    };

export default function postReducer(state=initialState, action) {
    switch (action.type) {
        //Загрузка постов
        case constants.GET_POSTS_LOADING:
            return {
                ...state,
                isPostLoading: true
            };
        case constants.GET_POSTS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                isPostLoading: false,
                posts: action.payload,
                errorState: ''
            };
        case constants.GET_POSTS_FAIL:
            return {
                ...state,
                isPostLoading: false,
                errorState: action.payload,
            };
        //Удаление поста
        case constants.GET_POST_DELETING:
            return {
                ...state,
                isPostDeleting: true,
                postId: action.payload
            };
        case constants.GET_POST_DELETED:
            return {
                ...state,
                isPostDeleting: false,
                isPostDeleted: true,
                errorState: '',
            };
        case constants.GET_POST_FAIL:
            return {
                ...state,
                isPostDeleting: false,
                errorState: action.payload
            };
         //Форма для поста
        case constants.FORM_POST_LOADING:
            return {
                ...state,
                isFormPostLoading: true
            };
        case constants.FORM_POST_LOADING_DISABLE:
            return {
                ...state,
                isFormPostLoading: false
            };
        //Заполнение формы к посту
        case constants.INPUT_TITLE_BY_POST_CHANGED:
            return {
                ...state,
                title: action.payload || '',
            };
        case constants.INPUT_POST_CHANGED:
            return {
                ...state,
                post: action.payload || '',
            };
        //Обнуление состояния открытия формы для незарегестрированных пользователей
        case constants.FORM_POST_DISABLED_STATE:
            return {
                ...state,
                isFormPostLoading: false
            };
      //Публикация поста
        case constants.GET_POST_PUBLIC_LOADING:
            return {
                ...state,
                isPostWrittenLoading: true
            };
        case constants.GET_POST_PUBLIC:
            return {
                ...state,
                isPostWrittenLoading: false,
                isFormPostLoading: false,
                errorState:'',
                posts: [...state.posts, action.payload]
            };
        case constants.GET_POST_PUBLICATION_FAIL:
            return {
                ...state,
                isPostWrittenLoading: false,
                errorState: action.payload
            };
            //Загрузка определённого поста
        case constants.GET_POST_SELECT_LOADING:
            return {
                ...state,
                isPostId: action.payload,
                isPostSelectLoading: true,
            };
        case constants.GET_POST_SELECT_LOADED_SUCCESS:
            const newArr= state.posts.map(item =>{if(item._id === state.isPostId) {return item = action.payload} else
                {return item}});
            console.log(newArr);
            return {
                ...state,
                isPostSelectLoading: false,
                posts: newArr,
                errorState:'',

            };
        case constants.GET_POST_SELECT_LOADED_FAIL:
            return {
                ...state,
                isPostSelectLoading: false,
                errorState: action.payload,
            };

            //Пользователь хочет обновить пост
        case constants.USER_WANT_UPDATE_POST:
            return {
                ...state,
                openFormThisPost: true,
                isPostId: action.payload
            };
           //Обновление поста
        case constants.GET_POST_UPDATING:
            return {
                ...state,
               updatePost: true
            };
        case constants.GET_POST_UPDATED:
            return {
                ...state,
                updatePost: false,
                openFormThisPost: false,
                errorState: '',
            };
        case constants.GET_POST_UPDATE_FAIL:
            return {
                ...state,
                updatePost: false,
                errorState: action.payload
            };

            //Проставление лайков
        case constants.LIKE_POST_LOADING:
            return{
                ...state,
                IsPostId: action.payload
            };
        case constants.LIKE_POST_LOADED_SUCCESS:
            return{
                ...state,
                likes: action.payload,
                errLike: '',
            };
        case constants.LIKE_POST_FAIL:
            return{
                ...state,
                errLike: action.payload
            };

        default:
            return state
    }


}
import * as constants from '../constants';

const initialState = {
    error: '',
    comment: '',
    comments:[],
    commentLoading: false,
    openForm: false,
    postId: '',
    commentLoadingDownPost:false,
    commentLoadedDownPost:false,
    userName: '',
    dateComment:'',
};

export default function commentReducer(state=initialState, action) {
    switch (action.type) {
         //Открытие формы для комментария
        case constants.OPEN_FORM_COMMENT:
            return {
                ...state,
                openForm: true,
                postId: action.payload

            };
            //Создание комментария
        case constants.USER_INPUT_COMMENT_CHANGED:
            return {
                ...state,
                comment: action.payload
            };
            //Публикация комментария
        case constants.GET_COMMENT_PUBLIC_LOADING:
            return{
                ...state,
                commentLoading: true,
            };
        case constants.GET_COMMENT_PUBLIC:
            return {
                ...state,
                commentLoading: false,
                openForm: false
            };
        case constants.GET_COMMENT_PUBLICATION_FAIL:
            return {
                ...state,
                commentLoading: false,
                openForm: false,
                error: action.payload
            };

         //Отмена публикации
        case constants.FORM_COMMENT_LOADING_DISABLE:
            return {
                ...state,
                openForm: false
            };
        //Загрузка комментариев под постом
        case constants.GET_COMMENTS_SELECT_LOADING:
            //console.log('!!!!!!!!!!!!!!!', this.postId);
            return {
                ...state,
                postId: action.payload,
                commentLoadingDownPost: true
            };
        case constants.GET_COMMENTS_SELECT_LOADED:
            return {
                ...state,
                commentLoadingDownPost: false,
                commentLoadedDownPost: true,
                comments: action.payload,
            };
        case constants.GET_COMMENTS_SELECT_FAIL:
            return {
                ...state,
                commentLoadedDownPost: false,
                commentLoadingDownPost: false,
                error: action.payload
            };
        //Отмена загрузки комментариев под постом
        case constants.DISABLE_COMMENT_DOWN_POST:
            return {
                ...state,
                commentLoadedDownPost:false
            };

        default:
            return state
    }


}
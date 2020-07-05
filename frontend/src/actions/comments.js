import * as constants from '../constants';
import axios from 'axios';

export default {

    //УДАЛЕНИЕ КОММЕНТАРИЯ
    fetchCommentDelete(value) {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_COMMENT_DELETING,
                payload: value
            });

            try {
                const response = await axios.get(`http://localhost:3000/comment_delete/{postId}/{commentId}`,
                );
                dispatch({
                    type: constants.GET_COMMENT_DELETED,
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_COMMENT_FAIL,
                    payload: e.response.data.message,
                });
            }
        };
    },

    //Отмена загрузки комментария
    onPostedCommentDisabled() {
        return {
            type: constants.FORM_COMMENT_LOADING_DISABLE,
        }
    },
    //Заполнение формы комментария
    saveCommentInput(value) {
        return {
            type: constants.USER_INPUT_COMMENT_CHANGED,
            payload: value
        }
    },
    //Открытие формы
    openFormComment(value){
        return{
            type:constants.OPEN_FORM_COMMENT,
            payload: value
        }
    },

    //Отправка комментария
    onPostedComment() {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_COMMENT_PUBLIC_LOADING,
            });
            try {
                const res = await axios({
                    method: 'post',
                    url: `http://localhost:3000/comment/${store.comment.postId}`,
                    data: {
                        "comment": store.comment.comment,
                    },
                    headers: {
                        'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    }
                });
                dispatch({
                    type: constants.GET_COMMENT_PUBLIC,
                    payload: res.data
                });

            } catch (error) {
                dispatch({
                    type: constants.GET_COMMENT_PUBLICATION_FAIL,
                    payload: error.response.data.message
                });
            }
        }
    },

    //Загрузка комментариев под постом
    onLoadingComment(value) {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_COMMENTS_SELECT_LOADING,
                payload: value
            });
            try {
                const res = await axios.get(`http://localhost:3000/select_comments/${value}`);
                dispatch({
                    type: constants.GET_COMMENTS_SELECT_LOADED,
                    payload: res.data||null
                });

            } catch (error) {
                dispatch({
                    type: constants.GET_COMMENTS_SELECT_FAIL,
                    payload: error.response.data.message
                });
            }
        }
    },
   //Отмена загрузки комментариев под постом
   onDisableComments() {
       return{
           type:constants.DISABLE_COMMENT_DOWN_POST,
       }
   }

}


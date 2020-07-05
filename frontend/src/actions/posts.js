import * as constants from '../constants';
import axios from 'axios';

export default {
    //ЗАГРУЗКА ВСЕХ ПОСТОВ
    fetchPosts() {
        return async (dispatch, getState) => {
            dispatch({
                type: constants.GET_POSTS_LOADING,
            });

            try {
                const response = await axios.get('http://localhost:3000/all_posts');
                dispatch({
                    type: constants.GET_POSTS_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_POSTS_FAIL,
                    payload: e.response.data.message,
                });
            }
        }
    },
    //ЗАГРУЗКА КОНКРЕТНОГО ПОСТА
    fetchSelectPost(value) {
        return async (dispatch, getState) => {
            dispatch({
                type: constants.GET_POST_SELECT_LOADING,
                payload: value
            });

            try {
                const response = await axios.get(`http://localhost:3000/select_post/${value}`);
                dispatch({
                    type: constants.GET_POST_SELECT_LOADED_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_POST_SELECT_LOADED_FAIL,
                    payload: e.response.data.message,
                });
            }
        }
    },
    //УДАЛЕНИЕ ПОСТА
    fetchPostDelete(value) {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_POST_DELETING,
                payload: value
            });

            try {
                const response = await axios({
                    method: 'get',
                    url: `http://localhost:3000/post_delete/${value}`,
                    headers: {
                        'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    }
                });
                dispatch({
                    type: constants.GET_POST_DELETED,
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_POST_FAIL,
                    payload: e.response.data.message,
                });
            }
        };
    },
    //Загрузка формы для поста
    onPostIn() {
        return {
            type: constants.FORM_POST_LOADING,
        }
    },
    //Отмена загрузки
    onPostedDisabled() {
        return {
            type: constants.FORM_POST_LOADING_DISABLE,
        }
    },
    //Обнуление состояния открытия формы для незарегестрированных пользователей
    disableOpenForm () {
        return{
            type: constants.FORM_POST_DISABLED_STATE
        }
    },
    //Заполнение формы
    saveTitleByPostInput(value) {
        return {
            type: constants.INPUT_TITLE_BY_POST_CHANGED,
            payload: value
        }
    },
    savePostInput(value) {
        return {
            type: constants.INPUT_POST_CHANGED,
            payload: value
        }
    },
    //Отправка формы
    onPosted() {
        return async (dispatch, getState) => {
            const store = getState();
            console.log(store.user.token);
            dispatch({
                type: constants.GET_POST_PUBLIC_LOADING,
            });
            try {
                const res = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/post',
                    data: {
                        "title": store.post.title,
                        "post": store.post.post,
                    },
                    headers: {
                        'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    }
                });
                dispatch({
                    type: constants.GET_POST_PUBLIC,
                    payload: res.data
                });


            } catch (error) {
                dispatch({
                    type: constants.GET_POST_PUBLICATION_FAIL,
                    payload: error.response.data.message
                });
            }
        }
    },
    //Пользователь хочет обновить пост
    onPostChange(value) {
        return {
            type: constants.USER_WANT_UPDATE_POST,
            payload: value
        }
    },

    //Изменение поста
    fetchPostUpdate() {
        return async (dispatch, getState) => {
            const store = getState();
            dispatch({
                type: constants.GET_POST_UPDATING,
            });

            try {
                const response = await axios({
                        method: 'post',
                        url: `http://localhost:3000/post_update/${store.post.isPostId}`,
                        data: {
                            "title": store.post.title,
                            "post": store.post.post,
                        },
                    headers: {
                        'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    }
                    }
                );

                dispatch({
                    type: constants.GET_POST_UPDATED,
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_POST_UPDATE_FAIL,
                    payload: e.response.data.message,
                });
            }
        };
    },
    //Лайки к постам
    fetchLikePost(value) {
        return async (dispatch, getState) => {
            console.log('+++++++++++',value);
            const store = getState();
            dispatch({
                type: constants.LIKE_POST_LOADING,
                payload: value
            });

            try {
                const response = await axios({
                        method: 'post',
                        url: `http://localhost:3000/like/${value}`,
                        data: {
                        },
                    headers: {
                    'Authorization': `Bearer ${store.user.token}`,
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                }
                    }
                );

                dispatch({
                    type: constants.LIKE_POST_LOADED_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.LIKE_POST_FAIL,
                    payload: error.response.data.message,
                });
            }
        };
    }
}


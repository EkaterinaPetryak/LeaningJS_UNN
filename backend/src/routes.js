
import controllers from './controllers.js';
import Joi from '@hapi/joi';

export default [
    {
        method: 'GET',
        path: '/info',
        handler: controllers.info,
        options:{
            auth:{
                strategy:'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/info_update/{_id}',
        handler: controllers.info_update,
        options:{
            auth: {
                strategy:'user'
            },
            validate: {
                payload: Joi.object(
                    {
                        userName: Joi.string().min(2).optional(),
                        userSurname: Joi.string().min(2).optional(),
                        birthday: Joi.string().optional(),
                    }
                )
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: controllers.login,
        options: {
            validate: {
                payload: Joi.object(
                    {
                        email: Joi.string().email().required(),
                        password: Joi.string().min(6).required(),

                    }
                )
            }
        }
    },
    {
        method: 'POST',
        path: '/user/register',
        handler: controllers.register,
        options: {
            validate: {
                payload: Joi.object(
                    {
                        userName: Joi.string().min(2).required().raw(),
                        userSurname: Joi.string().min(2).required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().min(6).required(),
                        birthday: Joi.string().required()
                    }
                )
            }
        }
    },
    {
        method: 'GET',
        path: '/info_allUsers',
        handler: controllers.info_allUsers,
        // options:{
        //     auth:{
        //         strategy:'admin'
        //     }
        // }
    },
    {
        method: 'GET',
        path: '/user_delete/{_id}',
        handler: controllers.user_delete,
        options:{
            auth:{
                strategy:'user'
            }
        }
    },
    {
        method: 'GET',
        path: '/{file*}',
        handler:{
            directory:{
                path:'./public',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: "POST",
        path: '/post',
        handler: controllers.post,
        options:{
            validate: {
                payload: Joi.object(
                    {
                        title: Joi.string().max(50).required(),
                        post: Joi.string().max(1000).required(),
                    }
                )
            },
            auth:{
                strategy: 'user'
            }
        }


    },
    {
        method: "GET",
        path: '/all_posts',
        handler: controllers.all_posts,
    },
    {
        method: "GET",
        path: '/select_comments/{_id}',
        handler: controllers.select_comments,
    },
    {
        method: "POST",
        path: '/post_update/{_id}',
        handler: controllers.post_update,
        options:{
            validate: {
                payload: Joi.object(
                    {
                        title: Joi.string().max(50).optional(),
                        post: Joi.string().max(1000).optional(),
                    }
                )
            },
            auth:{
                strategy: 'user'
            }
        }
    },
    {
        method: 'GET',
        path: '/post_delete/{_id}',
        handler: controllers.post_delete,
        options:{
            auth:{
                strategy:'user'
            }
        }
    },
    {
        method: "GET",
        path: '/select_post/{_id}',
        handler: controllers.select_post,
    },
    {
        method: "POST",
        path: '/comment/{_id}',
        handler: controllers.comment,
        options:{
            validate: {
                payload: Joi.object(
                    {
                        comment: Joi.string().max(100).required(),
                    }
                )
            },
            auth:{
                strategy: 'user'
            }
        }


    },
    {
        method: "POST",
        path: '/comment_update/{_id}',
        handler: controllers.comment_update,
        options:{
            validate: {
                payload: Joi.object(
                    {
                        comment: Joi.string().max(100).required(),
                    }
                )
            },
            auth:{
                strategy: 'user'
            }
        }


    },
    {
        method: "GET",
        path: '/comment_delete/{postId}/{commentId}',
        handler: controllers.comment_delete,
        options:{
            auth:{
                strategy: 'user'
            }
        }

    },
    {
        method: "POST",
        path: '/like/{postId}',
        handler: controllers.like,
        options:{
            auth:{
                strategy: 'user'
            }
        }

    },

];
import database from './database/connection.js';
import Boom from "@hapi/boom";
import mongoose from 'mongoose';
import {passwordHash} from "./helpers.js";

export default {
    login: async (req, h) => {
        try {
            req.payload.password = passwordHash(req.payload.password);
            const foundUser = await database.user.findOne({email: req.payload.email, password: req.payload.password});
            if (foundUser) {
                console.log('Аутентификация прошла успешно');
                return foundUser;
            } else {
                console.log('Данного пользователя нет в БД');
                return Boom.unauthorized('Не верное имя пользователя и/или пароль');
            }
            ;

        } catch (e) {
            return console.log(e)
        }
    },

    register: async (request, h) => {
        try {
            if (await database.user.findOne({email: request.payload.email})) {
                console.log('Пользователь с таким email уже зарегистрирован!!!!');
                return Boom.badRequest('Пользователь с таким email уже существует.')
            } else {
                request.payload.password = passwordHash(request.payload.password);
                database.user.create(request.payload, function (err, list) {
                    if (err) {
                        return console.log(err, "Ошибка здесь!!!");
                    }
                    ;
                });
            }
            ;
            return 'Регистрация прошла успешно!'

        } catch (e) {
            console.log(e, 'Произошла ошибка при регистрации пользователя');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    info: async (request, h) => {
        try {
            console.log('Информация получена');
            return request.auth.credentials

        } catch (e) {
            console.log(e, 'Произошла ошибка при получении данных пользователя');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    info_update: async (request, h) => {
        try {
            const userChanging = await database.user.findOne(request.auth.credentials);
            const userWantToChange = await database.user.findOne({_id: mongoose.Types.ObjectId(request.params._id)});
                if(userChanging.userId === userWantToChange.userId) {
                await database.user.updateOne(request.auth.credentials, request.payload);
            await console.log('Информация о пользова успешно обновлена!');
            return 'Информация успешно изменена'} else
                {
                    return Boom.unauthorized('У Вас не достаточно прав для выполнения этой операции!');
                }
        } catch (e) {
            console.log(e, 'Произошла ошибка при изменении данных пользователя');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    info_allUsers: async (request, h) => {
        try {
            const list_Users = await database.user.find({});
            console.log(list_Users);
            //return 'Список пользователей загружен на сервере!'
            return (list_Users)
        } catch (e) {
            console.log(e, 'Произошла ошибка при получении списка всех пользователей');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    user_delete: async (request, h) => {
        try {
                const userDeleting = await database.user.findOne(request.auth.credentials);
                const userWantToDelete = await database.user.findOne({_id: mongoose.Types.ObjectId(request.params._id)});

                if(userDeleting.userId === userWantToDelete.userId) {
                     await database.user.deleteOne(request.auth.credentials);
                        console.log('Аккаунт удалён!');
                        return 'Аккаунт успешно удалён.'} else {
                return Boom.unauthorized('У Вас не достаточно прав для выполнения этой операции!');
            }
        } catch (e) {
            console.log(e, 'Произошла ошибка при удалении пользователя');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    post: async (request, h) => {
        const postByUser = request.auth.credentials;

        try {
            const newPost = await database.post.create({
                title: request.payload.title, post: request.payload.post, name: postByUser, userName: postByUser.userName,

            });
            if (newPost) {
                await database.user.updateOne({_id: postByUser._id}, {$push: {posts: newPost._id}});
                console.log(newPost);
                return newPost
            }
            {
                return Boom.badImplementation('Произошла ошибка на сервере при публикации поста, мы постараемся решить проблему позже!')
            }
        } catch (e) {
            console.log(e, 'Произошла ошибка при публикации поста');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }

    },
    all_posts: async (reguest, h) => {
        try {
            const list_Posts = await database.post.find({});
            console.log(list_Posts);
            //return 'Список пользователей загружен на сервере!'
            return (list_Posts)
        } catch (e) {
            console.log(e, 'Произошла ошибка при получении списка всех постов');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    select_post: async (reguest, h) => {
        try {
            const selectPost = await database.post.find({_id:reguest.params._id});
            return (selectPost)
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    post_update: async (request, h) => {
        try {
            const byUser = request.auth.credentials;
            const isPostUpdating = await database.post.findOne({_id: mongoose.Types.ObjectId(request.params._id)});
            const userPostUpdate = await database.user.findOne({_id:isPostUpdating.name});

            if(byUser.userId === userPostUpdate.userId) {
                const updatePost = await database.post.findByIdAndUpdate(
                request.params, {
                    $set: {
                        title: request.payload.title,
                        post: request.payload.post,
                        active: true
                    }
                }, function (err, list) {
                    if (err) {
                        console.log(err);
                        return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
                    }
                    {
                    }
                });
            return 'Пост успешно изменён';} else {
                return 'Вы не обладаете правами для выполнения данной операции'}
        } catch (e) {
            console.log(e, 'Произошла ошибка при изменении поста');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }

    },
    post_delete: async (request, h) => {
        try {
            const byUser = request.auth.credentials;
            const isPost = await database.post.findOne({_id: mongoose.Types.ObjectId(request.params._id)});
            const userPost = await database.user.findOne({_id:isPost.name});
            if(byUser.userId === userPost.userId) {
                await database.post.deleteOne(request.params, function (err) {
                    if (err) {
                        console.log(err);
                        return Boom.badImplementation('Произошла ошибка на сервере, ' +
                            'мы постараемся решить проблему позже!')
                    }

                });

                await database.user.findByIdAndUpdate({_id: byUser._id}, {
                        $pullAll: {
                            posts: [mongoose.Types.ObjectId(request.params._id)]
                        }
                    },
                    {new: true}, function (err) {
                        if (err) {
                            console.log(err);
                            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
                        }
                        {
                            return 'Пост успешно удалён'
                        }
                    });

                return 'Пост успешно удалён!!!';
            } else { return 'Вы не обладаете правами для выполнения данной операции'}
        } catch (e) {
            console.log(e, 'Произошла ошибка при удалении поста');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }

    },
    comment: async (request, h) => {
        const commentByUser = request.auth.credentials;
        try {
            const newComment = await database.comment.create({comment: request.payload.comment,
                name: commentByUser, userName:commentByUser.userName});
            if (newComment) {
                await database.post.updateOne(request.params, {$push: {comments: newComment._id}});
                console.log(newComment);
                return newComment
            }
            {
                return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже')
            }
        } catch (e) {
            console.log(e, 'Произошла ошибка при публикации комментария');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }

    },
    comment_update: async (request, h) => {
        try {
            const updateComment = await database.comment.findByIdAndUpdate(
                request.params, {$set: {comment: request.payload.comment, active: true}}, function (err) {
                    if (err) {
                        console.log(err);
                        return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
                    }
                    {
                    }
                });
            return 'Пост успешно изменён'
        } catch (e) {
            console.log(e, 'Произошла ошибка при публикации комментария');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }

    },
    comment_delete: async (request, h) => {
        try {
            const commentByUser = request.auth.credentials;
            await database.comment.deleteOne(
                {_id: mongoose.Types.ObjectId(request.params.commentId)}, function (err) {
                    if (err) {
                        console.log(err);
                        return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
                    }
                    {
                    }

                });
            await database.post.findByIdAndUpdate({_id: mongoose.Types.ObjectId(request.params.postId)}, {
                    $pullAll: {
                        comments: [mongoose.Types.ObjectId(request.params.commentId)]
                    }
                },
                {new: true}, function (err) {
                    if (err) {
                        console.log(err);
                        return Boom.badImplementation(
                            'Произошла ошибка на сервере, мы постараемся решить проблему позже!')
                    }
                    {
                        return 'Пост успешно удалён'
                    }

                });

            console.log(request.params);
            return 'Комментарий успешно удалён'
        } catch (e) {
            console.log(e, 'Произошла ошибка при удалении комментария');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }

    },
    select_comments: async (request, h) => {
        let commentArr = [];
        try {
            const selectPost = await database.post.findOne({_id: request.params});
            for (let i = 0; i < selectPost.comments.length; i++) {
                let comObj = await database.comment.findOne({_id: selectPost.comments[i]});
                commentArr.push(comObj)
            }
            return commentArr
        } catch (e) {
            console.log(e, 'Произошла ошибка при загрузке комментариев');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    },
    like: async (request, h) => {
        const userClickLike = request.auth.credentials._id;
        const postLike = request.params.postId;
        try {
            const like = await database.like.findOne({post: postLike}, {user: userClickLike});
            //console.log(like._id);
            if (like) {
                await database.post.findByIdAndUpdate({_id: mongoose.Types.ObjectId(request.params.postId)}, {
                        $pullAll: {
                            likes: [userClickLike]
                        }
                    },
                    {new: true});
                await database.like.findByIdAndDelete({_id: like._id})
            } else
            {
               await database.post.findByIdAndUpdate(
                    {_id: mongoose.Types.ObjectId(request.params.postId)},
                    {$push: {likes: userClickLike}});
                await database.like.create({post: postLike}, {name: userClickLike})
            };

            const isPostLike = await database.post.findOne({_id: mongoose.Types.ObjectId(request.params.postId)});
            console.log(isPostLike);
            return isPostLike.likes.length
        } catch (e) {
            console.log(e, 'Произошла ошибка');
            return Boom.badImplementation('Произошла ошибка на сервере, мы постараемся решить проблему позже!')
        }
    }

}

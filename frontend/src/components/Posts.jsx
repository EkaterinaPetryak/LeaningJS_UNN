import React from 'react';
import postActionsCreators from '../actions/posts.js';
import commentActionCreators from '../actions/comments.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentForm from "./CommentForm";

class Posts extends React.Component {
    constructor(props) {
        super(props)}

        componentDidMount() {
        this.props.actions.fetchPosts()}

    render() {
        return(
        <div className={'post-container'}>
            <p className={'post-container-p'}>Спасибо, что делитесь с нами своими впечатлениями!</p>
            { this.props.isFormPostLoading && this.props.token ?

                <div>{
                    <div className={'post-form-container'}>
                        <div className={'post-form'}>

                            <p className={'post-form-p'}>Название статьи:</p>
                            <input
                                className={'post-form-input'}
                                type="text"
                                placeholder="Title"
                                onChange={event => {
                                    this.props.actions.saveTitleByPostInput(event.target.value);
                                }}/>

                            <p className={'post-form-p'}>Основное содержание:</p>
                            <textarea
                                className={'post-form-textarea'}
                                name="text" cols="100" rows="20" onChange={event => {
                                this.props.actions.savePostInput(event.target.value);
                            }}> </textarea>
                            <button className={'post-form-btn-add'}
                                    onClick={() => {
                                        this.props.actions.onPosted();
                                        this.props.actions.fetchPosts()
                                    }}> Опубликовать
                            </button>
                            <button className={'post-form-btn-add'}
                                    onClick={() => this.props.actions.onPostedDisabled()}>Отмена
                            </button>
                        </div>

                    </div>

    }</div>
            :
            <button className={'post-btn-add'} onClick={() => this.props.actions.onPostIn()}>
                <b> + Добавить статью</b></button>}

            {this.props.isPostLoading && <span>Загрузка...</span>}

            { this.props.posts.map(post => {
                        return (
                            <ul className={'post-list'}>
                            <li key={post._id}>
                                <div className="post">
                                    <div className="up-post">
                                        <span className="postByUser">Автор:{post.userName||''}</span>
                                        <span className="postDate">Дата публикации: {post.data||''}</span>
                                        <span className="postDelete"
                                              onClick={() => {this.props.actions.fetchPostDelete(post._id)&&
                                              this.props.actions.fetchPosts()}}
                                        >delete</span>
                                        <span className="postUpdate"
                                              onClick={() => {this.props.actions.onPostChange(post._id);
                                              this.props.actions.fetchPosts()
                                              }}
                                        >update</span>
                                    </div>
                                    <div className="post-title">
                                        <p>{post.title}</p>
                                    </div>
                                    <hr/>
                                    <div className="post-text">
                                        <p>
                                            {post.post}
                                        </p>
                                        <span onClick={() => {this.props.actions.fetchLikePost(post._id)&&
                                        this.props.actions.fetchPosts()}}>&#10084;</span>
                                    <span className={'likes'}> {post.likes.length||''} </span>
                                    </div>


                                    <div>
                                        {this.props.openFormThisPost && post._id === this.props.isPostId && this.props.token
                                            ?
                                            <div className={'post-form-container'}>
                                                <div className={'post-form'}><p>Title</p>
                                                    <input
                                                        className={'post-form-input'}
                                                        type="text"
                                                        placeholder="Изменить название статьи"
                                                        onChange={event => {
                                                            this.props.actions.saveTitleByPostInput(event.target.value);
                                                        }}
                                                    />
                                                    <p>Основной текст</p>

                                                    <textarea
                                                        className={'post-form-textarea'} name="text" cols="90" rows="10"
                                                              onChange={event => {
                                                        this.props.actions.savePostInput(event.target.value);
                                                    }}
                                                    >{post.post}</textarea>
                                                    <button
                                                        className={'post-form-btn-add'}
                                                        onClick={() => {this.props.actions.fetchPostUpdate();this.props.actions.fetchPosts()}}> Изменить
                                                    </button>
                                                </div>

                                            </div>
                                            : null
                                        }
                                    </div>


                                    <div>
                                    {this.props.openForm && post._id===this.props.postId ?

                                        <div>
                                            <CommentForm{...this.props}/>
                                        </div>
                                        :
                                            <button className={'post-form-btn-add'}
                                            onClick={() => this.props.actionsComment.openFormComment(post._id)}
                                        >Комментировать</button>
                                    }
                                    </div>

                                   <div>
                                    {this.props.commentLoadedDownPost && post._id===this.props.postId
                                        ?
                                   <div>
                                       {this.props.comments.length ?
                                           this.props.comments.map(comment => {
                                          return (<div>
                                              <ul>
                                              <li key={comment._id}>

                                            <div className="comment">
                                                <div className="up-comment">
                                                    <span className="commentByUser">Пользователь:{comment.userName||''}</span>
                                                    <span className="commentDate">Дата:{comment.data||''}</span>
                                                </div>
                                                <div className="comment-text">
                                                        {comment.comment}
                                                </div>
                                            </div>
                                             </li>
                                              </ul>
                                       </div>
                                        )
                                     }
                                       )
                                           :
                                           <div><p>Комментариев пока нет</p>
                                               <button className={'post-form-btn-add'}
                                                       onClick={() => this.props.actionsComment.onDisableComments()}>
                                                   Скрыть</button>
                                           </div>
                                       }

                                   </div>

                                        :
                                           <button key={post._id}
                                                className={'post-form-btn-add'}
                                            onClick={() => this.props.actionsComment.onLoadingComment(post._id)}>
                                            Загрузить комментарии
                                        </button>

                                    }
                                   </div>

                                </div>
                            </li>
                            </ul> );
                    })
                }

        </div>
        )}}




const mapStateToProps = state => {
    return {
        ...state.post,
        ...state.comment,
        ...state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(postActionsCreators, dispatch),
        actionsComment:bindActionCreators(commentActionCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default Wrapped;

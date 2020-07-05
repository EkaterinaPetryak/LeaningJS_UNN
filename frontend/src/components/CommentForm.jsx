import React from 'react';

export default function CommentForm(props) {
        return(
        <div>
                <div>
                     <p>Comment</p>
                    <textarea name="text"  cols="90" rows="10" onChange={event => {
                        props.actionsComment.saveCommentInput(event.target.value);
                    }}> </textarea>
                <button
                    className={'post-form-btn-add'}
                    onClick={() => props.actionsComment.onPostedComment()}> Опубликовать </button>
                    <button
                        className={'post-form-btn-add'}
                        onClick={() => props.actionsComment.onPostedCommentDisabled()}>Отмена</button>
            </div>

        </div>
        )}

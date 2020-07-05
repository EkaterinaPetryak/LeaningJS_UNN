import React from 'react';

export default function PostForm(props) {
        return(
        <div className={'post-form-container'}>
                <div className={'post-form'}>

                    <p className={'post-form-p'}>Название статьи:</p>
                <input
                    className={'post-form-input'}
                type="text"
                placeholder="Title"
                onChange={event => {
                props.actions.saveTitleByPostInput(event.target.value);
            }} />

            <p className={'post-form-p'}>Основное содержание:</p>
                    <textarea
                        className={'post-form-textarea'}
                        name="text"  cols="100" rows="20" onChange={event => {
                        props.actions.savePostInput(event.target.value);
                    }}> </textarea>
                <button className={'post-form-btn-add'}
                    onClick={() => {props.actions.onPosted();props.actions.fetchPosts()}}> Опубликовать </button>
                    <button className={'post-form-btn-add'} onClick={() => props.actions.onPostedDisabled()}>Отмена</button>
            </div>

        </div>
        )}

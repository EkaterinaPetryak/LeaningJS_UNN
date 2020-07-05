import React from 'react';
import { Link } from 'react-router-dom';

export default function User(props) {
    return (
        <div>
            {props.isDeleteAccount
                ?
                <p>Ваш аккаунт успешно удалён</p>
                :
        <div className={'user'}>
            <p>Карточка пользователя</p>
            <p>{props.userName} {props.userSurname}</p>
            <div>
                <p>Контакты:</p>
                <p>{props.email}</p>
                <p>Дата рождения:</p>
                    <p>{props.birthday}</p>
                <div><Link to={'/'}> На главную</Link></div>
            </div>

            <button
                className={'post-form-btn-add'}
                onClick={() => props.actions.deleteAccount()}
            >Удалить аккаунт</button>
            <button
                className={'post-form-btn-add'}
                onClick={() => props.actions.onPostIn()}
            >Изменить личные данные</button>
        </div>}




        </div>
        )
}

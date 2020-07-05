import React from 'react';
import { Link } from 'react-router-dom';

export default function Users(props) {
    return (
        <div className={'users-list'}>
            <h3>Список пользователей сайта:</h3>
            {props.isLoading && <span>Загрузка...</span>}
            <ul>
                {
                    props.users.map(user => {
                        return (
                            <li key={user._id}>
                                <p>{user.userName} {user.userSurname}</p>
                                <span>Email: {user.email}</span>
                                <Link to={'/users/' + user._id}><p>Перейти в профиль</p> </Link> <hr/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
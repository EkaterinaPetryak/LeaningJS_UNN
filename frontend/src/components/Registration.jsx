import React from 'react';

export default function Registration (props) {
        return (
            <div className="form-registration">
                <h1 className="registration">Регистрация</h1>

                <div className='registration-form'>
                    <div>
                        <label>Имя</label>
                        <input type="text"
                               name='userName'
                               placeholder={"Введите ваше имя"}
                               onChange={event => {
                                   this.props.actions.saveUserInputUserName(event.target.value);
                               }}
                        />
                    </div>

                    <div>
                        <label>Фамилия</label>
                        <input type="text"
                               name='userSurname'
                               placeholder="Введите вашу фамилию"
                               onChange={event => {
                                   this.props.actions.saveUserInputSurname(event.target.value);
                               }}
                        />
                    </div>

                    <div>
                        <label>Дата дождения</label>
                        <input type="data"
                               name='birthday'
                               placeholder="Введите дату своего рождения"
                               onChange={event => {
                                   this.props.actions.saveUserInputBirthday(event.target.value);
                               }}
                        />
                    </div>

                    <div>
                        <label>e-mail</label>
                        <input
                            type="text"
                            placeholder="Введите адрес вашей эл.почты"
                            onChange={event => {
                                this.props.actions.saveUserInputLogin(event.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label>Придумайте пароль</label>
                        <input
                            type="password"
                            placeholder="Придумайте пароль"
                            onChange={event => {
                                this.props.actions.saveUserInputPassword(event.target.value);
                            }}
                        />
                    </div>
                    <button onClick={() => this.props.actions.onRegistered()}>Войти</button>
                </div>


            </div>
        )

}

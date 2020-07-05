import React from 'react';
import userActionsCreators from '../actions/user';
import action from '../actions/user-registration';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';

class Authorization extends React.Component {
    constructor(props) {
        super(props);
        if(props.forLogOut){this.props.actions.onLogout()}
    }

    render() {
        if(this.props.forLogOut) return ( <Redirect to={'/'}> </Redirect>);
        console.log(this.state, this.props);
        return (
            <div>
            { this.props.userWantRegistration ?
                <div className={'registration-container'}>
                <div className="form-registration">
                    <h1 className="registration">Регистрация</h1>

                    <div className='registration-form'>
                        <div>
                            <label>Имя</label>
                            <input type="text"
                                   name='userName'
                                   placeholder={"Введите ваше имя"}
                                   onChange={event => {
                                       this.props.actionReg.saveUserInputUserName(event.target.value);
                                   }}
                            />
                        </div>

                        <div>
                            <label>Фамилия</label>
                            <input type="text"
                                   name='userSurname'
                                   placeholder="Введите вашу фамилию"
                                   onChange={event => {
                                       this.props.actionReg.saveUserInputSurname(event.target.value);
                                   }}
                            />
                        </div>

                        <div>
                            <label>Дата дождения</label>
                            <input type="data"
                                   name='birthday'
                                   placeholder="Введите дату вашего рождения"
                                   onChange={event => {
                                       this.props.actionReg.saveUserInputBirthday(event.target.value);
                                   }}
                            />
                        </div>

                        <div>
                            <label>E-mail</label>
                            <input
                                type="text"
                                placeholder="Введите адрес вашей эл.почты"
                                onChange={event => {
                                    this.props.actionReg.saveUserInputLogin(event.target.value);
                                }}
                            />
                        </div>

                        <div>
                            <label>Пароль</label>
                            <input
                                type="password"
                                placeholder="Придумайте пароль"
                                onChange={event => {
                                    this.props.actionReg.saveUserInputPassword(event.target.value);
                                }}
                            />
                        </div>
                        <div className={'error-msg'}>
                            {this.props.errMsg ?

                                <p>{this.props.errMsg}</p>
                                :
                                <p>{null}</p>
                            }
                        </div>
                        <button className={'registration-btn'}
                                onClick={() => this.props.actionReg.onRegistered()}>Зарегестрироваться</button>
                        <button className={'registration-btn'}
                        >Отмена</button>
                    </div>
                </div>

                </div>
                    :
                 <div className={'authorization-container'}>
            <div className={'form-authorization'}>
                {
                    this.props.isLoggedIn ?
                        <div>
                            {alert('Вы успешно вошли на сайт')}
                            <Redirect to={'/'}/>
                        </div>
                        :

                        <div className={'authorization-form'}>
                        <h1 className={'authorization'}>Вход</h1>
                            <input
                                type="text"
                                placeholder="Ваш логин"
                                onChange={event => {
                                    this.props.actions.saveUserInputLogin(event.target.value);
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Ваш пароль"
                                onChange={event => {
                                    this.props.actions.saveUserInputPassword(event.target.value);
                                }}
                            />
                            {this.props.errMsgAuth ?

                                <p>{this.props.errMsgAuth}</p>
                                :
                                <p>{null}</p>
                            }
                            <button className={'authorization-btn'}
                                    onClick={() => this.props.actions.onLogin()}>Войти</button>
                            <button className={'authorization-btn'}
                                    onClick={() => this.props.actionReg.onRegistration()}>Регистрация</button>
                        </div>
                }
            </div>
                 </div>
            }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActionsCreators, dispatch),
        actionReg: bindActionCreators(action, dispatch)
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Authorization);

export default Wrapped;

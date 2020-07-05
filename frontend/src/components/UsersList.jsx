import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/user.js';
import actionsTwo from '../actions/user-registration.js'
import Users from './UserList';
import {Link, Redirect, Route, Switch} from "react-router-dom";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchUsers()
    }

    render() {
        return (
            <Switch>
                <Route
                    path={'/users'}
                    exact
                    render={() => {
                        return (
                            <Users {...this.props} />
                        )
                    }}
                />

                <Route
                    path={'/users/:_id'}
                    exact
                    render={(props) => {
                        const id = props.match.params._id;
                        const selectedUser = this.props.users.find(user => user._id === id );
                        if (selectedUser) {
                            return (
                                <div>
                                    {this.props.isUserWantUpdateData && selectedUser._id === this.props.userMongoId ?

                                        (
                                            <div className="form-registration">
                                                <h1 className="registration">Изменение личных данных</h1>

                                                <div className='registration-form'>
                                                    <div>
                                                        <label>Имя</label>
                                                        <input type="text"
                                                               name='userName'
                                                               placeholder={selectedUser.userName}
                                                               onChange={event => {
                                                                   this.props.actionsTwo.saveUserInputUserName(event.target.value);
                                                               }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label>Фамилия</label>
                                                        <input type="text"
                                                               name='userSurname'
                                                               placeholder={selectedUser.userSurname}
                                                               onChange={event => {
                                                                   this.props.actionsTwo.saveUserInputSurname(event.target.value);
                                                               }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label>Дата рождения</label>
                                                        <input type="data"
                                                               name='birthday'
                                                               placeholder={selectedUser.birthday}
                                                               onChange={event => {
                                                                   this.props.actionsTwo.saveUserInputBirthday(event.target.value);
                                                               }}
                                                        />
                                                    </div>

                                                    {this.props.isSuccessUpdateUser
                                                        ?
                                                        (<div className={'success-update'}>
                                                                {/*<Link to={'/'}> На главную</Link> <br/>*/}
                                                                <p> Данные успешно изменены</p>
                                                            </div>
                                                        )
                                                        :
                                                        (<h3>{this.props.errMsg}</h3>)}


                                                    <div className={'link'}><Link to={'/'}> На главную</Link> <br/></div>

                                                    <button className={'post-form-btn-add'}
                                                        onClick={() => this.props.actionsTwo.onUpdateUser()}>Сохранить</button>

                                                </div>
                                            </div>
                                        )
                                        :
                                        <div>
                                            {
                                                this.props.isDeleteAccount && this.props.userMongoId === selectedUser._id
                                                ?
                                                   <div className={'delete-account'}> <p>Ваш аккаунт успешно удалён!</p>
                                                       <Link to={'/'}> На главную</Link>
                                               </div>

                                                :
                                                <div className={'user'}>
                                                    <p>Имя:{selectedUser.userName}</p>
                                                    <p>Фамилия:{selectedUser.userSurname}</p>
                                                    <div>
                                                        <p>Контакты:{selectedUser.email}</p>
                                                        <p>Дата рождения:{selectedUser.birthday}</p>
                                                        <Link to={'/'}> На главную</Link>
                                                    </div>
                                                    <div><p>{this.props.errMsgDel}</p></div>
                                                <div className={'null'}>
                                                    {this.props.isSuccessUpdateUser
                                                        ?
                                                        (<div className={'success-update'}>
                                                                <p> Данные успешно изменены</p>
                                                            </div>
                                                        )
                                                        :
                                                        (<div className={'error'}>
                                                            <h3>{this.props.errMsg}</h3>
                                                        </div>)}

                                                </div>

                                                    <button
                                                        className={'post-form-btn-add'}
                                                        onClick={() => {this.props.actions.deleteAccount(selectedUser._id);
                                                            this.props.actions.fetchUsers();
                                                           // {if(this.props.isDeleteAccount){this.props.actions.onLogout()}else {}}
                                                        }}
                                                    >Удалить аккаунт </button>
                                                    <button
                                                        className={'post-form-btn-add'}
                                                        onClick={() => this.props.actionsTwo.onWantUpdateUser(selectedUser._id)}
                                                    >Изменить личные данные</button>
                                                    <div className={'null'}>{null}</div>
                                                </div>}

                                        </div>
                                    }
                                </div>
                            )


                        } else {
                            return <Redirect to={'/'}/>;
                        }
                    }}
                />

                <Route path={'*'} render={() => {
                    return <Redirect to={'/'}/>;
                }}/>
            </Switch>
        )
    }
}



const mapStateToProps = state => {
    return {
        ...state.user
    }
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
        actionsTwo: bindActionCreators(actionsTwo, dispatch)
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(UsersList);

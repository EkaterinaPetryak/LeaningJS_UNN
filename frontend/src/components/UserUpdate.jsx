import React from 'react';
import userActionsCreators from '../actions/user-registration';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserUpdate extends React.Component {
    constructor(props) {
        super(props)}

    render() {
        return (
            <div className="form-registration">
                <h1 className="registration">Изменение личных данных</h1>

                <div className='registration-form'>
                    <div>
                        <label>Имя</label>
                        <input type="text"
                               name='userName'
                               placeholder={this.props.user.userName}
                               onChange={event => {
                                   this.props.actions.saveUserInputUserName(event.target.value);
                               }}
                        />
                    </div>

                    <div>
                        <label>Фамилия</label>
                        <input type="text"
                               name='userSurname'
                               placeholder={this.props.user.userSurname}
                               onChange={event => {
                                   this.props.actions.saveUserInputSurname(event.target.value);
                               }}
                        />
                    </div>

                    <div>
                        <label>Дата pождения</label>
                        <input type="data"
                               name='birthday'
                               placeholder={this.props.user.birthday}
                               onChange={event => {
                                   this.props.actions.saveUserInputBirthday(event.target.value);
                               }}
                        />
                    </div>
                        <div className={'error-msg'}> </div>
                    <button className={'post-form-btn-add'}
                        onClick={() => this.props.actions.onUpdateUser()}>Сохранить</button>
                    <div className={'null'}>{null}</div>

                </div>
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
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(UserUpdate);

export default Wrapped;
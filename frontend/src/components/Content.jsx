import React from 'react';
import userActionsCreators from '../actions/user.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

 class Content extends React.Component {
    constructor(props) {
        super(props)};

     render() {
            return (<div className={'content'}>
                    {this.props.isLoggedIn ?
                        <div>
                            <h1>Вы успешно зарегестрировались</h1>
                        </div>
                        :
                        <div>
                            <h5>We are here. Here is Main.</h5>
                            <input type="text" placeholder={'Ваш логин'}
                                   onChange={event => this.props.actions.saveUserInputValue(event.target.value)}/>
                            <input type="text" placeholder={'Ваш пароль'}
                                    onChange={event => this.props.actions.saveUserInputValue(event.target.value)}/>
                            <button onClick={() => this.props.actions.onLogin()}>Войти</button>
                        </div>
                    }
                </div>
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
        actions: bindActionCreators(userActionsCreators, dispatch)
    }
};
const Wrapped = connect(mapStateToProps,mapDispatchToProps)(Content);
export default Wrapped;



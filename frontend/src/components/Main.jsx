import React from 'react';
import Header from './Header';
import UsersList from './UsersList';
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Authorization from './Authotization';
import MainText from './MainText';
import Posts from './Posts'

class Main extends React.Component{
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div className={'menu-list-a'}>
                <Header
                    pages = {this.props.user.pages}/>
                <Switch>

                    {this.props.user.pages.map((page, i) => {switch (page.name) {
                        case 'Главная':
                            return (<Route path = {page.path} component={MainText} exact/>);
                        case 'Статьи':
                            return (<Route path = {page.path} component={Posts}/>);
                        case 'Пользователи':
                            return (<Route path = {page.path} component={UsersList}/>);
                        case 'Вход':
                            return (<Route path = {page.path} component={Authorization} exact/>);
                        case 'Выход':
                            return (
                                <Route path = {page.path}>
                                    <Authorization forLogOut={true}/>
                                </Route>
                            );

                        default:
                            return null;
                    }})}

                    <Route path={'*'} render={()=>
                    {return (<h4>Not found</h4>)}
                    } />
                </Switch>

            </div>

        )
    }
}

const mapStateToProps =state =>({...state});
export default connect(mapStateToProps, null) (Main);

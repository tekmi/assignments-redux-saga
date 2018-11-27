import React, {Component} from "react";
import {Route, Redirect, Switch, NavLink, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import classes from './App.css';
import Dashboard from './containers/Admin/Dashboard/Dashboard';
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';
import User from "./containers/Admin/User/User";
import UserDelete from "./containers/Admin/User/UserDelete";

class App extends Component {
    componentDidMount() {
        this.props.onSetAuthRedirectPath(this.props.location.pathname || '/');
        this.props.onAuthCheck();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect to="/login"/>
            </Switch>
        );

        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path="/logout" component={Logout} />
                    <Route path="/login" component={Login} />
                    <Route path="/user-delete" component={UserDelete} />
                    <Route path="/user" component={User} />
                    <Route path="/" exact component={Dashboard} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div className={classes.App}>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheck: () => dispatch(actions.authCheckState()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

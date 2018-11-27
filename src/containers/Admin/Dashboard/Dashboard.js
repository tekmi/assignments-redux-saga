import React, {Component} from 'react';
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import {connect} from "react-redux";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Toolbar />
                <h1>Dashboard</h1>
                <h3>Hi {this.props.user.email}</h3>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(Dashboard);

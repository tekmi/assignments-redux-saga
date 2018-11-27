import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wrapper from './../../../hoc/Wrapper';
import classes from './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <Wrapper>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);

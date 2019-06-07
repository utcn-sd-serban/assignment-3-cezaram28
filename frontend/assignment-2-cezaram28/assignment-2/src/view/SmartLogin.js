import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import LoginPresenter from "../presenter/loginPresenter";

const mapUserStateToComponentState = state => ({
    username: state.userState.newUser.username,
    password: state.userState.newUser.password
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: LoginPresenter.onChange,
        onLogin: LoginPresenter.onLogin,
        onRegister: LoginPresenter.onRegister
    };
}

class SmartLogin extends Component {
    constructor() {
        super();
     }

    render() {
        return (
            <Login
                onLogin={this.props.onLogin}
                onRegister={this.props.onRegister}
                username={this.props.username}
                password={this.props.password}
                onChange={this.props.onChange} />
        );
    }
}

export default connect(mapUserStateToComponentState, mapDispatchToProps)(SmartLogin);
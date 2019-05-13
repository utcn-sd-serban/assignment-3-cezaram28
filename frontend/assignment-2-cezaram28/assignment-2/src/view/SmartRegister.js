import React, { Component } from "react";
import Register from "./Register";
import RegisterPresenter from "../presenter/registerPresenter";
import { connect } from "react-redux";

const mapUserStateToComponentState = state => ({
    username: state.userState.newUser.username,
    password: state.userState.newUser.password,
    email: state.userState.newUser.email
});

function mapDispatchToProps(dispatch) {
    return {
        onLogin: RegisterPresenter.onLogin,
        onRegister: RegisterPresenter.onRegister,
        onChange: RegisterPresenter.onChange
    }
}

class SmartRegister extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Register
                onLogin={this.props.onLogin}
                onRegister={this.props.onRegister}
                username={this.props.username}
                password={this.props.password}
                email={this.props.email}
                onChange={this.props.onChange} />
        );
    }
}

export default connect(mapUserStateToComponentState, mapDispatchToProps)(SmartRegister);
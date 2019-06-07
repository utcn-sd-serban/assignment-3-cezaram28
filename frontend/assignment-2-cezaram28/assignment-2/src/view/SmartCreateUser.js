/* import React, { Component } from "react";
import createUserPresenter from "../presenter/createUserPresenter";
import CreateUser from "./CreateUser";

const mapUserStateToComponentState = userState => ({
    username: userState.newUser.username,
    password: userState.newUser.password,
    email: userState.newUser.email
});

export default class SmartCreateUser extends Component {
    constructor() {
        super();
        this.state = mapUserStateToComponentState(user.state);
        this.listener = userState => this.setState(mapUserStateToComponentState(userState));
        user.addListener("change", this.listener);
    }

    componentWillUnmount() {
        user.removeListener("change", this.listener);
    }

    render() {
        return (
            <CreateUser
                onCreate={createUserPresenter.onCreate}
                onChange={createUserPresenter.onChange}
                username={this.state.username}
                password={this.state.password}
                email={this.state.email} />
        );
    }
}*/
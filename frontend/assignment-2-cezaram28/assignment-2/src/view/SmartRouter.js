import React, { Component } from "react";
import user from "../model/user";
import Router from "./Router";

const mapUserStateToComponentState = userState => ({
    route: userState.route
});

export default class SmartRouter extends Component {
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
            <Router route={this.state.route}/>
        );
    }
}
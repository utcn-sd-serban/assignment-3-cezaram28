import React, { Component } from "react";
import Start from "./Start";
import { connect } from "react-redux";
import StartPresenter from "../presenter/startPresenter";

const mapModelStateToComponentState = state => ({
});

function mapDispatchToProps(dispatch) {
    return {
        onLogin: StartPresenter.onLogin,
        onRegister: StartPresenter.onRegister
    };
}

class SmartStart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Start
                onLogin={this.props.onLogin}
                onRegister={this.props.onRegister} />
        );
    }
}

export default connect(mapModelStateToComponentState, mapDispatchToProps)(SmartStart);
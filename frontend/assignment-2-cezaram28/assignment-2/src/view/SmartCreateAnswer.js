import React, { Component } from "react";
import { connect } from "react-redux";
import createAnswerPresenter from "../presenter/createAnswerPresenter";
import CreateAnswer from "./CreateAnswer";
import { findById } from "../model/question/questionSelectors";

const mapAnswerStateToComponentState = (state, props) => ({
    question: findById(props.match.params.index),
    user: state.userState.users[state.userState.currentUserIndex],
    text: state.answerState.newAnswer.text
});

function mapDispatchToProps(dispatch) {
    return {
        onCreate: createAnswerPresenter.onCreate,
        onChange: createAnswerPresenter.onChange,
        onLogout: createAnswerPresenter.onLogout
    };
}

class SmartCreateAnswer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <CreateAnswer
                onCreate={this.props.onCreate}
                onChange={this.props.onChange}
                text={this.props.text}
                question={this.props.question}
                user={this.props.user}
                onLogout={this.props.onLogout} />
        );
    }
}

export default connect(mapAnswerStateToComponentState, mapDispatchToProps)(SmartCreateAnswer);
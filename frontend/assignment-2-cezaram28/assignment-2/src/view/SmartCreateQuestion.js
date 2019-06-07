import React, { Component } from "react";
import { connect } from "react-redux";
import createQuestionPresenter from "../presenter/createQuestionPresenter";
import CreateQuestion from "./CreateQuestion";

const mapQuestionStateToComponentState = state => ({
    title: state.questionState.newQuestion.title,
    user: state.userState.users[state.userState.currentUserIndex],
    text: state.questionState.newQuestion.text,
    tags: state.questionState.newQuestion.tags
});

function mapDispatchToProps(dispatch) {
    return {
        onCreate: createQuestionPresenter.onCreate,
        onChange: createQuestionPresenter.onChange,
        onLogout: createQuestionPresenter.onLogout
    }
}

class SmartCreateQuestion extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <CreateQuestion
                title={this.props.title}
                onCreate={this.props.onCreate}
                onChange={this.props.onChange}
                text={this.props.text}
                question={this.props.question}
                user={this.props.user}
                onLogout={this.props.onLogout} />
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartCreateQuestion);
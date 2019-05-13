import React, { Component } from "react";
import editAnswerPresenter from "../presenter/editAnswerPresenter";
import EditAnswer from "./EditAnswer";
import { connect } from "react-redux";

const mapAnswerStateToComponentState = (state, props) => ({
    question: state.answerState.newAnswer.question,
    user: state.userState.users[state.userState.currentUserIndex],
    idAnswer: props.match.params.aIndex,
    idQuestion: props.match.params.qIndex,
    text: state.answerState.newAnswer.text
});

function mapDispatchToProps(dispatch) {
    return {
        onEdit: editAnswerPresenter.onEdit,
        onChange: editAnswerPresenter.onChange,
        onLogout: editAnswerPresenter.onLogout
    }
}

class SmartEditAnswer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EditAnswer
                onEdit={this.props.onEdit}
                onChange={this.props.onChange}
                text={this.props.text}
                questionId={this.props.idQuestion}
                id={this.props.idAnswer}
                onLogout={this.props.onLogout}
                user={this.props.user}
            />
        );
    }
}

export default connect(mapAnswerStateToComponentState, mapDispatchToProps)(SmartEditAnswer);
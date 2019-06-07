import React, { Component } from "react";
import { connect } from "react-redux";
import * as answerSelector from "../model/answer/answerSelectors";
import * as tagSelector from "../model/tag/tagSelectors";
import QuestionDetails from "./QuestionDetails";
import questionDetailsPresenter from "../presenter/questionDetailsPresenter";
import { findById } from "../model/question/questionSelectors";

const mapQuestionStateToComponentState = (state, props) => ({
    question: findById(props.match.params.index),
    user: state.userState.users[state.userState.currentUserIndex],
    answers: state.answerState.answers
});

function mapDispatchToProps(dispatch) {
    return {
        onEdit: questionDetailsPresenter.onEdit,
        addAnswer: questionDetailsPresenter.addAnswer,
        onDelete: questionDetailsPresenter.onDelete,
        onVote: questionDetailsPresenter.onVote,
        onLogout: questionDetailsPresenter.onLogout
    }
}

class SmartQuestionDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        questionDetailsPresenter.onInit(this.props.match.params.index);
    }

    render() {
        return (
            <QuestionDetails
                id={this.props.question.id}
                title={this.props.question.title}
                author={this.props.question.author.username}
                user={this.props.user}
                text={this.props.question.text}
                creationDate={this.props.question.creationDate}
                voteCount={this.props.question.voteCount}
                tags={tagSelector.toString(this.props.question.tags)}
                answers={this.props.answers}
                onEdit={this.props.onEdit}
                addAnswer={this.props.addAnswer}
                onDelete={this.props.onDelete}
                onVote={this.props.onVote}
                onLogout={this.props.onLogout}
            />
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionDetails);
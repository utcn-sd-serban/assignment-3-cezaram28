import React, { Component } from "react";
import { connect } from "react-redux";
import * as questionSelector from "../model/question/questionSelectors";
import SearchQuestions from "./SearchQuestions";
import questionsListPresenter from "../presenter/questionsListPresenter";

const mapQuestionStateToComponentState = state => ({
    questions: state.questionState.newQuestion.title === "" ?
        (state.questionState.newQuestion.tags === "" ? state.questionState.questions : questionSelector.findByTag(state.questionState.newQuestion.tags)) :
        questionSelector.findByTitle(state.questionState.newQuestion.title),
    user: state.userState.users[state.userState.currentUserIndex]
});

function mapDispatchToProps(dispatch) {
    return {
        onViewDetails: questionsListPresenter.onViewDetails,
        onCreateQuestion: questionsListPresenter.onCreateQuestion,
        onEdit: questionsListPresenter.onEdit,
        onDelete: questionsListPresenter.onDelete,
        onVote: questionsListPresenter.onVote,
        onLogout: questionsListPresenter.onLogout,
        addAnswer: questionsListPresenter.addAnswer
    };
}

class SmartSearchQuestions extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        questionsListPresenter.loadQuestions();
    }

    render() {
        return (
            <SearchQuestions
                user={this.props.user}
                questions={this.props.questions}
                onViewDetails={this.props.onViewDetails}
                onCreateQuestion={this.props.onCreateQuestion}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete}
                onVote={this.props.onVote}
                onLogout={this.props.onLogout}
                addAnswer={this.props.addAnswer}
            />
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartSearchQuestions);
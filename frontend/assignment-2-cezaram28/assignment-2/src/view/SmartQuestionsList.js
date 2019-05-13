import React, { Component } from "react";
import QuestionsList from "./QuestionsList";
import { connect } from "react-redux";
import questionsListPresenter from "../presenter/questionsListPresenter";

const mapQuestionStateToComponentState = (state) => ({
    questions: state.questionState.questions,
    title: state.questionState.newQuestion.title,
    user: state.userState.users[state.userState.currentUserIndex],
    tags: state.tagState.tags
});

function mapDispatchToProps(dispatch) {
    return {
        onSearch: questionsListPresenter.onSearch,
        onChange: questionsListPresenter.onChange,
        onViewDetails: questionsListPresenter.onViewDetails,
        onCreateQuestion: questionsListPresenter.onCreateQuestion,
        onTagClick: questionsListPresenter.onTagClick,
        addAnswer: questionsListPresenter.addAnswer,
        onVote: questionsListPresenter.onVote,
        onEdit: questionsListPresenter.onEdit,
        onDelete: questionsListPresenter.onDelete,
        onLogout: questionsListPresenter.onLogout,
        onUsers: questionsListPresenter.onUsers
    };
}

class SmartQuestionsList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        questionsListPresenter.loadQuestions();
    }

    render() {
        return (
            <QuestionsList
                user={this.props.user}
                questions={this.props.questions}
                tags={this.props.tags}
                title={this.props.title}
                onSearch={this.props.onSearch}
                onChange={this.props.onChange}
                onViewDetails={this.props.onViewDetails}
                onCreateQuestion={this.props.onCreateQuestion}
                onTagClick={this.props.onTagClick}
                addAnswer={this.props.addAnswer}
                onVote={this.props.onVote}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete}
                onLogout={this.props.onLogout}
                onUsers={this.props.onUsers}
            />
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionsList);
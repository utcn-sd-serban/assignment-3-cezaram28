import * as questionActions from "../model/question/questionActions";
import * as userActions from "../model/user/userActions";
import * as tagActions from "../model/tag/tagActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import RestClient from "../rest/RestClient";

class QuestionListPresenter {

    loadQuestions() {
        let user = userSelectors.getCurrentUser();
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.loadAllQuestions().then(questions => {
            store.dispatch(questionActions.loadQuestions(questions));
        });
    }

    loadUsers() {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.loadUsers().then(users => {
            store.dispatch(userActions.loadUsers(users));
        });
    }

    loadTags() {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.loadTags().then(tags => {
            store.dispatch(tagActions.loadTags(tags));
        });
    }

    onUsers() {
        window.location.assign("#/users-list");
    }

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onCreateQuestion() {
        window.location.assign("#/create-question");
    }

    onViewDetails(index) {
        window.location.assign("#/view-question/" + index);
    }

    onChange(property, value) {
        store.dispatch(questionActions.changeNewQuestionProperty(property, value));
    }

    init() {
        store.dispatch(questionActions.changeNewQuestionProperty("tags", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
    }

    onSearch(title) {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.loadByTitle(title).then(questions => {
           store.dispatch(questionActions.searchQuestions(questions));
        });
        store.dispatch(questionActions.changeNewQuestionProperty("title", title));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("tags", ""));
        window.location.assign("#/questions-list/" + title);
    }

    onTagClick(tag) {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.loadByTag(tag).then(questions => {
            store.dispatch(questionActions.searchQuestions(questions));
        });
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("tags", tag));
        window.location.assign("#/questions-list/" + tag);
    }

    addAnswer(index) {
        window.location.assign("#/create-answer/" + index);
    }

    onDelete(index) {
        let loggedUser = userSelectors.getCurrentUser();
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.deleteQuestion(index, loggedUser);
    }

    onEdit(index) {
        window.location.assign("#/edit-question/" + index);
    }

    onVote(votedQuestion, votedAnswer, type) {
        let loggedUserId = userSelectors.getCurrentUser().id;
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        if (type == "up") {
            client.upvoteQuestion(loggedUserId, votedQuestion).then(status => {
                if (status >= 300)
                    alert("Cannot upvote twice!");
            });;
        } else {
            client.downvoteQuestion(loggedUserId, votedQuestion).then(status => {
                if (status >= 300)
                    alert("Cannot downvote twice!");
            });;
        }
    }
}

const questionListPresenter = new QuestionListPresenter();

export default questionListPresenter;
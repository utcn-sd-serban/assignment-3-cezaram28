import * as questionSelectors from "../model/question/questionSelectors";
import * as questionActions from "../model/question/questionActions";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import * as tagSelectors from "../model/tag/tagSelectors";
import store from "../model/store/store";
import RestClient from "../rest/RestClient";

const client = new RestClient("user1", "pass1");

class CreateQuestionPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onCreate() {
        let newQuestion = questionSelectors.getNewQuestion();
        let tags = tagSelectors.toList(newQuestion.tags);
        client.createQuestion(newQuestion.title, newQuestion.text, userSelectors.getCurrentUser(), tags)
            .then(newQuestion => {
                store.dispatch(questionActions.addQuestion(newQuestion.id, newQuestion.title, newQuestion.text, newQuestion.author,
                    newQuestion.tags, newQuestion.creationDate, newQuestion.voteCount));
            });
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("tags", ""));
        window.location.assign("#/questions-list");
    }

    onChange(property, value) {
        store.dispatch(questionActions.changeNewQuestionProperty(property, value));
    }

}

const createQuestionPresenter = new CreateQuestionPresenter();
export default createQuestionPresenter;
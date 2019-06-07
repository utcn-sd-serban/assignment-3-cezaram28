import * as questionSelectors from "../model/question/questionSelectors";
import * as questionActions from "../model/question/questionActions";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import RestClient from "../rest/RestClient";


class EditQuestionPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onEdit(id) {
        let newQuestion = questionSelectors.getNewQuestion();
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.editQuestion(userSelectors.getCurrentUser().id, newQuestion.title, newQuestion.text, id);
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        window.location.assign("#/questions-list/");
    }

    onChange(property, value) {
        store.dispatch(questionActions.changeNewQuestionProperty(property, value));
    }

}

const editQuestionPresenter = new EditQuestionPresenter();
export default editQuestionPresenter;
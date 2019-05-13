import * as questionSelectors from "../model/question/questionSelectors";
import * as questionActions from "../model/question/questionActions";
import * as userActions from "../model/user/userActions";
import store from "../model/store/store";

class EditQuestionPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onEdit(id) {
        let newQuestion = questionSelectors.getNewQuestion();
        store.dispatch(questionActions.editQuestion(id, newQuestion.title, newQuestion.text));
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
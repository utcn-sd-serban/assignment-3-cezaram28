import * as answerActions from "../model/answer/answerActions";
import * as answerSelectors from "../model/answer/answerSelectors";
import * as userActions from "../model/user/userActions";
import store from "../model/store/store";

class EditAnswerPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onEdit(id, questionId) {
        store.dispatch(answerActions.editAnswer(id, answerSelectors.getNewAnswer().text));
        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
        window.location.assign("#/view-question/" + questionId);
    }

    onChange(property, value) {
        store.dispatch(answerActions.changeNewAnswerProperty(property, value));
    }
}

const editAnswerPresenter = new EditAnswerPresenter();
export default editAnswerPresenter;
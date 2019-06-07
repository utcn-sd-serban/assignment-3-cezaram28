import * as answerActions from "../model/answer/answerActions";
import * as answerSelectors from "../model/answer/answerSelectors";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import RestClient from "../rest/RestClient";

class EditAnswerPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onEdit(id, questionId) {
        let currentAnswer = answerSelectors.getNewAnswer();
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.editAnswer(userSelectors.getCurrentUser().id, currentAnswer.text, id);
        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
        window.location.assign("#/view-question/" + questionId);
    }

    onChange(property, value) {
        store.dispatch(answerActions.changeNewAnswerProperty(property, value));
    }
}

const editAnswerPresenter = new EditAnswerPresenter();
export default editAnswerPresenter;
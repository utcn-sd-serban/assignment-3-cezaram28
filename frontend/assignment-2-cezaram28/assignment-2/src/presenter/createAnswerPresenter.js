import store from "../model/store/store";
import * as answerActions from "../model/answer/answerActions";
import * as answerSelectors from "../model/answer/answerSelectors";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";

import RestClient from "../rest/RestClient";

class CreateAnswerPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onCreate(question) {
        let newAnswer = answerSelectors.getNewAnswer();
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.createAnswer(newAnswer.text, userSelectors.getCurrentUser(), question);
        
        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
        window.location.assign("#/view-question/" + question.id);
    }

    onChange(property, value) {
        store.dispatch(answerActions.changeNewAnswerProperty(property, value));
    }
}

const createAnswerPresenter = new CreateAnswerPresenter();
export default createAnswerPresenter;
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import * as answerActions from "../model/answer/answerActions";
import * as voteSelectors from "../model/vote/voteSelectors";
import * as voteActions from "../model/vote/voteActions";
import store from "../model/store/store";

import RestClient from "../rest/RestClient";


class QuestionDetailsPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    addAnswer(index) {
        window.location.assign("#/create-answer/" + index);
    }

    onEdit(aIndex, qIndex) {
        window.location.assign("#/view-question/" + qIndex + "/edit-answer/" + aIndex);
    }

    onDelete(index) {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.deleteAnswer(index, userSelectors.getCurrentUser());
    }

    onInit(questionId) {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.answersByQuestion(questionId).then(answers => {
            store.dispatch(answerActions.saveFiltered(answers));
        });

        client.loadUsers().then(users => {
            store.dispatch(userActions.loadUsers(users));
        });
    }

    onVote(votedQuestion, votedAnswer, type) {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        let loggedUserId = userSelectors.getCurrentUser().id;
        if (type == "up") client.upvoteAnswer(loggedUserId, votedAnswer).then(status => {
            if (status >= 300)
                alert("Cannot upvote twice!");
        });
        else client.downvoteAnswer(loggedUserId, votedAnswer).then(status => {
            if (status >= 300)
                alert("Cannot downvote twice!");
        });
    }

}

const questionDetailsPresenter = new QuestionDetailsPresenter();
export default questionDetailsPresenter;
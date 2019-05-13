import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import * as answerActions from "../model/answer/answerActions";
import * as voteSelectors from "../model/vote/voteSelectors";
import * as voteActions from "../model/vote/voteActions";
import store from "../model/store/store";

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
        store.dispatch(answerActions.deleteAnswer(index));
    }

    onVote(votedQuestion, votedAnswer, type) {
        if (votedAnswer !== undefined) {
            let v = voteSelectors.findByAnswer(votedAnswer.id, userSelectors.getCurrentIndex());
            if (v.length > 0) {
                //already voted
                if (v[0].type === "up" && type === "down") {
                    //change from upvote to downvote

                    store.dispatch(userActions.updateScore(votedAnswer.author.id, -12));
                    store.dispatch(userActions.updateScore(userSelectors.getCurrentIndex(), -1));
                    store.dispatch(answerActions.changeAnswerScore(votedAnswer.id, -2));
                    store.dispatch(voteActions.changeVoteType(v[0].id, type));
                }
                else if (v[0].type === "down" && type === "up") {
                    //change from down to up
                    store.dispatch(userActions.updateScore(votedAnswer.author.id, 12));
                    store.dispatch(userActions.updateScore(userSelectors.getCurrentIndex(), 1));
                    store.dispatch(answerActions.changeAnswerScore(votedAnswer.id, 2));
                    store.dispatch(voteActions.changeVoteType(v[0].id, type));
                }
            } else {
                store.dispatch(voteActions.addVote(undefined, votedAnswer, type, userSelectors.getCurrentUser()));
                if (type === "down") {
                    //downvote
                    store.dispatch(userActions.updateScore(votedAnswer.author.id, -2));
                    store.dispatch(userActions.updateScore(userSelectors.getCurrentIndex(), -1));
                    store.dispatch(answerActions.changeAnswerScore(votedAnswer.id, -1));
                }
                else {
                    //up
                    store.dispatch(userActions.updateScore(votedAnswer.author.id, 10));
                    store.dispatch(answerActions.changeAnswerScore(votedAnswer.id, 1));
                }
            }
        }
    }

}

const questionDetailsPresenter = new QuestionDetailsPresenter();
export default questionDetailsPresenter;
import store from "../store/store";

export function findByQuestion(questionId, userId) {
    let questionVotes = store.getState().voteState.votes.filter(v => v.question !== undefined && v.question.id === questionId);
    let userVote = questionVotes.filter(v => v.user.id === userId);
    return userVote;
}

export function findByAnswer(answerId, userId) {
    let answerVotes = store.getState().voteState.votes.filter(v => v.answer !== undefined && v.answer.id === answerId);
    let userVote = answerVotes.filter(v => v.user.id === userId);
    return userVote;
}
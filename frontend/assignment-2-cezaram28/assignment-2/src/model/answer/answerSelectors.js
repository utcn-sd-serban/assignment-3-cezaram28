import store from "../store/store";

export function findByAuthor(username) {
    return store.getState().answerState.answers.filter(a => a.author.username === username);
}

export function findByQuestion(questionId) {
    let ans = store.getState().answerState.answers.filter(a => a.question.id == questionId);
    return ans;
}

export function getNewAnswer() {
    return store.getState().answerState.newAnswer;
}

export function findById(answerId) {
    return store.getState().answerState.answers.filter(a => a.id == answerId)[0];
}
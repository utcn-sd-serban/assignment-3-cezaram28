import { changeNewQuestionProperty } from "./questionActions";
import store from "../store/store";

export function findByTitle(title) {
    let res = store.getState().questionState.questions.filter(q => q.title.includes(title));
    return res;
}

export function findByTag(tag) {
    let questions = [];
    for (let i = 0; i < store.getState().questionState.questions.length; i++) {
        for (let j = 0; j < store.getState().questionState.questions[i].tags.length; j++) {
            if (store.getState().questionState.questions[i].tags[j].name === tag) {
                questions.push(store.getState().questionState.questions[i]);
                break;
            }
        }
    }
    return questions;
}

export function findByAuthor(username) {
    return store.getState().questionState.questions.filter(q => q.author.username === username);
}

export function getNewQuestion() {
    return store.getState().questionState.newQuestion;
}
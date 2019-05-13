import { EventEmitter } from "events";
import question from "./question";
import author from "./user";

class Answer extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answers: [{
                id: 0,
                question: question.state.questions[0],
                author: author.state.users[1],
                text: "here's an answer",
                creationDate: "later",
                voteCount: 1
            }],
            newAnswer: {
                id: "",
                question: "",
                author: "",
                text: "",
                creationDate: "",
                voteCount: 0
            },
            index: 1
        };
    }

    findByAuthor(username) {
        return this.state.answers.filter(a => a.author.username === username);
    }

    findByQuestion(questionId) {
        let ans = this.state.answers.filter(a => a.question.id == questionId);
        return ans;
    }

    addAnswer(question, text) {
        let now = new Date();
        this.state = {
            ...this.state,
            answers: this.state.answers.concat([{
                id: this.state.index,
                question,
                author: author.state.users[author.state.currentUserIndex],
                text,
                creationDate: now.toLocaleString(),
                voteCount: 0
            }]),
            index: this.state.index + 1
        };
        this.emit("change", this.state);
    }

    editAnswer(id, text) {
        let currentAnswer = {
            id,
            question: this.state.answers[id].question,
            author: this.state.answers[id].author,
            text,
            creationDate: this.state.answers[id].creationDate,
            voteCount: this.state.answers[id].voteCount
        };
        let allAnswers = this.state.answers.concat([]);
        allAnswers[id] = currentAnswer;
        this.state = {
            ...this.state,
            answers: allAnswers
        };
        this.emit("change", this.state);
    }

    changeAnswerScore(id, value) {
        let currentAnswer = {
            id,
            question: this.state.answers[id].question,
            author: this.state.answers[id].author,
            text: this.state.answers[id].text,
            creationDate: this.state.answers[id].creationDate,
            voteCount: this.state.answers[id].voteCount + value
        };
        let allAnswers = this.state.answers.concat([]);
        allAnswers[id] = currentAnswer;
        this.state = {
            ...this.state,
            answers: allAnswers
        };
        this.emit("change", this.state);
    }

    deleteAnswer(id) {
        let allAnswers = this.state.answers.concat([]);
        let answer = allAnswers.filter(a => a.id === id)[0];
        allAnswers.splice(allAnswers.indexOf(answer), 1);
        this.state = {
            ...this.state,
            answers: allAnswers
        };
        this.emit("change", this.state);
    }

    changeNewAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }
}

const answer = new Answer();

export default answer;
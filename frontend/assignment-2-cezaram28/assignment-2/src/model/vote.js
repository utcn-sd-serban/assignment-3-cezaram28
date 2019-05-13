import { EventEmitter } from "events";
import question from "./question";
import author from "./user";
import answer from "./answer";

class Vote extends EventEmitter {
    constructor() {
        super();
        this.state = {
            votes: [],
            newVote: {
                id: "",
                type: "",
                question: "",
                answer: "",
                user: ""
            },
            index: 0
        };
    }

    addVote(question, answer, type) {
        this.state = {
            ...this.state,
            votes: this.state.votes.concat([{
                id: this.state.index,
                type,
                question,
                user: author.state.users[author.state.currentUserIndex],
                answer
            }]),
            index: this.state.index + 1
        };
        this.emit("change", this.state);
    }

    findByQuestion(questionId, userId) {
        let questionVotes = this.state.votes.filter(v => v.question !== undefined && v.question.id === questionId);
        let userVote = questionVotes.filter(v => v.user.id === userId);
        return userVote;
    }

    findByAnswer(answerId, userId) {
        let answerVotes = this.state.votes.filter(v => v.answer !== undefined && v.answer.id === answerId);
        let userVote = answerVotes.filter(v => v.user.id === userId);
        return userVote;
    }

    changeVoteType(id, type) {
        let currentVote = {
            id,
            type,
            question: this.state.votes[id].question,
            answer: this.state.votes[id].answer,
            user: this.state.votes[id].user
        };
        let allVotes = this.state.votes.concat([]);
        allVotes[id] = currentVote;
        this.state = {
            ...this.state,
            votes: allVotes
        };
    }

    changeNewVoteProperty(property, value) {
        this.state = {
            ...this.state,
            newVote: {
                ...this.state.newVote,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

}

const vote = new Vote();

export default vote;
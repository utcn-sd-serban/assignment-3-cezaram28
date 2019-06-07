const initState = {
    answers: [],
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

export default function answerReducer(state = initState, action) {
    switch (action.type) {
        case "ADD_ANSWER":
            return addAnswer(state, action.payload);
        case "EDIT_ANSWER":
            return editAnswer(state, action.payload);
        case "UPDATE_ANSWER":
            return updateAnswer(state, action.payload);
        case "CHANGE_ANSWER_SCORE":
            return changeAnswerScore(state, action.payload);
        case "DELETE_ANSWER":
            return deleteAnswer(state, action.payload);
        case "CHANGE_ANSWER_PROP":
            return changeNewAnswerProperty(state, action.payload);
        case "SAVE_FILTERED":
            return saveFiltered(state, action.payload);
    }
    return state;
}

function addAnswer(state, payload) {
    return {
        ...state,
        answers: state.answers.concat([payload.answer]),
        index: state.index + 1
    };
}

function editAnswer(state, payload) {
    let currentAnswer = state.answers.filter(answer => answer.id == payload.id)[0];
    let allAnswers = state.answers.concat([]);
    let index = allAnswers.indexOf(currentAnswer);
    allAnswers[index] = {
        ...allAnswers[index],
        text: payload.text
    };
    return {
        ...state,
        answers: allAnswers
    };
}

function changeAnswerScore(state, payload) {
    let currentAnswer = {
        id: payload.id,
        question: state.answers[payload.id].question,
        author: state.answers[payload.id].author,
        text: state.answers[payload.id].text,
        creationDate: state.answers[payload.id].creationDate,
        voteCount: state.answers[payload.id].voteCount + payload.value
    };
    let allAnswers = state.answers.concat([]);
    allAnswers[payload.id] = currentAnswer;
    return {
        ...state,
        answers: allAnswers
    };
}

function updateAnswer(state, payload) {
    let answer = state.answers.filter(a => a.id === payload.answer.id)[0];
    let index = state.answers.indexOf(answer);
    let currentAnswer = {
        id: payload.answer.id,
        question: payload.answer.question,
        author: payload.answer.author,
        text: payload.answer.text,
        creationDate: payload.answer.creationDate,
        voteCount: payload.answer.voteCount
    };
    let allAnswers = state.answers.concat([]);
    allAnswers[index] = currentAnswer;
    debugger;
    return {
        ...state,
        answers: allAnswers
    };
}

function deleteAnswer(state, payload) {
    let allAnswers = state.answers.concat([]);
    let answer = allAnswers.filter(a => a.id === payload.id)[0];
    allAnswers.splice(allAnswers.indexOf(answer), 1);
    debugger;
    return {
        ...state,
        answers: allAnswers
    };
}

function changeNewAnswerProperty(state, payload) {
    return {
        ...state,
        newAnswer: {
            ...state.newAnswer,
            [payload.property]: payload.value
        }
    };
}

function saveFiltered(state, payload) {
    return {
        ...state,
        answers: payload.answers
    }
}
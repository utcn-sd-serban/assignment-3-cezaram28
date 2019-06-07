const initState = {
    questions: [],
    newQuestion: {
        id: "",
        title: "",
        author: "",
        text: "",
        creationDate: "",
        voteCount: "",
        tags: ""
    },
    searchedQuestions: [],
    index: 0
};

export default function questionReducer(state = initState, action) {
    switch (action.type) {
        case "ADD_QUESTION":
            return addQuestion(state, action.payload);
        case "EDIT_QUESTION":
            return editQuestion(state, action.payload);
        case "CHANGE_QUESTION_SCORE":
            return changeQuestionScore(state, action.payload);
        case "DELETE_QUESTION":
            return deleteQuestion(state, action.payload);
        case "CHANGE_QUESTION_PROP":
            return changeNewQuestionProperty(state, action.payload);
        case "LOAD_QUESTIONS":
            return loadQuestions(state, action.payload);
        case "SEARCH_QUESTIONS":
            return searchQuestions(state, action.payload);
        case "UPDATE_QUESTION":
            return updateQuestion(state, action.payload);
    }
    return state;
}

function addQuestion(state, payload) {
    return {
        ...state,
        questions: state.questions.concat([payload.question])
    };
}

function editQuestion(state, payload) {
    let question = state.questions.filter(q => q.id == payload.id)[0];
    let currentQuestion = {
        id: payload.id,
        title: payload.title,
        author: question.author,
        text: payload.text,
        creationDate: question.creationDate,
        voteCount: question.voteCount,
        tags: question.tags
    };
    let allQuestions = state.questions.concat([]);
    allQuestions[allQuestions.indexOf(question)] = currentQuestion;
    return {
        ...state,
        questions: allQuestions
    };
}

function updateQuestion(state, payload) {
    let question = state.questions.filter(q => q.id == payload.question.id)[0];
    let currentQuestion = {
        id: payload.question.id,
        title: payload.question.title,
        author: question.author,
        text: payload.question.text,
        creationDate: question.creationDate,
        voteCount: payload.question.voteCount,
        tags: question.tags
    };
    let allQuestions = state.questions.concat([]);
    allQuestions[allQuestions.indexOf(question)] = currentQuestion;
    debugger;
    return {
        ...state,
        questions: allQuestions
    };
}

function changeQuestionScore(state, payload) {
    let currentQuestion = {
        id: state.questions[payload.id].id,
        title: state.questions[payload.id].title,
        author: state.questions[payload.id].author,
        text: state.questions[payload.id].text,
        creationDate: state.questions[payload.id].creationDate,
        voteCount: state.questions[payload.id].voteCount + payload.value,
        tags: state.questions[payload.id].tags
    };
    let allQuestions = state.questions.concat([]);
    allQuestions[payload.id] = currentQuestion;
    return {
        ...state,
        questions: allQuestions
    };
}

function deleteQuestion(state, payload) {
    let allQuestions = state.questions.concat([]);
    let question = allQuestions.filter(q => q.id === payload.id)[0];
    allQuestions.splice(allQuestions.indexOf(question), 1);
    return {
        ...state,
        questions: allQuestions
    };
}

function changeNewQuestionProperty(state, payload) {
    return {
        ...state,
        newQuestion: {
            ...state.newQuestion,
            [payload.property]: payload.value
        }
    };
}

function loadQuestions(state, payload) {
    return {
        ...state,
        questions: payload.questions
    };
}

function searchQuestions(state, payload) {
    return {
        ...state,
        searchedQuestions: payload.questions
    };
}
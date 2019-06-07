export function addQuestion(question) {
    return {
        type: "ADD_QUESTION",
        payload: {
            question
        }
    }
}

export function editQuestion(id, title, text) {
    return {
        type: "EDIT_QUESTION",
        payload: {
            id,
            title,
            text
        }
    }
}

export function updateQuestion(question) {
    return {
        type: "UPDATE_QUESTION",
        payload: {
            question
        }
    }
}

export function changeQuestionScore(id, value) {
    return {
        type: "CHANGE_QUESTION_SCORE",
        payload: {
            id,
            value
        }
    }
}

export function deleteQuestion(id) {
    return {
        type: "DELETE_QUESTION",
        payload: {
            id
        }
    }
}

export function changeNewQuestionProperty(property, value) {
    return {
        type: "CHANGE_QUESTION_PROP",
        payload: {
            property,
            value
        }
    };
}

export function loadQuestions(questions) {
    return {
        type: "LOAD_QUESTIONS",
        payload: {
            questions
        }
    }
}

export function searchQuestions(questions) {
    debugger;
    return {
        type: "SEARCH_QUESTIONS",
        payload: {
            questions
        }
    }
}
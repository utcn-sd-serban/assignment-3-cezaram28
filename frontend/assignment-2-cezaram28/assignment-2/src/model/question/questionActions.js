export function addQuestion(id, title, text, user, tags, creationDate, voteCount) {
    return {
        type: "ADD_QUESTION",
        payload: {
            id,
            title,
            text,
            user,
            creationDate,
            voteCount,
            tags
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
export function addAnswer(answer) {
    return {
        type: "ADD_ANSWER",
        payload: {
            answer
        }
    };
}

export function editAnswer(id, text) {
    return {
        type: "EDIT_ANSWER",
        payload: {
            id,
            text
        }
    };
}

export function updateAnswer(answer) {
    return {
        type: "UPDATE_ANSWER",
        payload: {
            answer
        }
    };
}

export function changeAnswerScore(id, value) {
    return {
        type: "CHANGE_ANSWER_SCORE",
        payload: {
            id,
            value
        }
    };
}

export function deleteAnswer(id) {
    return {
        type: "DELETE_ANSWER",
        payload: {
            id
        }
    };
}

export function changeNewAnswerProperty(property, value) {
    return {
        type: "CHANGE_ANSWER_PROP",
        payload: {
            property,
            value
        }
    };
}

export function saveFiltered(answers) {
    return {
        type: "SAVE_FILTERED",
        payload: {
            answers
        }
    };
}
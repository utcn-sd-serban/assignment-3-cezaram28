export function addTag(name) {
    return {
        type: "ADD_TAG",
        payload: {
            name
        }
    }
}

export function loadTags(tags) {
    return {
        type: "LOAD_TAGS",
        payload: {
            tags
        }
    }
}
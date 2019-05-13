export function addTag(name) {
    return {
        type: "ADD_TAG",
        payload: {
            name
        }
    }
}
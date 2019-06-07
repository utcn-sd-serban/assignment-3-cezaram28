const initState = {
    tags: [],
    newTag: {
        id: "",
        name: ""
    },
    index: 0
};

export default function tagReducer(state = initState, action) {
    switch (action.type) {
        case "ADD_TAG":
            return addTag(state, action.payload);
        case "LOAD_TAGS":
            return loadTags(state, action.payload);
    }
    return state;
}

function addTag(state, payload) {
    let tag = {
        id: state.index,
        name: payload.name
    }
    
    return {
        ...state,
        tags: state.tags.concat([tag]),
        index: state.index + 1
    };
}

function loadTags(state, payload) {
    return {
        ...state,
        tags: payload.tags
    }
}
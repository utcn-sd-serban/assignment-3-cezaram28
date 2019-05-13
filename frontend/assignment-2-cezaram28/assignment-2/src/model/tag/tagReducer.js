const initState = {
    tags: [{
        id: 0,
        name: "java"
    }, {
        id: 1,
        name: "programming"
    }],
    newTag: {
        id: "",
        name: ""
    },
    index: 2
};

export default function tagReducer(state = initState, action) {
    switch (action.type) {
        case "ADD_TAG":
            return addTag(state, action.payload);
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
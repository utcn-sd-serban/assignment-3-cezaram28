
const initState = {
    users: [{
        id: 0,
        username: "mckfchicken",
        password: "burgr",
        email: "mckfc@subway.com",
        score: 5,
        isAdmin: false,
        isBanned: false
    }, {
        id: 1,
        username: "admin_van_buuren",
        password: "mixitup",
        email: "avb@dj.com",
        score: 1,
        isAdmin: true,
        isBanned: false
    }, {
        id: 2,
        username: "user1",
        password: "pass1",
        email: "email1",
        score: 0,
        isAdmin: true,
        isBanned: false
    }],
    newUser: {
        id: "",
        username: "",
        password: "",
        email: "",
        score: 0,
        isAdmin: false,
        isBanned: false
    },
    currentUserIndex: 2,
    index: 2,
    route: "users-list"
};

export default function userReducer(state = initState, action) {
    switch (action.type) {
        case "ADD_USER":
            return addUser(state, action.payload);
        case "CHANGE_USER_PROP":
            return changeNewUserProperty(state, action.payload);
        case "MAKE_ADMIN":
            return makeAdmin(state, action.payload);
        case "BAN_USER":
            return banUser(state, action.payload);
        case "UPDATE_SCORE":
            return updateScore(state, action.payload);
        case "LOGOUT":
            return logout(state, action.payload);
        case "UPDATE_CURRENT_INDEX":
            return updateCurrentUserIndex(state, action.payload);
    }
    return state;
};

function addUser(state, payload) {
    return {
        ...state,
        users: state.users.concat([{
            id: state.index,
            username: payload.username,
            password: payload.password,
            email: payload.email,
            score: 0,
            isAdmin: false,
            isBanned: false
        }]),
        index: state.index + 1
    };
}

function changeNewUserProperty(state, payload) {
    return {
        ...state,
        newUser: {
            ...state.newUser,
            [payload.property]: payload.value
        }
    };
}

function makeAdmin(state, payload) {
    let currentUser = {
        id: payload.id,
        username: state.users[payload.id].username,
        password: state.users[payload.id].password,
        email: state.users[payload.id].email,
        score: state.users[payload.id].score,
        isAdmin: true,
        isBanned: state.users[payload.id].isBanned
    };
    let allUsers = state.users.concat([]);
    allUsers[payload.id] = currentUser;
    return {
        ...state,
        users: allUsers
    };
}

function banUser(state, payload) {
    let currentUser = {
        id: payload.id,
        username: state.users[payload.id].username,
        password: state.users[payload.id].password,
        email: state.users[payload.id].email,
        score: state.users[payload.id].score,
        isAdmin: state.users[payload.id].isAdmin,
        isBanned: true
    };
    let allUsers = state.users.concat([]);
    allUsers[payload.id] = currentUser;
    return {
        ...state,
        users: allUsers
    };
}

function updateScore(state, payload) {
    let currentUser = {
        id: payload.id,
        username: state.users[payload.id].username,
        password: state.users[payload.id].password,
        email: state.users[payload.id].email,
        score: state.users[payload.id].score + payload.value,
        isAdmin: state.users[payload.id].isAdmin,
        isBanned: state.users[payload.id].isBanned
    };
    let allUsers = state.users.concat([]);
    allUsers[payload.id] = currentUser;
    return {
        ...state,
        users: allUsers
    };
}

function logout(state) {
    return {
        ...state,
        currentUserIndex: -1
    };
}

function updateCurrentUserIndex(state, payload) {
    return {
        ...state,
        currentUserIndex: payload.index
    };
}
const initState = {
    users: [],
    newUser: {
        id: "",
        username: "",
        password: "",
        email: "",
        score: 0,
        isAdmin: false,
        isBanned: false
    },
    currentUserIndex: 0,
    index: 3,
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
        case "UPDATE_USER":
            return updateUser(state, action.payload);
        case "LOAD_USERS":
            return loadUsers(state, action.payload);
    }
    return state;
};

function addUser(state, payload) {

    let users = state.users.filter(user => user.username === payload.user.username);
    let newIndex;
    let allUsers = [];
    if (users.length === 0) {
        allUsers = state.users.concat([payload.user]);
        newIndex = allUsers.length - 1;
    } else {
        allUsers[users.indexOf(users[0])] = {
            id: users[0].id,
            username: users[0].username, 
            password: payload.user.password !== undefined ? payload.user.password : "",
            email: users[0].email,
            score: users[0].score,
            isAdmin: users[0].isAdmin,
            isBanned: users[0].isBanned
        }
        newIndex = allUsers.indexOf(users[0]);
    }
    debugger;
    return {
        ...state,
        users: allUsers,
        currentUserIndex: newIndex
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
    let user = state.users.filter(u => u.id === payload.id)[0];
    let currentUser = {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        score: user.score,
        isAdmin: user.isAdmin,
        isBanned: true
    };
    let allUsers = state.users.concat([]);
    allUsers[state.users.indexOf(user)] = currentUser;
    return {
        ...state,
        users: allUsers
    };
}

function updateUser(state, payload) {
    let user = state.users.filter(u => u.id === payload.user.id)[0];
    let currentUser = {
        id: payload.user.id,
        username: payload.user.username,
        password: user.password,
        email: user.email,
        score: payload.user.score,
        isAdmin: payload.user.isAdmin,
        isBanned: payload.user.isBanned
    };
    let allUsers = state.users.concat([]);
    allUsers[state.users.indexOf(user)] = currentUser;
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
    let user = state.users.filter(u => u.id === payload.index)[0];
    let index = state.users.indexOf(user);
    return {
        ...state,
        currentUserIndex: index
    };
}

function loadUsers(state, payload) {

    let loggedUser = state.users[state.currentUserIndex];
    let allUsers = [];
    for (let i = 0; i < payload.users.length; i++) {
        let filtered = state.users.filter(user => user.username === payload.users[i].username);
        if (filtered.length === 0) {
            allUsers.push(payload.users[i]);
        } else {
            allUsers.push(filtered[0]);
        }
        debugger;
    }
    
    let index = allUsers.indexOf(loggedUser);
    debugger;
    return {
        ...state,
        users: allUsers,
        currentUserIndex: index
    }
}
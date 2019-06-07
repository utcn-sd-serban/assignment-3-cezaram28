
export function addUser(user) {
    return {
        type: "ADD_USER",
        payload: {
            user
        }
    }
}

export function changeNewUserProperty(property, value) {
    return {
        type: "CHANGE_USER_PROP",
        payload: {
            property,
            value
        }
    }
}

export function makeAdmin(id) {
    return {
        type: "MAKE_ADMIN",
        payload: {
            id
        }
    }
}

export function banUser(id) {
    return {
        type: "BAN_USER",
        payload: {
            id
        }
    }
}

export function updateUser(user) {
    return {
        type: "UPDATE_USER",
        payload: {
            user
        }
    }
}

export function updateScore(id, value) {
    return {
        type: "UPDATE_SCORE",
        payload: {
            id,
            value
        }
    }
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: {}
    }
}

export function updateCurrentUserIndex(index) {
    return {
        type: "UPDATE_CURRENT_INDEX",
        payload: {
            index
        }
    }
}

export function loadUsers(users) {
    return {
        type: "LOAD_USERS",
        payload: {
            users
        }
    }
}
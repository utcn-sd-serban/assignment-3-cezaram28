import store from "../store/store";

export function findByUsername(username) {
    return store.getState().userState.users.filter(u => u.username == username)[0];
}

export function findByEmail(email) {
    return store.getState().userState.users.filter(u => u.email == email)[0];
}

export function getNewUser() {
    return store.getState().userState.newUser;
}

export function getCurrentIndex() {
    return store.getState().userState.currentUserIndex;
}

export function getIndex() {
    return store.getState().userState.index;
}

export function getCurrentUser() {
    return store.getState().userState.users[store.getState().userState.currentUserIndex];
}
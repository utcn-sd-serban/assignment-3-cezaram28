import { EventEmitter } from "events";

class User extends EventEmitter {
    constructor() {
        super();
        this.state = {
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
                username: "a",
                password: "a",
                email: "a",
                score: 1,
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
    }

    updateScore(id, value) {
        let currentUser = {
            id,
            username: this.state.users[id].username,
            password: this.state.users[id].password,
            email: this.state.users[id].email,
            score: this.state.users[id].score + value,
            isAdmin: this.state.users[id].isAdmin,
            isBanned: this.state.users[id].isBanned
        };
        let allUsers = this.state.users.concat([]);
        allUsers[id] = currentUser;
        this.state = {
            ...this.state,
            users: allUsers
        };
        this.emit("change", this.state);
    }

    logout() {
        this.state = {
            ...this.state,
            currentUserIndex: -1
        };
        this.emit("change", this.state);
    }

    updateCurrentUserIndex(index) {
        this.state = {
            ...this.state,
            currentUserIndex: index
        };
        this.emit("change", this.state);
    }

    banUser(id) {
        let currentUser = {
            id,
            username: this.state.users[id].username,
            password: this.state.users[id].password,
            email: this.state.users[id].email,
            score: this.state.users[id].score,
            isAdmin: this.state.users[id].isAdmin,
            isBanned: true
        };
        let allUsers = this.state.users.concat([]);
        allUsers[id] = currentUser;
        this.state = {
            ...this.state,
            users: allUsers
        };
        this.emit("change", this.state);
    }

    makeAdmin(id) {
        let currentUser = {
            id,
            username: this.state.users[id].username,
            password: this.state.users[id].password,
            email: this.state.users[id].email,
            score: this.state.users[id].score,
            isAdmin: true,
            isBanned: this.state.users[id].isBanned
        };
        let allUsers = this.state.users.concat([]);
        allUsers[id] = currentUser;
        this.state = {
            ...this.state,
            users: allUsers
        };
        this.emit("change", this.state);
    }

    changeRoute(route) {
        this.state = {
            ...this.state,
            route
        };
        this.emit("change", this.state);
    }

    findByUsername(username) {
        return this.state.users.filter(u => u.username == username)[0];
    }

    findByEmail(email) {
        return this.state.users.filter(u => u.email == email)[0];
    }

    addUser(username, password, email) {
        this.state = {
            ...this.state,
            users: this.state.users.concat([{
                id: this.state.index,
                username: username,
                password: password,
                email: email,
                score: 0,
                isAdmin: false,
                isBanned: false
            }]),
            index: this.state.index+1
        };
        this.emit("change", this.state);
    }

    changeNewUserProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }
}

const user = new User();

export default user;
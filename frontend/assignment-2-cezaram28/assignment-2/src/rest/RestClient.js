const BASE_URL = "http://localhost:8080";

export default class RestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadAllQuestions() {
        return fetch(BASE_URL + "/questions", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    loadByTag(tag) {
        return fetch(BASE_URL + "/questions/" + tag, {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    loadByTitle(title) {
        return fetch(BASE_URL + "/questions/" + title, {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    createQuestion(title, author, text, tags) {
        return fetch(BASE_URL + "/questions", {
            method: "POST",
            body: JSON.stringify({
                id: null,
                title: title,
                author: {
                    id: author.id,
                    username: author.username,
                    email: author.email,
                    score: author.score,
                    isAdmin: author.isAdmin,
                    isBanned: author.isBanned
                },
                text: text,
                creationDate: null,
                voteCount: 0,
                tags: tags
            }),
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }
}
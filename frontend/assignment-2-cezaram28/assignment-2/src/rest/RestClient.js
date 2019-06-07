const BASE_URL = "http://localhost:8080";

export default class RestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadUsers() {
        return fetch(BASE_URL + "/users", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    login(username, password) {
        return fetch(BASE_URL + "/login", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            else return response.json();
        });
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
        return fetch(BASE_URL + "/questions/search?tag=" + tag, {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    loadByTitle(title) {
        return fetch(BASE_URL + "/questions/search?title=" + title, {
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
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
            })
        }).then(response => response.json());
    }

    deleteQuestion(questionId, user) {
        return fetch(BASE_URL + "/questions/" + questionId, {
            method: "DELETE",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    editQuestion(userId, title, text, questionId) {
        return fetch(BASE_URL + "/questions/" + userId, {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: questionId,
                title: title,
                author: null,
                text: text,
                creationDate: null,
                voteCount: 0,
                tags: null
            })
        }).then(response => response.json());
    }

    answersByQuestion(questionId) {
        return fetch(BASE_URL + "/questions/" + questionId + "/answers", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    createAnswer(text, author, question) {
        return fetch(BASE_URL + "/answers", {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                question,
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
                voteCount: 0
            })
        }).then(response => response.json());
    }

    deleteAnswer(answerId, user) {
        return fetch(BASE_URL + "/answers/" + answerId, {
            method: "DELETE",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    editAnswer(userId, text, answerId) {
        return fetch(BASE_URL + "/answers/" + userId, {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: answerId,
                author: null,
                text: text,
                creationDate: null,
                voteCount: 0,
                tags: null
            })
        }).then(response => response.json());
    }

    upvoteQuestion(userId, question) {
        return fetch(BASE_URL + "/votes/question/upvote/" + userId, {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        }).then(response => response.status);
    }

    downvoteQuestion(userId, question) {
        return fetch(BASE_URL + "/votes/question/downvote/" + userId, {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        }).then(response => response.status);
    }

    upvoteAnswer(userId, answer) {
        return fetch(BASE_URL + "/votes/answer/upvote/" + userId, {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        }).then(response => response.status);
    }

    downvoteAnswer(userId, answer) {
        return fetch(BASE_URL + "/votes/answer/downvote/" + userId, {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        }).then(response => response.status);
    }

    banUser(userId, user) {
        return fetch(BASE_URL + "/users/" + userId + "/ban", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    loadTags() {
        return fetch(BASE_URL + "/tags", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    register(username, password, email) {
        return fetch(BASE_URL + "/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        }).then(response => response.status);
    }
}
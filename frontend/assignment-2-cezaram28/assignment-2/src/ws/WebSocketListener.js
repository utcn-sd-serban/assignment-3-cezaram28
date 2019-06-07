import { EventEmitter } from "events";
import { Client } from "@stomp/stompjs";
import store from "../model/store/store";
import * as questionActions from "../model/question/questionActions";
import * as userActions from "../model/user/userActions";
import * as answerActions from "../model/answer/answerActions";

class WebSocketListener extends EventEmitter {
    constructor(username, password) {
        super();
        this.client = new Client({
            brokerURL: "ws://" + username + ":" + password + "@localhost:8080/api/websocket",
            onConnect: () => {
                this.client.subscribe("/topic/events", message => {
                    this.emit("event", JSON.parse(message.body));
                })
            }
        });
        this.client.activate();
    }
}

export const listener = new WebSocketListener("ws", "ws");

listener.on("event", event => {
    switch (event.type) {
        case "USER_CREATED":
            store.dispatch(userActions.addUser(event.userDTO));
            break;
        case "USER_UPDATED":
            store.dispatch(userActions.updateUser(event.userDTO));
            break;
        case "QUESTION_CREATED":
            store.dispatch(questionActions.addQuestion(event.questionDTO));
            break;
        case "QUESTION_DELETED":
            store.dispatch(questionActions.deleteQuestion(event.questionDTO.id));
            break;
        case "QUESTION_UPDATED":
            store.dispatch(questionActions.updateQuestion(event.questionDTO));
            break;
        case "ANSWER_CREATED":
            store.dispatch(answerActions.addAnswer(event.answerDTO));
            break;
        case "ANSWER_DELETED":
            store.dispatch(answerActions.deleteAnswer(event.answerDTO.id));
            break;
        case "ANSWER_UPDATED":
            store.dispatch(answerActions.updateAnswer(event.answerDTO));
            break;
    }
});
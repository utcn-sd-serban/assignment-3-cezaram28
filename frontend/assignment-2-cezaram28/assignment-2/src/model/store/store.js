import { createStore, combineReducers } from "redux";
import userReducer from "../user/userReducer";
import tagReducer from "../tag/tagReducer";
import answerReducer from "../answer/answerReducer";
import questionReducer from "../question/questionReducer";
import voteReducer from "../vote/voteReducer";

const rootReducer = combineReducers({
    questionState: questionReducer,
    userState: userReducer,
    tagState: tagReducer,
    answerState: answerReducer,
    voteState: voteReducer
});
const store = createStore(rootReducer);

export default store;
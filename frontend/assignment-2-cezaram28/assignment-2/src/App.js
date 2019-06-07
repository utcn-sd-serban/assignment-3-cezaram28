import React, { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import SmartUsersList from './view/SmartUsersList';
import SmartCreateUser from './view/SmartCreateUser';
import SmartQuestionsList from './view/SmartQuestionsList';
import SmartCreateAnswer from './view/SmartCreateAnswer';
import SmartEditAnswer from './view/SmartEditAnswer';
import SmartEditQuestion from './view/SmartEditQuestion';
import SmartCreateQuestion from './view/SmartCreateQuestion';
import SmartQuestionDetails from './view/SmartQuestionDetails';
import SmartSearchQuestions from './view/SmartSearchQuestions';
import SmartStart from './view/SmartStart';
import SmartLogin from './view/SmartLogin';
import SmartRegister from './view/SmartRegister';
import WebSocketListener from './ws/WebSocketListener';

const App = () => (
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact={true} component={SmartStart} path="/" />
                <Route exact={true} component={SmartLogin} path="/login" />
                <Route exact={true} component={SmartRegister} path="/register" />
                <Route exact={true} component={SmartQuestionsList} path="/questions-list" />
                <Route exact={true} component={SmartSearchQuestions} path="/questions-list/:title" />
                <Route exact={true} component={SmartUsersList} path="/users-list" />
                <Route exact={true} component={SmartCreateUser} path="/create-user" />
                <Route exact={true} component={SmartEditAnswer} path="/view-question/:qIndex/edit-answer/:aIndex" />
                <Route exact={true} component={SmartCreateQuestion} path="/create-question" />
                <Route exact={true} component={SmartEditQuestion} path="/edit-question/:index" />
                <Route exact={true} component={SmartCreateAnswer} path="/create-answer/:index" />
                <Route exact={true} component={SmartQuestionDetails} path="/view-question/:index" />
            </Switch>
        </HashRouter>
    </div>
);

export default App;

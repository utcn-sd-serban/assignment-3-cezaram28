import React from "react";
import * as tagSelector from "../model/tag/tagSelectors";

const SearchQuestions = ({ user, questions, onCreateQuestion, onViewDetails, addAnswer, onVote, onEdit, onDelete, onLogout }) => (
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="http://localhost:3000/#/questions-list/">
                    <img src="logonew.png" />
                </a>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <a class="navbar-item">
                        {user !== undefined ? user.username : ""}
                    </a>
                    <div class="buttons">
                        <a class="button is-light" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container is-fluid">
            <h2 class="title">Results</h2>

            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Text</th>
                        <th>Score</th>
                        <th>Creation Date</th>
                        <th>Tags</th>
                        <th />
                        <th />
                        <th />
                        <th />
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => (
                            <tr key={index}>
                                <td>{question.title}</td>
                                <td>{question.author.username}</td>
                                <td>{question.text}</td>
                                <td>{question.voteCount}</td>
                                <td>{question.creationDate}</td>
                                <td>{tagSelector.toString(question.tags)}</td>
                                <td><button class="button is-small" onClick={() => onViewDetails(question.id)}>View Details</button></td>
                                <td><button class="button is-small" onClick={() => addAnswer(question.id)}>Add Answer</button></td>
                                <td>{user !== undefined && question.author.id !== user.id ? <button class="button is-small" onClick={() => onVote(question, undefined, "up")}>Upvote</button> : ""}</td>
                                <td>{user !== undefined && question.author.id !== user.id ? <button class="button is-small" onClick={() => onVote(question, undefined, "down")}>Downvote</button> : ""}</td>
                                <td>{user !== undefined && user.isAdmin ? <button class="button is-small" onClick={() => onEdit(question.id)}>Edit</button> : ""}</td>
                                <td>{user !== undefined && user.isAdmin ? <button class="button is-small" onClick={() => onDelete(question.id)}>Delete</button> : ""}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button class="button is-small" onClick={onCreateQuestion}>Add new Question</button>
        </div>
    </div>
);

export default SearchQuestions;
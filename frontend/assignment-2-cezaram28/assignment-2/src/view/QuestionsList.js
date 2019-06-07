import React from "react";
import * as tagSelector from "../model/tag/tagSelectors";
import 'bulma/css/bulma.css';

const QuestionsList = ({ questions, user, tags, title, onSearch, onChange, onCreateQuestion, onViewDetails, onTagClick, addAnswer, onVote, onEdit, onDelete, onLogout, onUsers }) => (
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
                        {user !== undefined ? user.username: ""}
                    </a>
                    <div class="buttons">
                        {user !== undefined && user.isAdmin ? <button data-cy="usersButton" class="button is-light" onClick={onUsers}>Users</button> : ""}
                        <a class="button is-light" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container is-fluid">

            <h2 class="title">Questions</h2>
            <br />
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="text" placeholder="Search by title" value={title} onChange={e => onChange("title", e.target.value)} />

                </div>
                <div class="control">
                    <button class="button" onClick={() => onSearch(title)}>Search</button>
                </div>
            </div>
            <br />
            <div>
                {
                    tags.map((tag) => (
                        <button class="button is-small" onClick={() => onTagClick(tag)}>{tag}</button>
                    ))
                }
            </div>
            <br />
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Text</th>
                        <th>Score</th>
                        <th>Creation Date</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => (
                            <tr key={index} data-cy="question">
                                <td>{question.title}</td>
                                <td>{question.author.username}</td>
                                <td>{question.text}</td>
                                <td>{question.voteCount}</td>
                                <td>{question.creationDate}</td>
                                <td>{tagSelector.toString(question.tags)}</td>
                                <td><button data-cy={"viewDetails" + question.title} class="button is-small" onClick={() => onViewDetails(question.id)}>View Details</button></td>
                                <td><button data-cy={"addAnswer" + question.title} class="button is-small" onClick={() => addAnswer(question.id)}>Add Answer</button></td>
                                <td>{user !== undefined && question.author.id !== user.id ? <button data-cy={"upvote" + question.title} class="button is-small" onClick={() => onVote(question, undefined, "up")}>Upvote</button> : ""}</td>
                                <td>{user !== undefined && question.author.id !== user.id ? <button data-cy={"downvote" + question.title} class="button is-small" onClick={() => onVote(question, undefined, "down")}>Downvote</button> : ""}</td>
                                <td>{user !== undefined && user.isAdmin ? <button data-cy={"edit" + question.title} class="button is-small" onClick={() => onEdit(question.id)}>Edit</button> : ""}</td>
                                <td>{user !== undefined && user.isAdmin ? <button data-cy={"delete" + question.title} class="button is-small" onClick={() => onDelete(question.id)}>Delete</button> : ""}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button data-cy="addQuestion" class="button" onClick={onCreateQuestion}>Add new Question</button>
        </div>
    </div>
);

export default QuestionsList;
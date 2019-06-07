import React from "react";

const QuestionDetails = ({ user, id, title, author, text, creationDate, voteCount, tags, answers, addAnswer, onEdit, onDelete, onVote, onLogout }) => (
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
                        <a data-cy="logout" class="button is-light" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container is-fluid">
            <h2 class="title is-2">{title}</h2>
            <h2 class="title is-4">{text}</h2>
            <label>Author: </label>
            <span>{author}</span>
            <br/>
            <label>Creation Date: </label>
            <span>{creationDate}</span>
            <br/>
            <label>Vote Count: </label>
            <span>{voteCount}</span>
            <br />
            <label>Tags: </label>
            <span>{tags}</span>
            <br />
            <br />
            <h3 class="subtitle is-5">Answers: </h3>
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Text</th>
                        <th>Score</th>
                        <th>Creation Date</th>
                        <th />
                        <th />
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        answers.map((answer, index) => (
                            <tr key={index} data-cy="answer">
                                <td>{answer.author.username}</td>
                                <td>{answer.text}</td>
                                <td>{answer.voteCount}</td>
                                <td>{answer.creationDate}</td>
                                <td>{user !== undefined && (answer.author.id === user.id || user.isAdmin) ? <button data-cy={"edit" + answer.text} class="button is-small" onClick={() => onEdit(answer.id, answer.question.id)}>Edit</button> : ""}</td>
                                <td>{user !== undefined && (answer.author.id === user.id || user.isAdmin) ? <button data-cy={"delete" + answer.text} class="button is-small" onClick={() => onDelete(answer.id)}>Delete</button> : ""}</td>
                                <td>{user !== undefined && answer.author.id !== user.id ? <button data-cy={"upvote" + answer.text} class="button is-small" onClick={() => onVote(undefined, answer, "up")}>Upvote</button> : ""}</td>
                                <td>{user !== undefined && answer.author.id !== user.id ? <button data-cy={"downvote" + answer.text} class="button is-small" onClick={() => onVote(undefined, answer, "down")}>Downvote</button> : ""}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <br />
            <button class="button" onClick={() => addAnswer(id)}>Add Answer</button>
        </div>
    </div>
);

export default QuestionDetails;
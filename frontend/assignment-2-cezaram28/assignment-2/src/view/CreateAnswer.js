import React from "react";

const CreateAnswer = ({ user, text, question, onCreate, onChange, onLogout }) => (
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
            <h2 class="title">Add Answer</h2>
            <div>
                <div class="field">
                    <div class="control">
                        <textarea data-cy="text" value={text} onChange={e => onChange("text", e.target.value)} class="textarea is-primary" type="text" placeholder="Answer Text" />
                    </div>
                </div>
                <br />
                <button data-cy="add" class="button is-primary" onClick={() => onCreate(question)}>Add!</button>
            </div>
        </div>
    </div>
);

export default CreateAnswer;
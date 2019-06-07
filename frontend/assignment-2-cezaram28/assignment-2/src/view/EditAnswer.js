import React from "react";

const EditAnswer = ({ user, text, id, questionId, onEdit, onChange, onLogout }) => (
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
            <h2 class="title">Edit Answer</h2>
            <div>
                <div class="field">
                    <div class="control">
                        <textarea data-cy="text" value={text} onChange={e => onChange("text", e.target.value)} class="textarea is-primary" type="text" placeholder="New Text" />
                    </div>
                </div>
                <br />
                <button data-cy="edit" class="button is-primary" onClick={() => onEdit(id, questionId)}>Edit!</button>
            </div>
        </div>
    </div>
);

export default EditAnswer;
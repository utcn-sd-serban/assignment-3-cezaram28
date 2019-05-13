import React from "react";
import user from "../model/user";

const CreateQuestion = ({ user, title, text, tags, onCreate, onChange, onLogout }) => (
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
            <h2 class="title">Add Question</h2>
            <div>
                <div class="field">
                    <div class="control">
                        <input value={title} onChange={e => onChange("title", e.target.value)} class="input is-primary" type="title" placeholder="Question Title" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <textarea value={text} onChange={e => onChange("text", e.target.value)} class="textarea is-primary" type="text" placeholder="Question Text" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input value={tags} onChange={e => onChange("tags", e.target.value)} class="input is-primary" type="tags" placeholder="Question Tags" />
                    </div>
                </div>
                <br />
                <button class="button is-primary" onClick={() => onCreate()}>Post!</button>
            </div>
        </div>
    </div>
);

export default CreateQuestion;
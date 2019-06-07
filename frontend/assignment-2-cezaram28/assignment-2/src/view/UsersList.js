import React from "react";

const UsersList = ({ user, users, title, onLogout, onBan }) => (
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
            <h2 class="title">{title || "Users"}</h2>
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>username</th>
                        <th>score</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((u, index) => (
                            <tr key={index}>
                                <td>{u.username}</td>
                                <td>{u.score}</td>
                                <td>{user !== undefined && user.id !== -1 ? user.isAdmin ? <button data-cy={"ban" + u.username} class="button is-small" onClick={() => onBan(u.id)}>Ban</button> : "" : ""}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
);

export default UsersList;
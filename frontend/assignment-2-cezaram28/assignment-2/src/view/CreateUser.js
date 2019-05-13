import React from "react";

const CreateUser = ({ username, password, email, onCreate, onChange }) => (
    <div>
        <h2>Add User</h2>
        <div>
            <label>Username: </label>
            <input value={username} onChange={e => onChange("username", e.target.value)} />
            <br />
            <label>Password: </label>
            <input value={password} onChange={e => onChange("password", e.target.value)}/>
            <br />
            <label>Email: </label>
            <input value={email} onChange={e => onChange("email", e.target.value)}/>
            <br />
            <button onClick={onCreate}>Create!</button>
        </div>
    </div>
);

export default CreateUser;
import React from "react";
import 'bulma/css/bulma.css';

const Start = ({ onLogin, onRegister, username, password, onChange }) => (
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src="logonew.png" />
                </a>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-light" onClick={onRegister}>
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <section class="hero is-primary is-fullheight-with-navbar is-bold">

            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-3">
                        Login
                    </h1>
                    
                    <div class="field">
                        
                        <div class="control">
                            <input class="input" type="text" placeholder="Username" value={username} onChange={e => onChange("username", e.target.value)}/>
                        </div>
                        <br/>
                        <div class="control">
                            <input class="input" type="password" placeholder="Password" value={password} onChange={e => onChange("password", e.target.value)} />
                        </div>
  
                    </div>
                    <br/>
                    <div class="buttons">
                        <a class="button is-primary is-inverted" onClick={() => onLogin()}>
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default Start;
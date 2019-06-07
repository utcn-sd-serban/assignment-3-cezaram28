import React from "react";
import 'bulma/css/bulma.css';

const Start = ({onLogin, onRegister }) => (
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
                        <a class="button is-primary" onClick={onLogin}>
                            Login
                        </a>
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
                    <h1 class="title is-1">
                        Smack Overflow
                    </h1>
                    <h2 class="subtitle is-3">
                        Smack the answers out of your questions!
                    </h2>
                </div>
            </div>
        </section>
    </div>
);

export default Start;
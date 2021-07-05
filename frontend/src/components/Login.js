import React, { useState, useContext, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import styles from "./Login.module.css";

import axios from "axios";

import { UserContext } from "../userContext";
import { PrimaryButton, OutlineButton, Input } from "../util/controls";
import { MARGIN_SM, MARGIN_MD } from "../util/constants";

const Login = () => {
    const { setLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [serverValidation, setServerValidation] = useState("");

    useEffect(() => {
        setFormValid(email.length && password.length);
    }, [email, password]);

    const submitLogin = event => {
        // Don't allow the form submission to reload the page.
        event.preventDefault();

        axios
            .post("/api/users/login/", { email: email, password: password })
            .then(res => {
                setLoggedIn(true);
                navigate("/");
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setServerValidation(error.response.data.message);
                } else {
                    throw error;
                }
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Sign In</h1>
                <form onSubmit={submitLogin}>
                    <div>
                        <div style={{ marginBottom: MARGIN_MD }}>
                            <div>
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <Input
                                type="text"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{marginBottom: MARGIN_SM}}>
                            <div>
                                <label htmlFor="password">Password</label>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="formError">{serverValidation}</div>
                        </div>
                    </div>
                    <div className={styles.formFooter}>
                        <PrimaryButton type="submit" disabled={!formValid}>
                            Sign In
                        </PrimaryButton>
                        <OutlineButton className="centered" type="button">
                            <div style={{ marginRight: MARGIN_SM }}>
                                Sign In With
                            </div>
                            <img src="/assets/google.png" />
                        </OutlineButton>
                    </div>
                    <div className={styles.formLinks}>
                        <Link to="/welcome/signup">
                            Don't have an account? Create one here.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

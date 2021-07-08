import React, { useState, useEffect, useContext } from "react";
import { navigate, Link } from "@reach/router";
import styles from "./Signup.module.css";

import axios from "axios";

import { UserContext } from "../userContext";
import { PrimaryButton, OutlineButton, Input } from "../util/controls";
import { COLORS, MARGIN_SM, MARGIN_MD } from "../util/constants";

const Signup = () => {
    const { setLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [serverValidation, setServerValidation] = useState("");

    useEffect(() => {
        setFormValid(
            email.length &&
                password.length >= 8 &&
                password === confirmedPassword
        );
    }, [email, password, confirmedPassword]);

    const submitSignUp = event => {
        // Don't allow the form submission to reload the page.
        event.preventDefault();

        axios
            .post("/api/users/signup/", { email: email, password: password })
            .then(res => {
                setLoggedIn(true);
                navigate("/");
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setServerValidation(error.response.data.message);
                } else {
                    throw error;
                }
            });
    };

    const oAuth2SignUp = () => {
        document.querySelector("#oauth2signupform").submit();
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Create an account</h1>
                <form onSubmit={submitSignUp}>
                    <div>
                        <div>
                            <div>
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <Input
                                type="text"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className="formError">{serverValidation}</div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="password">Password</label>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="formError">
                                {password.length && password.length < 8
                                    ? "Password must be at least 8 characters."
                                    : ""}
                            </div>
                        </div>
                        <div style={{ marginBottom: MARGIN_MD }}>
                            <div>
                                <label htmlFor="confirmedPassword">
                                    Confirm Password
                                </label>
                            </div>
                            <Input
                                type="password"
                                name="confirmedPassword"
                                value={confirmedPassword}
                                onChange={e =>
                                    setConfirmedPassword(e.target.value)
                                }
                            />
                            <div className="formError">
                                {confirmedPassword !== password &&
                                confirmedPassword.length
                                    ? "Passwords do not match."
                                    : ""}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formFooter}>
                        <PrimaryButton type="submit" disabled={!formValid}>
                            Create Account
                        </PrimaryButton>
                        <OutlineButton
                            onClick={oAuth2SignUp}
                            className="centered"
                            type="button"
                        >
                            <div style={{ marginRight: MARGIN_SM }}>
                                Sign Up With
                            </div>
                            <img src="/assets/google.png" />
                        </OutlineButton>
                    </div>
                    <div className={styles.formLinks}>
                        <Link to="/welcome/login">
                            Already have an account? Log in here.
                        </Link>
                    </div>
                </form>
                <form
                    id="oauth2signupform"
                    action="/api/users/oauth2signup/"
                    method="POST"
                ></form>
            </div>
        </div>
    );
};

export default Signup;

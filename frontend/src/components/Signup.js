import React from "react";
import { Link } from "@reach/router";
import styles from "./Login.module.css";

import { PrimaryButton, OutlineButton, Input } from "../util/controls";
import { MARGIN_SM, MARGIN_MD } from "../util/constants";

const Signup = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Create an account</h1>
                <div>
                    <div style={{ marginBottom: MARGIN_MD }}>
                        <div>
                            <label htmlFor="email">Your Email</label>
                            <div></div>
                        </div>
                        <Input type="text" name="email" />
                    </div>
                    <div style={{ marginBottom: MARGIN_MD }}>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div></div>
                        </div>
                        <Input type="password" name="password" />
                    </div>
                    <div style={{ marginBottom: MARGIN_MD }}>
                        <div>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div></div>
                        </div>
                        <Input type="password" name="confirmPassword" />
                    </div>
                </div>
                <div className={styles.formFooter}>
                    <PrimaryButton type="submit">Create Account</PrimaryButton>
                    <OutlineButton className="centered" type="button">
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
            </div>
        </div>
    );
};

export default Signup;

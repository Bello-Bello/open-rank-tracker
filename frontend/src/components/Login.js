import React from "react";
import { Link } from "@reach/router";
import styles from "./Login.module.css";

import { PrimaryButton, OutlineButton, Input } from "../util/controls";
import { MARGIN_SM, MARGIN_MD } from "../util/constants";

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Sign In</h1>
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
                </div>
                <div className={styles.formFooter}>
                    <PrimaryButton type="submit">Sign In</PrimaryButton>
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
            </div>
        </div>
    );
};

export default Login;

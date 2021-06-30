import React from "react";
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div className={styles.container}>
            <div>
                <h1>Sign In</h1> 
                <div>
                    <div>
                        <label for="email">Your Email</label>
                        <div></div>
                    </div>
                    <input type="text" name="email"/>
                </div>
            </div>
        </div>
    );
}

export default Login;

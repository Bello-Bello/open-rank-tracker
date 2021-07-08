import React from "react";
import { Router, navigate } from "@reach/router";

import styles from "./Splash.module.css";

import Activate from "../components/Activate";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Splash = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sideContainer}>
                <h1 onClick={() => navigate("/")}>OpenRankTracker</h1>
                <div className={styles.tagline}>
                    <div>
                        <h2>Open Source Rank Tracker</h2>
                        <p>Track your Google search rankings using your own proxies.  Free, open source, and self-hosted.</p>
                    </div>
                </div>
            </div>
            <div className={styles.routeContainer}>
                <Router style={{ height: "100%" }}>
                    <Activate path="activate"/>
                    <Signup path="signup"/>
                    <Login path="login"/>
                </Router>
            </div>
        </div>
    );
}

export default Splash;

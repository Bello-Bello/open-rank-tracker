import React from "react";
import { Router, navigate } from "@reach/router";
import styled from "styled-components";

import { COLORS, PAD_SM, PAD_MD, PAD_XS } from "../util/constants";
import Login from "../components/Login";
import styles from "./Splash.module.css";

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
                    <Login path="login"/>
                </Router>
            </div>
        </div>
    );
}

export default Splash;

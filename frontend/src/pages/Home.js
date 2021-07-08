import React from "react";
import { Router, navigate } from "@reach/router";

import Sidebar from "../components/Sidebar";
import ProxyList from "../components/ProxyList";
import DomainList from "../components/DomainList";

import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebarContainer}>
                <Sidebar/>
            </div>
            <Router className={styles.routeContainer}>
                <ProxyList path="proxies"/>
                <DomainList path="domains"/>
            </Router>
        </div>
    );
}

export default Home;

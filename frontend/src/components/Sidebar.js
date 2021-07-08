import React from "react";
import { Link } from "@reach/router";
import styles from "./Sidebar.module.css";

import { Button } from "../util/controls";

const Sidebar = () => {
    const isActive = ({ isPartiallyCurrent }) => {
        return isPartiallyCurrent ? { className: styles.active } : {};
    };

    const NavLink = (props) => <Link getProps={isActive} {...props} />;

    return (
        <div className={styles.container}>
            <h1 onClick={() => navigate("/")}>OpenRankTracker</h1>
            <div className={styles.navItems}>
                <NavLink to="/proxies">
                    <Button className={styles.navItem}>
                        <div>
                            <img src="/assets/proxies.png"/>
                        </div>
                        <div>Proxies</div>
                    </Button> 
                </NavLink>

                <NavLink to="/domains">
                    <Button className={styles.navItem}>
                        <div>
                            <img src="/assets/domains.png"/>
                        </div>
                        <div>Domains</div>
                    </Button> 
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;

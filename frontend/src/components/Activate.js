import React, { useState, useContext, useEffect } from "react";
import queryString from "querystring";

import styles from "./Activate.module.css";
import { api } from "../api";

const Activate = () => {
    const [activating, setActivating] = useState(true);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const queryParams = queryString.parse(location.search.slice(1));
        api.post("/users/activate/", {
            user_uuid: queryParams.user_uuid
        })
            .then(() => {
                setActivating(false);
                setActivated(true);
            })
            .catch(err => setActivating(false));
    }, []);

    const success = () => (
        <div>
            <h1>Account Activated</h1>
            <div>
                <p>
                    Congratulations, your account is active and you now have
                    access to all features!
                </p>
            </div>
        </div>
    );

    const failed = () => (
        <div>
            <h1>Activation Failed</h1>
            <div>
                <p>
                    We're sorry, but we couldn't find a user associated with
                    this activation code.
                </p>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div>
                {activating && <h1>Activating account, one moment...</h1>}
                {!activating && activated && success()}
                {!activating && !activated && failed()}
            </div>
        </div>
    );
};

export default Activate;

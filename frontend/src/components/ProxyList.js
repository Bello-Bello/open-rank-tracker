import React, { useState, useEffect } from "react";

import { api } from "../api";
import { MARGIN_SM, MARGIN_MD, PAD_SM, PAD_MD } from "../util/constants";
import { PrimaryButton } from "../util/controls";

import ProxyConnection from "./ProxyConnection";
import ProxyPopup from "./ProxyPopup";
import styles from "./ProxyList.module.css";

const ProxyList = () => {
    const [showProxyPopup, setShowProxyPopup] = useState(false);
    const [proxies, setProxies] = useState([]);

    const addProxyServer = () => {
        setShowProxyPopup(true);
    };

    const refreshProxies = () => {
        api.get("/proxies/").then(res => {
            setProxies(res.data);
        });
    };

    const deleteProxy = deletedProxy => {
        api.delete(`/proxies/${deletedProxy.id}/`).then(() => {
            setProxies(proxies.filter(proxy => proxy.id !== deletedProxy.id));
        });
    };

    useEffect(() => {
        refreshProxies();
    }, []);

    const NoProxies = () => (
        <div className={styles.noProxiesContainer}>
            <div style={{ marginBottom: MARGIN_MD }}>
                You don't have any proxy servers yet. Click the button below to
                configure a proxy server.
            </div>
            <PrimaryButton
                style={{ padding: `${PAD_SM} ${PAD_MD}` }}
                onClick={addProxyServer}
            >
                Add Proxy Server
            </PrimaryButton>
        </div>
    );

    const ListView = () => (
        <div className={styles.container}>
            <div className={styles.buttonRow}>
                <PrimaryButton
                    style={{ padding: PAD_SM, marginLeft: "auto" }}
                    onClick={addProxyServer}
                >
                    Add Proxy Server
                </PrimaryButton>
            </div>
            <div className={styles.proxyList}>
                {proxies.map(proxy => (
                    <div key={proxy.id} className={styles.proxyContainer}>
                        <ProxyConnection proxy={proxy} onDelete={deleteProxy} />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <ProxyPopup
                shown={showProxyPopup}
                onClose={submitted => {
                    setShowProxyPopup(false);
                    if (submitted) {
                        refreshProxies();
                    }
                }}
            />
            {proxies.length ? ListView() : NoProxies()};
        </>
    );
};

export default ProxyList;

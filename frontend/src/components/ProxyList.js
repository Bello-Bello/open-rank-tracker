import React, { useState } from "react";
import { MARGIN_MD, PAD_SM, PAD_MD } from "../util/constants";
import { PrimaryButton } from "../util/controls";
import ProxyPopup from "./ProxyPopup";
import styles from "./ProxyList.module.css";

const ProxyList = () => {
    const [showProxyPopup, setShowProxyPopup] = useState(false);

    const addProxyServer = () => {
        setShowProxyPopup(true);
    };

    const NoProxies = () => (
        <div className={styles.noProxiesContainer}>
            <ProxyPopup shown={showProxyPopup} onClose={() => setShowProxyPopup(false)}/>
            <div style={{marginBottom: MARGIN_MD}}>
                You don't have any proxy servers yet.  Click the button below to
                configure a proxy server.
            </div>
            <PrimaryButton style={{ padding: `${PAD_SM} ${PAD_MD}` }} onClick={addProxyServer}>
                Add Proxy Server
            </PrimaryButton>
        </div>
    );

    return NoProxies();
};

export default ProxyList;

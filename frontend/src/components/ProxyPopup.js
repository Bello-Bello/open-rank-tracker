import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import { MARGIN_SM } from "../util/constants";
import { PrimaryButton, Input } from "../util/controls";
import styles from "./ProxyPopup.module.css";

const ProxyPopup = ({ shown, onClose }) => {
    const [_shown, setShown] = useState(false);

    useEffect(() => {
        setShown(shown);
    }, [shown]);

    const close = () => {
        setShown(false);
        onClose();
    };

    return (
        <Popup shown={_shown}>
            <div className={styles.container}>
                <div className="closeOut" onClick={close}>
                    <img src="/assets/close.png" />
                </div>
                <div>
                    <p>Set up a new proxy connection.</p>
                </div>
                <div className="formGroup">
                    <label class="formLabel">Proxy URL</label>
                    <Input style={{ width: "100%" }} />
                </div>
                <div className="formGroup">
                    <label class="formLabel">Proxy Username</label>
                    <Input style={{ width: "100%" }} />
                </div>
                <div className="formGroup">
                    <label class="formLabel">Proxy Password</label>
                    <Input type="password" style={{ width: "100%" }} />
                </div>
                <div className="formGroup formColumns">
                    <div style={{ marginRight: MARGIN_SM }}>
                        <label class="formLabel">Wait Time</label>
                        <Input type="number" style={{ width: "100%" }} />
                    </div>
                    <div>
                        <label class="formLabel">Random Delay</label>
                        <Input type="number" style={{ width: "100%" }} />
                    </div>
                </div>
                <div>
                    <PrimaryButton style={{ width: "100%" }}>
                        Create Proxy
                    </PrimaryButton>
                </div>
            </div>
        </Popup>
    );
};

export default ProxyPopup;

import React, { useState, useEffect } from "react";
import Popup from "./Popup";
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
            </div>
        </Popup>
    );
};

export default ProxyPopup;

import React from "react";
import styles from "./ProxyConnection.module.css";
import DonutChart from "./DonutChart";
import { Button } from "../util/controls";
import { MARGIN_LG, MARGIN_MD } from "../util/constants";

const ProxyConnection = ({ proxy, onDelete }) => {
    return (
        <div className={styles.container}>
            <div style={{ display: "flex" }}>
                <Button
                    onClick={() => onDelete(proxy)}
                    style={{ marginLeft: "auto" }}
                >
                    <img src="/assets/delete.png" />
                </Button>
            </div>
            <div style={{ marginBottom: MARGIN_LG }}>
                <DonutChart
                    category={{
                        POSITIVE: proxy.success_count,
                        NEUTRAL: proxy.no_result_count,
                        NEGATIVE: proxy.block_count
                    }}
                />
            </div>
            <div style={{ display: "flex", marginBottom: MARGIN_MD }}>
                <div className={styles.valueGroup}>
                    <div>Proxy URL</div>
                    <div>{proxy.proxy_url}</div>
                </div>
                <div className={styles.valueGroup}>
                    <div>Username</div>
                    <div>{proxy.username}</div>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div className={styles.valueGroup}>
                    <div>Wait Time</div>
                    <div>{proxy.min_wait_time}</div>
                </div>
                <div className={styles.valueGroup}>
                    <div>Random Delay</div>
                    <div>{proxy.random_delay}</div>
                </div>
            </div>
        </div>
    );
};

export default ProxyConnection;

import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Popup from "./Popup";
import { COLORS, MARGIN_SM } from "../util/constants";
import { PrimaryButton, Input } from "../util/controls";
import styles from "./ProxyPopup.module.css";

const defaultProxy = {
    url: "",
    username: "",
    password: "",
    min_wait_time: 60,
    random_delay: 10
};

const proxySchema = Yup.object().shape({
    url: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    min_wait_time: Yup.number()
        .positive()
        .integer()
        .required(),
    random_delay: Yup.number()
        .positive()
        .integer()
        .required()
});

const ProxyPopup = ({ shown, onClose }) => {
    const [_shown, setShown] = useState(false);

    useEffect(() => {
        setShown(shown);
    }, [shown]);

    const onSubmit = event => {
        close();
    };

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
                <Formik
                    initialValues={defaultProxy}
                    onSubmit={onSubmit}
                    validationSchema={proxySchema}
                    validateOnMount
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label className="formLabel">Proxy URL</label>
                                <Input
                                    name="url"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.url}
                                    border={
                                        touched.url &&
                                        errors.url &&
                                        `1px solid ${COLORS.primary3}`
                                    }
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="formGroup">
                                <label className="formLabel">
                                    Proxy Username
                                </label>
                                <Input
                                    name="username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    border={
                                        touched.username &&
                                        errors.username &&
                                        `1px solid ${COLORS.primary3}`
                                    }
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="formGroup">
                                <label className="formLabel">
                                    Proxy Password
                                </label>
                                <Input
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    border={
                                        touched.password &&
                                        errors.password &&
                                        `1px solid ${COLORS.primary3}`
                                    }
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="formGroup formColumns">
                                <div style={{ marginRight: MARGIN_SM }}>
                                    <label className="formLabel">
                                        Wait Time
                                    </label>
                                    <Input
                                        name="min_wait_time"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.min_wait_time}
                                        border={
                                            touched.min_wait_time &&
                                            errors.min_wait_time &&
                                            `1px solid ${COLORS.primary3}`
                                        }
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                <div>
                                    <label className="formLabel">
                                        Random Delay
                                    </label>
                                    <Input
                                        name="random_delay"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.random_delay}
                                        border={
                                            touched.random_delay &&
                                            errors.random_delay &&
                                            `1px solid ${COLORS.primary3}`
                                        }
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <PrimaryButton
                                    type="submit"
                                    style={{ width: "100%" }}
                                    disabled={!isValid}
                                >
                                    Create Proxy
                                </PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Popup>
    );
};

export default ProxyPopup;

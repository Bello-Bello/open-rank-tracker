import React, { Fragment } from "react";
import ReactDOM, { createPortal } from "react-dom";

const Popup = props => {
    const content = (
        <Fragment>
            <div
                className="overlay"
                style={{ display: props.shown ? "block" : "none" }}
            ></div>
            <div
                className="popup"
                style={{ display: props.shown ? "block" : "none" }}
            >
                {props.children}
            </div>
        </Fragment>
    );

    return createPortal(content, document.querySelector("#root"));
};

export default Popup;

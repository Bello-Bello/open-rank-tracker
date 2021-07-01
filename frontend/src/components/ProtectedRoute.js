import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from "../userContext";

const ProtectedRoute = ({ component: Component }) => {
    const { loggedIn } = useContext(UserContext);

    return loggedIn ? (
        <Component />
    ) : (
        <Redirect from="" to="welcome/login" noThrow />
    );
};

export default ProtectedRoute;

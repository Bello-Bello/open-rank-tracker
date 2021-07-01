import React, { useState, useEffect } from "react";
import { Router, Redirect, navigate } from "@reach/router";

import "../style.css";
import { getUser } from "./auth";
import { UserContext } from "./userContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Splash from "./pages/Splash";

const App = () => {
    const [loadingApp, setLoadingApp] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(!!getUser());
        setLoadingApp(false);
    }, []);

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {!loadingApp && (
                <Router style={{ minHeight: "100vh" }}>
                    <Splash path="/welcome/*" />
                    <ProtectedRoute path="/*" component={Home} />
                </Router>
            )}
        </UserContext.Provider>
    );
};

export default App;

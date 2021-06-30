import React from "react";
import { Router, navigate } from "@reach/router";

import Splash from "./pages/Splash";
import "../style.css";

const App = () => {
    return (
        <Router style={{ minHeight: "100vh" }}>
            <Splash path="/welcome/*"/>
        </Router>
    )
}

export default App;

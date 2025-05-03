import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="309272193343-8fc0sj1vi1dgml3qq0uj2rl83p0nppht.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

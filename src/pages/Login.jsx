import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("Bansi@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    console.log("Auth state changed. isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Attempting navigation to /app/cities");
      navigate("/app/cities", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded);

      // Call login and wait for a small delay to ensure state updates
      login(decoded.email, "google-oauth");

      // Add a small delay to ensure state is updated
      setTimeout(() => {
        console.log("Checking auth state after delay:", isAuthenticated);
        if (!isAuthenticated) {
          console.log("Forcing navigation after Google login");
          navigate("/app/cities", { replace: true });
        }
      }, 500);
    } catch (error) {
      console.error("Google token decode failed:", error);
    }
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.loginContainer}>
        <h3>
          If you really want to use this, try logging in with your own Google
          account. If you'd like to just give it a quick shot to check the
          functionality, feel free to use the fake login form, which will log
          you in directly.
        </h3>
        <div className={styles.google}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Login Failed")}
            useOneTap
            theme="filled_black"
            shape="pill"
            size="large"
            text="continue_with"
          />
        </div>

        <div className={styles.or}>or</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <Button type="primary">Login</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext.jsx";

/** Form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login({ username, password });
      navigate("/activities");
    } catch (error) {
      setError(
        error.response?.data?.message ??
          error.response?.data?.error ??
          error.message ??
          "Unable to log in.",
      );
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>

      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Login</button>

        {error && <p role="alert">{error}</p>}
      </form>

      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}

//Now Link replaces clickable anchors that manually changed context state. 
// It performs client-side navigation without treating the click as a normal page reload.
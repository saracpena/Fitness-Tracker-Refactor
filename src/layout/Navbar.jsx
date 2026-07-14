import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/activities");
  };

  return (
    <header>
      <p>Fitness Trackr</p>

      <nav>
        <NavLink to="/activities">Activities</NavLink>

        {token ? (
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

//NavLink is appropriate for the navbar because it provides an active state. 
// useNavigate handles programmatic navigation after log
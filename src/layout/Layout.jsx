import { Outlet } from "react-router";

import Navbar from "./Navbar.jsx";

/** Shared layout displayed around every page. */
export default function Layout() {
  return (
    <>
      <Navbar />

      <main>
        {/* The matched child route renders inside Outlet. */}
        <Outlet />
      </main>
    </>
  );
}

///activities → ActivitiesPage appears in Outlet
//login      → Login appears in Outlet
//register   → Register appears in Outlet
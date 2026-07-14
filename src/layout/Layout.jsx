import { Outlet } from "react-router";

import Navbar from "./Navbar.jsx";

/** Shared layout for every page in the application. */
export default function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

///activities → ActivitiesPage appears in Outlet
//login      → Login appears in Outlet
//register   → Register appears in Outlet
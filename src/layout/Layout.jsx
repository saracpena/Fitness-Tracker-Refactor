import { Outlet } from "react-router";
import Navbar from "./Navbar";

/** The shared layout for all pages of the app */
export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

///activities → ActivitiesPage appears in Outlet
//login      → Login appears in Outlet
//register   → Register appears in Outlet
import { Navigate, Route, Routes } from "react-router";

import Layout from "./layout/Layout.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import ActivitiesPage from "./activities/ActivitiesPage.jsx";
import Error404 from "./Error404.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their
 * workouts and discover new routines.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/activities" replace />} />

        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
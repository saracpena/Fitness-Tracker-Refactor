import { Navigate, Route, Routes } from "react-router";

import ActivitiesPage from "./activities/ActivitiesPage.jsx";
import ActivityDetailsPage from "./activities/ActivityDetailsPage.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Error404 from "./Error404.jsx";
import Layout from "./layout/Layout.jsx";

/**
 * Fitness Trackr allows users to browse activities and manage
 * activities after creating an account.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<Navigate to="/activities" replace />}
        />

        <Route path="activities" element={<ActivitiesPage />} />

        {/* The activity ID is available through useParams. */}
        <Route
          path="activities/:activityId"
          element={<ActivityDetailsPage />}
        />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
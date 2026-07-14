import { useEffect, useState } from "react";

import { getActivities } from "../api/activities.js";
import ActivityForm from "./ActivityForm.jsx";
import ActivityList from "./ActivityList.jsx";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const syncActivities = async () => {
    try {
      setError(null);

      const data = await getActivities();

      // getActivities should always return an array.
      setActivities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setActivities([]);
      setError("Unable to load activities.");
    }
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>

      {error && <p role="alert">{error}</p>}

      <ActivityList activities={activities} />

      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
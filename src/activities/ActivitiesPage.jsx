import { useEffect, useState } from "react";

import { getActivities } from "../api/activities.js";
import ActivityForm from "./ActivityForm.jsx";
import ActivityList from "./ActivityList.jsx";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>

      <ActivityList activities={activities} />

      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
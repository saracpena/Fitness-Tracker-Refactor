import { Link } from "react-router";

export default function ActivityList({ activities }) {
  const activityList = Array.isArray(activities) ? activities : [];

  return (
    <ul>
      {activityList.map((activity) => (
        <li key={activity.id}>
          <Link to={`/activities/${activity.id}`}>
            {activity.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
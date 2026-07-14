import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import {
  deleteActivity,
  getActivity,
} from "../api/activities.js";
import { useAuth } from "../auth/AuthContext.jsx";

export default function ActivityDetailsPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncActivity = async () => {
      setError(null);

      try {
        // activityId comes from the dynamic route segment.
        const data = await getActivity(activityId);
        setActivity(data);
      } catch (error) {
        setError(
          error.response?.data?.message ??
            error.message ??
            "Unable to load activity.",
        );
      }
    };

    syncActivity();
  }, [activityId]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activityId);

      // Return to the list after the activity is deleted.
      navigate("/activities");
    } catch (error) {
      setError(
        error.response?.data?.message ??
          error.message ??
          "Unable to delete activity.",
      );
    }
  };

  if (error && !activity) {
    return (
      <>
        <p role="alert">{error}</p>
        <Link to="/activities">Back to activities</Link>
      </>
    );
  }

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <>
      <h1>{activity.name}</h1>

      <p>{activity.description}</p>

      <p>
        Created by:{" "}
        {activity.creatorName ??
          activity.creator?.username ??
          "Unknown"}
      </p>

      {token && (
        <button type="button" onClick={tryDelete}>
          Delete
        </button>
      )}

      {error && <p role="alert">{error}</p>}

      <p>
        <Link to="/activities">Back to activities</Link>
      </p>
    </>
  );
}
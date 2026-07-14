import axios from "axios";

const API = "https://fitnesstrac-kr.herokuapp.com/api";

/** Fetches all activities and always returns an array. */
export async function getActivities() {
  try {
    const response = await axios.get(`${API}/activities`);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Unable to fetch activities:", error);
    return [];
  }
}

/** Fetches one activity using its ID. */
export async function getActivity(id) {
  const response = await axios.get(`${API}/activities/${id}`);

  return response.data.activity ?? response.data;
}

/** Creates a new activity. */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await axios.post(
    `${API}/activities`,
    activity,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

/** Deletes an activity created by the logged-in user. */
export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  await axios.delete(`${API}/activities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
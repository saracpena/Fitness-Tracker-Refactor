import axios from "axios";

const API = import.meta.env.VITE_API;

/** Fetches all activities from the API. */
export async function getActivities() {
  try {
    const response = await axios.get(`${API}/activities`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/** Fetches one activity using the ID from the URL. */
export async function getActivity(id) {
  const response = await axios.get(`${API}/activities/${id}`);
  return response.data;
}

/**
 * Sends a new activity to the API.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await axios.post(`${API}/activities`, activity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

/**
 * Deletes one activity.
 * Axios can handle a successful empty response without calling response.json().
 */
export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await axios.delete(`${API}/activities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
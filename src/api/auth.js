import axios from "axios";

const API = import.meta.env.VITE_API;

/** Registers a new user and returns the API response data. */
export async function registerUser(credentials) {
  const response = await axios.post(`${API}/users/register`, credentials);
  return response.data;
}

/** Logs in an existing user and returns the API response data. */
export async function loginUser(credentials) {
  const response = await axios.post(`${API}/users/login`, credentials);
  return response.data;
}

/** Gets the currently logged-in user. */
export async function getCurrentUser(token) {
  const response = await axios.get(`${API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
import axios from "axios";

const API_URL = "https://fitnesstrac-kr.herokuapp.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error.response?.data?.message ??
    error.response?.data?.error ??
    error.message ??
    fallback
  );
}

export default api;
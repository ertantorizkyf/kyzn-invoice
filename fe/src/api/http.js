import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
const apiKey = import.meta.env.VITE_API_KEY;

// Warn if API key is not configured
if (!apiKey) {
  console.warn("⚠️ VITE_API_KEY is not configured. API calls may fail with authentication errors.");
}

export const http = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
  },
});

export default http;



import axios from "axios";
const backendDomain = import.meta.env.VITE_APP_BACKEND_URL; //"http://localhost:9000/api";

const apiInstance = axios.create({
  baseURL: backendDomain,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiInstance;
// 2:21 timing

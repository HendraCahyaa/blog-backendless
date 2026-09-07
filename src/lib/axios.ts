import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://comicroad-us.backendless.app/api",
});

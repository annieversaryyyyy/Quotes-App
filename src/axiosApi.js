import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://quotes-app-45097-default-rtdb.europe-west1.firebasedatabase.app/",
});
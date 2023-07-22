import axios, { AxiosInstance, AxiosResponse } from "axios";
import { api } from "../../constant/constant";
import { APIResponse } from "../../types";

const getToken = () => {
  return localStorage.getItem("token");
};

const client: AxiosInstance = axios.create({
  baseURL: api.baseUrl,
  headers: {
    Authorization: "Bearer " + getToken(),
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

client.interceptors.response.use(
  (response: AxiosResponse) => {
    //  console.log(response);
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(response);
    }
    return response.data;
  },
  async (error) => {
    console.log("RES", error);
    if (error.response) {
      return error.response.data;
    } else {
      return Promise.reject(error);
    }
  }
);

export default client;

import axios, { AxiosInstance } from "axios";
import store from '../store'

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: {
    "Content-type": "application/json",
  },
});

 // We set an interceptor for each request to
  // include token to the request if user is logged in
  apiClient.interceptors.request.use((config) => {
    const isLoading  = store.getters.isLoggedIn
    if (isLoading) {
      config.headers = {
        ...config.headers,
        Authorization: `${store.state.token}`
      }
    }

    config.headers = {
      ...config.headers,
    }
    return config
  })
export default apiClient;
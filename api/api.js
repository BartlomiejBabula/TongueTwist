import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppURL = "http://tonguetwist.pl/api";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://tonguetwist.pl/api";

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

setAuthHeader(AsyncStorage.getItem("access"));

const destroyToken = () => {
  AsyncStorage.removeItem("access");
};

function createAxiosResponseInterceptor() {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
      axiosInstance.interceptors.response.eject(interceptor);
      const accessToken = await AsyncStorage.getItem("access");
      setAuthHeader(accessToken);
      return axiosInstance
        .get("/users/profile")
        .then((response) => {
          error.response.config.headers["Authorization"] =
            "Bearer " + accessToken;
          return axiosInstance(error.response.config);
        })
        .catch((error) => {
          destroyToken();
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
}
createAxiosResponseInterceptor();

export default axiosInstance;

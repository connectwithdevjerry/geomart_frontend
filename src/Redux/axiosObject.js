import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  // withCredentials: true,
});

customFetch.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshBothTokens = async () => {
  const token = localStorage.getItem("refreshToken");

  try {
    const resp = await customFetch.post("user/refresh_token", {
      refreshToken: token,
    });

    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};

customFetch.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response?.status == 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshBothTokens();

      const access_token = resp.response.accessToken;
      const refresh_token = resp.response.refreshToken;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      customFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return customFetch(originalRequest);
    }
    if (error.response?.status == 401) {
      console.log("refresh expired...");

      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default customFetch;

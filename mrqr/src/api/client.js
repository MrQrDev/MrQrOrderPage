// import axios from "axios";

// export const apiInstance = axios.create({
//   baseURL: BASE_URL,
// });
// apiInstance.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("access_token");
//   if (token) {
//     console.log(`token : ${token}`);
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// apiInstance.interceptors.response.use(
//   (response) => {
//     if (response.status === 404) {
//       console.log("404 error");
//     }
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       const refresh_token = sessionStorage.getItem("refresh_token");
//       try {
//         const { data } = await axios.post(`${BASE_URL}/user/jwt/refresh`, {
//           refresh_token: refresh_token,
//         });
//         sessionStorage.setItem("access_token", data.access_token);
//         error.config.headers["Authorization"] = `Bearer ${data.access_token}`;
//         return apiInstance.request(error.config);
//       } catch (refreshError) {
//         // 사용자 로그아웃 또는 에러 처리 필요함
//       }
//     }
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import { BASE_URL } from ".";
import { getCookie, setCookie } from "./cookie";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use((config) => {
  const token = getCookie("access_token");
  if (token) {
    console.log(`token : ${token}`);
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 error");
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refresh_token = getCookie("refresh_token");
      try {
        const { data } = await axios.post(`${BASE_URL}/user/jwt/refresh`, {
          refresh_token: refresh_token,
        });
        setCookie("access_token", data.access_token, {
          path: "/",
          secure: true,
          sameSite: "lax",
        });
        error.config.headers["Authorization"] = `Bearer ${data.access_token}`;
        return apiInstance.request(error.config);
      } catch (refreshError) {
        // 사용자 로그아웃 또는 에러 처리 필요함
      }
    }
    return Promise.reject(error);
  }
);

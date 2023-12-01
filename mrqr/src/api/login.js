import axios from "axios";
import { BASE_URL } from ".";
import { useCookies } from "react-cookie";
import { setCookie } from "./cookie";

export async function signUp(userInfo) {
  try {
    const { email, password, name, phone_cert_id } = userInfo;
    const response = await axios.put(`${BASE_URL}/biz/user`, {
      email,
      password,
      name,
      phone_cert_id,
    });
    console.log("SignUp Success:", response.data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "SignUp Axios Error:",
        error.response?.data || error.message
      );
    } else {
      console.error("SignUp Error:", error);
    }

    console.log("Error details:", error, userInfo);
    return false;
  }
}

export async function getLogin(userInfo) {
  try {
    const response = await axios.post(`${BASE_URL}/biz/user/`, {
      email: userInfo.email,
      password: userInfo.password,
    });

    if (
      response.status === 200 &&
      response.data &&
      "access_token" in response.data
    ) {
      console.log("Login Success:", response.data);
      setCookie("access_token", response.data.access_token, {
        path: "/",
        secure: true,
        sameSite: "lax",
      });
      setCookie("refresh_token", response.data.refresh_token, {
        path: "/",
        secure: true,
        sameSite: "lax",
      });
      return true;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login Error:", error.response.data);
    } else {
      console.error("Login Error:", error);
    }
    return false;
  }
}

export async function getRefresh() {
  try {
    const response = await axios.post(`${BASE_URL}/user/refresh`, {
      params: {
        refresh_token: localStorage.getItem("refresh_token"),
      },
    });

    if (response.status === 200 && response.data) {
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Refresh Success:");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Refresh Error:", error);
    return false;
  }
}

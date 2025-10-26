import { CredentialResponse } from "@react-oauth/google";
import { http } from "../Api/HttpClient";

export const AuthService = {
  loginWithGoogle: async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential)
      throw new Error("No credential provided");

    const { data } = await http.post(
      "http://localhost:5000/api/Auth/google-login",
      {
        token: credentialResponse.credential,
      }
    );

    if (data.token) sessionStorage.setItem("authToken", data.token);
    sessionStorage.setItem("userData", JSON.stringify(data));

    return data;
  },

  getToken: () => sessionStorage.getItem("authToken"),

  logout: () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
  },
};

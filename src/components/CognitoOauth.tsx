// pages/Callback.tsx
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const CognitoOauth: React.FC = () => {
  const nav = useNavigate();
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const TOKEN_URI = import.meta.env.VITE_TOKEN_URI;

  const fetchToken = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const verifier = localStorage.getItem("pkce_verifier");

    if (!code || !verifier) {
      console.error("Missing code or verifier");
      return;
    }
    const data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("client_id", CLIENT_ID);
    data.append("code", code);
    data.append("redirect_uri", REDIRECT_URI);
    data.append("code_verifier", verifier);

    try {
      const response = await axios.post(`${TOKEN_URI}/oauth2/token`, data, {
        headers: {
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status == 200) {
        const decoded = jwtDecode(response.data.access_token) as JwtPayload & {
          email: string;
        };
        localStorage.setItem("email", decoded.email);
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("id_token", response.data.id_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        nav("/main");
      }
    } catch (error) {
      console.error("실패", error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return <div>로그인 중입니다...</div>;
};

export default CognitoOauth;

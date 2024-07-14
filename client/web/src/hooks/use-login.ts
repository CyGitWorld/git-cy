"use client";

import { useEffect, useState } from "react";

import { localStorage } from "@/common/local-storage";

export const useUser = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLogin(checkIsLogin());
  }, []);

  const login = ({
    authToken,
    username,
  }: {
    authToken: string;
    username: string;
  }) => {
    localStorage.setItem("auth-token", authToken);
    localStorage.setItem("username", username);

    setIsLogin(true);
  };

  const checkIsLogin = () => {
    return localStorage.getItem("auth-token") != null;
  };

  return {
    isLogin,
    username: localStorage.getItem("username"),
    login,
  };
};

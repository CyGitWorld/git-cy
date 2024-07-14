import { localStorage } from "@/common/local-storage";

export function saveLoginInfo({
  authToken,
  username,
}: {
  authToken: string;
  username: string;
}) {
  localStorage.setItem("auth-token", authToken);
  localStorage.setItem("username", username);
}

export function checkLogin() {
  return localStorage.getItem("auth-token") != null;
}

export function getUsername() {
  return localStorage.getItem("username");
}

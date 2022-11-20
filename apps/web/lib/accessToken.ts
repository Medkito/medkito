import { parseCookies, setCookie } from "nookies";

export const setAccessToken = (s: string) => {
  setCookie(null, "token", s, {});
};

export const getAccessToken = () => {
  const { token } = parseCookies();
  return token;
};

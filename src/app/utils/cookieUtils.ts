import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = async (name: string) => {
  return await cookies.get(name);
};

export const setCookie = (name: string, value: string) => {
  cookies.set(name, value, { path: "/" });
};

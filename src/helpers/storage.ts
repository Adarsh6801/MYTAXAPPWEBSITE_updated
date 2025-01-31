import {
  LANDING_USER_TYPE,
  REDIRECTION_URL,
  USER_TOKEN,
} from "../constants/storage";
import { LandingUserType } from "../global/index.type";

export const getUserToken = () => {
  return localStorage.getItem(USER_TOKEN) || "";
};

export const setUserToken = (token: string) => {
  localStorage.setItem(USER_TOKEN, token);
};

export const removeUserToken = () => {
  localStorage.removeItem(USER_TOKEN);
};

export const clearStorages = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const getUrlForRedirection = () => {
  return sessionStorage.getItem(REDIRECTION_URL);
};

export const setUrlForRedirection = (url: string) => {
  sessionStorage.setItem(REDIRECTION_URL, url);
};

export const removeUrlForRedirection = () => {
  sessionStorage.removeItem(REDIRECTION_URL);
};

export const getLandingUserType = (): LandingUserType | null => {
  return sessionStorage.getItem(LANDING_USER_TYPE) as LandingUserType | null;
};

export const setLandingUserType = (userType: LandingUserType) => {
  sessionStorage.setItem(LANDING_USER_TYPE, userType);
};

export const removeLandingUserType = () => {
  sessionStorage.removeItem(LANDING_USER_TYPE);
};

import jwtDecode, { JwtPayload } from "jwt-decode";

export const isTokenValid = (token: string) => {
  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode<JwtPayload>(token);
  const expiration = decodedToken.exp || 0;
  const currentDate = new Date();

  if (expiration < +currentDate / 1000) {
    return false;
  }

  return true;
};

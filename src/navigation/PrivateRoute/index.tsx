import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { INITIAL_PAGE } from "../../constants/routes";
import { setUrlForRedirection } from "../../helpers/storage";

import { isTokenValid } from "../../helpers/validate";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { IPrivateRouteProps } from "./index.props";

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const isValidToken = isTokenValid(token || "");

  if (!isValidToken) {
    setUrlForRedirection(location.pathname + location.search);
    dispatch(logout(INITIAL_PAGE));
    return null;
  }

  return props.children;
};

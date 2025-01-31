import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Result } from "antd";

import Button from "../../components/Button";
import {
  EXPERT_REQUESTS,
  INITIAL_PAGE,
  TAXPAYER_QUOTES,
} from "../../constants/routes";
import { USER_ROLES } from "../../constants/users";
import { useAppSelector } from "../../redux/hooks";

import styles from "./index.module.css";

const NotFound = () => {
  const { t } = useTranslation();
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);

  const getLink = () => {
    if (!token) {
      return INITIAL_PAGE;
    }

    return user?.roleId === USER_ROLES.Taxpayer
      ? TAXPAYER_QUOTES
      : EXPERT_REQUESTS;
  };

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle={t("not_found.text")}
        extra={
          <Link to={getLink()}>
            <Button type="primary" text={t("not_found.button")} />
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;

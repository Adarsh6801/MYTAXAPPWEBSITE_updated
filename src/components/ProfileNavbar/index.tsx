import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import {
  Drawer,
  Menu,
  Avatar,
  Badge,
  Popover,
  Row,
  Col,
  Divider,
  Empty,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { IProfileNavbarItem, IProfileNavbarProps } from "./index.props";
import { getBase64FormattedImage, getClassNames } from "../../helpers/format";
import Wrapper from "../Wrapper";
import Button from "../Button";
import {
  EXPERT_MESSAGES,
  EXPERT_REQUESTS,
  EXPERT_TAX_PREPARATION,
  TAXPAYER_MESSAGES,
  TAXPAYER_QUOTES,
  TAXPAYER_TAX_PREPARATION,
  EXPERT_PROFILE_PAGE,
  INITIAL_PAGE,
  TAXPAYER_PROFILE_PAGE,
  CHANGE_PASSWORD_PAGE,
  EXPERT_APPOINTMENTS_CALENDAR,
} from "../../constants/routes";
import { logout } from "../../redux/authSlice";
import { USER_ROLES } from "../../constants/users";
import { DEFAULT_DATE_TIME_FORMAT } from "../../constants/format";
import { RootState } from "../../redux/store";
import {
  getNotifications,
  makeNotificationsRead,
} from "../../redux/notificationSlice";
import { APPOINTMENT_REQUEST_DROPDOWN_VALUE } from "../../constants/appointments";
import { PERSONAL_TAX_PREPARATION_TABS } from "../../constants/tabs";
import { utc } from "../../helpers/date";

import { ReactComponent as NotificationIcon } from "../../assets/svgs/bell.svg";
import LogoName from "../../assets/svgs/logo.svg";
import Hamburger from "../../assets/svgs/hamburger.svg";
import styles from "./index.module.css";

const ProfileNavbar = (props: IProfileNavbarProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { className, roleId, avatar } = props;
  const { data: notifications = [] } = useSelector(
    (state: RootState) => state.notifications,
  );
  const isTaxPayer = roleId === USER_ROLES.Taxpayer;
  const [current, setCurrent] = useState(
    isTaxPayer ? TAXPAYER_QUOTES : EXPERT_REQUESTS,
  );
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const hasNotification = !!(notifications?.length > 0);
  const hasUnreadNotification = !!notifications.find(item => !item.isRead);

  const expertItems: IProfileNavbarItem[] = [
    {
      key: EXPERT_REQUESTS,
      text: t("profile.expert.navbar.requests"),
    },
    {
      key: EXPERT_TAX_PREPARATION,
      text: t("profile.expert.navbar.tax_preparation"),
    },
    {
      key: EXPERT_MESSAGES,
      text: t("profile.expert.navbar.messages"),
    },
    {
      key: EXPERT_APPOINTMENTS_CALENDAR,
      text: t("profile.expert.navbar.appointments"),
    },
  ];

  const taxpayerItems: IProfileNavbarItem[] = [
    {
      key: TAXPAYER_QUOTES,
      text: t("profile.taxpayer.navbar.quotes"),
    },
    {
      key: TAXPAYER_TAX_PREPARATION,
      text: t("profile.taxpayer.navbar.tax_preparation"),
    },
    {
      key: TAXPAYER_MESSAGES,
      text: t("profile.taxpayer.navbar.messages"),
    },
  ];

  const items = isTaxPayer ? taxpayerItems : expertItems;

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };

  const profileContent = (
    <div className={styles.profileContent}>
      <Button
        block
        type="link"
        text="Profile"
        onClick={() =>
          navigate(
            roleId === USER_ROLES.Expert
              ? EXPERT_PROFILE_PAGE
              : TAXPAYER_PROFILE_PAGE,
          )
        }
      />
      <Button
        block
        type="link"
        text="Change Password"
        onClick={() => navigate(CHANGE_PASSWORD_PAGE)}
      />
      <Button
        block
        type="link"
        text="Logout"
        onClick={() => dispatch(logout(INITIAL_PAGE))}
      />
    </div>
  );

  const notificationContent = (
    <div className={styles.notificationWrapper}>
      {notifications?.map((item, index) => (
        <React.Fragment key={`notification_${index}`}>
          <Row
            gutter={[0, 5]}
            justify="end"
            style={{ backgroundColor: item.isRead ? undefined : "#eaefff80" }}
          >
            <Col>
              <div
                className={styles.notificationContainer}
                onClick={() => {
                  if (item.link) {
                    navigate(
                      `/${item.link}?${createSearchParams({
                        appointmentType:
                          APPOINTMENT_REQUEST_DROPDOWN_VALUE.toString(),
                        tab: PERSONAL_TAX_PREPARATION_TABS.appointments,
                      })}`,
                    );
                  }
                }}
              >
                <h3 className={getClassNames(styles.noMargins)}>
                  {item.title}
                </h3>
                <p className={getClassNames(styles.noMargins)}>
                  {item.description}
                </p>
                <span className={getClassNames(styles.noMargins)}>
                  {utc(item.createdDate, DEFAULT_DATE_TIME_FORMAT)}
                </span>
              </div>
            </Col>
          </Row>
          <Divider className={styles.divider} />
        </React.Fragment>
      ))}

      {!notifications || (notifications.length === 0 && <Empty />)}
    </div>
  );

  const onOpenChange = (open: boolean) => {
    if (open && hasUnreadNotification) {
      dispatch(makeNotificationsRead());
    } else {
      dispatch(getNotifications());
    }
  };

  return (
    <>
      <nav className={getClassNames(styles.container, className)}>
        <Wrapper className={styles.wrapper}>
          <div className={styles.navbar}>
            <Link to={isTaxPayer ? TAXPAYER_QUOTES : EXPERT_REQUESTS}>
              <img src={LogoName} className={styles.logo} alt="Brand name" />
            </Link>

            <img
              src={Hamburger}
              alt="Menu"
              className={styles.hamburger}
              onClick={showDrawer}
            />

            <div className={styles.menuItems}>
              <Menu
                mode="horizontal"
                selectedKeys={[current]}
                onClick={e => {
                  navigate(e.key);
                }}
                style={{
                  border: 0,
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {items.map(item => (
                  <Menu.Item
                    key={item.key}
                    style={{ display: "grid", alignItems: "center" }}
                  >
                    <Link
                      to={item.key}
                      className={getClassNames(
                        styles.linkText,
                        current === item.key && styles.selectedLink,
                      )}
                    >
                      {item.text}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </div>

            <Popover
              open={hasNotification ? undefined : false}
              content={notificationContent}
              trigger="click"
              placement="bottom"
              onOpenChange={onOpenChange}
            >
              <Badge dot={hasUnreadNotification} className={styles.badge}>
                <NotificationIcon className={styles.pointer} />
              </Badge>
            </Popover>

            <Popover
              content={profileContent}
              trigger="click"
              placement="bottom"
            >
              <Avatar
                size="large"
                src={getBase64FormattedImage(avatar)}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#E9EEFF", color: "#0032DA" }}
                className={getClassNames(styles.avatar, styles.pointer)}
              />
            </Popover>
          </div>
        </Wrapper>
      </nav>

      <Drawer
        title={
          <Link to={isTaxPayer ? TAXPAYER_QUOTES : EXPERT_REQUESTS}>
            <img src={LogoName} className={styles.logo} alt="Brand name" />
          </Link>
        }
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        open={isDrawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[current]}
          onClick={e => {
            navigate(e.key);
            onClose();
          }}
          style={{
            border: 0,
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {items.map(item => (
            <Menu.Item
              key={item.key}
              style={{ display: "grid", alignItems: "center" }}
            >
              <Link
                to={item.key}
                className={getClassNames(
                  styles.linkText,
                  current === item.key && styles.selectedLink,
                )}
              >
                {item.text}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default ProfileNavbar;

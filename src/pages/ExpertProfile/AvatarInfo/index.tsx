import { Trans, useTranslation } from "react-i18next";
import { Avatar, Col, Rate, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";

import Button from "../../../components/Button";
import {
  getBase64FormattedImage,
  getClassNames,
} from "../../../helpers/format";
import { IAvatarInfo } from "./index.props";
import {
  getGoogleAuthUrl,
  getMicrosoftAuthUrl,
  cancelCalendarSync,
} from "../../../redux/calendarSyncSlice";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PRICING_PAGE } from "../../../constants/routes";

import outlook from "../../../assets/svgs/outlook.svg";
import { ReactComponent as Website } from "../../../assets/svgs/website.svg";
import { ReactComponent as LinkedIn } from "../../../assets/svgs/linkedin.svg";
import styles from "./index.module.css";
import { getUser } from "../../../redux/userSlice";

const AvatarInfo = (props: IAvatarInfo) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    rateByStars,
    yearsOfExperience,
    src,
    website = "",
    linkedIn = "",
    hasEditMode,
    setChangeTab,
  } = props;
  const { user } = useAppSelector((state: RootState) => state.user);

  const syncGoogleCalendar = async () => {
    const url: any = await dispatch(getGoogleAuthUrl());
    window.open(url, "_blank")?.focus();
  };

  const syncMicrosoftOutlook = async () => {
    const url: any = await dispatch(getMicrosoftAuthUrl());
    window.open(url, "_blank")?.focus();
  };

  const onCalendarSyncCancel = async () => {
    await dispatch(cancelCalendarSync());
    dispatch(getUser());
  };

  return (
    <div className={styles.cardHeader}>
      <Avatar
        size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 80, xxl: 150 }}
        src={getBase64FormattedImage(src)}
        icon={<UserOutlined />}
      />
      <div className={styles.personalInfo}>
        <h1 className={styles.title}>{`${firstName} ${lastName}`}</h1>
        <p className={styles.supText}>
          {
            <Trans
              i18nKey="profile.work_experience"
              values={{ year: yearsOfExperience }}
              components={[<>text</>]}
            />
          }
        </p>
        <div className={styles.ratingContainer}>
          <Rate value={rateByStars} disabled />
          <p className={getClassNames(styles.text, styles.rateText)}>
            ({rateByStars})
          </p>
        </div>
        <div className={styles.urlContainer}>
          {website && (
            <Space align="center">
              <Website />
              <a href={website} target="_blank" className={styles.anchorText}>
                {t("profile.website")}
              </a>
            </Space>
          )}
          {linkedIn && (
            <Space align="center">
              <LinkedIn />
              <a href={linkedIn} target="_blank" className={styles.anchorText}>
                {t("profile.linkedin")}
              </a>
            </Space>
          )}
        </div>
        {user?.hasSyncedCalendar && (
          <Space align="center" style={{ marginTop: 10 }}>
            <CheckCircleFilled style={{ color: "green" }} />
            <p style={{ margin: 0 }}>
              Calendar has been synced!{" "}
              <a onClick={onCalendarSyncCancel}>Change?</a>
            </p>
          </Space>
        )}
      </div>
      {hasEditMode && (
        <Button
          text={"Save Changes"}
          htmlType={"submit"}
          form="editForm"
          className={styles.btn}
          onClick={setChangeTab}
        />
      )}
      {!hasEditMode && (
        <Row gutter={[8, 0]}>
          <Col>
            {user?.hasSubscription ? (
              <Button
                type="primary"
                size="small"
                text="Unsubscribe"
                className={styles.btn}
                onClick={() =>
                  window.open(process.env.REACT_APP_STRIPE_UNSUBSCRIBE_URL)
                }
              />
            ) : (
              <Button
                type="primary"
                size="small"
                text="Subscribe"
                className={styles.btn}
                onClick={() => navigate(PRICING_PAGE)}
              />
            )}
          </Col>
          {!user?.hasSyncedCalendar && (
            <Col>
              <Space direction="vertical">
                <Button
                  size="small"
                  icon={
                    <img
                      style={{ width: 20, height: 20 }}
                      src="https://lh3.googleusercontent.com/K0vgpnn9Vour8ByU3htR3ou5Cx70Me-lW_51VEAIS5dfzXCQ0otXakVuPiQVc0V6qcf9aP_vkVul59airN27m3mttf4zQ1TPv4MVrw"
                    />
                  }
                  text="Sync with Google Calendar"
                  className={getClassNames(styles.btn, styles.syncBtn)}
                  onClick={syncGoogleCalendar}
                />

                <Button
                  size="small"
                  icon={<img style={{ width: 20, height: 20 }} src={outlook} />}
                  text="Sync with Outlook"
                  className={getClassNames(styles.btn, styles.syncBtn)}
                  onClick={syncMicrosoftOutlook}
                />
              </Space>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default AvatarInfo;

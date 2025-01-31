import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, message, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import ProfileNavbar from "../../components/ProfileNavbar";
import ProfileFooter from "../../components/ProfileFooter";
import Wrapper from "../../components/Wrapper";
import Loading from "../../components/Loading";
import BasicInfo from "./BasicInfo";
import AvatarInfo from "./AvatarInfo";
import PublicMode from "./PublicMode";
import EditMode from "./EditMode";
import { getExpertProfileInfo } from "../../redux/expertProfileSlice";
import { USER_ROLES } from "../../constants/users";
import { TAXPAYER_QUOTES } from "../../constants/routes";
import { getNotifications } from "../../redux/notificationSlice";
import {
  sendGoogleSyncedData,
  sendMicrosoftSyncedData,
} from "../../redux/calendarSyncSlice";
import { getUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import styles from "./index.module.css";

const { TabPane } = Tabs;

const ExpertProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code") || "";
  const state = searchParams.get("state") || "";
  const error = searchParams.get("error") || "";
  const error_description = searchParams.get("error_description") || "";
  const { expertProfile, loading: profileLoading } = useAppSelector(
    state => state.expertProfile,
  );
  const { user, loading: userLoading } = useAppSelector(state => state.user);
  const [tabKey, setTabKey] = useState("1");

  const init = async () => {
    await dispatch(getUser());
    await dispatch(getExpertProfileInfo());
    dispatch(getNotifications());

    if (code || state || error) {
      try {
        if (state) {
          await dispatch(
            sendMicrosoftSyncedData({ code, error, state, error_description }),
          );
        } else {
          await dispatch(sendGoogleSyncedData({ code, error }));
        }
        dispatch(getUser());
        setSearchParams("");
        message.success("Calendar synchronization has been successfully done!");
      } catch (e) {
        message.error("Calendar synchronization has been failed");
      }
    }
  };

  useEffect(() => {
    user?.roleId !== USER_ROLES.Expert &&
      userLoading &&
      navigate(TAXPAYER_QUOTES);
  }, [user]);

  useEffect(() => {
    if (!(expertProfile && user)) {
      init();
    }
  }, []);

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />
      <div className={styles.container}>
        <Tabs
          activeKey={`${tabKey}`}
          onChange={key => {
            setTabKey(key);
          }}
          centered
        >
          <TabPane tab={t("profile.public_mode")} key="1">
            <Wrapper>
              <div className={styles.card}>
                <AvatarInfo
                  src={user?.avatar}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  rateByStars={expertProfile?.rateByStars}
                  yearsOfExperience={expertProfile?.yearsOfExperience}
                  linkedIn={expertProfile?.linkedin}
                  website={expertProfile?.website}
                  setChangeTab={() => {
                    setTabKey("1");
                  }}
                />
                <Divider />
                <div className={styles.mainContainer}>
                  <PublicMode
                    workingTypeIds={expertProfile?.workingTypeIds}
                    taxPreparationTypeId={expertProfile?.taxPreparationTypeId}
                    accountantEducationList={
                      expertProfile?.accountantEducationList
                    }
                    pricingSystemFile={expertProfile?.pricingSystemFile}
                  />
                  <BasicInfo
                    isDisabled={true}
                    description={expertProfile?.aboutBusinessOrServiceStandOut}
                    accountantWorkExperience={
                      expertProfile?.accountantWorkExperience
                    }
                  />
                </div>
              </div>
            </Wrapper>
          </TabPane>
          <TabPane tab={t("profile.edit_mode")} key="2">
            <Wrapper>
              <div className={styles.card}>
                <EditMode onSubmit={() => setTabKey("1")} />
              </div>
            </Wrapper>
          </TabPane>
        </Tabs>
      </div>
      <ProfileFooter className={styles.footer} />
      {userLoading && profileLoading && <Loading type="secondary" />}
    </>
  );
};

export default ExpertProfile;

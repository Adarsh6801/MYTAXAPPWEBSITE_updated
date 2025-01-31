import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Rate } from "antd";
import Button from "../../../components/Button";
import { Typography } from "antd";
import _ from "lodash";

import { MIN_ACCOUNTANT_WORK_EXPERIENCE } from "../../../constants/settings";
import { IBasicInfo } from "./index.props";

import { ReactComponent as ArrowDown } from "../../../assets/svgs/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/svgs/arrow-up.svg";
import styles from "./index.module.css";

const { Paragraph } = Typography;

const BasicInfo = (props: IBasicInfo) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const {
    isDisabled = false,
    description,
    accountantWorkExperience = [],
  } = props;

  const moreWorkHistory = () => {
    setIsShow(!isShow);
  };

  const accountantWorkExperienceRender = () => {
    let count = MIN_ACCOUNTANT_WORK_EXPERIENCE;
    if (
      isShow ||
      (accountantWorkExperience.length < MIN_ACCOUNTANT_WORK_EXPERIENCE &&
        !isShow)
    ) {
      count = accountantWorkExperience.length;
    }

    return _.times(count, index => {
      // TODO: when get all data. change text to variable
      return (
        <>
          {
            <div key={`BasicInfo_${index}`}>
              <h5>{`${accountantWorkExperience[index].title} - ${accountantWorkExperience[index].year}`}</h5>
              <div>
                <Rate
                  value={accountantWorkExperience[index].rate}
                  style={{ fontSize: 12 }}
                  disabled
                />
                <span className={styles.marginLeft}>
                  ({accountantWorkExperience[index].rate})
                </span>
              </div>
              <p>{accountantWorkExperience[index].description}</p>
            </div>
          }
        </>
      );
    });
  };

  return (
    <div>
      <p>{t("profile.short_description")}</p>
      <Paragraph>{description}</Paragraph>

      <h3 className={styles.subTitle}>{t("profile.sub_title")}</h3>
      {accountantWorkExperience.length > 0 && accountantWorkExperienceRender()}
      {accountantWorkExperience.length > MIN_ACCOUNTANT_WORK_EXPERIENCE && (
        <Button
          type="link"
          text={
            isShow
              ? t("profile.close_all_history")
              : t("profile.view_all_history")
          }
          icon={
            isShow ? (
              <ArrowUp className={styles.historyBtnIcon} />
            ) : (
              <ArrowDown className={styles.historyBtnIcon} />
            )
          }
          className={styles.historyBtn}
          onClick={moreWorkHistory}
        />
      )}
    </div>
  );
};

export default BasicInfo;

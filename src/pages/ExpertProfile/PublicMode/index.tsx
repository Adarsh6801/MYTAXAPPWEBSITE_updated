import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import _ from "lodash";

import { workMedia, radioServices } from "../index.constants";
import { downloadFile } from "../../../redux/conversationSlice";
import { IPublicMode } from "./index.props";

import { ReactComponent as Attach } from "../../../assets/svgs/attach.svg";
import styles from "./index.module.css";

const PublicMode = (props: IPublicMode) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    workingTypeIds = [0],
    taxPreparationTypeId = 1,
    accountantEducationList,
    pricingSystemFile,
  } = props;

  return (
    <>
      <div className={styles.leftSideContainer}>
        <p className={styles.subTitle}>{t("profile.services")}</p>
        <div>
          {radioServices[taxPreparationTypeId].map((el: any, index: number) => (
            <p key={index}>{el}</p>
          ))}
        </div>
        <p className={styles.subTitle}>{t("profile.work")}</p>
        <div>
          {workingTypeIds.map((el: number, index: number) => (
            <p key={`workType_${index}`}>{workMedia[el]}</p>
          ))}
        </div>
        <p className={styles.subTitle}>{t("profile.education")}</p>
        <div>
          {accountantEducationList &&
            accountantEducationList.map((item, index) => (
              <div key={`education_${index}`}>
                <p className={styles.titleUniversity}>{item.institution}</p>
                <p className={styles.description}>
                  {item.yearOfGraduation} | {item.degree}
                </p>
              </div>
            ))}
        </div>
        {pricingSystemFile && (
          <>
            <p className={styles.subTitle}>{t("profile.standard_Pricing")}</p>
            <Button
              type="text"
              icon={<Attach />}
              className={styles.attachedItemBtn}
              onClick={() => {
                dispatch(
                  downloadFile(pricingSystemFile.id, pricingSystemFile.name),
                );
              }}
            >
              {`${pricingSystemFile.name.slice(0, 12)}...`}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default PublicMode;

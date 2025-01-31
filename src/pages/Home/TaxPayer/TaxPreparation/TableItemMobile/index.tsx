import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import { useDispatch } from "react-redux";

import Button from "../../../../../components/Button";
import { getClassNames } from "../../../../../helpers/format";
import { ITableItemMobileProps } from "./index.props";
import { YEAR_FORMAT } from "../../../../../constants/format";
import { getJobStatus } from "../../../../../helpers/status";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { utc } from "../../../../../helpers/date";

import { ReactComponent as Download } from "../../../../../assets/svgs/download-arrow.svg";
import styles from "./index.module.css";

const noop = () => {};

const TableItemMobile = (props: ITableItemMobileProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, className, goOrganizer = noop } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={getClassNames(styles.subjectContainer, styles.marginTop)}>
        {`${data.accountantFirstName} ${data.accountantLastName}`}
        <Tag color={getJobStatus(data.jobStatusId).color}>
          {getJobStatus(data.jobStatusId).text}
        </Tag>
      </div>
      <div className={getClassNames(styles.subjectContainer, styles.marginTop)}>
        <p className={styles.tableTextGreyFields}>
          {t("tax_preparation.table_fields.label8")}
        </p>
        {utc(data.createdDate, YEAR_FORMAT)}
        <p className={styles.tableTextGreyFields}>
          {t("tax_preparation.table_fields.label3")}
        </p>
        {data.jobType}
        <p className={styles.tableTextGreyFields}>
          {t("tax_preparation.table_fields.label4")}
        </p>
        {data.price}
        <p className={styles.tableTextGreyFields}>
          {t("tax_preparation.table_fields.label6")}
        </p>
        <Button
          type="link"
          disabled={!data.taxReturnFile}
          hidden={!data.taxReturnFile}
          icon={<Download />}
          className={styles.iconBtnContainer}
          onClick={() => {
            dispatch(
              downloadFile(
                Number(data.taxReturnFile?.id),
                data.taxReturnFile?.name || "",
              ),
            );
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          type="link"
          block
          text={t("quotes.btn_choose_accountant")}
          onClick={() => {
            goOrganizer(data);
          }}
        />
      </div>
    </div>
  );
};

export default TableItemMobile;

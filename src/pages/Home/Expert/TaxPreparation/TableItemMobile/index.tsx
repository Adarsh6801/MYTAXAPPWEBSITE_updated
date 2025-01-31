import { Tag, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { getJobStatus } from "../../../../../helpers/status";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants/format";
import { dummyRequest } from "../../../../../helpers/file";
import Button from "../../../../../components/Button";
import { getClassNames } from "../../../../../helpers/format";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { ITableItemMobileProps } from "./index.props";
import { utc } from "../../../../../helpers/date";

import { ReactComponent as UploadArrow } from "../../../../../assets/svgs/upload-arrow.svg";
import { ReactComponent as DownloadDocument } from "../../../../../assets/svgs/download-document.svg";
import { ReactComponent as PenUpload } from "../../../../../assets/svgs/pen-upload.svg";
import styles from "./index.module.css";

const TableItemMobile = (props: ITableItemMobileProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, className, uploadFile } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={getClassNames(styles.subjectContainer, styles.marginTop)}>
        <p
          className={styles.clientName}
        >{`${data.taxpayerFirstName} ${data.taxpayerLastName}`}</p>
        <Tag
          color={getJobStatus(data.jobStatusId).color}
          style={{ height: "fit-content" }}
        >
          {getJobStatus(data.jobStatusId).text}
        </Tag>
      </div>
      <div className={getClassNames(styles.subjectContainer, styles.marginTop)}>
        <p className={styles.tableTextGreyFields}>Start Date</p>
        {utc(data.createdDate, DEFAULT_DATE_FORMAT)}
        <p className={styles.tableTextGreyFields}>Job Type</p>
        {data.jobType}
        <p className={styles.tableTextGreyFields}>Fee</p>
        {`$ ${data.fee}`}
        <p className={styles.tableTextGreyFields}>Tax Return</p>
        <div className={styles.taxReturnContainer}>
          {!data.taxReturnFile ? (
            <Upload
              name="avatar"
              accept="image/png,image/jpeg,application/doc,application/pdf"
              customRequest={dummyRequest}
              maxCount={1}
              onChange={async e => await uploadFile(e, data.quoteId)}
              showUploadList={false}
            >
              <Button
                type={"link"}
                icon={<UploadArrow />}
                style={{ alignSelf: "center", display: "contents" }}
              />
            </Upload>
          ) : (
            <>
              <Upload
                name="avatar"
                accept="image/png,image/jpeg,application/doc,application/pdf"
                customRequest={dummyRequest}
                maxCount={1}
                onChange={async e => await uploadFile(e, data.quoteId)}
                showUploadList={false}
              >
                <Button
                  type={"link"}
                  icon={<PenUpload />}
                  className={styles.iconBtnContainer}
                />
              </Upload>

              <Button
                type={"link"}
                icon={<DownloadDocument />}
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
            </>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          type="link"
          block
          text={t("expert_preparation.btn")}
          onClick={() => {
            // TODO: Navigate to the organizer
          }}
        />
      </div>
    </div>
  );
};

export default TableItemMobile;

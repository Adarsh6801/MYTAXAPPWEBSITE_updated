import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { DEFAULT_DATE_FORMAT } from "../../../../constants/format";
import { downloadFile } from "../../../../redux/conversationSlice";
import { getIndividualOrganizer } from "../../../../redux/individualOrganizerSlice";
import { RootState } from "../../../../redux/store";
import { utc } from "../../../../helpers/date";

import { ReactComponent as DownloadArrow } from "../../../../assets/svgs/download-arrow.svg";
import { ReactComponent as Comment } from "../../../../assets/svgs/comment.svg";
import { ReactComponent as Documents } from "../../../../assets/svgs/documents.svg";
import styles from "./index.module.css";

const DocumentTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
  const { documents, loading } = useSelector(
    (state: RootState) => state.individualOrganizer,
  );

  useEffect(() => {
    dispatch(
      getIndividualOrganizer({
        quoteId: Number(quoteId),
        forSpouse: false,
      }),
    );
  }, []);

  const columns: any = [
    {
      title: t("document.id"),
      dataIndex: "document_title",
      render: (_: any, record: any) => (
        <h3 className={styles.categoryNames}>{record.files[0].id}</h3>
      ),
    },
    {
      title: t("document.document_title"),
      dataIndex: "document_title",
      render: (_: any, record: any) => (
        <h3 className={styles.categoryNames}>{`${record.files[0].name.substr(
          0,
          15,
        )}...`}</h3>
      ),
    },
    {
      title: t("document.date_provided"),
      dataIndex: "date",
      editable: true,
      render: (_: any, record: any) => (
        <p className={styles.tableText}>
          {record.files.length > 0 &&
            utc(record.files[0].createdDate, DEFAULT_DATE_FORMAT)}
        </p>
      ),
    },
    {
      title: t("document.file"),
      dataIndex: "file",
      render: (_: any, record: any) => {
        return (
          <div className={styles.fileRowContainer}>
            {/* TODO: uncomment when file open browser logic will be ready
            <Tooltip key={"conversation_file1"} title={`Click to download`}>
              <Button
                type="text"
                icon={<Eye />}
                className={styles.attachedItemBtn}
                onClick={() => {
                  dispatch(openFile(record.files[0].id));
                }}
              />
            </Tooltip> */}

            <Tooltip title={`Click to download`}>
              <Button
                type="text"
                icon={<DownloadArrow />}
                className={styles.attachedItemBtn}
                onClick={() => {
                  dispatch(
                    downloadFile(
                      record.files[0].id,
                      record.files[0].name.slice(0, 30),
                    ),
                  );
                }}
              />
            </Tooltip>
            <Tooltip title={record.message}>
              <Button
                type="text"
                icon={<Comment fill={record.message ? "#6581EB" : "#d9e0f9"} />}
                className={styles.attachedItemBtn}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: t("document.document_status"),
      dataIndex: "document_status",
      render: (_: any, record: any) => (
        <p>
          {record.question.includes("spouse")
            ? t("document.spouse")
            : t("document.tax_payer")}
        </p>
      ),
    },
  ];

  return (
    <>
      {documents ? (
        <Table
          dataSource={documents}
          columns={columns}
          scroll={{ x: 1070 }}
          style={{ width: "90vw" }}
          loading={loading}
          rowKey={record => record.files[0].id}
        />
      ) : (
        <div className={styles.noDocumentContainer}>
          <Documents className={styles.noDocument} />
          <p className={styles.noDocumentText}>{t("document.no_data")}</p>
        </div>
      )}
    </>
  );
};

export default DocumentTable;

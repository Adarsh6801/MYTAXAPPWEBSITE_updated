import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Table, Pagination, Tag, Upload, Space, message, Tooltip } from "antd";

import ProfileFooter from "../../../../components/ProfileFooter";
import ProfileNavbar from "../../../../components/ProfileNavbar";
import Loading from "../../../../components/Loading";
import { USER_ROLES } from "../../../../constants/users";
import { TABLE_ITEMS_IN_ONE_PAGE } from "../../../../constants/settings";
import { useCurrentWidth } from "../../../../hooks/dimensions";
import TableItemMobile from "./TableItemMobile";
import { DEFAULT_DATE_FORMAT } from "../../../../constants/format";
import Button from "../../../../components/Button";
import { dummyRequest } from "../../../../helpers/file";
import Wrapper from "../../../../components/Wrapper";
import NoData from "../../../../components/NoData";
import { getClassNames } from "../../../../helpers/format";
import { IAccountantTaxPreparationData } from "../../../../redux/taxPreparationSlice/index.props";
import {
  getAccountantTaxPreparations,
  uploadTaxReturnFile,
} from "../../../../redux/taxPreparationSlice";
import { downloadFile } from "../../../../redux/conversationSlice";
import { getJobStatus } from "../../../../helpers/status";
import { generateLinkForNewTaxPreparation } from "../../../../redux/generateLinkSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { utc } from "../../../../helpers/date";

import { ReactComponent as UploadArrow } from "../../../../assets/svgs/upload-arrow.svg";
import { ReactComponent as DownloadDocument } from "../../../../assets/svgs/download-document.svg";
import { ReactComponent as PenUpload } from "../../../../assets/svgs/pen-upload.svg";
import styles from "./index.module.css";

const ExpertTaxPreparation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const width = useCurrentWidth();
  const { loading, accountantData = [] } = useAppSelector(
    state => state.taxPreparation,
  );
  const { user } = useAppSelector(state => state.user);

  const newAccountantData = accountantData.map((item, index) => ({
    ...item,
    key: index,
  }));

  const jobTypeFilterOptions = [
    ...(new Set(newAccountantData.map(item => item.jobType)) as any),
  ];

  const jobStatusFilterOptions = [
    ...(new Set(newAccountantData.map(item => item.jobStatusId)) as any),
  ];

  useEffect(() => {
    dispatch(getAccountantTaxPreparations());
  }, []);

  const handleChange = (page: number) => {
    //TODO: handlerChange
  };

  const uploadFile = async (e: any, quoteId: number) => {
    await dispatch(
      uploadTaxReturnFile({
        quoteId,
        taxReturn: e.file.originFileObj,
      }),
    );

    await dispatch(getAccountantTaxPreparations());
  };

  const onGenerateLink = async () => {
    const link: string = await dispatch<any>(
      generateLinkForNewTaxPreparation(),
    );
    navigator.clipboard.writeText(link);
    message.success(`The link has been copied!`);
  };

  const columns: any = [
    {
      title: "Client",
      key: "client",
      render: (_: any, record: IAccountantTaxPreparationData) => (
        <p className={getClassNames(styles.marginBottom, styles.nameText)}>
          {`${record.taxpayerFirstName} ${record.taxpayerLastName}`}
        </p>
      ),
    },
    {
      title: "Start Date",
      key: "createdDate",
      render: (_: any, record: IAccountantTaxPreparationData) => (
        <p className={getClassNames(styles.marginBottom, styles.otherText)}>
          {utc(record.createdDate, DEFAULT_DATE_FORMAT)}
        </p>
      ),
    },
    {
      title: "Job Type",
      key: "jobType",
      filters: jobTypeFilterOptions.map(item => ({ text: item, value: item })),
      onFilter: (value: string, record: IAccountantTaxPreparationData) =>
        record.jobType === value,
      render: (_: any, record: IAccountantTaxPreparationData) => (
        <p className={styles.tableTextGreyFields}>{record.jobType}</p>
      ),
    },
    {
      title: "Request",
      key: "request",
      render: (_: any, record: IAccountantTaxPreparationData) => (
        <Link
          to={`/user/tax_preparation/${record.quoteId}`}
          className={styles.marginRight}
        >
          {t("expert_preparation.table_fields.label7")}
        </Link>
      ),
    },
    {
      title: "Fee",
      key: "fee",
      render: (_: any, record: IAccountantTaxPreparationData) =>
        record.fee ? (
          <Space direction="horizontal" align="center">
            <p className={styles.otherText}>$ {record.fee}</p>
          </Space>
        ) : (
          <Tag color="default">N/A</Tag>
        ),
    },
    {
      title: "Job Status",
      key: "jobStatus",
      filters: jobStatusFilterOptions.map(status => ({
        text: getJobStatus(status).text,
        value: status,
      })),
      onFilter: (value: number, record: IAccountantTaxPreparationData) =>
        record.jobStatusId === value,
      editable: true,
      render: (_: any, record: IAccountantTaxPreparationData) => (
        <Tag color={getJobStatus(record.jobStatusId).color}>
          {getJobStatus(record.jobStatusId).text}
        </Tag>
      ),
    },
    {
      title: "Tax return",
      key: "taxReturn",
      render: (_: any, record: IAccountantTaxPreparationData) =>
        !record.taxReturnFile ? (
          <Upload
            name="avatar"
            accept="image/png,image/jpeg,application/doc,application/pdf"
            customRequest={dummyRequest}
            maxCount={1}
            onChange={async e => await uploadFile(e, record.quoteId)}
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
              onChange={async e => await uploadFile(e, record.quoteId)}
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
                    Number(record.taxReturnFile?.id),
                    record.taxReturnFile?.name || "",
                  ),
                );
              }}
            />
          </>
        ),
    },
  ];

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />
      <Wrapper className={styles.container}>
        <div className={styles.subContainer}>
          <h3 className={styles.title}>{t("expert_preparation.title")}</h3>
          <Tooltip title="Generate a link for new tax preparation to share it with taxpayer">
            <Button
              text="Generate a link"
              className={styles.btn}
              onClick={onGenerateLink}
            />
          </Tooltip>
        </div>
        <div className={styles.tableContainer}>
          {width < 400 ? (
            newAccountantData?.length > 0 ? (
              <>
                {newAccountantData.map((item, index) => (
                  <TableItemMobile
                    key={`tax_preparation_item_${index}`}
                    data={item}
                    uploadFile={uploadFile}
                  />
                ))}
                <Pagination
                  onChange={handleChange}
                  total={2}
                  defaultPageSize={+TABLE_ITEMS_IN_ONE_PAGE[0]}
                />
                {loading && <Loading type="secondary" />}
              </>
            ) : (
              <NoData title="You don’t have tax preparation(s) yet." />
            )
          ) : (
            <Table
              pagination={{
                defaultPageSize: +TABLE_ITEMS_IN_ONE_PAGE[0],
                showSizeChanger: true,
                pageSizeOptions: TABLE_ITEMS_IN_ONE_PAGE,
              }}
              scroll={{ x: 1070 }}
              style={{ width: "90vw" }}
              columns={columns}
              dataSource={newAccountantData}
              loading={loading}
            />
          )}
        </div>
      </Wrapper>
      <ProfileFooter />
    </>
  );
};

export default ExpertTaxPreparation;

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  Tag,
  Button,
  Pagination,
  Space,
  Modal,
  Form,
  Rate,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ProfileNavbar from "../../../../components/ProfileNavbar";
import NoData from "../../../../components/NoData";
import Loading from "../../../../components/Loading";
import ProfileFooter from "../../../../components/ProfileFooter";
import Wrapper from "../../../../components/Wrapper";
import { useCurrentWidth } from "../../../../hooks/dimensions";
import TableItemMobile from "./TableItemMobile";
import {
  getTaxPayerTaxPreparations,
  makeTaxPreparationJobStatusInProcess,
} from "../../../../redux/taxPreparationSlice";
import { ITaxPayerTaxPreparationData } from "../../../../redux/taxPreparationSlice/index.props";
import { downloadFile } from "../../../../redux/conversationSlice";
import { getJobStatus } from "../../../../helpers/status";
import { TABLE_ITEMS_IN_ONE_PAGE } from "../../../../constants/settings";
import { YEAR_FORMAT } from "../../../../constants/format";
import {
  ORGANIZER_BUSINESS_PAGE,
  ORGANIZER_INDIVIDUAL_PAGE,
} from "../../../../constants/routes";
import { USER_ROLES } from "../../../../constants/users";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  hasFeedback,
  sendAccountantFeedback,
} from "../../../../redux/feedbackSlice";
import { IFeedbackForm } from "./index.props";
import { utc } from "../../../../helpers/date";

import { ReactComponent as Download } from "../../../../assets/svgs/download-arrow.svg";
import styles from "./index.module.css";

const TaxPreparation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const width = useCurrentWidth();
  const { loading, taxpayerData = [] } = useAppSelector(
    state => state.taxPreparation,
  );
  const { user } = useAppSelector(state => state.user);
  const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false);
  const [modalData, setModalData] = useState<{
    accountantId: number;
    isIndividual: boolean;
  }>();
  const newTaxPayerData = taxpayerData.map((item, index) => ({
    ...item,
    key: index,
  }));

  const jobTypeFilterOptions = [
    ...(new Set(newTaxPayerData.map(item => item.jobType)) as any),
  ];

  const jobStatusFilterOptions = [
    ...(new Set(newTaxPayerData.map(item => item.jobStatusId)) as any),
  ];

  const onTaxDocumentDownload = async (record: ITaxPayerTaxPreparationData) => {
    await dispatch(
      downloadFile(
        Number(record.taxReturnFile?.id),
        record.taxReturnFile?.name || "",
      ),
    );

    const alreadyHasFeedback = await dispatch(hasFeedback(record.accountantId));

    if (!alreadyHasFeedback) {
      setIsFeedbackModalOpened(true);
      setModalData({
        accountantId: record.accountantId,
        isIndividual: record.jobType === "Personal",
      });
    }
  };

  const onFinish = async (values: IFeedbackForm) => {
    if (modalData) {
      await dispatch(
        sendAccountantFeedback({
          ...values,
          ...modalData,
        }),
      );

      setModalData(undefined);
    }

    setIsFeedbackModalOpened(false);
  };

  useEffect(() => {
    dispatch(getTaxPayerTaxPreparations());
  }, []);

  const columns: any = [
    {
      title: t("tax_preparation.table_fields.label1"),
      dataIndex: "client",
      key: "client",
      render: (_: any, record: ITaxPayerTaxPreparationData) => (
        <Space direction="vertical" size={0}>
          <p className={styles.clientName}>
            {`${record.accountantFirstName} ${record.accountantLastName}`}
          </p>
          <Link
            onClick={() => {
              record.jobStatusId !== 3 &&
                dispatch(
                  makeTaxPreparationJobStatusInProcess({
                    quoteId: record.quoteId,
                  }),
                );
            }}
            to={
              record.jobType == "Personal"
                ? ORGANIZER_INDIVIDUAL_PAGE.replace(
                    ":id",
                    record.quoteId.toString(),
                  )
                : ORGANIZER_BUSINESS_PAGE.replace(
                    ":id",
                    record.quoteId.toString(),
                  )
            }
          >
            Go to organizer
          </Link>
        </Space>
      ),
    },
    {
      title: t("tax_preparation.table_fields.label8"),
      dataIndex: "year",
      key: "year",
      render: (_: any, record: ITaxPayerTaxPreparationData) => (
<p className={styles.tableTextGreyFields}>
  {record.taxPreparationYear ? record.taxPreparationYear : ""}
</p>
      ),
    },
    {
      title: t("tax_preparation.table_fields.label3"),
      dataIndex: "jobType",
      key: "jobType",
      filters: jobTypeFilterOptions.map(item => ({ text: item, value: item })),
      onFilter: (value: string, record: ITaxPayerTaxPreparationData) =>
        record.jobType === value,
      render: (_: any, record: ITaxPayerTaxPreparationData) => (
        <p className={styles.tableTextGreyFields}>{record.jobType}</p>
      ),
    },
    {
      title: t("tax_preparation.table_fields.label4"),
      dataIndex: "fee",
      key: "fee",
      render: (_: any, record: ITaxPayerTaxPreparationData) =>
        record.price ? (
          <p className={styles.tableTextGreyFields}>$ {record.price}</p>
        ) : (
          <Tag color="default">N/A</Tag>
        ),
    },
    {
      title: t("tax_preparation.table_fields.label5"),
      dataIndex: "jobStatus",
      key: "jobStatus",
      filters: jobStatusFilterOptions.map(status => ({
        text: getJobStatus(status).text,
        value: status,
      })),
      onFilter: (value: number, record: ITaxPayerTaxPreparationData) =>
        record.jobStatusId === value,
      render: (_: any, record: ITaxPayerTaxPreparationData) => (
        <Tag color={getJobStatus(record.jobStatusId).color}>
          {getJobStatus(record.jobStatusId).text}
        </Tag>
      ),
    },
    {
      title: t("tax_preparation.table_fields.label6"),
      dataIndex: "taxReturn",
      key: "taxReturn",
      render: (_: any, record: ITaxPayerTaxPreparationData) => (
        <Button
          type="link"
          icon={<Download />}
          disabled={!record.taxReturnFile}
          hidden={!record.taxReturnFile}
          className={styles.iconBtnContainer}
          onClick={() => onTaxDocumentDownload(record)}
        />
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
        <h2 className={styles.title}>{t("tax_preparation.title")}</h2>
        <div className={styles.tableContainer}>
          {width < 576 ? (
            newTaxPayerData?.length > 0 ? (
              <>
                {newTaxPayerData.map((item, index) => (
                  <TableItemMobile
                    key={`tax_preparation_item_${index}`}
                    data={item}
                    goOrganizer={data => {
                      navigate(
                        data.jobType == "Personal"
                          ? ORGANIZER_INDIVIDUAL_PAGE.replace(
                              ":id",
                              data.quoteId.toString(),
                            )
                          : ORGANIZER_BUSINESS_PAGE.replace(
                              ":id",
                              data.quoteId.toString(),
                            ),
                      );
                    }}
                  />
                ))}
                <Pagination
                  onChange={() => {}}
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
              dataSource={newTaxPayerData}
              columns={columns}
              scroll={{ x: 1070 }}
              style={{ width: "90vw" }}
              loading={loading}
            />
          )}
        </div>
      </Wrapper>
      <ProfileFooter />

      <Modal
        title="Feedback"
        open={isFeedbackModalOpened}
        onOk={() => {
          form.submit();
        }}
        okText="Submit"
        onCancel={() => setIsFeedbackModalOpened(false)}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            name="rate"
            label="Rate"
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Comment"
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
          >
            <Input.TextArea allowClear showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaxPreparation;

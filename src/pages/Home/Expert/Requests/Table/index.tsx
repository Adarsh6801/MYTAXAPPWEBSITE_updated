import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Table as AntTable, Pagination, Tag, Space } from "antd";

import Button from "../../../../../components/Button";
import Wrapper from "../../../../../components/Wrapper";
import NoData from "../../../../../components/NoData";
import Loading from "../../../../../components/Loading";
import { getClassNames } from "../../../../../helpers/format";
import {
  getAccountingSoftware,
  getActionStatus,
  getDeductionType,
  getMonthlyFinancialStatementReport,
  getPersonalCreditCardBusinessTransactions,
  getPreviousReturnPreparation,
  getQuoteStatus,
  getThirdPartyPaymentProcessorType,
  getTransactionReconciledMonthly,
  getTransactionsReconcileHelperType,
} from "../../../../../helpers/status";
import TableItemMobile from "./TableItemMobile";
import { useCurrentWidth } from "../../../../../hooks/dimensions";
import { TABLE_ITEMS_IN_ONE_PAGE } from "../../../../../constants/settings";
import { ITableInfoProps } from "./index.props";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants/format";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { ISentQuoteData } from "../../../../../redux/requestsSlice/index.props";
import { RootState } from "../../../../../redux/store";
import {
  confirmQuote,
  declineQuote,
  getAccountantSentQuotes,
} from "../../../../../redux/requestsSlice";
import { ACTION_STATUS } from "../../../../../constants/status";
import { utc } from "../../../../../helpers/date";
import RequestModal from "../../../../../components/RequestModal";
import { REQUEST_TYPES } from "../../../../../constants/requests";
import { RequestTypes } from "../index.props";

import { ReactComponent as RequestCut } from "../../../../../assets/svgs/request-cut.svg";
import { ReactComponent as RequestPicker } from "../../../../../assets/svgs/request-picker.svg";
import { ReactComponent as RequestRing } from "../../../../../assets/svgs/request-ring.svg";
import { ReactComponent as RequestFile } from "../../../../../assets/svgs/request-file.svg";
import { ReactComponent as RequestBag } from "../../../../../assets/svgs/request-bag.svg";
import { ReactComponent as RequestHome } from "../../../../../assets/svgs/request-home.svg";
import { ReactComponent as Square } from "../../../../../assets/svgs/request-square.svg";
import { ReactComponent as Message } from "../../../../../assets/svgs/message.svg";
import { ReactComponent as Download } from "../../../../../assets/svgs/download.svg";
import styles from "./index.module.css";

const noop = () => {};

const Table = (props: ITableInfoProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const width = useCurrentWidth();
  const { data, className, onSendMessage = noop, onCalendar = noop } = props;
  const { loading } = useSelector((state: RootState) => state.requests);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequestType, setSelectedRequestType] =
    useState<RequestTypes>("INDIVIDUAL");
  const [selectedItem, setSelectedItem] = useState<any>();
  const newData = data.map((item, index) => ({
    ...item,
    key: index,
  }));

  const modalData =
    selectedRequestType === REQUEST_TYPES.INDIVIDUAL
      ? [
          {
            icon: <RequestPicker />,
            text: `${selectedItem?.country}, ${selectedItem?.state}`,
          },
          {
            icon: <RequestCut />,
            text: getDeductionType(selectedItem?.deductionTypeId),
          },
          {
            icon: <RequestRing />,
            text: selectedItem?.isMarried ? "Married" : "Not married",
          },
          {
            icon: <RequestFile />,
            text: getPreviousReturnPreparation(
              selectedItem?.lastYearPreparedExpertId,
            ),
          },
          { icon: <RequestBag />, text: "Self employed" },
          {
            icon: <RequestHome />,
            text: selectedItem?.isOwnHome
              ? "Owns a house"
              : "Doesn’t own a house",
          },
        ]
      : [
          {
            icon: <Square />,
            text:
              selectedItem?.fieldPreviousEntityReturnBefore &&
              "Filled a previous entity return before",
          },
          {
            icon: <Square />,
            text:
              selectedItem?.haveLastYearEntityReturnInPDF &&
              `Available in pdf format`,
          },
          {
            icon: <Square />,
            text:
              selectedItem?.haveLastYearEntityReturnInPDF &&
              `Entity has ${selectedItem?.entityMembersCount} members/partners/shareholders`,
          },
          {
            icon: <Square />,
            text: getAccountingSoftware(
              selectedItem?.businessTransactionAccountingSoftwareId,
            ),
          },
          {
            icon: <Square />,
            text: `Business Checking Accounts ${selectedItem?.businessCheckingAccountsCount} accountants ${selectedItem?.businessCheckingTransactionsCount} transactions per month`,
          },
          {
            icon: <Square />,
            text: `Business Credit Cards ${selectedItem?.businessCreditCardsCount} accountants ${selectedItem?.businessCreditCardTransactionsCount} transactions per month`,
          },
          {
            icon: <Square />,
            text: getPersonalCreditCardBusinessTransactions(
              selectedItem?.haveBusinessTransactionsOnPersonalCard,
            ),
          },
          {
            icon: <Square />,
            text: getTransactionReconciledMonthly(
              selectedItem?.haveCardTransactionsReconciledOnMonthlyBasis,
            ),
          },
          {
            icon: <Square />,
            text: getTransactionsReconcileHelperType(
              selectedItem?.transactionsReconcileHelperId,
            ),
          },
          {
            icon: <Square />,
            text: getMonthlyFinancialStatementReport(
              selectedItem?.getMonthlyFinancialReportFromProvider,
            ),
          },
          {
            icon: <Square />,
            text:
              selectedItem?.haveLastMonthFinancialStatement &&
              "Have last month’s financial statement",
          },
          {
            icon: <Square />,
            text:
              selectedItem?.closedBooksForWhichRequestingTaxService &&
              "Closed out books for the last calendar year",
          },
          {
            icon: <Square />,
            text:
              selectedItem?.sendInvoicesToGetPaid &&
              "Normally send out invoices",
          },
          {
            icon: <Square />,
            text: getThirdPartyPaymentProcessorType(
              selectedItem?.thirdPartyPaymentProcessorId,
            ),
          },
        ];

  const handleChange = (page: number) => {
    //TODO: handlerChange
  };

  const onConfirm = async (quoteId: number) => {
    await dispatch(confirmQuote(quoteId));
    await dispatch(getAccountantSentQuotes());
  };

  const onDecline = async (quoteId: number) => {
    await dispatch(declineQuote(quoteId));
    await dispatch(getAccountantSentQuotes());
  };

  const columns = [
    {
      title: t("quotes.professional").toUpperCase(),
      dataIndex: "fullName",
      key: "fullName",
      render: (_: any, record: ISentQuoteData) => (
        <p className={getClassNames(styles.marginBottom, styles.nameText)}>
          {`${record.taxpayerFirstName} ${record.taxpayerLastName}`}
        </p>
      ),
      width: 110,
    },
    {
      title: t("quotes.date").toUpperCase(),
      dataIndex: "createdDate",
      key: "createdDate",
      render: (_: any, record: ISentQuoteData) => {
        return (
          <p className={getClassNames(styles.marginBottom, styles.otherText)}>
            {utc(record.createdDate, DEFAULT_DATE_FORMAT)}
          </p>
        );
      },
      width: 110,
    },
    {
      title: t("quotes.job").toUpperCase(),
      dataIndex: "jobType",
      key: "jobType",
      // filters: [
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "John",
      //     value: "John",
      //   },
      // ],
      // onFilter: (value: string, record: any) => {
      //   return record.jobType === value;
      // },
      render: (_: any, record: ISentQuoteData) => (
        <p className={getClassNames(styles.marginBottom, styles.otherText)}>
          {record.jobType}
        </p>
      ),
      width: 60,
    },
    {
      title: t("quotes.quote").toUpperCase(),
      dataIndex: "quote",
      key: "quote",
      render: (_: any, record: ISentQuoteData) => (
        <Space align="center">
          <Button
            type="link"
            onClick={() => {
              setIsModalVisible(true);
              setSelectedRequestType(
                record.jobType === "Personal" ? "INDIVIDUAL" : "BUSINESS",
              );
              setSelectedItem(
                record.jobType === "Personal"
                  ? record.individualTaxPreparationResult
                  : record.businessTaxPreparationResult,
              );
            }}
            className={styles.viewBtn}
            text="View Request"
          />

          {record.priceAttachment && (
            <Button
              type={"link"}
              icon={<Download />}
              style={{ alignSelf: "center", display: "contents" }}
              className={styles.pdfBtnContainer}
              onClick={() => {
                dispatch(
                  downloadFile(
                    Number(record.priceAttachment?.id),
                    record.priceAttachment?.name || "",
                  ),
                );
              }}
            />
          )}

          <p className={getClassNames(styles.text, styles.marginLeft)}>
            {`$${record.price}`}
          </p>
        </Space>
      ),
      width: 100,
    },
    {
      title: t("quotes.quote_status").toUpperCase(),
      dataIndex: "quoteStatus",
      key: "quoteStatus",
      // filters: [
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "John",
      //     value: "John",
      //   },
      // ],
      // onFilter: (value: string, record: any) => {
      //   return record.jobType === value;
      // },
      render: (_: any, record: ISentQuoteData) => (
        <Tag color={getQuoteStatus(record.statusId).color}>
          {getQuoteStatus(record.statusId).text}
        </Tag>
      ),
      width: 90,
    },
    {
      title: t("quotes.actions").toUpperCase(),
      dataIndex: "actions",
      key: "actions",
      width: 250,
      render: (_: any, record: ISentQuoteData) => (
        <div className={styles.buttonContainer}>
          {record.actionStatusId ===
          ACTION_STATUS.CHOSEN_WAITING_FOR_INFORMATION ? (
            <>
              <Button
                size="small"
                type="primary"
                text="Confirm"
                onClick={() => {
                  onConfirm(record.quoteId);
                }}
              />

              <Button
                size="small"
                text="Decline"
                onClick={() => {
                  onDecline(record.quoteId);
                }}
              />
            </>
          ) : (
            <Tag color={getActionStatus(record.actionStatusId).color}>
              {getActionStatus(record.actionStatusId).text}
            </Tag>
          )}
          <div className={styles.btnIconContainer}>
            {/* <Button
              type="ghost"
              icon={<Calendar />}
              onClick={() => {
                onCalendar(record.taxpayerId);
              }}
              style={{ borderColor: "#0032da" }}
              className={styles.button}
            /> */}

            <Button
              type="ghost"
              icon={<Message />}
              onClick={() => {
                onSendMessage(record.taxpayerId);
              }}
              style={{ borderColor: "#0032da" }}
              className={styles.button}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      {width < 400 ? (
        newData.length > 0 ? (
          <>
            {newData.map((item, index: number) => (
              <TableItemMobile
                key={`${index}`}
                data={item}
                actionStatus={getActionStatus(item.actionStatusId)}
                onSendMessage={onSendMessage}
                onCalendar={onCalendar}
                onDecline={onDecline}
                onConfirm={onConfirm}
                className={className}
              />
            ))}
            <Pagination
              onChange={handleChange}
              total={data.length}
              defaultPageSize={+TABLE_ITEMS_IN_ONE_PAGE[0]}
            />
            {loading && <Loading type="secondary" />}
          </>
        ) : (
          <NoData title="You don’t have quotes yet." />
        )
      ) : (
        <AntTable
          pagination={{
            defaultPageSize: +TABLE_ITEMS_IN_ONE_PAGE[0],
            showSizeChanger: true,
            pageSizeOptions: TABLE_ITEMS_IN_ONE_PAGE,
          }}
          scroll={{ x: 1070 }}
          style={{ width: "90vw" }}
          columns={columns}
          dataSource={newData}
          loading={loading}
        />
      )}
      <RequestModal
        hasActions={false}
        isModalVisible={isModalVisible}
        title={`${
          selectedRequestType === REQUEST_TYPES.INDIVIDUAL
            ? t("request_card.individual_tax")
            : t("request_card.business_tax")
        }: ${selectedItem?.user?.firstName} ${selectedItem?.user?.lastName}`}
        data={modalData}
        onSendMessage={() => onSendMessage(selectedItem?.user.id)}
        onCancel={() => setIsModalVisible(false)}
      />
    </Wrapper>
  );
};

export default Table;

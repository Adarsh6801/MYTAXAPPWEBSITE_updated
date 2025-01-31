import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table as AntTable, Pagination, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../../../components/Button";
import Wrapper from "../../../../../components/Wrapper";
import NoData from "../../../../../components/NoData";
import Loading from "../../../../../components/Loading";
import TableItemMobile from "./TableItemMobile";
import Professional from "./Professional";
import { useCurrentWidth } from "../../../../../hooks/dimensions";
import { ITaxPayerQuoteData } from "../../../../../redux/quotesSlice/index.props";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { chooseAccountant, getQuotes } from "../../../../../redux/quotesSlice";
import { getActionStatus } from "../../../../../helpers/status";
import { RootState } from "../../../../../redux/store";
import { ITableInfoProps } from "./index.props";
import { TABLE_ITEMS_IN_ONE_PAGE } from "../../../../../constants/settings";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants/format";
import { ACTION_STATUS } from "../../../../../constants/status";
import { utc } from "../../../../../helpers/date";

import { ReactComponent as Calendar } from "../../../../../assets/svgs/date.svg";
import { ReactComponent as Message } from "../../../../../assets/svgs/message.svg";
import { ReactComponent as Download } from "../../../../../assets/svgs/download.svg";
import styles from "./index.module.css";

const noop = () => {};

const Table = (props: ITableInfoProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const width = useCurrentWidth();
  const { loading } = useSelector((state: RootState) => state.quotes);
  const { data, className, onSendMessage = noop, onCalendar = noop } = props;
  const [
    disableChooseAccountantBusinessBtn,
    setDisableChooseAccountantBusinessBtn,
  ] = useState(false);
  const [
    disableChooseAccountantIndividualBtn,
    setDisableChooseAccountantIndividualBtn,
  ] = useState(false);
  const newData = data
    .map((item, index) => ({
      ...item,
      key: index,
    }))
    .sort((e, b) => e.actionStatusId - b.actionStatusId);

  useEffect(() => {
    checkDisabledCase();
  }, [data]);

  const handleChange = (page: number) => {
    //TODO: handlerChange
  };

  const checkDisabledCase = () => {
    const typePersonal = data.filter(
      item =>
        item.jobType === "Personal" &&
        item.actionStatusId == ACTION_STATUS.CHOSEN_WAITING_FOR_INFORMATION,
    );
    const typeBusiness = data.filter(
      item =>
        item.jobType === "Business" &&
        item.actionStatusId == ACTION_STATUS.CHOSEN_WAITING_FOR_INFORMATION,
    );

    setDisableChooseAccountantBusinessBtn(typeBusiness.length > 0);
    setDisableChooseAccountantIndividualBtn(typePersonal.length > 0);
  };

  const onChooseAccountant = async (quoteId: number) => {
    await dispatch(chooseAccountant(quoteId));
    await dispatch(getQuotes());
  };

  const columns = [
    {
      title: t("quotes.professional").toUpperCase(),
      dataIndex: "professional",
      key: "professional",
      render: (_: any, record: ITaxPayerQuoteData) => (
        <Professional
          data={{
            firstName: record.accountantFirstName,
            lastName: record.accountantLastName,
            img: record.avatar,
            rating: record.stars,
          }}
        />
      ),
      width: 190,
    },
    {
      title: t("quotes.date").toUpperCase(),
      dataIndex: "createdDate",
      key: "createdDate",
      render: (_: any, record: ITaxPayerQuoteData) =>
        utc(record.createdDate, DEFAULT_DATE_FORMAT),
      width: 110,
    },
    {
      title: t("quotes.job").toUpperCase(),
      dataIndex: "jobType",
      key: "jobType",
      width: 60,
    },
    {
      title: t("quotes.quote").toUpperCase(),
      dataIndex: "quote",
      key: "quote",
      render: (_: any, record: ITaxPayerQuoteData) => (
        <div className={styles.quoteContainer}>
          {record.price ? (
            <p className={styles.text}>${record.price}</p>
          ) : (
            <Tag color="default">N/A</Tag>
          )}
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
        </div>
      ),
      width: 5,
    },
    {
      title: t("quotes.quote_status").toUpperCase(),
      dataIndex: "quoteStatus",
      key: "quoteStatus",
      render: () => <Tag color="default">N/A</Tag>,
      width: 90,
    },
    {
      title: t("quotes.actions").toUpperCase(),
      dataIndex: "actions",
      key: "actions",
      width: 190,
      render: (_: any, record: ITaxPayerQuoteData) => (
        <div className={styles.buttonContainer}>
          {record.actionStatusId === 0 ? (
            <Button
              text={t("quotes.btn_choose_accountant")}
              disabled={
                record.jobType === "Personal"
                  ? disableChooseAccountantIndividualBtn
                  : disableChooseAccountantBusinessBtn
              }
              onClick={() => {
                onChooseAccountant(record.quoteId);
              }}
            />
          ) : (
            <Tag color={getActionStatus(record.actionStatusId).color}>
              {getActionStatus(record.actionStatusId).text}
            </Tag>
          )}

          <Button
            type="ghost"
            icon={<Calendar />}
            onClick={() => {
              onCalendar(record.accountantId, record.quoteId, new Date());
            }}
            style={{ borderColor: "#0032da" }}
            className={styles.button}
          />

          <Button
            type="ghost"
            icon={<Message />}
            onClick={() => {
              onSendMessage(record.accountantId);
            }}
            style={{ borderColor: "#0032da" }}
            className={styles.button}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Wrapper>
        {width < 400 ? (
          data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <TableItemMobile
                  key={`${index}`}
                  data={item}
                  status={getActionStatus(item.actionStatusId)}
                  onSendMessage={onSendMessage}
                  onCalendar={onCalendar}
                  onChooseAccountant={onChooseAccountant}
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
      </Wrapper>
    </>
  );
};

export default Table;

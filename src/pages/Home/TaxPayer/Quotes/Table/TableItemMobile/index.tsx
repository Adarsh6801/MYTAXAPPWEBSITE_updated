import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Button from "../../../../../../components/Button";
import Professional from "../Professional";
import { getClassNames } from "../../../../../../helpers/format";
import { ITableItemMobileProps } from "./index.props";
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
import { downloadFile } from "../../../../../../redux/conversationSlice";
import { utc } from "../../../../../../helpers/date";

import { ReactComponent as Calendar } from "../../../../../../assets/svgs/date.svg";
import { ReactComponent as Message } from "../../../../../../assets/svgs/message.svg";
import { ReactComponent as Download } from "../../../../../../assets/svgs/download.svg";
import styles from "./index.module.css";

const noop = () => {};

const TableItemMobile = (props: ITableItemMobileProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data,
    status,
    className,
    onSendMessage = noop,
    onCalendar = noop,
    onChooseAccountant = noop,
  } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={styles.subjectContainer}>
        <Professional
          data={{
            firstName: data.accountantFirstName,
            lastName: data.accountantLastName,
            img: data.avatar,
            rating: data.stars,
          }}
        />
        <Tag color="default" style={{ height: "fit-content" }}>
          N/A
        </Tag>
      </div>

      <div className={getClassNames(styles.subjectContainer, styles.marginTop)}>
        <p>{t("quotes.date")}</p>
        <p>{utc(data.createdDate, DEFAULT_DATE_FORMAT)}</p>
        <p>{t("quotes.job")}</p>
        <p>{data.jobType}</p>
        <p>{t("quotes.quote")}</p>
        <div className={styles.quoteContainer}>
          <p className={styles.text}>${data.price}</p>
          {data.priceAttachment && (
            <Button
              type={"link"}
              icon={<Download />}
              style={{ alignSelf: "center", display: "contents" }}
              className={styles.pdfBtnContainer}
              onClick={() => {
                dispatch(
                  downloadFile(
                    Number(data.priceAttachment?.id),
                    data.priceAttachment?.name || "",
                  ),
                );
              }}
            />
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {data.actionStatusId === 0 ? (
          <Button
            type="ghost"
            text={t("quotes.btn_choose_accountant")}
            style={{ borderColor: "#0032da", color: "#0032da" }}
            onClick={() => {
              onChooseAccountant(data.quoteId);
            }}
          />
        ) : (
          <Tag color={status.color}>{status.text}</Tag>
        )}

        <Button
          type="ghost"
          icon={<Calendar />}
          style={{ borderColor: "#0032da" }}
          className={styles.button}
          onClick={() => {
            onCalendar(data.accountantId, data.quoteId, new Date());
          }}
        />

        <Button
          type="ghost"
          icon={<Message />}
          style={{ borderColor: "#0032da" }}
          className={styles.button}
          onClick={() => {
            onSendMessage(data.accountantId);
          }}
        />
      </div>
    </div>
  );
};

export default TableItemMobile;

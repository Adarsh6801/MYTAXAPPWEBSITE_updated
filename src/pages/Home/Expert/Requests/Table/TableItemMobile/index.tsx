import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../../../../../../components/Button";
import { getClassNames } from "../../../../../../helpers/format";
import { ITableItemMobileProps } from "./index.props";
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
import { downloadFile } from "../../../../../../redux/conversationSlice";
import { ACTION_STATUS } from "../../../../../../constants/status";
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
    actionStatus,
    className,
    onSendMessage = noop,
    onCalendar = noop,
    onConfirm = noop,
    onDecline = noop,
  } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={styles.subjectContainer}>
        <div>
          <p className={getClassNames(styles.marginBottom, styles.nameText)}>
            {`${data.taxpayerFirstName} ${data.taxpayerLastName}`}
          </p>
          <Link to={"#"}>View Summary</Link>
        </div>
        <Tag color={actionStatus.color} style={{ height: "fit-content" }}>
          {actionStatus.text}
        </Tag>
      </div>

      <div className={getClassNames(styles.subjectContainer, styles.marginTop)}>
        <p className={styles.otherText}>{t("quotes.date")}</p>
        <p>{utc(data.createdDate, DEFAULT_DATE_FORMAT)}</p>
        <p className={styles.otherText}>{t("quotes.job")}</p>
        <p>{data.jobType}</p>
        <p className={styles.otherText}>{t("quotes.quote")}</p>
        <div className={styles.quoteContainer}>
          <p className={styles.text}>{`$ ${data.price}`}</p>
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

      <div
        className={getClassNames(
          styles.buttonContainer,
          data.actionStatusId ===
            ACTION_STATUS.CHOSEN_WAITING_FOR_INFORMATION && styles.columns4,
        )}
      >
        {data.actionStatusId ===
          ACTION_STATUS.CHOSEN_WAITING_FOR_INFORMATION && (
          <>
            <Button
              type="ghost"
              text="Confirm"
              style={{ borderColor: "#0032da" }}
              className={getClassNames(styles.btn, styles.button)}
              onClick={() => {
                onConfirm(data.quoteId);
              }}
            />

            <Button
              type="ghost"
              text="Decline"
              style={{ borderColor: "#0032da" }}
              className={getClassNames(styles.btn, styles.button)}
              onClick={() => {
                onDecline(data.quoteId);
              }}
            />
          </>
        )}

        {/* <Button
          type="ghost"
          icon={<Calendar />}
          style={{ borderColor: "#0032da" }}
          className={styles.button}
          onClick={() => {
            onCalendar(data.taxpayerId);
          }}
        /> */}

        <Button
          type="ghost"
          icon={<Message />}
          style={{ borderColor: "#0032da" }}
          className={styles.button}
          onClick={() => {
            onSendMessage(data.taxpayerId);
          }}
        />
      </div>
    </div>
  );
};

export default TableItemMobile;

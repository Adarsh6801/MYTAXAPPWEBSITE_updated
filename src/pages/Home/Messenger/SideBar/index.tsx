import { useSelector } from "react-redux";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import {
  getBase64FormattedImage,
  getClassNames,
} from "../../../../helpers/format";
import { RootState } from "../../../../redux/store";
import { DEFAULT_DATE_FORMAT } from "../../../../constants/format";
import { IMessengerSideBarProps } from "./index.props";
import { utc } from "../../../../helpers/date";

import styles from "./index.module.css";

const MessengerSideBar = (props: IMessengerSideBarProps) => {
  const { t } = useTranslation();
  const { onMessageItemClick, current, showMessages } = props;
  const { data: messages = [] } = useSelector(
    (state: RootState) => state.message,
  );

  return (
    <aside
      className={
        !showMessages && window.innerWidth <= 576 ? styles.hide : styles.show
      }
    >
      <h2 className={styles.sidebarTitle}>{t("messages.title")}</h2>
      <div className={styles.messages}>
        {messages?.map((message, index) => (
          <div
            key={`messageId_${index}`}
            className={getClassNames(
              styles.messagesItem,
              message?.id == current && styles.activeMessageItem,
              message?.hasUnReadMessage && styles.unreadMessage,
            )}
          >
            <div
              className={styles.messageContent}
              onClick={() =>
                onMessageItemClick(message.id, message.connectionName)
              }
            >
              <Avatar
                size="large"
                src={getBase64FormattedImage(message.avatar)}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#CAD5F8", color: "#0032DA" }}
              />
              <div>
                <h3
                  className={styles.fullName}
                >{`${message?.firstName} ${message?.lastName}`}</h3>
                <span className={styles.date}>
                  {utc(message?.lastMessageDate, DEFAULT_DATE_FORMAT)}
                </span>
              </div>
            </div>

            <Divider className={styles.divider} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MessengerSideBar;

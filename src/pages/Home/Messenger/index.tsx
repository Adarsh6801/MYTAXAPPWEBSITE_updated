import { createRef, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {
  Avatar,
  Form,
  Input,
  Button,
  message,
  Upload,
  Tooltip,
  Popconfirm,
} from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { UploadFile } from "antd/lib/upload/interface";

import Loading from "../../../components/Loading";
import {
  getBase64FormattedImage,
  getClassNames,
} from "../../../helpers/format";
import {
  downloadFile,
  getConversation,
  sendMessage,
} from "../../../redux/conversationSlice";
import { getMessages } from "../../../redux/messageSlice";
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "../../../constants/format";
import { IMessengerFormData, ISendSocketMessage } from "./index.props";
import { dummyRequest } from "../../../helpers/file";
import ProfileNavbar from "../../../components/ProfileNavbar";
import { USER_ROLES } from "../../../constants/users";
import MessengerSideBar from "./SideBar";
import { utc } from "../../../helpers/date";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { ReactComponent as Back } from "../../../assets/svgs/back.svg";
import { ReactComponent as Send } from "../../../assets/svgs/send.svg";
import { ReactComponent as Attach } from "../../../assets/svgs/attach.svg";
import { ReactComponent as NoMessage } from "../../../assets/svgs/no-message.svg";
import styles from "./index.module.css";

const Messenger = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const messagesEndRef: any = createRef();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: messages = [], loading: messageLoading } = useAppSelector(
    state => state.message,
  );
  const { data: conversation, loading: conversationLoading } = useAppSelector(
    state => state.conversation,
  );
  const { user, loading: userLoading } = useAppSelector(state => state.user);
  const messageId = searchParams.get("messageId");
  const [current, setCurrent] = useState(messageId || messages[0]?.id || "");
  const [showMessages, setShowMessages] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [connection, setConnection] = useState<any>();
  const [conversationLength, setConversationLength] = useState(20);
  const currentMessage = messages?.find(item => item.id === Number(current));
  const initialValues: IMessengerFormData = {
    message: "",
  };
  const files: File[] | undefined = fileList?.map(
    (file: any) => file.originFileObj,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    if (!messageId) {
      setSearchParams(
        `?${createSearchParams({
          messageId: messages[0]?.id.toString() || "",
        }).toString()}`,
      );

      setCurrent(messages[0]?.id.toString() || "");
    }

    // Reset fileList on messageId change
    setFileList(undefined);
  }, [messageId]);

  const init = async () => {
    try {
      const data: any = await dispatch(getMessages());

      if (data.length > 0) {
        setSearchParams(
          `?${createSearchParams({
            messageId: current || data[0]?.id.toString() || "",
          }).toString()}`,
        );

        setCurrent(current || data[0]?.id.toString() || "");

        await dispatch(
          getConversation(current || data[0]?.id, 0, conversationLength),
        );
        await createConnection(data[0]?.connectionName, current || data[0]?.id);
      }
    } catch (e: any) {
      message.error(t("errors.global"));
    }
  };

  const createConnection = async (
    connectionName: string,
    currentUserId: number,
  ) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", () => {
        dispatch(getConversation(currentUserId, 0, conversationLength));
      });

      connection.onclose(e => {
        setConnection(undefined);
      });

      await connection.start();
      await connection.invoke("CreateConnection", connectionName);
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendSocketMessage = async (data: ISendSocketMessage) => {
    try {
      await connection.invoke("SendMessage", data);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const onMessageItemClick = async (id: number, connectionName: string) => {
    setSearchParams(
      `?${createSearchParams({
        messageId: id.toString(),
      }).toString()}`,
    );

    setCurrent(id.toString() || "");

    dispatch(getConversation(id, 0, conversationLength));
    setShowMessages(false);

    await closeConnection();
    await createConnection(connectionName, id);
  };

  const onFinish = async (values: IMessengerFormData) => {
    const files = fileList?.map(file => file.originFileObj!);

    if (!!values.message.trim() || (files && files?.length > 0)) {
      await dispatch(
        sendMessage({
          connectionId: Number(current),
          message: values.message,
          files,
        }),
      );

      await sendSocketMessage({
        connectionName:
          messages.find(message => message.id == current)?.connectionName || "",
        message: values.message,
      });

      setFileList(undefined);
      await dispatch(getMessages());
      await dispatch(getConversation(Number(current), 0, conversationLength));
    }

    form.resetFields();
  };

  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  if (messageLoading && messages.length === 0) {
    return <Loading />;
  }

  if (messages.length === 0) {
    return (
      <>
        <ProfileNavbar
          roleId={user?.roleId || USER_ROLES.Taxpayer}
          avatar={user?.avatar}
        />
        <div className={styles.noMessageContainer}>
          <NoMessage className={styles.noMessage} />
          <p className={styles.noMessageText}>{t("messages.no_data")}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />
      <section className={styles.container}>
        <MessengerSideBar
          current={current}
          showMessages={showMessages}
          onMessageItemClick={onMessageItemClick}
        />

        <div className={styles.conversationContainer}>
          <div className={styles.conversationHeader}>
            <Button
              type="text"
              icon={<Back />}
              className={styles.backBtn}
              onClick={() => setShowMessages(true)}
            />
            <h2
              className={styles.conversationTitle}
            >{`${currentMessage?.firstName} ${currentMessage?.lastName}`}</h2>
          </div>
          <p className={styles.conversationDescription}>
            {`Last message: ${utc(
              currentMessage?.lastMessageDate,
              DEFAULT_DATE_TIME_FORMAT,
            )}`}
          </p>

          <div className={styles.conversationInner}>
            <ul
              className={styles.conversation}
              onScroll={(e: any) => {
                if (e.target?.scrollTop === 0) {
                  dispatch(
                    getConversation(
                      Number(current),
                      0,
                      conversationLength + 20,
                    ),
                  );
                  setConversationLength(conversationLength + 20);
                }
              }}
            >
              {conversation?.map((item, index) => (
                <li
                  ref={
                    conversation.length - 1 === index
                      ? messagesEndRef
                      : undefined
                  }
                  key={`conversationId_${index}`}
                  className={getClassNames(
                    styles.conversationItem,
                    item.createdBy === user?.id &&
                      styles.activeConversationItem,
                  )}
                >
                  <Avatar
                    size="large"
                    src={getBase64FormattedImage(item.avatar)}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#CAD5F8", color: "#0032DA" }}
                  />
                  <div>
                    <h3 className={styles.fullName}>
                      {item.createdBy !== user?.id
                        ? `${currentMessage?.firstName} ${currentMessage?.lastName}`
                        : "You"}
                    </h3>
                    <span className={styles.date}>
                      {utc(item.createdDate, DEFAULT_TIME_FORMAT)}
                    </span>

                    <p>{item.message}</p>

                    <div
                      className={getClassNames(
                        styles.attachments,
                        styles.attachmentsLeft,
                      )}
                    >
                      {item.files.map((file: any, index: number) => (
                        <Tooltip
                          key={`conversation_file_${index}`}
                          title={`Click to download ${file.name}`}
                        >
                          <Button
                            type="text"
                            icon={<Attach />}
                            className={styles.attachedItemBtn}
                            onClick={() =>
                              dispatch(downloadFile(file.id, file.name))
                            }
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Form
              form={form}
              onFinish={onFinish}
              initialValues={initialValues}
              requiredMark={false}
              layout="vertical"
              className={styles.textAreaContainer}
            >
              {!!files?.length && (
                <div className={styles.attachments}>
                  {files?.map((file, index) => (
                    <Popconfirm
                      key={`file_${index}`}
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      title={`Are you sure to delete ${file.name}?`}
                      onConfirm={() => {
                        setFileList(
                          fileList?.filter((_: any, i: number) => i !== index),
                        );
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title={file.name}>
                        <Button
                          type="text"
                          icon={<Attach />}
                          className={styles.attachedItemBtn}
                        />
                      </Tooltip>
                    </Popconfirm>
                  ))}
                </div>
              )}

              <Form.Item name="message" noStyle>
                <Input.TextArea
                  placeholder={`Send a message to ${currentMessage?.firstName}`}
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  className={styles.textArea}
                />
              </Form.Item>

              <Upload
                multiple
                name="attachment"
                showUploadList={false}
                accept="image/png,image/jpeg,image/jpg,application/doc,application/docx,application/pdf"
                customRequest={dummyRequest}
                onChange={handleChange}
                fileList={fileList}
              >
                <Button
                  type="text"
                  icon={<Attach />}
                  className={styles.attachBtn}
                />
              </Upload>

              <Button
                htmlType="submit"
                type="text"
                icon={<Send />}
                className={styles.sendBtn}
              />
            </Form>
          </div>
        </div>
      </section>
      {(conversationLoading || userLoading) && <Loading type="secondary" />}
    </>
  );
};

export default Messenger;

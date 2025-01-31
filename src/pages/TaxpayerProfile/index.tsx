import { useEffect, useState } from "react";
import {
  Avatar,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Space,
  Upload,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

import ProfileNavbar from "../../components/ProfileNavbar";
import ProfileFooter from "../../components/ProfileFooter";
import Wrapper from "../../components/Wrapper";
import Loading from "../../components/Loading";
import { USER_ROLES } from "../../constants/users";
import { TAXPAYER_QUOTES } from "../../constants/routes";
import { getNotifications } from "../../redux/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser } from "../../redux/userSlice";
import { getBase64FormattedImage } from "../../helpers/format";
import Button from "../../components/Button";
import { ITaxpayerProfileForm } from "./index.props";
import { updateTaxpayerProfileDetails } from "../../redux/taxpayerProfileSlice";
import { dummyRequest, getBase64, normFile } from "../../helpers/file";
import { DEFAULT_DATE_FORMAT } from "../../constants/format";

import styles from "./index.module.css";

const TaxpayerProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm<ITaxpayerProfileForm>();
  const { user, loading: userLoading } = useAppSelector(state => state.user);
  const { loading: profileLoading } = useAppSelector(
    state => state.taxpayerProfile,
  );
  const [avatar, setAvatar] = useState<string | undefined>();
  const initialValues: ITaxpayerProfileForm = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    birthDate: user?.birthDate ? moment(user?.birthDate) : undefined,
    email: user?.email || "",
    twoFactorAuthIsActive: user?.twoFactorAuthIsActive,
  };

  const onFinish = async (values: ITaxpayerProfileForm) => {
    await dispatch(
      updateTaxpayerProfileDetails({
        ...values,
        birthDate: values.birthDate?.toDate(),
        avatar: values.avatar ? values.avatar[0].originFileObj : undefined,
      }),
    );
    await dispatch(getUser());

    message.success("Your account information has been successfully changed!");
    form.resetFields();
  };

  const onUpload = (file?: RcFile) => {
    if (file) {
      getBase64(file, (base64: string) => {
        setAvatar(base64);
      });
    }
  };

  const init = async () => {
    await dispatch(getUser());
    form.resetFields();
    dispatch(getNotifications());
  };

  useEffect(() => {
    setAvatar(getBase64FormattedImage(user?.avatar));
    user?.roleId !== USER_ROLES.Expert &&
      userLoading &&
      navigate(TAXPAYER_QUOTES);
  }, [user]);

  useEffect(() => {
    !user && init();
  }, []);

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />

      <div className={styles.container}>
        <Wrapper>
          <div className={styles.card}>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              initialValues={initialValues}
              className={styles.form}
            >
              <Row gutter={20} justify="center" align="middle">
                <Col>
                  <Space direction="vertical" align="center">
                    <Avatar size={120} src={avatar} icon={<UserOutlined />} />
                    <Form.Item
                      name="avatar"
                      valuePropName="file"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        customRequest={dummyRequest}
                        showUploadList={false}
                        maxCount={1}
                        accept="image/png,image/jpeg"
                        onChange={(info: UploadChangeParam<UploadFile>) => {
                          onUpload(info.file.originFileObj);
                        }}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          text="Upload Avatar"
                        />
                      </Upload>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>

              <Form.Item
                name="firstName"
                label={t("taxpayer_profile.first_name")}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: t("validations.invalid_input"),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={t("taxpayer_profile.last_name")}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: t("validations.invalid_input"),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="email" label={t("taxpayer_profile.email")}>
                <Input readOnly />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={t("taxpayer_profile.phone_number")}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: t("validations.invalid_input"),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="birthDate"
                label={t("taxpayer_profile.birth_date")}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format={DEFAULT_DATE_FORMAT}
                />
              </Form.Item>

              <Form.Item name="twoFactorAuthIsActive" valuePropName="checked">
                <Checkbox>Two Factor Authentication</Checkbox>
              </Form.Item>

              <Button
                block
                type="primary"
                text={t("taxpayer_profile.submit")}
                htmlType="submit"
                disabled={profileLoading}
                loading={profileLoading}
              />
            </Form>
          </div>
        </Wrapper>
      </div>

      <ProfileFooter className={styles.footer} />

      {(userLoading || profileLoading) && <Loading type="secondary" />}
    </>
  );
};

export default TaxpayerProfile;

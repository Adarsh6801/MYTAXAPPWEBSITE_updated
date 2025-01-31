import { useTranslation } from "react-i18next";
import {
  Radio,
  Space,
  Checkbox,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Avatar,
  Grid,
  DatePicker,
} from "antd";
import {
  MinusCircleOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import _ from "lodash";
import moment from "moment";

import Button from "../../../components/Button";
import { SERVICES, MEDIA } from "../index.constants";
import { dummyRequest, getBase64 } from "../../../helpers/file";
import {
  getExpertProfileInfo,
  updateExpertProfileDetails,
} from "../../../redux/expertProfileSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUser } from "../../../redux/userSlice";
import { DEFAULT_DATE_FORMAT } from "../../../constants/format";
import { getBase64FormattedImage } from "../../../helpers/format";
import { IEditProps } from "./index.props";

import Attach from "../../../assets/svgs/attach.svg";
import styles from "./index.module.css";

const { useBreakpoint } = Grid;
const noop = () => {};

const EditMode: React.FC<IEditProps> = props => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const { expertProfile, loading: profileLoading } = useAppSelector(
    state => state.expertProfile,
  );
  const { user, loading: userLoading } = useAppSelector(state => state.user);
  const { onSubmit = noop } = props;
  const [avatar, setAvatar] = useState(getBase64FormattedImage(user?.avatar));

  const onUpload = (file?: RcFile) => {
    if (file) {
      getBase64(file, (base64: string) => {
        setAvatar(base64);
      });
    }
  };

  const onFinish = async (values: any) => {
    const newValues = {
      ...values,
      taxPreparationTypeId: values.taxPreparationTypeId,
      pricingSystemFile: !!values.pricingSystemFile
        ? values?.pricingSystemFile?.originFileObj
        : null,
      avatar: values.avatar ? values.avatar.originFileObj : undefined,
      birthDate: values.birthDate?.toDate() || null,
    };

    await dispatch(updateExpertProfileDetails(newValues));
    await dispatch(getExpertProfileInfo());
    await dispatch(getUser());

    form.resetFields();
    onSubmit();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  const addTrainingEducation = () => {
    return (
      <Form.List name="accountantEducationList">
        {(fields, { add, remove }) => (
          <>
            <div>
              {fields.map(({ key, name, ...restField }, index) => (
                <div key={`field_${index}`}>
                  <div>
                    <p>N{index + 1}</p>
                  </div>
                  <Space direction="horizontal" wrap={!screens.sm}>
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      label={t("expert.step8.label1")}
                      rules={[
                        {
                          required: true,
                          message: t("validations.required"),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "degree"]}
                      label={t("expert.step8.label2")}
                      rules={[
                        {
                          required: true,
                          message: t("validations.required"),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "yearOfGraduation"]}
                      label={t("expert.step8.label3")}
                      rules={[
                        {
                          required: true,
                          message: t("validations.required"),
                        },
                      ]}
                    >
                      <Input maxLength={4} />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        className={styles.remove}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                </div>
              ))}
              <Form.Item>
                <Button
                  text={t("expert.step8.add_training_education")}
                  type="link"
                  onClick={() => add()}
                />
              </Form.Item>
            </div>
          </>
        )}
      </Form.List>
    );
  };

  const initialValues = {
    accountantEducationList: expertProfile?.accountantEducationList || [],
    taxPreparationTypeId: expertProfile?.taxPreparationTypeId
      ? Number(expertProfile?.taxPreparationTypeId)
      : null,
    workingTypeIds: expertProfile?.workingTypeIds || [],
    pricingSystemFile: null,
    aboutBusinessOrServiceStandOut:
      expertProfile?.aboutBusinessOrServiceStandOut,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber || "",
    birthDate: user?.birthDate ? moment(user?.birthDate) : undefined,
    linkedin: expertProfile?.linkedin,
    website: expertProfile?.website,
    twoFactorAuthIsActive: user?.twoFactorAuthIsActive,
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      requiredMark={false}
      form={form}
      layout="vertical"
      className={styles.form}
    >
      <Row gutter={[16, 16]} justify="center">
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
                <Button icon={<UploadOutlined />} text="Upload Avatar" />
              </Upload>
            </Form.Item>
          </Space>
        </Col>
      </Row>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: t("validations.required"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: t("validations.required"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="aboutBusinessOrServiceStandOut" label="Description">
        <Input.TextArea />
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

      <Form.Item name="birthDate" label={t("taxpayer_profile.birth_date")}>
        <DatePicker style={{ width: "100%" }} format={DEFAULT_DATE_FORMAT} />
      </Form.Item>

      <Form.Item name="linkedin" label="LinkedIn">
        <Input />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: t("validations.required"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col>
          <p className={styles.subTitle}>{t("profile.services")}</p>
          <Form.Item
            name="taxPreparationTypeId"
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={SERVICES.individual}>
                  {t("profile.radio_answer_1")}
                </Radio>
                <Radio value={SERVICES.business}>
                  {t("profile.radio_answer_2")}
                </Radio>
                <Radio value={SERVICES.both}>
                  {t("profile.radio_answer_3")}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col>
          <p className={styles.subTitle}>{t("profile.work")}</p>
          <Form.Item
            name="workingTypeIds"
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value={MEDIA.onlineOrPhone}>
                  {t("profile.checkbox_answer_1")}
                </Checkbox>
                <Checkbox value={MEDIA.myCustomersTravelMe}>
                  {t("profile.checkbox_answer_2")}
                </Checkbox>
                <Checkbox value={MEDIA.travelMyCustomers}>
                  {t("profile.checkbox_answer_3")}
                </Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>

      <p>{t("profile.education")}</p>
      <div>{addTrainingEducation()}</div>
      <p>{t("profile.standard_Pricing")}</p>

      <div className={styles.upload}>
        <Form.Item
          name="pricingSystemFile"
          valuePropName="file"
          getValueFromEvent={normFile}
        >
          <Upload
            accept="image/png,image/jpeg,application/doc,application/pdf"
            customRequest={dummyRequest}
            maxCount={1}
          >
            <Button
              icon={<img src={Attach} className={styles.img} />}
              text={t("expert.step8.attach")}
              type="ghost"
            />
          </Upload>
        </Form.Item>

        {expertProfile?.pricingSystemFile && (
          <p>
            The last file is: <i>{expertProfile?.pricingSystemFile.name}</i>
          </p>
        )}
      </div>

      <p className={styles.subTitle}>System Settings</p>
      <Form.Item name="twoFactorAuthIsActive" valuePropName="checked">
        <Checkbox>Two Factor Authentication</Checkbox>
      </Form.Item>

      <Button
        block
        type="primary"
        text={t("taxpayer_profile.submit")}
        htmlType="submit"
        disabled={profileLoading || userLoading}
        loading={profileLoading || userLoading}
      />
    </Form>
  );
};

export default EditMode;

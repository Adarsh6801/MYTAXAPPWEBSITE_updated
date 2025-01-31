import { useState } from "react";
import {
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
  Upload,
} from "antd";
import { useTranslation } from "react-i18next";

import { IRequestModalFormData, IRequestModalProps } from "./index.props";
import { getClassNames } from "../../helpers/format";
import { dummyRequest } from "../../helpers/file";
import Button from "../Button";

import { ReactComponent as Message } from "../../assets/svgs/message.svg";
import styles from "./index.module.css";

const noop = () => {};

const RequestModal = (props: IRequestModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [checkboxValue, setCheckboxValue] = useState(false);
  const {
    className,
    title,
    data,
    description = "",
    hasActions = true,
    onSendMessage = noop,
    onSendQuote = noop,
    onCancel,
    isModalVisible,
    customActions,
  } = props;

  const onFinish = (values: IRequestModalFormData) => {
    const newValues = {
      ...values,
      price: values.price.toString(),
      priceListAttachment:
        !checkboxValue && !!values.priceListAttachment
          ? values?.priceListAttachment[0]?.originFileObj
          : null,
    };

    onSendQuote(newValues);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const initialValues = {
    price: 0,
    attachStandardPricingList: false,
  };

  return (
    <Modal
      title={title}
      open={isModalVisible}
      closable
      onCancel={onCancel}
      footer={null}
      width={720}
      centered
    >
      <div className={getClassNames(styles.container, className)}>
        <Row gutter={[0, 10]}>
          {data
            .filter(item => !!item.text)
            .map((item, index) => (
              <Col key={`requestItem_${index}`} xs={24} md={12}>
                <div className={styles.content}>
                  {item.icon}
                  <span className={styles.text}>{item.text}</span>
                </div>
              </Col>
            ))}
        </Row>
        {description && (
          <div style={{ marginTop: 15 }}>
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        )}
        <Divider className={styles.divider} />
        {customActions}
        {hasActions && (
          <>
            <Form
              form={form}
              name="sendQuote"
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              initialValues={initialValues}
              onFieldsChange={(field: any) => {
                if (field[0]?.name[0] === "attachStandardPricingList") {
                  setCheckboxValue(field[0].value);
                }
              }}
            >
              <h1 className={styles.formTitle}>Send quote</h1>

              <Form.Item
                name="price"
                label={"Your estimated price for this Request"}
                rules={[
                  {
                    required: true,
                    message: t("validations.required"),
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={100000}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
                  className={styles.numberInput}
                />
              </Form.Item>

              <Form.Item
                name="attachStandardPricingList"
                valuePropName="checked"
              >
                <Checkbox>
                  Check this if you want your standard pricing list to be
                  attached
                </Checkbox>
              </Form.Item>
              {!checkboxValue && (
                <Form.Item
                  name="priceListAttachment"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    customRequest={dummyRequest}
                    accept="application/pdf,application/docx,application/doc"
                  >
                    <Button
                      type="link"
                      text="Add new list"
                      className={styles.uploadBtn}
                    />
                  </Upload>
                </Form.Item>
              )}
            </Form>
            <Divider className={styles.divider} />

            <Row justify="space-between">
              <Col>
                <Button
                  icon={<Message />}
                  onClick={onSendMessage}
                  className={styles.iconBtn}
                />
              </Col>
              <Col>
                <Button
                  text={t("request_card.send_btn")}
                  onClick={() => form.submit()}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    </Modal>
  );
};

export default RequestModal;

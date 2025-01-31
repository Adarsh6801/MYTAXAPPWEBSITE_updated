import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Space, Divider, Upload } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import Button from "../../../../../components/Button";
import CircularDirection from "../../../../../components/CircularDirection";
import RadioGroup from "../../../../../components/RadioGroup";
import { getClassNames } from "../../../../../helpers/format";
import { IRadioGroupItem } from "../../../../../components/RadioGroup/index.props";
import { IExpertStepsProps } from "../index.props";
import { IExpertStep8FormData } from "./index.props";
import { dummyRequest } from "../../../../../helpers/file";

import Attach from "../../../../../assets/svgs/attach.svg";
import styles from "./index.module.css";

const noop = () => {};

const Step8 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [file, setFile] = useState<any>();

  const handleChange = (info: any) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFile(info.file.originFileObj);
    setFileList(fileList);
  };

  const onFinish = (values: IExpertStep8FormData) => {
    onStepSubmit({ ...values, pricingSystemAttachment: file });
    nextStep();
  };

  const AddTrainingEducation = () => {
    return (
      <Form.List name="accountantEducationList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                className={styles.inputContainer}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "institution"]}
                  label={
                    <label className={styles.label}>
                      {t("expert.step8.label1")}
                    </label>
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "degree"]}
                  label={
                    <label className={styles.label}>
                      {t("expert.step8.label2")}
                    </label>
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "yearOfGraduation"]}
                  label={
                    <label className={styles.label}>
                      {t("expert.step8.label3")}
                    </label>
                  }
                >
                  <Input />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined
                    className={styles.remove}
                    onClick={() => remove(name)}
                  />
                )}
              </Space>
            ))}
            <Form.Item>
              <Button
                text={t("expert.step8.add_training_education")}
                type="link"
                onClick={() => add()}
              />
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step3.yes"),
      value: true,
    },
    {
      label: t("individual.step3.no"),
      value: false,
    },
  ];

  const initialValues: IExpertStep8FormData = {
    accountantEducationList: state?.accountantEducationList || [""],
    hasPricingSystem: state?.hasPricingSystem,
    pricingSystemAttachment: state?.pricingSystemAttachment,
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.set_up_profile")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h2 className={styles.title}>{t("expert.step8.question")}</h2>
      <p className={getClassNames(styles.description, styles.marginTop)}>
        {t("expert.step8.description")}
      </p>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        {AddTrainingEducation()}
        <Divider />
        <div className={styles.servicesContainer}>
          <Form.Item
            name="hasPricingSystem"
            label={t("expert.step8.system_your_services")}
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
          >
            <RadioGroup
              data={radioButtons}
              onChange={e => {
                setShow(e.target.value);
              }}
              direction={"horizontal"}
            />
          </Form.Item>
          <div className={styles.upload}>
            {show && (
              <Form.Item
                name="pricingSystemAttachment"
                rules={[
                  {
                    required: true,
                    message: t("validations.required"),
                  },
                  {
                    validator: (_, value) => {
                      return value && fileList.length > 0
                        ? Promise.resolve()
                        : Promise.reject();
                    },
                    message: t("validations.required"),
                  },
                ]}
              >
                <Upload
                  accept="image/png,image/jpeg,application/doc,application/pdf"
                  customRequest={dummyRequest}
                  className={styles.upload}
                  onChange={handleChange}
                  onRemove={() => {
                    setFileList([]);
                    form.resetFields(["pricingSystemAttachment"]);
                  }}
                  fileList={fileList}
                >
                  <Button
                    icon={<img src={Attach} className={styles.img} />}
                    text={t("expert.step8.attach")}
                    type="ghost"
                  />
                </Upload>
              </Form.Item>
            )}
          </div>
        </div>
        <CircularDirection
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default Step8;

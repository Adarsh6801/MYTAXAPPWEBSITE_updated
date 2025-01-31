import { useTranslation } from "react-i18next";
import { Form, InputNumber } from "antd";
import { useRef } from "react";
import { isInteger } from "lodash";

import CircularDirection from "../../../../../../../components/CircularDirection";
import {
  MAX_EMPLOYER,
  MIN_EMPLOYER,
} from "../../../../../../../constants/settings";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep3FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step3 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep3FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep3FormData = {
    entityMembersCount: state?.entityMembersCount || 0,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step3.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="entityMembersCount"
          rules={[
            {
              required: true,
              validator: (_, value) =>
                isInteger(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("validations.natural_number"))),
            },
          ]}
        >
          <InputNumber
            min={MIN_EMPLOYER}
            max={MAX_EMPLOYER}
            defaultValue={form.getFieldValue("entityMembersCount")}
          />
        </Form.Item>

        <CircularDirection
          onClickLeft={prevStep}
          rightButton={{
            htmlType: "submit",
          }}
        />
      </Form>
    </div>
  );
};

export default Step3;

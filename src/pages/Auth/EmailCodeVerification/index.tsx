import { Link } from "react-router-dom";
import ReactCodeInput from "react-code-input";
import { Trans, useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Form } from "antd";

import Wrapper from "../../../components/Wrapper";
import Button from "../../../components/Button";
import { IEmailVerificationSuccess } from "./index.props";
import { INITIAL_PAGE, RESET_PASSWORD_PAGE } from "../../../constants/routes";
import { SMS_CODE_LENGTH } from "../../../constants/settings";

import Scissors from "../../../assets/svgs/scissors-mask4.svg";
import Dots from "../../../assets/svgs/dots-group2.svg";
import Mail from "../../../assets/svgs/mail.svg";
import Logo from "../../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const EmailVerificationSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const onFinish = (values: IEmailVerificationSuccess) => {
    navigate(RESET_PASSWORD_PAGE, { state: values, replace: true });
  };

  const checkCode = (_: any, value: any) => {
    if (value.length === SMS_CODE_LENGTH) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(t("validations.wrong_sms_code")));
  };

  const initialValues = {
    code: "",
  };

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <Link to={INITIAL_PAGE} className={styles.logo}>
          <img src={Logo} alt="MyTaxApp logo" />
        </Link>

        <div className={styles.formContainer}>
          <div className={styles.iconContainer}>
            <img src={Mail} alt="Email" />
          </div>
          <h1 className={styles.title}>
            {t("email_verification_success.title")}
          </h1>
          <p className={styles.description}>
            {
              <Trans
                i18nKey="email_verification_success.description"
                values={{ mail: email }}
                components={[<>text</>]}
              />
            }
          </p>
          <div>
            <Form
              name="forgotPassword"
              layout="vertical"
              requiredMark={false}
              initialValues={initialValues}
              onFinish={onFinish}
            >
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    validator: checkCode,
                  },
                ]}
              >
                <ReactCodeInput
                  name="code"
                  inputMode={"numeric"}
                  type="tel"
                  fields={SMS_CODE_LENGTH}
                  className={styles.codeContainer}
                  inputStyle={{
                    flexDirection: "row",
                    width: "60px",
                    height: "80px",
                    fontSize: "50px",
                    textAlign: "center",
                    borderRadius: "4px",
                    color: "black",
                    margin: "0px, auto",
                    border: "1px solid #CAD5F8",
                  }}
                />
              </Form.Item>
              <Form.Item className={styles.reset}>
                <Button
                  text={t("email_verification_success.submit_btn")}
                  type="primary"
                  htmlType="submit"
                  block
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <img src={Dots} className={styles.dots} alt="Tax App dots" />
      </Wrapper>
      <img src={Scissors} className={styles.mask} alt="MyTaxApp" />
    </section>
  );
};

export default EmailVerificationSuccess;

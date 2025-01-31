import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";
import Button from "../../../components/Button";
import { forgotPassword } from "../../../redux/authSlice";
import {
  EMAIL_CODE_VERIFICATION_PAGE,
  INITIAL_PAGE,
} from "../../../constants/routes";
import { RootState } from "../../../redux/store";
import { IForgotPassword } from "./index.props";
import { EMAIL_LENGTH } from "../../../constants/settings";

import Scissors from "../../../assets/svgs/scissors-mask4.svg";
import Dots from "../../../assets/svgs/dots-group2.svg";
import Logo from "../../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: IForgotPassword) => {
    try {
      await dispatch(forgotPassword(values));
      message.success(t("success.forgot_password"));
      navigate(
        `${EMAIL_CODE_VERIFICATION_PAGE}?${createSearchParams({
          email: values.email,
        }).toString()}`,
      );
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const initialValues = {
    email: "",
  };

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <Link to={INITIAL_PAGE} className={styles.logo}>
          <img src={Logo} alt="MyTaxApp logo" />
        </Link>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>{t("forgot_password.title")}</h1>

          <Form
            name="forgotPassword"
            layout="vertical"
            requiredMark={false}
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label={t("forgot_password.email")}
              rules={[
                {
                  type: "email",
                  message: t("validations.invalid_email"),
                },
                {
                  required: true,
                  message: t("validations.empty_email"),
                },
              ]}
            >
              <Input maxLength={EMAIL_LENGTH} />
            </Form.Item>

            <Form.Item className={styles.reset}>
              <Button
                text={t("forgot_password.submit_btn")}
                type="primary"
                htmlType="submit"
                className={styles.button}
                loading={loading}
                disabled={loading}
              />
            </Form.Item>
          </Form>
        </div>
        <img src={Dots} className={styles.dots} alt="Tax App dots" />
      </Wrapper>
      <img src={Scissors} className={styles.mask} alt="MyTaxApp" />
    </section>
  );
};

export default ForgotPassword;

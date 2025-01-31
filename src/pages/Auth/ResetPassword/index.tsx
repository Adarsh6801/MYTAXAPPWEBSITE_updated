import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, message } from "antd";
import { useTranslation } from "react-i18next";

import { RootState } from "../../../redux/store";
import Wrapper from "../../../components/Wrapper";
import { resetPassword } from "../../../redux/authSlice";
import { INITIAL_PAGE } from "../../../constants/routes";
import Button from "../../../components/Button";
import PasswordInput from "../../../components/PasswordInput";
import { IResetPassword } from "./index.props";

import Scissors from "../../../assets/svgs/scissors-mask4.svg";
import Dots from "../../../assets/svgs/dots-group2.svg";
import Logo from "../../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const ResetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: routeState }: any = useLocation();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: IResetPassword) => {
    try {
      await dispatch(
        resetPassword({ ...values, validationCode: routeState?.code }),
      );
      message.success(t("success.password_reset"));
      navigate(INITIAL_PAGE);
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const initialValues: IResetPassword = {
    password: "",
    confirmPassword: "",
  };

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <Link to={INITIAL_PAGE} className={styles.logo}>
          <img src={Logo} alt="MyTaxApp logo" />
        </Link>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>{t("reset_password.title")}</h1>

          <Form
            name="resetPassword"
            layout="vertical"
            requiredMark={false}
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item
              name="password"
              label={t("reset_password.password")}
              rules={[
                {
                  required: true,
                  message: t("validations.empty_password"),
                },
                {
                  min: 8,
                  message: t("validations.min_password"),
                },
              ]}
            >
              <PasswordInput />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={t("reset_password.confirm_password")}
              rules={[
                {
                  required: true,
                  message: t("validations.empty_password"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error(t("validations.match")));
                  },
                }),
              ]}
            >
              <PasswordInput />
            </Form.Item>

            <Form.Item className={styles.reset}>
              <Button
                text={t("reset_password.submit_btn")}
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

export default ResetPassword;

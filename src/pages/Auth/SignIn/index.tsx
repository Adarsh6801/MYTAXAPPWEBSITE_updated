import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Modal, message } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import { RootState } from "../../../redux/store";
import Wrapper from "../../../components/Wrapper";
import { signIn, signInWithValidationCode } from "../../../redux/authSlice";
import {
  EXPERT_REQUESTS,
  FORGOT_PASSWORD_PAGE,
  INITIAL_PAGE,
  SIGN_UP_EXPERT_PAGE,
  SIGN_UP_TAX_PAYER_PAGE,
  TAXPAYER_QUOTES,
} from "../../../constants/routes";
import Button from "../../../components/Button";
import { EMAIL_LENGTH, SMS_CODE_LENGTH } from "../../../constants/settings";
import PasswordInput from "../../../components/PasswordInput";
import { USER_ROLES } from "../../../constants/users";
import { getExpertProfileInfo } from "../../../redux/expertProfileSlice";
import { getNotifications } from "../../../redux/notificationSlice";
import {
  getLandingUserType,
  getUrlForRedirection,
  removeUrlForRedirection,
} from "../../../helpers/storage";
import { getUser } from "../../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Scissors from "../../../assets/svgs/scissors-mask4.svg";
import Dots from "../../../assets/svgs/dots-group2.svg";
import Logo from "../../../assets/svgs/logo.svg";
import styles from "./index.module.css";
import { ISignInWithValidationCodePayload } from "../../../redux/authSlice/index.props";
import ReactCodeInput from "react-code-input";

const SignIn = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, token } = useAppSelector((state: RootState) => state.auth);
  const { user, loading: userLoading } = useAppSelector(
    (state: RootState) => state.user,
  );
  const [twoFactorPopupOpen, setTwoFactorPopupOpen] = useState(false);
  const storedUrl = getUrlForRedirection();
  const userType = getLandingUserType();

  const onFinish = async (values: any) => {
    try {
      const res = await dispatch(signIn(values));

      if (res?.twoFactorAuthIsActive) {
        setTwoFactorPopupOpen(true);
        return;
      }

      if (storedUrl) {
        removeUrlForRedirection();
        navigate(storedUrl);
      }
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const twoFactorAuth = async (values: ISignInWithValidationCodePayload) => {
    try {
      values.email = form.getFieldValue("email");
      await dispatch(signInWithValidationCode(values));

      setTwoFactorPopupOpen(false);

      if (storedUrl) {
        removeUrlForRedirection();
        navigate(storedUrl);
      }
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const checkCode = (_: any, value: any) => {
    if (value.length === SMS_CODE_LENGTH) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(t("validations.wrong_sms_code")));
  };

  useEffect(() => {
    if (token) {
      dispatch(getUser());
      dispatch(getNotifications());
      if (user?.roleId === USER_ROLES.Expert) {
        dispatch(getExpertProfileInfo());
      }

      if (user?.roleId) {
        navigate(
          user.roleId === USER_ROLES.Taxpayer
            ? TAXPAYER_QUOTES
            : EXPERT_REQUESTS,
          { state: { from: location }, replace: true },
        );
      }
    }
  }, [token, user]);

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <Link to={INITIAL_PAGE} className={styles.logo}>
          <img src={Logo} alt="MyTaxApp logo" />
        </Link>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>{t("sign_in.title")}</h1>

          <Form
            form={form}
            name="login"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label={t("sign_in.email")}
              rules={[
                {
                  type: "email",
                  message: t("validations.invalid_email"),
                },
                {
                  required: true,
                  message: t("validations.empty_email"),
                },
                {
                  validator: (_, value) =>
                    !value.includes(" ")
                      ? Promise.resolve()
                      : Promise.reject(new Error("No spaces allowed")),
                },
              ]}
            >
              <Input maxLength={EMAIL_LENGTH} />
            </Form.Item>
            <Form.Item
              name="password"
              label={t("sign_in.password")}
              rules={[
                {
                  required: true,
                  message: t("validations.empty_password"),
                },
                {
                  validator: (_, value) =>
                    !value.includes(" ")
                      ? Promise.resolve()
                      : Promise.reject(new Error("No spaces allowed")),
                },
              ]}
            >
              <PasswordInput />
            </Form.Item>
            <Form.Item className={styles.reset}>
              <Link to={FORGOT_PASSWORD_PAGE}>
                {t("sign_in.forgot_password")}
              </Link>
            </Form.Item>

            <Form.Item className={styles.reset}>
              <Button
                text={t("sign_in.submit_btn")}
                type="primary"
                htmlType="submit"
                className={styles.button}
                loading={loading || userLoading}
                disabled={loading}
              />
            </Form.Item>

            <Form.Item noStyle>
              <p className={styles.register}>{t("sign_in.has_account")}</p>
              <Link
                to={
                  userType === "expert"
                    ? SIGN_UP_EXPERT_PAGE
                    : SIGN_UP_TAX_PAYER_PAGE
                }
              >
                {t("sign_in.sign_up")}
              </Link>
            </Form.Item>
          </Form>
        </div>
        <img src={Dots} className={styles.dots} alt="Tax App dots" />
      </Wrapper>
      <img src={Scissors} className={styles.mask} alt="MyTaxApp" />

      {twoFactorPopupOpen && (
        <Modal
          onCancel={() => setTwoFactorPopupOpen(false)}
          title="2FA Code"
          open={twoFactorPopupOpen}
          footer={null}
        >
          <p style={{ textAlign: "center" }}>
            Your verification code has been sent to your email.
            <br />
            Please fill out 2FA code below
          </p>
          <Form
            name="twoFA"
            layout="vertical"
            requiredMark={false}
            onFinish={twoFactorAuth}
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
                className={styles.code}
                inputStyle={{
                  flexDirection: "row",
                  width: "40px",
                  height: "50px",
                  fontSize: "30px",
                  textAlign: "center",
                  borderRadius: "5px",
                  color: "black",
                  margin: "0px 5px",
                  border: "1px solid #CAD5F8",
                }}
              />
            </Form.Item>

            <Form.Item className={styles.reset}>
              <Button
                text="Submit"
                type="primary"
                htmlType="submit"
                className={styles.button}
                loading={loading || userLoading}
                disabled={loading}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </section>
  );
};

export default SignIn;

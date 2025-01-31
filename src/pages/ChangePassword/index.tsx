import { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import { useForm } from "antd/lib/form/Form";

import ProfileNavbar from "../../components/ProfileNavbar";
import ProfileFooter from "../../components/ProfileFooter";
import Wrapper from "../../components/Wrapper";
import Loading from "../../components/Loading";
import { USER_ROLES } from "../../constants/users";
import {
  EXPERT_PROFILE_PAGE,
  TAXPAYER_PROFILE_PAGE,
} from "../../constants/routes";
import { getNotifications } from "../../redux/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser } from "../../redux/userSlice";
import Button from "../../components/Button";
import { IChangePasswordForm } from "./index.props";
import { changePassword } from "../../redux/authSlice";

import styles from "./index.module.css";

const ChangePassword = () => {
  const [form] = useForm<IChangePasswordForm>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading: authLoading } = useAppSelector(state => state.auth);
  const { user, loading: userLoading } = useAppSelector(state => state.user);

  const onFinish = async (values: IChangePasswordForm) => {
    try {
      await dispatch(changePassword(values));
      message.success("Your password has been successfully changed!");
      form.resetFields();
      navigate(
        user?.roleId === USER_ROLES.Taxpayer
          ? TAXPAYER_PROFILE_PAGE
          : EXPERT_PROFILE_PAGE,
      );
    } catch (e: any) {
      message.error(e.data?.errorMessage || "Something went wrong!");
    }
  };

  const init = async () => {
    await dispatch(getUser());
    form.resetFields();
    dispatch(getNotifications());
  };

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
            <Form onFinish={onFinish} layout="vertical" className={styles.form}>
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Password doesn't match");
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={authLoading}
                  loading={authLoading}
                  text="Change Password"
                />
              </Form.Item>
            </Form>
          </div>
        </Wrapper>
      </div>

      <ProfileFooter className={styles.footer} />

      {(userLoading || authLoading) && <Loading type="secondary" />}
    </>
  );
};

export default ChangePassword;

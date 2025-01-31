import { Form, Input, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import ProfileFooter from "../../components/ProfileFooter";
import LandingNavbar from "../../components/LandingNavbar";
import { sendContactUsMessage } from "../../redux/contactSlice";
import { useAppDispatch } from "../../redux/hooks";
import { IContactUsForm } from "./index.interfaces";
import Button from "../../components/Button";
import { INITIAL_PAGE } from "../../constants/routes";

import { ReactComponent as FacebookIcon } from "../../assets/svgs/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svgs/instagram.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/svgs/linkedin-white.svg";
import { ReactComponent as ChatIcon } from "../../assets/svgs/chat.svg";
import { ReactComponent as MarkerIcon } from "../../assets/svgs/marker.svg";
import { ReactComponent as PhoneIcon } from "../../assets/svgs/phone.svg";
import styles from "./index.module.css";

const ContactUs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: IContactUsForm) => {
    try {
      await dispatch(sendContactUsMessage(values));
      message.success("Your message has been successfully sent!");

      navigate(INITIAL_PAGE);
    } catch {
      message.error(
        "Failed send a message, please try again a little bit later!",
      );
    }
  };

  return (
    <div>
      <LandingNavbar />
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <h3>{t("contact_us.contact_information")}</h3>

          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <ChatIcon />
              </div>
              <div>
                <h4>{t("contact_us.chat")}</h4>
                <p className={styles.description}>
                  {t("contact_us.chat_description")}
                </p>
                <p className={styles.info}>
                  <a href="mailto:info@mytaxapp.com">info@mytaxapp.com</a>
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <MarkerIcon />
              </div>
              <div>
                <h4>{t("contact_us.location")}</h4>
                <p className={styles.description}>
                  {t("contact_us.location_description")}
                </p>
                <p className={styles.info}>
                  290 E Verdugo Ave., Suite 204, Burbank, CA 91502
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <PhoneIcon />
              </div>
              <div>
                <h4>{t("contact_us.phone")}</h4>
                <p className={styles.description}>
                  {t("contact_us.phone_description")}
                </p>
                <p className={styles.info}>
                  <a href="tel:+1 (818) 582-5945">+1 (818) 582-5945</a>
                </p>
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: 60, marginBottom: 10 }}>
            {t("contact_us.social_media")}
          </h3>
          <Space>
            <a
              href="https://www.instagram.com/mytaxapp.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.facebook.com/MyTaxApplication"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/mytaxapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
          </Space>
        </div>

        <div className={styles.rightSide}>
          <Form
            name="contactUs"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            className={styles.form}
          >
            <Form.Item
              name="fullName"
              label="Full Name"
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
              name="organizationName"
              label="Organization Name"
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
              name="phone"
              label="Phone"
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
              name="email"
              label="Email"
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
              <Input />
            </Form.Item>

            <Form.Item name="message" label="Message">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Button text="Submit" type="primary" htmlType="submit" block />
          </Form>
        </div>
      </div>
      <ProfileFooter />
    </div>
  );
};

export default ContactUs;

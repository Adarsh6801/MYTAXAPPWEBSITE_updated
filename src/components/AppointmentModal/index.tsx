import { useState } from "react";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, Divider, Calendar, Radio } from "antd";

import Button from "../Button";
import RadioGroupCard from "../RadioGroupCard";
import { RADIO_CARD_DATA } from "../../constants/modal";
import { HOURS_MODAL } from "../../constants/organizer";
import { getClassNames } from "../../helpers/format";
import {
  IAppointmentModalProps,
  IAppointmentModalInitialValue,
} from "./index.props";
import { ICreateAppointmentPayload } from "../../redux/appointmentSlice/index.props";

import Close from "../../assets/svgs/close-modal.svg";
import ArrowLeft from "../../assets/svgs/arrow-left-calendar.svg";
import ArrowRight from "../../assets/svgs/arrow-right-calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const AppointmentModal = (props: IAppointmentModalProps) => {
  const { t } = useTranslation();
  const {
    isOpened,
    onClose,
    onSubmit = noop,
    quoteId,
    availableHours,
    onDateChange = () => {},
  } = props;
  const [month, setMonth] = useState(moment().month());
  const [year, setYear] = useState(moment().year());
  const [date, setDate] = useState(moment());

  const onFinish = (values: IAppointmentModalInitialValue) => {
    const fullDate = moment(date).local();
    const time = HOURS_MODAL[+values.time].label;
    fullDate.set({
      h: Number(time.split(":")[0]),
      m: Number(time.split(":")[1]),
      s: 0,
    });

    const newValue: ICreateAppointmentPayload = {
      additionalComments: values.additionalComments,
      appointmentTypeId: values.appointmentTypeId,
      quoteId: quoteId,
      dateTime: fullDate,
      time: Number(values.time),
    };

    onSubmit(newValue);
  };

  const onPanelChange = (calendarDate: Moment) => {
    setYear(calendarDate.year());
    setMonth(calendarDate.month());
    setDate(
      moment([moment(calendarDate).year(), moment(calendarDate).month(), 1]),
    );
  };

  const onSelect = (calendarDate: Moment) => {
    const newDate = moment([
      moment(calendarDate).year(),
      moment(calendarDate).month(),
      moment(calendarDate).date(),
    ]);

    setDate(newDate);
    onDateChange(new Date(newDate.utcOffset(0, true).toString()));
  };

  const initialValues: IAppointmentModalInitialValue = {
    appointmentTypeId: 1,
    date: "",
    additionalComments: "",
    time: "",
  };

  return (
    <Modal
      centered
      open={isOpened}
      onCancel={onClose}
      className={styles.container}
      closeIcon={<img src={Close} />}
      width={"90%"}
      footer={null}
      style={{ borderRadius: 30, overflow: "hidden" }}
      bodyStyle={{ borderRadius: 30, overflow: "hidden" }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <h3 className={styles.title}>{t("modal.title")}</h3>
        <Divider />
        <div className={styles.radioContainer}>
          <p className={styles.subTitle}>{t("modal.appointment_type")}</p>
          <Form.Item
            name="appointmentTypeId"
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
            className={styles.radio}
          >
            <RadioGroupCard data={RADIO_CARD_DATA} direction="horizontal" />
          </Form.Item>

          <Form.Item
            name="additionalComments"
            label={t("modal.additional_comment")}
            className={styles.inputContainer}
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <div className={styles.dateContainer}>
          <p className={styles.subTitle}>{t("modal.date")}</p>
          <Form.Item name="date" className={styles.calendar}>
            <div>
              <Calendar
                fullscreen={false}
                defaultValue={date}
                disabledDate={current => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current < moment(customDate, "YYYY-MM-DD");
                }}
                onPanelChange={onPanelChange}
                onSelect={onSelect}
                headerRender={({ value, type, onChange }) => {
                  const months = [];
                  const current = value.clone();
                  const localeData = value.localeData();

                  for (let i = 0; i < 12; i++) {
                    current.month(i);
                    months.push(localeData.months(current));
                  }

                  const prevMonth = () => {
                    if (month === 0) {
                      setMonth(11);
                      setYear(year - 1);
                    }
                    if (month !== 0) {
                      setMonth(month - 1);
                    }
                    onChange(moment([year, month]));
                  };

                  const nextMonth = () => {
                    if (month === 11) {
                      setMonth(0);
                      setYear(year + 1);
                    }
                    if (month !== 11) {
                      setMonth(month + 1);
                    }
                    onChange(moment([year, month]));
                  };

                  return (
                    <div className={styles.calendarHeder}>
                      <Button
                        icon={<img src={ArrowLeft} />}
                        type={"link"}
                        onClick={prevMonth}
                        className={styles.btn}
                      />
                      <p className={styles.dateText}>
                        {months[month]} {year}
                      </p>
                      <Button
                        icon={<img src={ArrowRight} />}
                        type={"link"}
                        onClick={nextMonth}
                        className={styles.btn}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </Form.Item>

          <div className={styles.hoursContainer}>
            <h1>{t("modal.available_slots")}</h1>
            <Form.Item
              name="time"
              rules={[
                {
                  required: true,
                  message: t("validations.required"),
                },
              ]}
            >
              <Radio.Group value={initialValues.time} buttonStyle="solid">
                <div className={styles.wrapper}>
                  {Object.entries(HOURS_MODAL).map(
                    ([key, value]: any, index: number) => (
                      <>
                        {availableHours?.length > 0 ? (
                          availableHours.find(
                            item => item == value.value && !value.disabled,
                          ) && (
                            <div
                              className={styles.radioBtnContainer}
                              key={index}
                            >
                              <Radio.Button
                                className={getClassNames(
                                  styles.radioButton,
                                  value.disabled && styles.disabledButton,
                                )}
                                value={value.value}
                                disabled={value.disabled}
                              >
                                {moment(value.label, "H:mm").format("hh:mm A")}
                              </Radio.Button>
                            </div>
                          )
                        ) : (
                          <p>Not have available hours</p>
                        )}
                      </>
                    ),
                  )}
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Divider />

        <div className={styles.submitBtnContainer}>
          <Button type="primary" htmlType="submit" text={t("modal.btn")} />
        </div>
      </Form>
    </Modal>
  );
};

export default AppointmentModal;

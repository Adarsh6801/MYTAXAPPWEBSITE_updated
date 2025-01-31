import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import ProfileNavbar from "../../../../components/ProfileNavbar";
import { USER_ROLES } from "../../../../constants/users";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Wrapper from "../../../../components/Wrapper";

import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./index.module.css";
import { useEffect, useMemo, useState } from "react";
import {
  approveAppointment,
  getAccountantAppointmentRequests,
  getAccountantApprovedAppointments,
  rejectAppointment,
} from "../../../../redux/appointmentSlice";
import { RADIO_CARD_DATA } from "../../../../constants/modal";
import { utc } from "../../../../helpers/date";
import { Modal } from "antd";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";
import { DEFAULT_DATE_TIME_FORMAT } from "../../../../constants/format";

const localizer = momentLocalizer(moment);

const AppointmentsCalendar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user } = useAppSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<any>();
  const {
    approvedAppointments = [],
    requestedAppointments = [],
    loading,
  } = useAppSelector(state => state.appointment);
  const appointments = useMemo(
    () =>
      approvedAppointments
        .map(p => ({
          ...p,
          title: `${
            RADIO_CARD_DATA.find(item => item.value === p.appointmentTypeId)
              ?.label
          }: ${p.taxpayerFirstName} ${p.taxpayerLastName}`,
          start: moment.utc(p.date).local().toDate(),
          end: moment.utc(p.date).local().add(1, "hour").toDate(),
          color: "#345ce2",
          isRequest: false,
        }))
        .concat(
          requestedAppointments.map(p => ({
            ...p,
            title: `${
              RADIO_CARD_DATA.find(item => item.value === p.appointmentTypeId)
                ?.label
            }: ${p.taxpayerFirstName} ${p.taxpayerLastName}`,
            start: moment.utc(p.date).local().toDate(),
            end: moment.utc(p.date).local().add(1, "hour").toDate(),
            color: "#696f8c",
            isRequest: true,
          })),
        ),
    [approvedAppointments, requestedAppointments],
  );

  const showModal = (event: any) => {
    setOpen(true);
    setEvent(event);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const eventStyleGetter = (event: any) => {
    return {
      style: {
        backgroundColor: event.color,
        color: "white",
      },
    };
  };

  useEffect(() => {
    dispatch(getAccountantApprovedAppointments());
    dispatch(getAccountantAppointmentRequests());
  }, []);

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Expert}
        avatar={user?.avatar}
      />
      <Wrapper className={styles.container}>
        <Calendar
          enableAutoScroll
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={event => {
            if (event.isRequest) {
              showModal(event);
            }
          }}
        />
      </Wrapper>

      <Modal
        open={open}
        title="Appointment Schedule Approval"
        onCancel={handleCancel}
        footer={[
          <Button
            type="ghost"
            text={t("expert_appointment.button_reject")}
            onClick={async () => {
              await dispatch(rejectAppointment(event?.id));
              dispatch(getAccountantAppointmentRequests());
              dispatch(getAccountantApprovedAppointments());
              setOpen(false);
            }}
            disabled={loading}
          />,
          <Button
            type="primary"
            text={t("expert_appointment.button_approve_appointment")}
            onClick={async () => {
              await dispatch(approveAppointment(event?.id));
              dispatch(getAccountantAppointmentRequests());
              dispatch(getAccountantApprovedAppointments());
              setOpen(false);
            }}
            disabled={loading}
          />,
        ]}
      >
        <p>
          <strong>Request Details:</strong>
        </p>
        <ul>
          <li>
            <strong>Taxpayer's Name:</strong> {event?.taxpayerFirstName}{" "}
            {event?.taxpayerLastName}
          </li>
          <li>
            <strong>Appointment Date:</strong>{" "}
            {utc(event?.date, DEFAULT_DATE_TIME_FORMAT)}
          </li>
          <li>
            <strong>Appointment Type:</strong>{" "}
            {
              RADIO_CARD_DATA.find(
                item => item.value === event?.appointmentTypeId,
              )?.label
            }
          </li>
          <li>
            <strong>Additional Comments:</strong>{" "}
            {event?.additionalComments || "---"}
          </li>
        </ul>
        <p>
          <strong>Action Required:</strong>
        </p>
        <p>
          Please review the details of the appointment schedule request for the
          taxpayer mentioned above and proceed with either approving or
          rejecting the appointment. Your prompt action is appreciated to ensure
          timely processing of the taxpayer's request.
          <br />
          Thank you for your attention to this matter.
        </p>
      </Modal>
    </>
  );
};

export default AppointmentsCalendar;

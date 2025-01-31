import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Select from "../../../../components/Select";
import {
  APPOINTMENT_APPROVED_DROPDOWN_VALUE,
  APPOINTMENT_REQUEST_DROPDOWN_VALUE,
} from "../../../../constants/appointments";
import AppointmentRequests from "./AppointmentRequests";
import ApprovedAppointments from "./ApprovedAppointments";

import styles from "./index.module.css";

const Appointment = () => {
  const [searchParams] = useSearchParams();
  const type =
    searchParams.get("appointmentType") || APPOINTMENT_APPROVED_DROPDOWN_VALUE;
  const [appointmentType, setAppointmentType] = useState(Number(type));

  return (
    <>
      <div className={styles.selectContainer}>
        <Select
          defaultValue={appointmentType}
          data={[
            {
              value: APPOINTMENT_APPROVED_DROPDOWN_VALUE,
              label: "Approved appointments",
            },
            {
              value: APPOINTMENT_REQUEST_DROPDOWN_VALUE,
              label: "Appointment request",
            },
          ]}
          handleChange={setAppointmentType}
        />
      </div>
      <div className={styles.marginTop}>
        {appointmentType == APPOINTMENT_REQUEST_DROPDOWN_VALUE ? (
          <AppointmentRequests />
        ) : (
          <ApprovedAppointments />
        )}
      </div>
    </>
  );
};

export default Appointment;

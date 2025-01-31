import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Table, Tag } from "antd";
import _ from "lodash";

import { RootState } from "../../../../../redux/store";
import { RADIO_CARD_DATA } from "../../../../../constants/modal";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants/format";
import { TABLE_ITEMS_IN_ONE_PAGE } from "../../../../../constants/settings";
import { IAppointmentApproved } from "../../../../../redux/appointmentSlice/index.props";
import { getAccountantApprovedAppointments } from "../../../../../redux/appointmentSlice";
import { useAppDispatch } from "../../../../../redux/hooks";
import { HOURS_MODAL } from "../../../../../constants/organizer";
import { utc } from "../../../../../helpers/date";

import { ReactComponent as Appointments } from "../../../../../assets/svgs/appointments.svg";
import styles from "./index.module.css";

const ApprovedAppointments = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { approvedAppointments } = useSelector(
    (state: RootState) => state.appointment,
  );

  useEffect(() => {
    dispatch(getAccountantApprovedAppointments());
  }, []);

  const columns = [
    {
      title: t("expert_appointment.table_fields.label1"),
      dataIndex: "client",
      key: "client",
      render: (_: any, record: IAppointmentApproved) => (
        <p className={styles.clientName}>
          {`${record.taxpayerFirstName} ${record.taxpayerLastName}`}
        </p>
      ),
    },
    {
      title: t("expert_appointment.table_fields.label2"),
      dataIndex: "appointment_type",
      key: "appointment_type",
      render: (_: any, record: IAppointmentApproved) => (
        <p className={styles.marginButton}>
          {
            RADIO_CARD_DATA.find(
              item => item.value === record.appointmentTypeId,
            )?.label
          }
        </p>
      ),
    },
    {
      title: t("expert_appointment.table_fields.label3"),
      dataIndex: "additional_comments",
      key: "additional_comments",
      render: (_: any, record: IAppointmentApproved) =>
        record.additionalComments ? (
          <p>{record.additionalComments}</p>
        ) : (
          <Tag color="default">N/A</Tag>
        ),
    },
    {
      title: t("expert_appointment.table_fields.label4"),
      dataIndex: "appointment_date",
      key: "appointment_date",
      render: (_: any, record: IAppointmentApproved) => (
        <p className={styles.marginButton}>
          {`${utc(record?.date, DEFAULT_DATE_FORMAT)} ${
            HOURS_MODAL[+record.time].label
          }`}
        </p>
      ),
    },
  ];

  return !_.isEmpty(approvedAppointments) ? (
    <Table
      pagination={{
        defaultPageSize: +TABLE_ITEMS_IN_ONE_PAGE[0],
        showSizeChanger: true,
        pageSizeOptions: TABLE_ITEMS_IN_ONE_PAGE,
      }}
      dataSource={approvedAppointments}
      columns={columns}
      scroll={{ x: 1070 }}
    />
  ) : (
    <div className={styles.noAppointmentContainer}>
      <Appointments className={styles.noAppointment} />
      <p className={styles.noAppointmentText}>
        {t("expert_appointment.empty_approved")}
      </p>
    </div>
  );
};

export default ApprovedAppointments;

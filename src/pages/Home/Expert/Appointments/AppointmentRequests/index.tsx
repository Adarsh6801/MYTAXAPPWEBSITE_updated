import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Space, Table, Tag } from "antd";

import Button from "../../../../../components/Button";
import { RootState } from "../../../../../redux/store";
import {
  approveAppointment,
  getAccountantAppointmentRequests,
  getAccountantApprovedAppointments,
  rejectAppointment,
} from "../../../../../redux/appointmentSlice";
import { RADIO_CARD_DATA } from "../../../../../constants/modal";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants/format";
import { TABLE_ITEMS_IN_ONE_PAGE } from "../../../../../constants/settings";
import { IAppointmentRequest } from "../../../../../redux/appointmentSlice/index.props";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { HOURS_MODAL } from "../../../../../constants/organizer";
import { utc } from "../../../../../helpers/date";

import styles from "./index.module.css";

const AppointmentRequests = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { requestedAppointments, loading } = useAppSelector(
    (state: RootState) => state.appointment,
  );

  useEffect(() => {
    dispatch(getAccountantAppointmentRequests());
  }, []);

  const columns = [
    {
      title: t("expert_appointment.table_fields.label1"),
      dataIndex: "client",
      render: (_: any, record: IAppointmentRequest) => (
        <p className={styles.clientName}>
          {`${record.taxpayerFirstName} ${record.taxpayerLastName}`}
        </p>
      ),
    },
    {
      title: t("expert_appointment.table_fields.label2"),
      dataIndex: "appointment_type",
      render: (_: any, record: IAppointmentRequest) => (
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
      render: (_: any, record: IAppointmentRequest) =>
        record.additionalComments ? (
          <p>{record.additionalComments}</p>
        ) : (
          <Tag color="default">N/A</Tag>
        ),
    },
    {
      title: t("expert_appointment.table_fields.label4"),
      dataIndex: "appointment_date",
      render: (_: any, record: IAppointmentRequest) => (
        <p className={styles.marginButton}>
          {`${utc(record?.date, DEFAULT_DATE_FORMAT)} ${
            HOURS_MODAL[+record.time].label
          }`}
        </p>
      ),
    },
    {
      title: t("expert_appointment.table_fields.label5"),
      dataIndex: "btn_actions",
      render: (_: any, record: IAppointmentRequest) => (
        <Space>
          <Button
            type="ghost"
            text={t("expert_appointment.button_reject")}
            onClick={async () => {
              await dispatch(rejectAppointment(record.id));
              await dispatch(getAccountantAppointmentRequests());
              await dispatch(getAccountantApprovedAppointments());
            }}
            disabled={loading}
          />
          <Button
            type="primary"
            text={t("expert_appointment.button_approve_appointment")}
            onClick={async () => {
              await dispatch(approveAppointment(record.id));
              await dispatch(getAccountantAppointmentRequests());
              await dispatch(getAccountantApprovedAppointments());
            }}
            disabled={loading}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={{
        defaultPageSize: +TABLE_ITEMS_IN_ONE_PAGE[0],
        showSizeChanger: true,
        pageSizeOptions: TABLE_ITEMS_IN_ONE_PAGE,
      }}
      rowKey={record => record.id}
      dataSource={requestedAppointments}
      columns={columns}
      scroll={{ x: 1070 }}
    />
  );
};

export default AppointmentRequests;

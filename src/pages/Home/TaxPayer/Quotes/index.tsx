import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import AppointmentModal from "../../../../components/AppointmentModal";
import { getQuoteRequests, getQuotes } from "../../../../redux/quotesSlice";
import Table from "./Table";
import Button from "../../../../components/Button";
import ProfileNavbar from "../../../../components/ProfileNavbar";
import Wrapper from "../../../../components/Wrapper";
import ProfileFooter from "../../../../components/ProfileFooter";
import { USER_ROLES } from "../../../../constants/users";
import { createChatConnection } from "../../../../redux/messageSlice";
import {
  getAvailableHours,
  createAppointment,
} from "../../../../redux/appointmentSlice";
import {
  EXPERT_MESSAGES,
  TAXPAYER_ADD_QUOTE,
  TAXPAYER_MESSAGES,
} from "../../../../constants/routes";
import Requests from "./Requests";
import { ICreateAppointmentPayload } from "../../../../redux/appointmentSlice/index.props";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import styles from "./index.module.css";

const Quotes = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedAccountantId, setSelectedAccountantId] = useState<number>(0);
  const [selectedQuoteId, setSelectedQuoteId] = useState<number>(0);
  const { hours } = useAppSelector(state => state.appointment);
  const {
    data = [],
    businessQuoteRequests = [],
    individualQuoteRequests = [],
  } = useAppSelector(state => state.quotes);
  const { user } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getQuotes());
    dispatch(getQuoteRequests());
  }, []);

  const onSendMessage = async (userId: number) => {
    const chatConnection: any = await dispatch(createChatConnection(userId));
    const prefix =
      user?.roleId === USER_ROLES.Taxpayer
        ? TAXPAYER_MESSAGES
        : EXPERT_MESSAGES;

    navigate(`${prefix}?messageId=${chatConnection?.id.toString()}`);
  };

  const onCalendar = async (
    accountantId: number,
    quoteId: number,
    date: string | Date,
  ) => {
    await dispatch(
      getAvailableHours({
        accountantId,
        date,
      }),
    );
    setIsOpened(!isOpened);
    setSelectedQuoteId(quoteId);
    setSelectedAccountantId(accountantId);
  };

  const onSubmit = async (data: ICreateAppointmentPayload) => {
    try {
      await dispatch(createAppointment(data));
      setIsOpened(!isOpened);
    } catch (e) {
      //TODO: Handle error
    }
  };

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />
      <Wrapper className={styles.container}>
        <h1 className={styles.title}>{t("quotes.title")}</h1>
        <Button
          text={t("quotes.add_quotes")}
          onClick={() => navigate(TAXPAYER_ADD_QUOTE)}
        />
      </Wrapper>

      <Table
        data={data}
        onSendMessage={onSendMessage}
        onCalendar={onCalendar}
      />

      {(businessQuoteRequests?.length > 0 ||
        individualQuoteRequests?.length > 0) && (
        <Requests className={styles.requests} />
      )}

      <AppointmentModal
        onClose={() => {
          setIsOpened(!isOpened);
        }}
        quoteId={selectedQuoteId}
        onSubmit={onSubmit}
        isOpened={isOpened}
        availableHours={hours}
        onDateChange={date => {
          dispatch(
            getAvailableHours({
              accountantId: selectedAccountantId,
              date,
            }),
          );
        }}
      />
      <ProfileFooter />
    </>
  );
};

export default Quotes;

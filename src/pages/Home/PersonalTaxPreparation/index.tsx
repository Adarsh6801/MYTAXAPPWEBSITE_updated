import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { Col, Row, Tabs, Tag } from "antd";

import ProfileNavbar from "../../../components/ProfileNavbar";
import Wrapper from "../../../components/Wrapper";
import ProfileFooter from "../../../components/ProfileFooter";
import DocumentTable from "./DocumentTable";
import Appointment from "../Expert/Appointments";
import TaxPayerInfo from "./TaxPayerInfo";
import { USER_ROLES } from "../../../constants/users";
import { getJobStatus } from "../../../helpers/status";
import { PERSONAL_TAX_PREPARATION_TABS } from "../../../constants/tabs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/Button";
import { downloadAllAttachedDocuments } from "../../../redux/documentSlice";
import { IAccountantTaxPreparationData } from "../../../redux/taxPreparationSlice/index.props";

import styles from "./index.module.css";

const { TabPane } = Tabs;

const PersonalTaxPreparation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab =
    searchParams.get("tab") || PERSONAL_TAX_PREPARATION_TABS.organizer;
  const { id: quoteId } = useParams();
  const { quotes } = useAppSelector(state => {
    return {
      quotes: state.taxPreparation.accountantData,
    };
  });
  const { user } = useAppSelector(state => state.user);
  const [selectedQuote, setSelectedQuote] =
    useState<IAccountantTaxPreparationData>();

  useEffect(() => {
    if (quotes) {
      const filteredQuotes = quotes.filter(
        (item: any) => item.quoteId === Number(quoteId),
      );
      setSelectedQuote(filteredQuotes[0]);
    }
  }, [quotes]);

  return (
    <div className={styles.container}>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />
      <Wrapper>
        <div className={styles.headerContainer}>
          <p>
            Tax preparation {"> "}
            {selectedQuote &&
              `${selectedQuote?.taxpayerFirstName} ${selectedQuote?.taxpayerLastName}`}
          </p>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>
              Personal Tax preparation:{" "}
              {selectedQuote &&
                `${selectedQuote?.taxpayerFirstName} ${selectedQuote?.taxpayerLastName}`}{" "}
            </h3>
            {selectedQuote && (
              <div className={styles.rightContainer}>
                <Tag
                  color={getJobStatus(selectedQuote?.jobStatusId).color}
                  style={{ height: "fit-content" }}
                >
                  {getJobStatus(selectedQuote?.jobStatusId).text}
                </Tag>
              </div>
            )}
          </div>
        </div>
        <Tabs defaultActiveKey={tab} onChange={key => setSearchParams(key)}>
          <TabPane
            tab="Organizer"
            key={PERSONAL_TAX_PREPARATION_TABS.organizer}
          >
            <TaxPayerInfo />
          </TabPane>
          <TabPane
            tab="Documents"
            key={PERSONAL_TAX_PREPARATION_TABS.documents}
          >
            <Row gutter={[16, 16]} justify="space-between">
              <Col>
                <h1 className={styles.title}>{t("document.title")}</h1>
              </Col>
              <Col>
                <Button
                  type="primary"
                  text="Download all"
                  onClick={() =>
                    dispatch(downloadAllAttachedDocuments(Number(quoteId)))
                  }
                />
              </Col>
            </Row>
            <DocumentTable />
          </TabPane>
          <TabPane
            tab="Appointments"
            key={PERSONAL_TAX_PREPARATION_TABS.appointments}
          >
            <Appointment />
          </TabPane>
        </Tabs>
      </Wrapper>
      <ProfileFooter />
    </div>
  );
};

export default PersonalTaxPreparation;

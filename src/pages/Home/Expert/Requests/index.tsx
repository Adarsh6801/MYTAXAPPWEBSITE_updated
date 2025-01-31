import { Col, message, Row, Select, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button";
import Wrapper from "../../../../components/Wrapper";
import RequestCard from "../../../../components/RequestCard";
import RequestModal from "../../../../components/RequestModal";
import Loading from "../../../../components/Loading";
import ProfileFooter from "../../../../components/ProfileFooter";
import ProfileNavbar from "../../../../components/ProfileNavbar";
import AppointmentModal from "../../../../components/AppointmentModal";
import {
  getAccountantSentQuotes,
  getAllBusinessRequests,
  getAllIndividualRequests,
  sendQuote,
} from "../../../../redux/requestsSlice";
import {
  getAccountingSoftware,
  getDeductionType,
  getMonthlyFinancialStatementReport,
  getPersonalCreditCardBusinessTransactions,
  getPreviousReturnPreparation,
  getThirdPartyPaymentProcessorType,
  getTransactionReconciledMonthly,
  getTransactionsReconcileHelperType,
} from "../../../../helpers/status";
import { USER_ROLES } from "../../../../constants/users";
import NoData from "../../../../components/NoData";
import Table from "./Table";
import {
  EXPERT_MESSAGES,
  TAXPAYER_MESSAGES,
} from "../../../../constants/routes";
import {
  REQUESTED_ITEMS_COUNT,
  REQUESTED_ITEMS_COUNT_STEP,
  REQUEST_TYPES,
} from "../../../../constants/requests";
import { RequestTypes } from "./index.props";
import { createChatConnection } from "../../../../redux/messageSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  answerQuestion1,
  answerQuestion2,
  data,
  radioButtons,
} from "./index.constant";

import { ReactComponent as RequestCut } from "../../../../assets/svgs/request-cut.svg";
import { ReactComponent as RequestPicker } from "../../../../assets/svgs/request-picker.svg";
import { ReactComponent as RequestRing } from "../../../../assets/svgs/request-ring.svg";
import { ReactComponent as RequestFile } from "../../../../assets/svgs/request-file.svg";
import { ReactComponent as RequestBag } from "../../../../assets/svgs/request-bag.svg";
import { ReactComponent as RequestHome } from "../../../../assets/svgs/request-home.svg";
import { ReactComponent as Square } from "../../../../assets/svgs/request-square.svg";
import { ReactComponent as Key } from "../../../../assets/svgs/key.svg";
import { ReactComponent as FillDocument } from "../../../../assets/svgs/fill-document.svg";
import styles from "./index.module.css";
import { utc } from "../../../../helpers/date";
import { DEFAULT_DATE_TIME_FORMAT } from "../../../../constants/format";

const { TabPane } = Tabs;
const { Option } = Select;

const Requests = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSeeMoreBtnVisible, setIsSeeMoreBtnVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [requestedItemsCount, setRequestedItemsCount] = useState(
    REQUESTED_ITEMS_COUNT,
  );
  const [selectedRequestType, setSelectedRequestType] =
    useState<RequestTypes>("INDIVIDUAL");
  const [selectedItem, setSelectedItem] = useState<any>();
  const {
    loading,
    business = [],
    individual = [],
    sentQuotes = [],
  } = useAppSelector(state => state.requests);
  const { user } = useAppSelector(state => state.user);

  const init = async () => {
    await dispatch(getAllIndividualRequests(0, requestedItemsCount));
    await dispatch(getAllBusinessRequests(0, requestedItemsCount));
    await dispatch(getAccountantSentQuotes());
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    checkIsSeeMoreButtonVisible();
  }, [individual, business]);

  const checkIsSeeMoreButtonVisible = () => {
    if (
      selectedRequestType === REQUEST_TYPES.INDIVIDUAL &&
      individual.length === 0
    ) {
      setIsSeeMoreBtnVisible(false);
    } else if (
      selectedRequestType === REQUEST_TYPES.BUSINESS &&
      business.length === 0
    ) {
      setIsSeeMoreBtnVisible(false);
    }
  };

  const onSendMessage = async (userId: number) => {
    setIsModalVisible(false);
    const chatConnection: any = await dispatch(createChatConnection(userId));
    const prefix =
      user?.roleId === USER_ROLES.Taxpayer
        ? TAXPAYER_MESSAGES
        : EXPERT_MESSAGES;

    navigate(`${prefix}?messageId=${chatConnection?.id.toString()}`);
  };

  const onSendQuote = async (
    taxPreparationId: number,
    price: string,
    attachStandardPricingList: boolean,
    priceListAttachment: any,
  ) => {
    setIsModalVisible(false);

    try {
      await dispatch(
        sendQuote({
          isIndividual: selectedRequestType === REQUEST_TYPES.INDIVIDUAL,
          price,
          taxPreparationId,
          priceListAttachment,
          attachStandardPricingList,
        }),
      );

      dispatch(getAccountantSentQuotes());

      if (selectedRequestType === REQUEST_TYPES.INDIVIDUAL) {
        dispatch(getAllIndividualRequests(0, requestedItemsCount));
      } else {
        dispatch(getAllBusinessRequests(0, requestedItemsCount));
      }
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const onViewDetails = (taxPreparationId: number) => {
    if (selectedRequestType === REQUEST_TYPES.BUSINESS) {
      setSelectedItem(business.find(item => item.id === taxPreparationId));
    } else {
      setSelectedItem(individual.find(item => item.id === taxPreparationId));
    }

    setIsModalVisible(true);
  };

  const handleDropdownChange = (value: RequestTypes) => {
    setIsSeeMoreBtnVisible(true);
    setSelectedRequestType(value);
    setRequestedItemsCount(REQUESTED_ITEMS_COUNT);
    checkIsSeeMoreButtonVisible();
  };

  const onSeeMore = async () => {
    const count = requestedItemsCount + REQUESTED_ITEMS_COUNT_STEP;

    if (selectedRequestType === REQUEST_TYPES.BUSINESS) {
      const businessData = await dispatch(getAllBusinessRequests(0, count));
      if (
        businessData &&
        (businessData?.length === business.length ||
          businessData?.length < count)
      ) {
        setIsSeeMoreBtnVisible(false);
      }
    } else {
      const individualData = await dispatch(getAllIndividualRequests(0, count));
      if (
        individualData &&
        (individualData?.length === individual.length ||
          individual?.length < count)
      ) {
        setIsSeeMoreBtnVisible(false);
      }
    }

    setRequestedItemsCount(count);
  };

  const onCalendar = (id: number) => {
    setIsOpened(!isOpened);
  };

  const renderNoData = () => {
    if (
      selectedRequestType === REQUEST_TYPES.INDIVIDUAL &&
      individual.length === 0
    ) {
      return (
        <NoData
          title="You do not have any requests yet"
          className={styles.noDataContainer}
        />
      );
    }

    if (
      selectedRequestType === REQUEST_TYPES.BUSINESS &&
      business.length === 0
    ) {
      return (
        <NoData
          title="You do not have any requests yet"
          className={styles.noDataContainer}
        />
      );
    }

    return null;
  };

  const reasonToLookNewPreparer =
    selectedRequestType === REQUEST_TYPES.INDIVIDUAL && selectedItem
      ? answerQuestion1.filter(el =>
          JSON.parse(selectedItem?.reasonToLookNewPreparer).includes(el.value)
            ? `${el.label} `
            : "",
        )
      : [];

  const factorThatHelpYouHirePreparer =
    selectedRequestType === REQUEST_TYPES.INDIVIDUAL && selectedItem
      ? answerQuestion2.filter(el =>
          JSON.parse(selectedItem?.factorThatHelpYouHirePreparer).includes(
            el.value,
          )
            ? `${el.label} `
            : "",
        )
      : [];

  const incomeTypeIds =
    selectedRequestType === REQUEST_TYPES.INDIVIDUAL &&
    selectedItem &&
    selectedItem?.incomeTypeIds !== null
      ? data.filter((el: any, index) =>
          JSON.parse(selectedItem?.incomeTypeIds).includes(el.value)
            ? `${el.label} `
            : "",
        )
      : [];

  const modalData =
    selectedRequestType === REQUEST_TYPES.INDIVIDUAL && selectedItem
      ? [
          {
            icon: <RequestPicker />,
            text: `${selectedItem?.country}, ${selectedItem?.state}`,
          },
          {
            icon: <RequestCut />,
            text: getDeductionType(selectedItem?.deductionTypeId),
          },
          {
            icon: <RequestRing />,
            text: selectedItem?.isMarried ? "Married" : "Not married",
          },
          {
            icon: <FillDocument />,
            text: `Paid for returns in the past։ ${
              radioButtons[
                radioButtons.findIndex(
                  item =>
                    item.value === selectedItem?.lastYearPreparationCostId,
                )
              ].label
            }`,
          },
          {
            icon: <RequestFile />,
            text: getPreviousReturnPreparation(
              selectedItem?.lastYearPreparedExpertId,
            ),
          },
          { icon: <RequestBag />, text: "Self employed" },
          {
            icon: <RequestHome />,
            text: selectedItem?.isOwnHome
              ? "Owns a house"
              : "Doesn’t own a house",
          },
          ...factorThatHelpYouHirePreparer.map(el => ({
            icon: <Key />,
            text: `Deciding factor։ ${el.label}`,
          })),
          ...reasonToLookNewPreparer.map(el => ({
            icon: <RequestBag />,
            text: `Reason to change preparer։ ${el.label}`,
          })),
          ...incomeTypeIds.map(el => ({
            icon: <RequestFile />,
            text: `Earn income by:  ${el.label}`,
          })),
        ]
      : [
          {
            icon: <Square />,
            text:
              selectedItem?.fieldPreviousEntityReturnBefore &&
              "Filled a previous entity return before",
          },
          {
            icon: <Square />,
            text:
              selectedItem?.haveLastYearEntityReturnInPDF &&
              `Available in pdf format`,
          },
          {
            icon: <Square />,
            text:
              selectedItem?.haveLastYearEntityReturnInPDF &&
              `Entity has ${selectedItem?.entityMembersCount} members/partners/shareholders`,
          },
          {
            icon: <Square />,
            text: getAccountingSoftware(
              selectedItem?.businessTransactionAccountingSoftwareId,
            ),
          },
          {
            icon: <Square />,
            text: `Business Checking Accounts ${selectedItem?.businessCheckingAccountsCount} accountants ${selectedItem?.businessCheckingTransactionsCount} transactions per month`,
          },
          {
            icon: <Square />,
            text: `Business Credit Cards ${selectedItem?.businessCreditCardsCount} accountants ${selectedItem?.businessCreditCardTransactionsCount} transactions per month`,
          },
          {
            icon: <Square />,
            text: getPersonalCreditCardBusinessTransactions(
              selectedItem?.haveBusinessTransactionsOnPersonalCard,
            ),
          },
          {
            icon: <Square />,
            text: getTransactionReconciledMonthly(
              selectedItem?.haveCardTransactionsReconciledOnMonthlyBasis,
            ),
          },
          {
            icon: <Square />,
            text: getTransactionsReconcileHelperType(
              selectedItem?.transactionsReconcileHelperId,
            ),
          },
          {
            icon: <Square />,
            text: getMonthlyFinancialStatementReport(
              selectedItem?.getMonthlyFinancialReportFromProvider,
            ),
          },
          {
            icon: <Square />,
            text:
              selectedItem?.haveLastMonthFinancialStatement &&
              "Have last month’s financial statement",
          },
          {
            icon: <Square />,
            text:
              selectedItem?.closedBooksForWhichRequestingTaxService &&
              "Closed out books for the last calendar year",
          },
          {
            icon: <Square />,
            text:
              selectedItem?.sendInvoicesToGetPaid &&
              "Normally send out invoices",
          },
          {
            icon: <Square />,
            text: getThirdPartyPaymentProcessorType(
              selectedItem?.thirdPartyPaymentProcessorId,
            ),
          },
        ];

  return (
    <>
      <ProfileNavbar
        roleId={user?.roleId || USER_ROLES.Taxpayer}
        avatar={user?.avatar}
      />
      <Wrapper className={styles.container}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="All requests" key="1">
            <Row gutter={[10, 10]} justify="space-between">
              <Col>
                <h1 className={styles.title}>{t("requests.title")}</h1>
              </Col>
              <Col>
                <Select
                  defaultValue={selectedRequestType}
                  style={{ minWidth: 120 }}
                  onChange={handleDropdownChange}
                >
                  <Option value={REQUEST_TYPES.INDIVIDUAL}>Individual</Option>
                  <Option value={REQUEST_TYPES.BUSINESS}>Business</Option>
                </Select>
              </Col>
            </Row>

            {selectedRequestType === REQUEST_TYPES.INDIVIDUAL
              ? individual.map(item => (
                  <RequestCard
                    key={`request_card_individual_${item.id}`}
                    title={`${t("request_card.individual_tax")}: ${
                      item.user.firstName
                    } ${item.user.lastName}`}
                    data={{
                      icon: <RequestPicker />,
                      text: `${item.country}, ${item.state}`,
                    }}
                    date={utc(item.createdDate, DEFAULT_DATE_TIME_FORMAT)}
                    onViewDetails={() => onViewDetails(item.id)}
                    className={styles.card}
                  />
                ))
              : business.map(item => (
                  <RequestCard
                    key={`request_card_business_${item.id}`}
                    title={`${t("request_card.business_tax")}: ${
                      item.user.firstName
                    } ${item.user.lastName}`}
                    data={{
                      icon: <RequestPicker />,
                      text: "N/A",
                    }}
                    date={utc(item.createdDate, DEFAULT_DATE_TIME_FORMAT)}
                    onViewDetails={() => onViewDetails(item.id)}
                    className={styles.card}
                  />
                ))}

            {renderNoData()}

            {isSeeMoreBtnVisible && (
              <Button
                block
                type="link"
                size="small"
                text="See more"
                className={styles.seeMore}
                onClick={onSeeMore}
              />
            )}
          </TabPane>

          <TabPane tab="Sent quotes" key="2">
            {sentQuotes ? (
              <Table
                data={sentQuotes}
                onSendMessage={onSendMessage}
                onCalendar={onCalendar}
              />
            ) : (
              <>
                {" "}
                <h1 className={styles.title}>{t("sent_quotes.title")}</h1>
                <NoData
                  title="You haven’t sent any request yet."
                  className={styles.noDataContainer}
                />{" "}
              </>
            )}
          </TabPane>
        </Tabs>
      </Wrapper>
      <ProfileFooter />
      <RequestModal
        isModalVisible={isModalVisible}
        title={`${
          selectedRequestType === REQUEST_TYPES.INDIVIDUAL
            ? t("request_card.individual_tax")
            : t("request_card.business_tax")
        }: ${selectedItem?.user.firstName} ${selectedItem?.user.lastName}`}
        data={modalData}
        description={selectedItem?.anythingElseForPreparer}
        onSendMessage={() => onSendMessage(selectedItem?.user.id)}
        onSendQuote={values =>
          onSendQuote(
            selectedItem?.id,
            values.price,
            values.attachStandardPricingList,
            values.priceListAttachment,
          )
        }
        onCancel={() => setIsModalVisible(false)}
      />
      {loading && <Loading type="secondary" />}
    </>
  );
};

export default Requests;

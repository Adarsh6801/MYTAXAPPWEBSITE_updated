import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Col, Row, Space } from "antd";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import Step10 from "./Step10";
import Step11 from "./Step11";
import Step12 from "./Step12";
import Step13 from "./Step13";
import Step14 from "./Step14";
import QuestionsContainer from "../../../../../../components/QuestionsContainer";
import { ISignUpBusinessPayload } from "../../../../../../redux/authSlice/index.props";
import StepGift from "../components/StepGift";
import StepGiftInfo from "../components/StepGiftInfo";
import { TAXPAYER_QUOTES } from "../../../../../../constants/routes";
import { IBusinessInitialQuestionsProps } from "./index.props";
import Button from "../../../../../../components/Button";
import RequestModal from "../../../../../../components/RequestModal";
import {
  getAccountingSoftware,
  getMonthlyFinancialStatementReport,
  getPersonalCreditCardBusinessTransactions,
  getThirdPartyPaymentProcessorType,
  getTransactionReconciledMonthly,
  getTransactionsReconcileHelperType,
} from "../../../../../../helpers/status";
import { useAppSelector } from "../../../../../../redux/hooks";

import { ReactComponent as Square } from "../../../../../../assets/svgs/request-square.svg";
import styles from "./index.module.css";

const noop = () => {};

const BusinessInitialQuestions = (props: IBusinessInitialQuestionsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const questionsContainerRef = useRef<{
    resetStep: (step?: number) => void;
  }>();
  const { loading } = useAppSelector(state => state.auth);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<ISignUpBusinessPayload>(
    {} as ISignUpBusinessPayload,
  );
  const { onSubmit = noop } = props;
  const typeId = Number(searchParams.get("typeId"));
  const modalData = [
    {
      icon: <Square />,
      text: state?.fieldPreviousEntityReturnBefore
        ? "Filled a previous entity return before"
        : "",
    },
    {
      icon: <Square />,
      text: state?.haveLastYearEntityReturnInPDF
        ? "Available in pdf format"
        : "",
    },
    {
      icon: <Square />,
      text: state?.haveLastYearEntityReturnInPDF
        ? `Entity has ${state?.entityMembersCount} members/partners/shareholders`
        : "",
    },
    {
      icon: <Square />,
      text:
        getAccountingSoftware(state?.businessTransactionAccountingSoftwareId) ||
        "",
    },
    {
      icon: <Square />,
      text: `Business Checking Accounts ${state?.businessCheckingAccountsCount} accountants ${state?.businessCheckingTransactionsCount} transactions per month`,
    },
    {
      icon: <Square />,
      text: `Business Credit Cards ${state?.businessCreditCardsCount} accountants ${state?.businessCreditCardTransactionsCount} transactions per month`,
    },
    {
      icon: <Square />,
      text:
        getPersonalCreditCardBusinessTransactions(
          state?.haveBusinessTransactionsOnPersonalCard,
        ) || "",
    },
    {
      icon: <Square />,
      text:
        getTransactionReconciledMonthly(
          state?.haveCardTransactionsReconciledOnMonthlyBasis,
        ) || "",
    },
    {
      icon: <Square />,
      text:
        getTransactionsReconcileHelperType(
          state?.transactionsReconcileHelperId,
        ) || "",
    },
    {
      icon: <Square />,
      text:
        getMonthlyFinancialStatementReport(
          state?.getMonthlyFinancialReportFromProvider,
        ) || "",
    },
    {
      icon: <Square />,
      text: state?.haveLastMonthFinancialStatement
        ? "Have last month’s financial statement"
        : "",
    },
    {
      icon: <Square />,
      text: state?.closedBooksForWhichRequestingTaxService
        ? "Closed out books for the last calendar year"
        : "",
    },
    {
      icon: <Square />,
      text: state?.sendInvoicesToGetPaid ? "Normally send out invoices" : "",
    },
    {
      icon: <Square />,
      text:
        getThirdPartyPaymentProcessorType(
          state?.thirdPartyPaymentProcessorId,
        ) || "",
    },
  ];

  const onStepSubmit = (values: object) => {
    setState({ ...state, ...values });
  };

  useEffect(() => {
    onStepSubmit({ taxPreparationTypeId: typeId });
  }, []);

  return (
    <>
      <QuestionsContainer
        ref={questionsContainerRef}
        steps={[
          {
            type: "step",
            component: <Step1 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step2 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step3 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step4 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step5 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step6 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step7 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step8 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step9 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step10 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step11 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step12 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step13 state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            type: "step",
            component: <Step14 state={state} onStepSubmit={onStepSubmit} />,
          },
          { type: "gift", component: <StepGift /> },
          {
            component: (
              <StepGiftInfo onNextClick={() => setIsModalVisible(true)} />
            ),
          },
        ]}
        contentClassName={styles.contentContainer}
      />

      <RequestModal
        hasActions={false}
        isModalVisible={isModalVisible}
        title="Preview Request"
        data={modalData}
        onCancel={() => setIsModalVisible(false)}
        customActions={
          <Row justify="end">
            <Col>
              <Space wrap>
                <Button
                  text="Change"
                  onClick={() => {
                    questionsContainerRef.current?.resetStep();
                    setIsModalVisible(false);
                  }}
                />
                <Button
                  text="Submit"
                  type="primary"
                  onClick={async () => {
                    await onSubmit(state);
                    setIsModalVisible(false);
                    navigate(TAXPAYER_QUOTES, {
                      replace: true,
                    });
                  }}
                  loading={loading}
                  disabled={loading}
                />
              </Space>
            </Col>
          </Row>
        }
      />
    </>
  );
};

export default BusinessInitialQuestions;

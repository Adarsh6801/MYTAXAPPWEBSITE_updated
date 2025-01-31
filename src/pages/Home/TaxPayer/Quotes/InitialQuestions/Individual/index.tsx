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
import QuestionsContainer from "../../../../../../components/QuestionsContainer";
import { ISignUpIndividualPayload } from "../../../../../../redux/authSlice/index.props";
import StepGift from "../components/StepGift";
import StepGiftInfo from "../components/StepGiftInfo";
import { TAXPAYER_QUOTES } from "../../../../../../constants/routes";
import { IIndividualInitialQuestionsProps } from "./index.props";
import {
  getDeductionType,
  getPreviousReturnPreparation,
} from "../../../../../../helpers/status";
import RequestModal from "../../../../../../components/RequestModal";
import {
  data,
  radioButtons,
  answerQuestion1,
  answerQuestion2,
} from "../../../../Expert/Requests/index.constant";
import Button from "../../../../../../components/Button";
import { useAppSelector } from "../../../../../../redux/hooks";

import { ReactComponent as RequestCut } from "../../../../../../assets/svgs/request-cut.svg";
import { ReactComponent as RequestPicker } from "../../../../../../assets/svgs/request-picker.svg";
import { ReactComponent as RequestRing } from "../../../../../../assets/svgs/request-ring.svg";
import { ReactComponent as RequestFile } from "../../../../../../assets/svgs/request-file.svg";
import { ReactComponent as RequestBag } from "../../../../../../assets/svgs/request-bag.svg";
import { ReactComponent as RequestHome } from "../../../../../../assets/svgs/request-home.svg";
import { ReactComponent as Key } from "../../../../../../assets/svgs/key.svg";
import { ReactComponent as FillDocument } from "../../../../../../assets/svgs/fill-document.svg";
import styles from "./index.module.css";

const noop = () => {};

const IndividualInitialQuestions = (
  props: IIndividualInitialQuestionsProps,
) => {
  const navigate = useNavigate();
  const questionsContainerRef = useRef<{
    resetStep: (step?: number) => void;
  }>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<ISignUpIndividualPayload>(
    {} as ISignUpIndividualPayload,
  );
  const [searchParams] = useSearchParams();
  const { loading } = useAppSelector(state => state.auth);
  const { onSubmit = noop } = props;
  const typeId = Number(searchParams.get("typeId"));
  const reasonToLookNewPreparer = answerQuestion1.filter(el =>
    state?.reasonToLookNewPreparer?.includes(el.value) ? `${el.label} ` : "",
  );
  const factorThatHelpYouHirePreparer = answerQuestion2.filter(el =>
    state?.factorThatHelpYouHirePreparer?.includes(el.value)
      ? `${el.label} `
      : "",
  );
  const incomeTypeIds = data.filter(el =>
    state?.incomeTypeIds?.includes(el.value) ? `${el.label} ` : "",
  );

  const modalData = [
    {
      icon: <RequestPicker />,
      text: `${state?.country}, ${state?.state}`,
    },
    {
      icon: <RequestCut />,
      text: getDeductionType(state?.deductionTypeId),
    },
    {
      icon: <RequestRing />,
      text: state?.isMarried ? "Married" : "Not married",
    },
    {
      icon: <FillDocument />,
      text: `Paid for returns in the past։ ${
        radioButtons[
          radioButtons.findIndex(
            item => item.value === state?.lastYearPreparationCostId,
          )
        ]?.label || ""
      }`,
    },
    {
      icon: <RequestFile />,
      text: getPreviousReturnPreparation(state?.lastYearPreparedExpertId),
    },
    { icon: <RequestBag />, text: "Self employed" },
    {
      icon: <RequestHome />,
      text: state?.isOwnHome ? "Owns a house" : "Doesn’t own a house",
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
  ];

  useEffect(() => {
    onStepSubmit({ taxPreparationTypeId: typeId });
  }, []);

  const onStepSubmit = (values: object) => {
    setState({ ...state, ...values });
  };

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
          { type: "gift", component: <StepGift /> },
          {
            component: (
              <StepGiftInfo
                onNextClick={() => {
                  setIsModalVisible(true);
                }}
              />
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
        description={state?.anythingElseForPreparer}
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

export default IndividualInitialQuestions;

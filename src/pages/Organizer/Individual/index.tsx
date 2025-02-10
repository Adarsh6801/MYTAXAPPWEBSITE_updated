import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import OrganizerContainer from "../../../components/OrganizerContainer";
import Loading from "../../../components/Loading";

// TaxPayer Side

import OrganizerIndividualYesFlowStep1 from "./TaxpayerInfo/YesFlowSteps/OrganizerIndividualYesFlowStep1";
import OrganizerIndividualYesFlowStep2 from "./TaxpayerInfo/YesFlowSteps/OrganizerIndividualYesFlowStep2";
import OrganizerIndividualYesFlowStep3 from "./TaxpayerInfo/YesFlowSteps/OrganizerIndividualYesFlowStep3";
import OrganizerIndividualYesFlowStep4 from "./TaxpayerInfo/YesFlowSteps/OrganizerIndividualYesFlowStep4";

import OrganizerIndividualNoFlowStep1 from "./TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep1";
import OrganizerIndividualNoFlowStep2 from "./TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep2";
import OrganizerIndividualNoFlowStep3 from "./TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep3";
import OrganizerIndividualNoFlowStep4 from "./TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep4";

import GeneralStepsStep1 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep1";
import GeneralStepsStep2 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep2";
import GeneralStepsStep3 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep3";
import GeneralStepsStep4 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep4";
import GeneralStepsStep5 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep5";
import GeneralStepsStep6 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep6";
import GeneralStepsStep7 from "./TaxpayerInfo/GeneralSteps/GeneralStepsStep7";

// Income Side
import OrganizerIncomeStep1 from "./Income/Step1";
import OrganizerIncomeStep2 from "./Income/Step2";
import OrganizerIncomeStep3 from "./Income/Step3";
import OrganizerIncomeStep4 from "./Income/Step4";
import OrganizerIncomeStep5 from "./Income/Step5";
import OrganizerIncomeStep6 from "./Income/Step6";
import OrganizerIncomeStep7 from "./Income/Step7";

// Deductions Side
import OrganizerDeductionsStep1 from "./Deductions/Step1";
import OrganizerDeductionsStep2 from "./Deductions/Step2";
import OrganizerDeductionsStep3 from "./Deductions/Step3";
import OrganizerDeductionsStep4 from "./Deductions/Step4";
import OrganizerDeductionsStep4_1 from "./Deductions/step4_1";
import OrganizerDeductionsStep5 from "./Deductions/Step5";
import OrganizerDeductionsStep6 from "./Deductions/Step6";
import OrganizerDeductionsStep7 from "./Deductions/Step7";
import OrganizerDeductionsStep8 from "./Deductions/Step8";
import OrganizerDeductionsStep9 from "./Deductions/Step9";
import OrganizerDeductionsStep10 from "./Deductions/Step10";
import OrganizerDeductionsStep11 from "./Deductions/Step11";

import { ReactComponent as Document } from "../../../assets/svgs/document.svg";
import { ReactComponent as TaxPayerInformation } from "../../../assets/svgs/taxpayer_Information.svg";
import { ReactComponent as OrganizerIcon2 } from "../../../assets/svgs/organizer-icon-2.svg";
import { ReactComponent as OrganizerAddress } from "../../../assets/svgs/orgnaizer-address-location.svg";
import { ReactComponent as OrganizerHome } from "../../../assets/svgs/orgnaizer-home.svg";
import { ReactComponent as OrganizerDiplomat } from "../../../assets/svgs/orgnaizer-diplomat.svg";
import { ReactComponent as OrganizerVehicle } from "../../../assets/svgs/orgnaizer-vehicle.svg";
import { ReactComponent as OrganizerLocation } from "../../../assets/svgs/organizer-location.svg";
import { ReactComponent as OrganizerHands } from "../../../assets/svgs/organizer-hands.svg";
import { ReactComponent as OrganizerDocument } from "../../../assets/svgs/organizer-document.svg";
import { ReactComponent as OrganizerBag } from "../../../assets/svgs/organizer-bag.svg";
import { ReactComponent as OrganizerEducation } from "../../../assets/svgs/organizer-education.svg";
import { ReactComponent as OrganizerHealth } from "../../../assets/svgs/organizer-health.svg";
import { ReactComponent as OrganizerBuilder } from "../../../assets/svgs/organizer-builder.svg";
import { ReactComponent as OrganizerMoney } from "../../../assets/svgs/organizer-money.svg";
import { ReactComponent as OrganizerHeart } from "../../../assets/svgs/organizer-heart.svg";
import { ReactComponent as OrganizerMoneyBag } from "../../../assets/svgs/organizer-money-bag.svg";
import { ReactComponent as OrganizerPercent } from "../../../assets/svgs/organizer-percent.svg";
import { ReactComponent as OrganizerFillingStatus } from "../../../assets/svgs/organizer-filling-status.svg";
import { ReactComponent as OrganizerBank } from "../../../assets/svgs/bank.svg";

import styles from "./index.module.css";

const OrganizerIndividual = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<any>({} as any);
  const [previousTaxYear, setpreviousTaxYear] = useState<any>("");

  const isLoading = useSelector(
    (state: any) => state.individualOrganizer.loading,
  );

  const onStepSubmit = (values: object) => {
    setState({ ...state, ...values });
  };
  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );
  // let previousTaxYear;
  useEffect(() => {
    if (dataOrganizer) {
      console.log(dataOrganizer, "Data Organization");
      const questionKey = "previousTaxYear"; // The question you want to match

      // Find the object with the matching question
      const foundItem = dataOrganizer.find(
        (item: any) => item.question == questionKey,
      );
      console.log(foundItem, "Found Item");

      // Get the answer if found, otherwise default to an empty string
      setpreviousTaxYear(foundItem ? foundItem.answer : "");
      console.log(previousTaxYear, "Previous Tax Year");
    }
  }, [dataOrganizer]);

  return (
    <>
      <OrganizerContainer
        contentClassName={styles.context}
        groups={[
          {
            // 0
            component: (
              <OrganizerIndividualYesFlowStep1
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <Document />,
            stepTitle: t("organizer.individual.yes_flow.step1.step_title"),
          },
          {
            // 1
            component: (
              <OrganizerIndividualYesFlowStep2
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerAddress />,
            stepTitle: t("organizer.individual.yes_flow.step2.step_title"),
          },
          {
            // 2
            component: (
              <OrganizerIndividualYesFlowStep3
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerFillingStatus />,
            stepTitle:
              t("organizer.individual.yes_flow.step3.step_title") +
              " " +
              previousTaxYear,
          },
          {
            // 3
            component: (
              <OrganizerIndividualYesFlowStep4
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerPercent />,
            stepTitle: t("organizer.individual.yes_flow.step4.step_title"),
          },
          {
            // 4
            component: (
              <OrganizerIndividualNoFlowStep1
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <TaxPayerInformation />,
            stepTitle: t("organizer.individual.no_flow.step1.step_title"),
          },
          {
            // 5
            component: (
              <OrganizerIndividualNoFlowStep2
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerIcon2 />,
            stepTitle: t("organizer.individual.no_flow.step2.step_title"),
          },
          {
            // 6
            component: (
              <OrganizerIndividualNoFlowStep3
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerIcon2 />,
            stepTitle: t("organizer.individual.no_flow.step3.step_title"),
          },
          {
            // 7
            component: (
              <OrganizerIndividualNoFlowStep4
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerLocation />,
            stepTitle: t("organizer.individual.no_flow.step4.step_title"),
          },
          {
            // 8
            component: (
              <GeneralStepsStep1 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <Document />,
            stepTitle: t("organizer.individual.general_steps.step1.step_title"),
          },
          {
            // 9
            component: (
              <GeneralStepsStep2 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerHands />,
            stepTitle: t("organizer.individual.general_steps.step2.step_title"),
          },
          {
            // 10
            component: (
              <GeneralStepsStep4 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <Document />,
            stepTitle: t("organizer.individual.general_steps.step4.step_title"),
          },
          {
            // 11
            component: (
              <GeneralStepsStep7 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerHands />,
            stepTitle: t("organizer.individual.general_steps.step8.step_title"),
          },
          {
            // 12
            component: (
              <GeneralStepsStep3 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <Document />,
            stepTitle: t("organizer.individual.general_steps.step3.step_title"),
          },
          {
            // 13
            component: (
              <GeneralStepsStep4 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <Document />,
            stepTitle: t("organizer.individual.general_steps.step4.step_title"),
          },
          {
            // 14
            component: (
              <GeneralStepsStep5 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <OrganizerEducation />,
            stepTitle: t("organizer.individual.general_steps.step5.step_title"),
          },
          {
            // 15
            component: (
              <GeneralStepsStep6 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Taxpayer info",
            stepIcon: <Document />,
            stepTitle: t("organizer.individual.general_steps.step6.step_title"),
          },
          {
            // 16
            component: (
              <OrganizerIncomeStep1 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerDocument />,
            stepTitle: t("organizer.individual.income.step1.step_title"),
          },
          {
            // 17
            component: (
              <OrganizerIncomeStep2 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerDiplomat />,
            stepTitle: t("organizer.individual.income.step2.step_title"),
          },
          {
            // 18
            component: (
              <OrganizerIncomeStep3 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerBag />,
            stepTitle: t("organizer.individual.income.step3.step_title"),
          },
          {
            // 19
            component: (
              <OrganizerIncomeStep4 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerVehicle />,
            stepTitle: t("organizer.individual.income.step4.step_title"),
          },
          {
            // 20
            component: (
              <OrganizerIncomeStep5 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerVehicle />,
            stepTitle: t("organizer.individual.income.step5.step_title"),
          },
          {
            // 21
            component: (
              <OrganizerIncomeStep6 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerBuilder />,
            stepTitle: t("organizer.individual.income.step6.step_title"),
          },
          {
            // 22
            component: (
              <OrganizerIncomeStep7 state={state} onStepSubmit={onStepSubmit} />
            ),
            groupName: "Income",
            stepIcon: <OrganizerMoney />,
            stepTitle: t("organizer.individual.income.step7.step_title"),
          },
          {
            // 23
            component: (
              <OrganizerDeductionsStep1
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHome />,
            stepTitle: t("organizer.deductions.step1.step_title"),
          },
          {
            // 24
            component: (
              <OrganizerDeductionsStep2
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHome />,
            stepTitle: t("organizer.deductions.step2.step_title"),
          },
          {
            // 25
            component: (
              <OrganizerDeductionsStep3
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerMoneyBag />,
            stepTitle: t("organizer.deductions.step3.step_title"),
          },
          {
            // 26
            component: (
              <OrganizerDeductionsStep4
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHeart />,
            stepTitle: t("organizer.deductions.step4.step_title"),
          },
          {
            // 26
            component: (
              <OrganizerDeductionsStep4_1
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHeart />,
            stepTitle: t("organizer.deductions.step4_1.step_title"),
          },
          {
            // 27
            component: (
              <OrganizerDeductionsStep5
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHealth />,
            stepTitle: t("organizer.deductions.step5.step_title"),
          },
          {
            // 28
            component: (
              <OrganizerDeductionsStep6
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHealth />,
            stepTitle: t("organizer.deductions.step6.step_title"),
          },
          {
            // 29
            component: (
              <OrganizerDeductionsStep7
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHealth />,
            stepTitle: t("organizer.deductions.step7.step_title"),
          },
          {
            // 30
            component: (
              <OrganizerDeductionsStep8
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerHealth />,
            stepTitle: t("organizer.deductions.step8.step_title"),
          },
          {
            // 31
            component: (
              <OrganizerDeductionsStep9
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerEducation />,
            stepTitle: t("organizer.deductions.step9.step_title"),
          },
          {
            // 32
            component: (
              <OrganizerDeductionsStep10
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerBank />,
            stepTitle: t("organizer.deductions.step10.step_title"),
          },
          {
            // 33
            component: (
              <OrganizerDeductionsStep11
                state={state}
                onStepSubmit={onStepSubmit}
              />
            ),
            groupName: "Deductions",
            stepIcon: <OrganizerEducation />,
            stepTitle: t("organizer.deductions.step9.step_title"),
          },
        ]}
      />
      {isLoading && <Loading type="secondary" />}
    </>
  );
};

export default OrganizerIndividual;

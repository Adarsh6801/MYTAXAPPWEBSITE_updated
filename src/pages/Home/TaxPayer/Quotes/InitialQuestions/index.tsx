import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { Form, message } from "antd";

import RadioGroup from "../../../../../components/RadioGroup";
import Individual from "./Individual";
import Business from "./Business";
import QuestionsContainer from "../../../../../components/QuestionsContainer";
import { IRadioGroupItem } from "../../../../../components/RadioGroup/index.props";
import CircularDirection from "../../../../../components/CircularDirection";
import { RootState } from "../../../../../redux/store";
import { ITaxPayerFormData } from "./index.props";
import { TAX_PREPARATION_TYPES } from "../../../../../constants/initialQuestions";
import {
  addBusinessTaxpayerInitialQuestions,
  addIndividualTaxpayerInitialQuestions,
} from "../../../../../redux/authSlice";
import {
  ISignUpBusinessPayload,
  ISignUpIndividualPayload,
} from "../../../../../redux/authSlice/index.props";
import { getQuoteRequests } from "../../../../../redux/quotesSlice";
import { useAppDispatch } from "../../../../../redux/hooks";

import styles from "./index.module.css";

const InitialQuestions = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading } = useSelector((state: RootState) => state.auth);
  const typeId = Number(searchParams.get("typeId"));
  const invitationkey = searchParams.get("invitationkey") || "";

  const onFinish = (values: ITaxPayerFormData) => {
    setSearchParams(
      `?${createSearchParams({
        typeId: values.taxPreparationTypeId.toString(),
        invitationkey,
      }).toString()}`,
    );
  };

  const onSubmit = async (
    state: ISignUpIndividualPayload | ISignUpBusinessPayload,
  ) => {
    try {
      if (typeId === TAX_PREPARATION_TYPES.INDIVIDUAL) {
        await dispatch(
          addIndividualTaxpayerInitialQuestions({
            ...state,
            invitationkey,
          } as ISignUpIndividualPayload),
        );
      } else if (typeId === TAX_PREPARATION_TYPES.BUSINESS_ENTITY) {
        await dispatch(
          addBusinessTaxpayerInitialQuestions({
            ...state,
            invitationkey,
          } as ISignUpBusinessPayload),
        );
        await dispatch(getQuoteRequests());
      }
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const initialValues = {
    taxPreparationTypeId: undefined,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("tax_preparation_types.answer1"),
      value: TAX_PREPARATION_TYPES.INDIVIDUAL,
    },
    {
      label: t("tax_preparation_types.answer2"),
      value: TAX_PREPARATION_TYPES.BUSINESS_ENTITY,
    },
  ];

  const DefaultType = () => (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <h2 className={styles.title}>{t("tax_preparation_types.title")}</h2>
      <Form.Item
        name="taxPreparationTypeId"
        rules={[
          {
            required: true,
            message: t("validations.required"),
          },
        ]}
      >
        <RadioGroup data={radioButtons} />
      </Form.Item>

      <CircularDirection
        hasLeft={false}
        rightButton={{
          htmlType: "submit",
        }}
      />
    </Form>
  );

  switch (typeId) {
    case TAX_PREPARATION_TYPES.INDIVIDUAL:
      return <Individual onSubmit={onSubmit} />;
    case TAX_PREPARATION_TYPES.BUSINESS_ENTITY:
      return <Business onSubmit={onSubmit} />;
    default:
      return (
        <QuestionsContainer
          justifyContent={"center"}
          steps={[{ component: <DefaultType /> }]}
        />
      );
  }
};

export default InitialQuestions;

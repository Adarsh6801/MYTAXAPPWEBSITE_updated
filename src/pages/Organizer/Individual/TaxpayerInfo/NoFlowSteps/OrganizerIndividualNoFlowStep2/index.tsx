import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

import CircularDirection from "../../../../../../components/CircularDirection";
import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
import { DataOfKey, IQuestionContainer } from "./index.props";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { TAX_PAYER_NAMES } from "../../../../../../constants/organizer";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../../helpers/format";
import { dataPicker, input } from "../../../../../../components/Module";
import {
  dataTaxpayerQuestion,
  DATA_KEY,
  SOCIAL_SECURITY,
  SPOUSE_NAMES,
} from "./index.constants";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";
import { disabledDateFuture } from "../../../../../../helpers/date";

const noop = () => {};

const OrganizerIndividualNoFlowStep2 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();

  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  useEffect(() => {
    if (dataOrganizer) {
      const stepData = dataOrganizer.filter((el: any, i: number) => {
        return (
          !!DATA_KEY.find(item => {
            return el.question.includes(item);
          }) &&
          dataOrganizer.filter(
            (item: any, index: number) =>
              index < i && item.question === el.question,
          )?.length < 2
        );
      });

      const currentType = stepData.map((el: any) => {
        return getCurrentType(el);
      });

      const resultData: any[] =
        stepData.length > 0
          ? addQuoteIdOrganizer(currentType, Number(quoteId))
          : [];

      resultData.forEach((item: any) => {
        if (item.isFile) {
          form.setFieldsValue({
            [item.question]: item.files,
          });
        } else {
          if (item.question == "taxPayerSocialSecurityNo") {
            const formattedSSN = item.answer.replace(
              /(\d{3})(\d{2})(\d{4})/,
              "$1-$2-$3",
            );
            form.setFieldsValue({
              [item.question]: formattedSSN,
            });
          } else {
            form.setFieldsValue({
              [item.question]: item.answer,
            });
          }
        }
      });
      resultData.length >= DATA_KEY.length && setData(resultData);
    }
  }, [dataOrganizer]);

  const onFinish = async (values: any) => {
    try {
      onStepSubmit(values);
      await dispatch(setIndividualOrganizer(data));
      nextStep();
    } catch (e) {}
  };

  const initialValues = {
    taxPayerFirstName: null,
    taxPayerMiddleInitial: null,
    taxPayerLastName: null,
    taxPayerBirthday: null,
    taxPayerSocialSecurityNo: null,
    taxPayerOccupation: null,
    taxPayerMobileNumber: null,
    isTaxPayerLegallyBlind: false,
    spouseFirstName: null,
    spouseMiddleInitial: null,
    spouseLastName: null,
    spouseBirthday: null,
    spouseSocialSecurityNo: null,
    spouseOccupation: null,
    spouseMobileNumber: null,
    isSpouseLegallyBlind: false,
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);

    const result =
      name === "taxPayerBirthday" || name === "spouseBirthday"
        ? moment(value[name]).format(DEFAULT_DATE_FORMAT)
        : value[name];
    const newData = [...data];

    newData[index] = {
      ...data[index],
      answer: result,
      message: "",
      reminder: false,
      isFile: false,
      files: null,
    };

    setData([...newData]);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question}
        data={data[index]}
        onAlert={() => {
          const newData = [...data];
          newData[index] = { ...data[index], reminder: !data[index].reminder };
          setData(newData);
        }}
        onMessage={(comment: string) => {
          const newData = [...data];
          newData[index] = { ...data[index], message: comment };
          setData(newData);
        }}
        className={styles.questionCardContainer}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (names: DataOfKey[], title: string) => {
    const [
      firstName,
      middleInitial,
      birthday,
      socialSecurityNo,
      lastName,
      occupation,
      mobileNumber,
      legallyBlind,
    ] = names;

    const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      value = value.replace(/\D/g, "");
      if (value.length > 9) {
        value = value.slice(0, 9);
      }
      if (value.length <= 3) {
        value = value.replace(/(\d{3})/, "$1");
      } else if (value.length <= 5) {
        value = value.replace(/(\d{3})(\d{2})/, "$1-$2");
      } else {
        value = value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
      }
      e.target.value = value;
      form.setFieldsValue({
        [socialSecurityNo]: value,
      });
    };

    return (
      <div>
        <p className={styles.title}>{title}</p>
        {questionContainer({
          key: firstName,
          children: input({
            name: firstName,
            label: t("organizer.individual.no_flow.step2.first_name"),
            text: t("organizer.individual.no_flow.step2.must_match_ss_admin"),
            placeholder: "Donald",
            required: true,
            pattern: {
              value: /^[A-Za-z\s]+$/, // Allows letters, numbers, spaces, and '/'
              message: "Only letters are allowed",
            },
          }),
        })}
        <div className={styles.inputContainer}>
          {input({
            name: middleInitial,
            label: t("organizer.individual.no_flow.step2.middle_initial"),
            placeholder: "J",
            pattern: {
              value: /^[A-Za-z0-9\s\/]+$/, // Allows letters, numbers, spaces, and '/'
              message: "Only letters, numbers, and '/' are allowed",
            },
          })}
        </div>
        <div className={styles.inputContainer}>
          {input({
            name: lastName,
            label: t("organizer.individual.no_flow.step2.last_name"),
            placeholder: "Trump",
            required: true,
            message: "Last Name is Required",
          })}
        </div>
        <div className={styles.dataPickerContainer}>
          {questionContainer({
            key: birthday,
            children: dataPicker({
              name: birthday,
              label: t("organizer.individual.no_flow.step2.birthday"),
              disabledDate: disabledDateFuture,
              defaultValue: data[findIndexData(birthday, data)].answer,
            }),
          })}
          <div className={styles.socialSecurityNo}>
            {input({
              name: socialSecurityNo,
              label: t("organizer.individual.no_flow.step2.social_security_no"),
              text: t("organizer.individual.no_flow.step2.label1"),
              placeholder: SOCIAL_SECURITY,
              hasMargin: true,
              customOnChange,
              isNumericOnly: true,
            })}
          </div>
        </div>
        {questionContainer({
          key: occupation,
          children: input({
            name: occupation,
            label: t("organizer.individual.no_flow.step2.occupation"),
          }),
        })}
        {questionContainer({
          key: mobileNumber,
          children: input({
            name: mobileNumber,
            label: t("organizer.individual.no_flow.step2.mobile_number"),
            placeholder: "(XXX) XXX-XXXX ",
          }),
        })}
        <Form.Item
          name={legallyBlind}
          valuePropName="checked"
          className={styles.checkboxContainer}
        >
          <Checkbox>
            {t("organizer.individual.no_flow.step2.legally_blind")}
          </Checkbox>
        </Form.Item>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        form={form}
        onValuesChange={onValuesChange}
        requiredMark={false}
        layout="vertical"
      >
        <div className={styles.subContainer}>
          {formInfo(
            TAX_PAYER_NAMES,
            t("organizer.individual.no_flow.step2.taxpayer"),
          )}
          {dataOrganizer &&
            dataOrganizer[
              findIndexData(
                "wereYouLegallyMarriedLastDayOfTheYear",
                dataOrganizer,
              )
            ]?.answer === "true" &&
            dataOrganizer[findIndexData("filingStatus", dataOrganizer)]
              ?.answer === "2" &&
            formInfo(
              SPOUSE_NAMES,
              t("organizer.individual.no_flow.step2.spouse"),
            )}
        </div>
        <CircularDirection
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default OrganizerIndividualNoFlowStep2;

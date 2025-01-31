import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { DataOfKey, IQuestionContainer } from "./index.props";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../../helpers/format";
import { dataPicker, input, select } from "../../../../../../components/Module";
import {
  dataState,
  dataTaxpayerQuestion,
  DATA_KEY,
  SPOUSE_NAMES_AS_DES_31,
  TAX_PAYER_NAMES_AS_DES_31,
} from "./index.constants";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";

import { ReactComponent as Calendar } from "../../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const OrganizerIndividualNoFlowStep4 = (props: ITaxPayerInfoStepsProps) => {
  const { prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
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
          form.setFieldsValue({
            [item.question]: item.answer,
          });
        }
      });

      resultData.length >= DATA_KEY.length && setData(resultData);
    }
  }, [dataOrganizer]);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const onFinish = async (values: any) => {
    try {
      onStepSubmit(values);
      await dispatch(setIndividualOrganizer(data));
      goTo(9);
    } catch (e) {}
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);
    const result =
      name === "unitNoAsOfDec31"
        ? value[name]
          ? value[name]
          : moment(undefined)
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

  const initialValues = {
    youMovedFromAddressPriorYear: null,
    street: null,
    aptUnitNo: null,
    zipCode: null,
    state: null,
    city: null,
    alternateHomePhoneNumber: null,
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
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (names: DataOfKey[], title: string) => {
    const [street, unitNoAs, zipCode, state, city, homePhoneNumber] = names;

  
    return (
      <div>
        <p>{title}</p>
        <div>
          {questionContainer({
            question: t("organizer.individual.no_flow.step4.street"),
            key: street,
            children: input({
              name: street,
              required: true, // Enable validation
              message: t("organizer.individual.no_flow.step4.street_required"), // Custom message
              placeholder : "123 Main St",
              pattern: {
                value: /^[A-Za-z0-9\s\/]+$/, // Allows letters, numbers, spaces, and '/'
                message: "Only letters, numbers, and '/' are allowed",
              },
            }),
          })}

          <div>
            {questionContainer({
              question: t("organizer.individual.no_flow.step4.apt_unit_no"),
              key: unitNoAs,
             /*  children: dataPicker({
                name: unitNoAs,
                icon: <Calendar />,
                defaultValue: data[findIndexData(unitNoAs, data)].answer,
              }), */
              children: input({
                name: unitNoAs,
                placeholder : " A205",
                pattern: {
                  value: /^[A-Za-z0-9\s\/]+$/, // Allows letters, numbers, spaces, and '/'
                  message: "Only letters, numbers, and '/' are allowed",
                },
              }),
            })}
            <div className={styles.zipCode}>
              {questionContainer({
                question: t("organizer.individual.no_flow.step4.zip_code"),
                key: zipCode,
                children: input({
                  name: zipCode,
                  textStyle: styles.input,
                  placeholder : '91555',
                  isNumericOnly: true,
                  required: true,
                  message : 'Zipcode Is Required',
                  // minLength : 5,
                  // maxLength : 5,
                  // minLengthMessage: "Minimum 5 characters required",
                  // maxLengthMessage: 'maximum 5 charaters allowed',
                  pattern: {
                    value: /^[0-9]{5}$/, // Matches exactly 5 numeric digits
                    message: "Zipcode must be exactly 5 numeric digits",
                  },
                }),
              })}
            </div>
          </div>
          {questionContainer({
            question: t("organizer.individual.no_flow.step4.state"),
            key: state,
            children: select({
              placeholder : 'CA',
              name: state,
              data: dataState,
              required: true,
              message : 'State Is Required'
              
            }),
          })}
          {questionContainer({
            question: t("organizer.individual.no_flow.step4.city"),
            key: city,
            children: input({
              name: city,
              placeholder : ' Los Angeles ',
              required: true,
              message : 'City Is Required',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters are allowed",
              },
            }),
          })}
          {questionContainer({
            question: t("organizer.individual.no_flow.step4.phone_number"),
            key: homePhoneNumber,
            children: input({
              name: homePhoneNumber,
              text: t("organizer.individual.no_flow.step4.description"),
              hasMargin: true,
              placeholder : '(XXX) XXX-XXXX',
              isNumericOnly : true,
              // minLength : 10,
              // maxLength : 14,
              // minLengthMessage: "too short",
              // maxLengthMessage: 'too long',
              pattern: {
                value: /^[0-9]{10,14}$/, // Matches between 10 and 14 numeric digits
                message: "Phone number must be between 10 and 14 numeric digits",
              },
            }),
          })}
        </div>
      </div>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div className={styles.container}>
        {formInfo(
          TAX_PAYER_NAMES_AS_DES_31,
          t("organizer.individual.no_flow.step4.taxpayer"),
        )}
        <div>
          <Form.Item name={"addSeparatelyForSpouse"} valuePropName="checked">
            <Checkbox
              value={data[findIndexData("addSeparatelyForSpouse", data)].answer}
            >
              {t(
                "organizer.individual.no_flow.step4.add_separately_for_spouse",
              )}
            </Checkbox>
          </Form.Item>
          {data[findIndexData("addSeparatelyForSpouse", data)].answer
            ? formInfo(
                SPOUSE_NAMES_AS_DES_31,
                t("organizer.individual.no_flow.step4.spouse"),
              )
            : null}
        </div>
      </div>
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default OrganizerIndividualNoFlowStep4;

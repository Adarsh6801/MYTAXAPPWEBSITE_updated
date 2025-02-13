import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import {
  select,
  input,
  dataPicker,
  radio,
  InputMask,
} from "../../../../../../components/Module";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../../helpers/format";
import { disabledDateFuture } from "../../../../../../helpers/date";
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
import {
  dataTaxpayerQuestion,
  DATA_KEY,
  radioButtons,
  dataState,
} from "./index.constants";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { DataOfKey } from "./index.props";

import { ReactComponent as Calendar } from "../../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const OrganizerIndividualYesFlowStep2 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
  const [fieldName, setFiledName] = useState("");
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    console.log("dataOrganizer....");
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
        if (item.question === "currentHomePhoneNumber") {
          const formattedNumber = formatPhoneNumber(item.answer);
          console.log(formattedNumber); // Output: (121) 212-1212 1212

          form.setFieldsValue({
            [item.question]: formattedNumber,
          });
          return;
        }
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

      console.log("resultData", form.getFieldValue("currentUnitNo"));
    }
  }, [dataOrganizer]);
  function formatPhoneNumber(number: string): string {
    if (number) {
      // Remove non-digit characters
      const cleaned = number.replace(/\D/g, "");

      // Apply the regex pattern to format the number
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})(\d{0,4})$/);

      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}${
          match[4] ? ` ${match[4]}` : ""
        }`;
      }

      return number; // Return the original number if it doesn't match the expected length
    } else {
      return "";
    }
  }
  useEffect(() => {
    fieldName === "hasMovedFromTheAddressOnThePriorYear" &&
      restField(fieldName);
  }, [fieldName]);

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

  const restField = (name: string) => {
    let newObject = [...data];
    const resetName: string[] = [];
    const dataKeys = Object.entries(data);
    const propertyIndex = findIndexData(name, data);

    dataKeys.forEach((item, index) => {
      if (index > propertyIndex) {
        resetName.push(data[index].question);
        newObject[index] = {
          ...data[index],
          answer: null,
          message: "",
          reminder: false,
          isFile: data[index].isFile,
          files: null,
        };
      }
    });

    form.resetFields(resetName);
    setData(newObject);
  };

  const onFinish = async () => {
    try {
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      goTo(2);
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);
    let result =  value[name];
    // result = name === 'currentStreet' ? 'currentStreet' : value[name]
    console.log(name, "NameTHIS");
    if (name === "currentHomePhoneNumber") {
      result = value.currentHomePhoneNumber.replace(/\D/g, ""); // \D matches anything that's not a digit
      console.log(result, "numbersOnly");
    }
    const newData = [...data];

    newData[index] = {
      ...data[index],
      answer: result,
      message: "",
      reminder: false,
      isFile: data[index].isFile,
      files: data[index].isFile ? result.target.files : null,
    };
    console.log("newData", value);
    // form.setFieldsValue({[name]:result})
    setData([...newData]);
    setFiledName(name);
  };

  const questionContainer = (dataQuestion: any) => {
    const { question, key, children, required } = dataQuestion;
    const index: number = +findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question}
        data={data[index]}
        onAlert={() => {
          const newData = [...data];
          newData[index] = { ...data[index], reminder: !data[index].reminder };
          setData(newData);
        }}
        onMessage={(message: string) => {
          const newData = [...data];
          newData[index] = { ...data[index], message: message };
          setData(newData);
        }}
        className={styles.questionContainer}
        required={required}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      {questionContainer({
        key: "hasMovedFromTheAddressOnThePriorYear",
        question: t("organizer.individual.yes_flow.step2.question_1"),
        required:true,
        children: radio({
          name: "hasMovedFromTheAddressOnThePriorYear",
          radioButtons: radioButtons,
        required:true,

        }),
      })}
      {data[findIndexData("hasMovedFromTheAddressOnThePriorYear", data)]
        .answer && (
        <div className={styles.subContainer}>
          <p>{t("organizer.individual.yes_flow.step2.current_number")}</p>
          <div>
            {questionContainer({
              key: "currentStreet",
              children: input({
                name: "currentStreet",
                label: t("organizer.individual.yes_flow.step2.street"),
                required: true, // Enable validation
                message: "Enter Street", // Custom message
                placeholder: "123 Main St",
                pattern: {
                  value: /^[A-Za-z0-9\s\/]+$/, // Allows letters, numbers, spaces, and '/'
                  message: "Only letters, numbers, and '/' are allowed",
                },
              }),
            })}
            <div className={styles.dataPickerContainer}>
              {questionContainer({
                key: "currentUnitNo",
                /* children: dataPicker({
                  name: "currentUnitNo",
                  label: t("organizer.individual.yes_flow.step2.apt_unit_no"),
                  disabledDate: disabledDateFuture,
                  icon: <Calendar />,
                  defaultValue:
                    data[findIndexData("currentUnitNo", data)].answer,
                }), */

                children: input({
                  name: "currentUnitNo",
                  label: t("organizer.individual.yes_flow.step2.apt_unit_no"),
                  placeholder: "A205",
                  pattern: {
                    value: /^[A-Za-z0-9\s\/]+$/, // Allows letters, numbers, spaces, and '/'
                    message: "Only letters, numbers, and '/' are allowed",
                  },
                }),
              })}
              <div
                className={getClassNames(styles.zipCode, styles.marginBottom)}
              >
                {questionContainer({
                  key: "currentZipCode",
                  children: input({
                    name: "currentZipCode",
                    label: t("organizer.individual.yes_flow.step2.zip_code"),
                    inputStyle: styles.input,
                    placeholder: "91555",
                    isNumericOnly: true,
                    required: true,
                    message: "Enter Zipcode",
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
              key: "currentState",
              children: select({
                name: "currentState",
                label: t("organizer.individual.yes_flow.step2.state"),
                data: dataState,
                required: true,
                message: "Enter State",
                placeholder: "CA",
              }),
            })}
            {questionContainer({
              key: "currentCity",
              children: input({
                name: "currentCity",
                label: t("organizer.individual.yes_flow.step2.city"),
                placeholder: " Los Angeles ",
                required: true,
                message: "Enter City",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters are allowed",
                },
              }),
            })}

            {questionContainer({
              key: "currentHomePhoneNumber",
              // children: inputMask({
              //   name: "currentHomePhoneNumber",
              //   label: t(
              //     "organizer.individual.yes_flow.step2.alternate_home_phone_number",
              //   ),
              //   text: t("organizer.individual.no_flow.step4.description"),
              //   hasMargin: true,
              //   placeholder : '(XXX) XXX-XXXX',
              //   // isNumericOnly : true,
              //   // minLength : 10,
              //   // maxLength : 14,
              //   // minLengthMessage: "Number is too short",
              //   // maxLengthMessage: 'Number is too long',
              //   pattern: {
              //     value: /^\(\d{3}\) \d{3}-\d{4}(?: \d{0,4})?$/, // Matches between 10 and 14 numeric digits
              //     message: "Phone number must be between 10 and 14 numeric digits",
              //   },
              //   defaultValue:"8157020281"
              // }),
              children: (
<InputMask
  name="currentHomePhoneNumber"
  label="Alternate Home Phone Number"
  placeholder="(XXX) XXX-XXXX"
  required={false}
  pattern={{
    value: /^(\(\d{3}\) \d{3}-\d{4}(?: \d{0,4})?)?$/,
    message: "Phone number must be between 10 and 14 numeric digits",
  }}
  maskFormat="(000) 000-0000[ 0000]"
/>

              ),
            })}
          </div>
        </div>
      )}
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default OrganizerIndividualYesFlowStep2;

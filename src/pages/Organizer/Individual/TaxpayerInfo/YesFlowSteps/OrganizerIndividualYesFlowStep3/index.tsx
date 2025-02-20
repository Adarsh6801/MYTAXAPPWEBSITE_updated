import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import RadioGroupDate from "../../../../../../components/RadioGroupDate";
import {
  disabledDateFuture,
  disabledDatePast,
} from "../../../../../../helpers/date";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getClassNames,
  getCurrentType,
} from "../../../../../../helpers/format";
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
import {
  dataTaxpayerQuestion,
  DATA_KEY,
  radioButtons,
  radioButton,
  dataState,
} from "./index.constants";
import {
  checkbox,
  dataPicker,
  input,
  select,
  upload,
  radio,
  ssnInput,
  phoneNumberInput,
  InputMask,
  Uploads,
} from "../../../../../../components/Module";
import { downloadFile } from "../../../../../../redux/conversationSlice";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";

import { ReactComponent as Calendar } from "../../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const OrganizerIndividualYesFlowStep3 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const [fieldName, setFiledName] = useState("");
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  const [hasDriverLicenseImages, setHasDriverLicenseImages] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    fieldName === "haveMarriageStatusChangedSinceLastFiledReturn" &&
      data[findIndexData(fieldName, data)].answer !== null &&
      restField(fieldName);
  }, [fieldName]);

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

      console.log(resultData, "resultDataaa");

      resultData.forEach((item: any) => {
        if (item.question === "spouseSocialSecurityNo") {
          const formattedNumber = formatPhoneNumber(item.answer);
          console.log(formattedNumber);

          form.setFieldsValue({
            [item.question]: formattedNumber,
          });
          return;
        }
        if (item.question === "spouseMobileNumber") {
          const formattedNumber = formatPhoneNumber(item.answer);
          console.log(formattedNumber);

          form.setFieldsValue({
            [item.question]: formattedNumber,
          });
          return;
        }
        if (item.question === "spouseImagesOfDriversLicense") {
          setHasDriverLicenseImages(item.files.length > 0);
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

      resultData.length >= DATA_KEY.length && setData([...resultData]);
    }
  }, [dataOrganizer]);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const onFinish = async () => {
    try {
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      nextStep();
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const formatPhoneNumber = (number: string): string => {
    if (!number) return "";
    const cleaned = number.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return number;
  };

  const restField = (name: string) => {
    let newObject = [...data];
    const resetName: string[] = [];
    const dataKeys = Object.entries(data);

    dataKeys.forEach(([key, value]: any, index: number) => {
      if (value.question === "haveMarriageStatusChangedSinceLastFiledReturn") {
        return;
      }
      resetName.push(data[index].question);

      newObject[index] = {
        ...data[index],
        answer: null,
        message: "",
        reminder: false,
        isFile: data[index].isFile,
        files: null,
      };
    });

    form.resetFields(resetName);
    setData(newObject);
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);

    const result =
      name ===
      ("taxPayerBirthday" ||
        "spouseDriversLicenseIssuedDate" ||
        "spouseDriversLicenseExpiresDate")
        ? value[name]
          ? undefined
          : moment(
              (moment(value[name].format(DEFAULT_DATE_FORMAT).toString()),
              DEFAULT_DATE_FORMAT),
            )
        : value[name];

    const newData = [...data];

    newData[index] = {
      ...data[index],
      answer: result,
      message: "",
      reminder: false,
      isFile: data[index].isFile,
      files: data[index].isFile ? value[name].fileList : null,
    };

    setData([...newData]);
    setFiledName(name);
  };

  const questionContainer = (dataQuestion: any) => {
    const { key, question, children, required } = dataQuestion;
    const index: number = +findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        data={data[index]}
        question={question}
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
        required={required}
        className={getClassNames(styles.questionContainer)}
      >
        { required ?  children : children}
      </OrganizerQuestionCard>
    );
  };

  const handleDriverLicenseImagesChange = (fileList: any) => {
    console.log(fileList, "fileList");

    setHasDriverLicenseImages(fileList.fileList.length > 0);
  };


  let isRequired = !(form.getFieldValue("spouseDriversLicense") &&
  form.getFieldValue("spouseDriversLicenseState") &&
  form.getFieldValue("spouseDriversLicenseIssuedDate") &&
  form.getFieldValue("spouseDriversLicenseExpiresDate"))

  return (
    <Form
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div className={styles.container}>
        <div>
          <p>{t("organizer.individual.yes_flow.step3.title")}</p>
          <Form.Item name="haveMarriageStatusChangedSinceLastFiledReturn">
            <RadioGroupDate
              data={radioButtons}
              dateDefaultValue={
                data[findIndexData("marriageStatusChangedDate", data)].answer
              }
              size={30}
              value={
                data[
                  findIndexData(
                    "haveMarriageStatusChangedSinceLastFiledReturn",
                    data,
                  )
                ]?.answer
                  ? data[
                      findIndexData(
                        "haveMarriageStatusChangedSinceLastFiledReturn",
                        data,
                      )
                    ]?.answer
                  : 0
              }
              onChange={e => {
                form.resetFields(["spouseFirstName"]);
              }}
              onChangeDate={(_, datString) => {
                const newData = [...data];
                newData[findIndexData("marriageStatusChangedDate", data)] = {
                  ...data[findIndexData("marriageStatusChangedDate", data)],
                  answer: datString,
                };
                setData(newData);
              }}
              disabledDate={disabledDateFuture}
            />
          </Form.Item>
        </div>
        {data[
          findIndexData("haveMarriageStatusChangedSinceLastFiledReturn", data)
        ].answer !== null &&
          data[
            findIndexData("haveMarriageStatusChangedSinceLastFiledReturn", data)
          ].answer !== 0 && (
            <div>
              <p>{t("organizer.individual.yes_flow.step3.sub_title")}</p>
              {questionContainer({
                key: "spouseFirstName",
                children: input({
                  name: "spouseFirstName",
                  label: t("organizer.individual.yes_flow.step3.first_name"),
                  placeholder: "John A  Smith",
                  text: "(Must Match SS Admin)",
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z\s.]*$/, // Allows letters, numbers, spaces, and '/'
                    message: "Only letters are allowed.",
                  },
                }),
              })}
              <div className={styles.dataPickerContainer}>
                {questionContainer({
                  key: "spouseBirthday",
                  required: true,
                  children: dataPicker({
                    name: "spouseBirthday",
                    label: t("organizer.individual.yes_flow.step3.birthday"),
                    icon: <Calendar />,
                    required: true,
                    disabledDate: disabledDateFuture,
                    defaultValue:
                      data[findIndexData("spouseBirthday", data)].answer,
                  }),
                })}
                <div className={styles.zipCode}>
                  <InputMask
                    name="spouseSocialSecurityNo"
                    label={t(
                      "organizer.individual.yes_flow.step3.social_security_no",
                    )}
                    hasMargin={true}
                    placeholder="(XXX) XXX-XXXX"
                    required={true}
                    message="Enter Social Security No"
                    pattern={{
                      value: /^\d{3}-\d{2}-\d{4}$/, // Matches between 10 and 14 numeric digits
                      message: "Social security no must be 9 numeric digits",
                    }}
                    maskFormat="000-00-0000"
                  />
                  <p className={styles.promptText}>
                    {t("organizer.individual.yes_flow.step3.irs")}
                  </p>
                </div>
              </div>
              {questionContainer({
                key: "spouseOccupation",
                children: input({
                  name: "spouseOccupation",
                  label: t("organizer.individual.yes_flow.step3.occupation"),
                  pattern: {
                    value: /^[A-Za-z0-9\s]{1,18}$/, // Allows letters, numbers, and spaces
                    message:
                      "Invalid format! Only letters, numbers allowed character limit 18",
                  },
                }),
              })}
              {questionContainer({
                key: "spouseMobileNumber",
                children: (
                  <InputMask
                    name="spouseMobileNumber"
                    label={t(
                      "organizer.individual.yes_flow.step3.mobile_number",
                    )}
                    placeholder="(XXX) XXX-XXXX"
                    required={true}
                    message="Enter Mobile Number"
                    pattern={{
                      value: /^(\(\d{3}\) \d{3}-\d{4}(?: \d{0,4})?)?$/,
                      message:
                        "Phone number must be between 10 and 14 numeric digits",
                    }}
                    maskFormat="(000) 000-0000[ 0000]"
                  />
                ),
              })}
              {checkbox({
                name: "isSpouseLegallyBlind",
                label: t("organizer.individual.yes_flow.step3.legally_blind"),
                value: data[findIndexData("isSpouseLegallyBlind", data)].answer,
              })}
              {questionContainer({
                key: "isSpouseHasDriversLicense",
                question: t(
                  "organizer.individual.yes_flow.step3.has_driving_license",
                ),
                required: true,
                children: radio({
                  required: true,
                  name: "isSpouseHasDriversLicense",
                  radioButtons: radioButton,
                }),
              })}
              {data[findIndexData("isSpouseHasDriversLicense", data)].answer==false &&
                (!hasDriverLicenseImages ? (
                  <>
                    {questionContainer({
                      key: "spouseDriversLicense",
                      children: input({
                        name: "spouseDriversLicense",
                        label: t(
                          "organizer.individual.yes_flow.step3.drivers_license",
                        ),
                        form,
                        required: true,
                        placeholder: "A5407613",
                        pattern: {
                          value: /^[A-Za-z0-9]{8,14}$/, // Allows letters, numbers, spaces, and '/'
                          message:
                            "Invalid format! Please enter between 8 and 14 alphanumeric characters",
                        },
                      }),
                    })}
                    {questionContainer({
                      key: "spouseDriversLicenseState",
                      children: select({
                        name: "spouseDriversLicenseState",
                        label: t("organizer.individual.yes_flow.step3.state"),
                        data: dataState,
                        required: true,
                        placeholder: "CA",
                      }),
                    })}
                    <div className={styles.dataPickerContainer}>
                      {questionContainer({
                        key: "spouseDriversLicenseIssuedDate",
                        children: dataPicker({
                          name: "spouseDriversLicenseIssuedDate",
                          label: t(
                            "organizer.individual.yes_flow.step3.issued_date",
                          ),
                          icon: <Calendar />,
                          required: true,
                          disabledDate: disabledDateFuture,
                          defaultValue:
                            data[
                              findIndexData(
                                "spouseDriversLicenseIssuedDate",
                                data,
                              )
                            ].answer,
                        }),
                      })}
                      <div className={styles.zipCode}>
                        {dataPicker({
                          name: "spouseDriversLicenseExpiresDate",
                          label: t(
                            "organizer.individual.yes_flow.step3.expires",
                          ),
                          icon: <Calendar />,
                          disabledDate: disabledDatePast,
                          required: true,
                          defaultValue:
                            data[
                              findIndexData(
                                "spouseDriversLicenseExpiresDate",
                                data,
                              )
                            ].answer,
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {questionContainer({
                      key: "spouseDriversLicense",
                      children: input({
                        name: "spouseDriversLicense",
                        label: t(
                          "organizer.individual.yes_flow.step3.drivers_license",
                        ),
                        placeholder: "A5407613",
                        form,
                        required:false,
                        pattern: {
                          value: /^[A-Za-z0-9]{8,14}$/, // Allows letters, numbers, spaces, and '/'
                          message:
                            "Invalid format! Please enter between 8 and 14 alphanumeric characters",
                        },
                      }),
                    })}
                    {questionContainer({
                      key: "spouseDriversLicenseState",
                      children: select({
                        name: "spouseDriversLicenseState",
                        label: t("organizer.individual.yes_flow.step3.state"),
                        data: dataState,
                        form,
                        required:false,

                        placeholder: "CA",
                      }),
                    })}
                    <div className={styles.dataPickerContainer}>
                      {questionContainer({
                        key: "spouseDriversLicenseIssuedDate",
                        children: dataPicker({
                          name: "spouseDriversLicenseIssuedDate",
                          label: t(
                            "organizer.individual.yes_flow.step3.issued_date",
                          ),
                          icon: <Calendar />,
                          form,
                          required:false,
                          disabledDate: disabledDateFuture,
                          defaultValue:
                            data[
                              findIndexData(
                                "spouseDriversLicenseIssuedDate",
                                data,
                              )
                            ]?.answer,
                        }),
                      })}
                      <div className={styles.zipCode}>
                        {dataPicker({
                          name: "spouseDriversLicenseExpiresDate",
                          label: t(
                            "organizer.individual.yes_flow.step3.expires",
                          ),
                          icon: <Calendar />,
                          form,
                          required:false,
                          disabledDate: disabledDatePast,
                          defaultValue:
                            data[
                              findIndexData(
                                "spouseDriversLicenseExpiresDate",
                                data,
                              )
                            ]?.answer,
                        })}
                      </div>
                    </div>
                  </>
                ))}
              {data[findIndexData("isSpouseHasDriversLicense", data)].answer==false &&
                questionContainer({
                  key: "spouseImagesOfDriversLicense",
                  question: t(
                    "organizer.individual.yes_flow.step3.images_drivers_license",
                  ),
                  required:isRequired,
                  children: upload({
                    key: "spouseImagesOfDriversLicense",
                    data: data,
                    required:isRequired,
                    form,
                    allowedFileTypes: ["application/pdf", "image/jpeg"],
                    buttonText: t("organizer.individual.yes_flow.step3.attach"),
                    dispatch: dispatch,
                    minCount: 1,
                    onClick: (index = 0) => {
                      dispatch(
                        downloadFile(
                          data[
                            findIndexData("spouseImagesOfDriversLicense", data)
                          ].files[index].id,
                          data[
                            findIndexData("spouseImagesOfDriversLicense", data)
                          ].files[index].name,
                        ),
                      );
                    },
                    onRemove: (index = 0) => {
                      console.log("Data before removal:", data); // Log the entire data object
                      const newData = [...data];
                      const fileIndex = findIndexData(
                        "spouseImagesOfDriversLicense",
                        data,
                      );

                      // Ensure the fileIndex exists and is correct
                      if (
                        fileIndex !== undefined &&
                        newData[fileIndex]?.files
                      ) {
                        const newFileList = [
                          ...newData[fileIndex].files.slice(0, index),
                          ...newData[fileIndex].files.slice(index + 1),
                        ];

                        console.log("Updated file list:", newFileList); // Log the updated list
                        newData[fileIndex].files = newFileList;

                        setData([...newData]);
                      } else {
                        console.error(
                          "Failed to find file index or file list:",
                          newData,
                        );
                      }
                    },
                    maxCount: 1,
                    onChange: handleDriverLicenseImagesChange,
                  }),
                  // children: <Uploads
                  //   key={ "spouseImagesOfDriversLicense"}
                  //   data= {data}
                  //   required={!(
                  //         form.getFieldValue("spouseDriversLicense") &&
                  //         form.getFieldValue("spouseDriversLicenseState") &&
                  //         form.getFieldValue("spouseDriversLicenseIssuedDate") &&
                  //         form.getFieldValue("spouseDriversLicenseExpiresDate")
                  //       )}
                  //       allowedFileTypes={ ["application/pdf", "image/jpeg"]}
                  //       buttonText={ t("organizer.individual.yes_flow.step3.attach")}
                  //       dispatch={ dispatch}
                  //       onClick={ (index = 0) => {
                  //             dispatch(
                  //               downloadFile(
                  //                 data[
                  //                   findIndexData("spouseImagesOfDriversLicense", data)
                  //                 ].files[index].id,
                  //                 data[
                  //                   findIndexData("spouseImagesOfDriversLicense", data)
                  //                 ].files[index].name,
                  //               ),
                  //             );
                  //           }}
                  //                      onRemove={ (index = 0) => {
                  //     console.log("Data before removal:", data); // Log the entire data object
                  //     const newData = [...data];
                  //     const fileIndex = findIndexData(
                  //       "spouseImagesOfDriversLicense",
                  //       data,
                  //     );

                  //     // Ensure the fileIndex exists and is correct
                  //     if (
                  //       fileIndex !== undefined &&
                  //       newData[fileIndex]?.files
                  //     ) {
                  //       const newFileList = [
                  //         ...newData[fileIndex].files.slice(0, index),
                  //         ...newData[fileIndex].files.slice(index + 1),
                  //       ];

                  //       console.log("Updated file list:", newFileList); // Log the updated list
                  //       newData[fileIndex].files = newFileList;

                  //       setData([...newData]);
                  //     } else {
                  //       console.error(
                  //         "Failed to find file index or file list:",
                  //         newData,
                  //       );
                  //     }
                  //   }}
                  //   maxCount= {1}
                  //   onChange={ handleDriverLicenseImagesChange}
                  // />,
                })}
            </div>
          )}
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

export default OrganizerIndividualYesFlowStep3;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Checkbox, Form, Input, Divider, Table } from "antd";
import _ from "lodash";

import CircularDirection from "../../../../../components/CircularDirection";
import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import Button from "../../../../../components/Button";
import {
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
  getClassNames,
} from "../../../../../helpers/format";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../index.props";
import { IInputsName, IQuestionContainer } from "./index.props";
import {
  taxPayer,
  spouse,
  businessMiles,
  vehicle,
  radioButtons,
  dataRadio,
  DATA_KEY,
} from "./index.constants";
import { checkbox, input, radio } from "../../../../../components/Module";

import styles from "./index.module.css";
import { color } from "html2canvas/dist/types/css/types/color";

const noop = () => {};

const Step4 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
  const [tableCount, setTableCount] = useState<number>(2);
  const [showSpouse, setShowSpouse] = useState(false);
  const [originData, setOriginData] = useState<any>(businessMiles);
  const [tableVheicle, setTableVhecile] = useState<any>(vehicle);
  const [taxPayerAccountType, setTaxPayerAccountType] = useState<
    IOrganizerStepProps[]
  >(addQuoteIdOrganizer(taxPayer, Number(quoteId)));
  const [spouseAccountType, setSpouseAccountType] = useState<
    IOrganizerStepProps[]
  >(addQuoteIdOrganizer(spouse, Number(quoteId)));
  const [data, setData] = useState<IOrganizerStepProps[]>([
    ...taxPayerAccountType,
    ...spouseAccountType,
  ]);

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrganizer) {
      const stepData = dataOrganizer.filter((el: any) => {
        return !!DATA_KEY.find(item => {
          return el.question.includes(item);
        });
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

      if (resultData.length >= DATA_KEY.length) {
        if (
          stepData[findIndexData("businessMilesTableInfo", resultData)]
            .answer === undefined &&
          stepData[
            findIndexData("taxPayer_TotalMilesDrivenThisYear", resultData)
          ].answer === undefined
        ) {
          return;
        }
        const tableDataOne: any = JSON.parse(
          stepData[findIndexData("businessMilesTableInfo", resultData)].answer,
        );
        const tableDataTwo: any = JSON.parse(
          stepData[
            findIndexData("vehicleOperatingAndExpensesTableInfo", resultData)
          ].answer,
        );

        tableDataOne &&
          JSON.parse(tableDataOne.data).forEach((item: any) => {
            form.setFieldsValue({
              [`name${item.key}`]: item["name"],
              [`taxPayer${item.key}`]: item["taxPayer"],
              [`spouse${item.key}`]: item["spouse"],
            });
          });

        tableDataTwo &&
          JSON.parse(tableDataTwo.data).forEach((item: any) => {
            form.setFieldsValue({
              [`name${item.key}`]: item["name"],
              [`youVehicle${item.key}`]: item["youVehicle"],
              [`spouseVehicle${item.key}`]: item["spouseVehicle"],
            });
          });
        setData(resultData);

        tableDataOne && setOriginData(JSON.parse(tableDataOne.data));
        tableDataTwo && setTableVhecile(JSON.parse(tableDataTwo.data));
        tableDataOne && setTableCount(JSON.parse(tableDataOne.data).length);
      }
    }
  }, [dataOrganizer]);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const manyInput = (names: IInputsName[]) => {
    return (
      <>
        {names.map((item, index) =>
          input({
            name: item.key,
            label: item.value,
            key: index,
            pattern: item.pattern,
            required: item.required,
            placeholder: item.placeholder,
          }),
        )}
      </>
    );
  };

  const onFinish = async () => {
    const data = [...taxPayerAccountType, ...spouseAccountType];

    data[findIndexData("businessMilesTableInfo", data)].answer = JSON.stringify(
      {
        data: JSON.stringify(originData),
        columns: JSON.stringify(columnsTable1),
      },
    );

    data[findIndexData("vehicleOperatingAndExpensesTableInfo", data)].answer =
      JSON.stringify({
        data: JSON.stringify(tableVheicle),
        columns: JSON.stringify(columnsTable2),
      });
    onStepSubmit(data);
    await dispatch(setIndividualOrganizer(data));
    nextStep();
  };

  const columnsTable1 = [
    {
      title: t("organizer.individual.income.step4.table_description_property"),
      dataIndex: "name",
      width: "35%",
      editable: true,
      render: (_: any, record: any) => {
        return <p>{record.name}</p>;
      },
    },
    {
      title: t("organizer.individual.income.step4.table_you"),
      dataIndex: "taxPayer",
      editable: true,
      render: (_: any, record: any) => {
        return (
          // <Form.Item name={`taxPayer${record.key}`} style={{ margin: 0 }}>
          //   <Input defaultValue={record.taxPayer} required={true}  />
          // </Form.Item>
          <Form.Item
            label="Tax Payer"
            name={`taxPayer${record.key}`}
            initialValue={record.taxPayer}
            rules={[
              {
                required: true,
                message: "Enter total Rental-related miles driven during the year",
              },
              {
                pattern: /^\d{1,6}$/,
                message: "6 digits only allowed",
              },
            ]}
          >
            <Input defaultValue={record.taxPayer} />
          </Form.Item>
        );
      },
    },
    {
      title: t("organizer.individual.income.step4.table_spouse"),
      dataIndex: "spouse",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item
            name={`spouse${record.key}`}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: "Enter total Self Employed-related miles driven during the year.",
              },
              {
                pattern: /^\d{1,6}$/,
                message: "6 digits only allowed",
              },
            ]}
          >
            <Input defaultValue={record.spouse} />
          </Form.Item>
        );
      },
    },
  ];

  const columnsTable2 = [
    {
      title: "Description",
      dataIndex: "name",
      editable: true,
      render: (_: any, record: any) => {
        return <p>{record.name}</p>;
      },
    },
    {
      title: "You",
      dataIndex: "youVehicle",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`youVehicle${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.youVehicle} />
          </Form.Item>
        );
      },
    },
    {
      title: "Your spouse",
      dataIndex: "spouseVehicle",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`spouseVehicle${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.youVehicle} />
          </Form.Item>
        );
      },
    },
  ];

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children, subClass, required } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question}
        data={data[index]}
        required={required}
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
        className={styles.questionContainer}
        subClass={subClass}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const handleRemove = () => {
    const newData = [...originData];
    newData.splice(-2);
    setOriginData([...newData]);
    setTableCount(tableCount - 1);
  };

  const handleAdd = () => {
    const newData = [
      ...originData,
      ...[
        {
          key: tableCount + 1,
          name: t("organizer.individual.income.step4.filed_name1"),
          dataKey: "rental",
          you: "",
          spouse: "",
        },
        {
          key: tableCount + 2,
          name: t("organizer.individual.income.step4.filed_name2"),
          dataKey: "employedBusiness",
          you: "",
          spouse: "",
        },
      ],
    ];
    setOriginData([...newData]);
    setTableCount(tableCount + 1);
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);

    const dataValues = name.includes("taxPayer")
      ? taxPayerAccountType
      : spouseAccountType;
    const columnIndex = +name[name.length - 1] - 1;

    const filedName = !_.isNaN(+columnIndex) ? name.replace(/.$/, "") : name;
    const index: number = findIndexData(filedName, dataValues);

    if (index !== -1) {
      const newData = [...dataValues];
      newData[index] = {
        ...dataValues[index],
        answer: value[name],
      };

      filedName.includes("taxPayer")
        ? setTaxPayerAccountType(newData)
        : setSpouseAccountType(newData);

      setData([
        ...newData,
        ...(filedName.includes("taxPayer")
          ? spouseAccountType
          : taxPayerAccountType),
      ]);
    } else {
      const tableData = name.includes("Vehicle") ? tableVheicle : originData;
      const columnIndex = +name[name.length - 1] - 1;
      const filedName = name.replace(/.$/, "");

      const newOriginData = [...tableData];
      newOriginData[columnIndex] = {
        ...newOriginData[columnIndex],
        [filedName]: value[name],
      };

      name.includes("Vehicle")
        ? setTableVhecile(newOriginData)
        : setOriginData(newOriginData);
    }
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={onValuesChange}
        requiredMark={false}
        layout="vertical"
      >
        <div className={styles.container}>
          <div className={getClassNames(styles.subContainer, styles.marginTop)}>
            {questionContainer({
              key: "taxPayer_HaveVehicleExpensesFromBusinessOrRealEstate",
              question: t("organizer.individual.income.step4.question1"),
              required:true,
              children: radio({
                name: "taxPayer_HaveVehicleExpensesFromBusinessOrRealEstate",
                radioButtons: radioButtons,
                required:true
              }),
            })}
            {data[
              findIndexData(
                "taxPayer_HaveVehicleExpensesFromBusinessOrRealEstate",
                data,
              )
            ]?.answer && (
              <>
                <Divider />
                {questionContainer({
                  key: "taxPayer_VehicleMake",
                  question: t("organizer.individual.income.step4.question2"),
                  children: manyInput([
                    {
                      key: "taxPayer_VehicleMake",
                      value: "Make",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Only letters are allowed",
                      },
                      required: true,
                      placeholder: "Chevy",
                    },
                    {
                      key: "taxPayer_VehicleModel",
                      value: "Model",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Only letters are allowed",
                      },
                      required: true,
                      placeholder: "Camero",
                    },
                    {
                      key: "taxPayer_VehicleYear",
                      value: "Year",
                      pattern: {
                        value: /^(1[0-9]{3}|2[0-9]{3})$/,
                        message: "Enter valid year",
                      },
                      required: true,
                      placeholder: "2023",
                    },
                  ]),
                  subClass: styles.questionSubClass,
                })}
                <Divider />
                {/* {questionContainer({
                  key: "taxPayer_VehicleAvailableForPersonalUse",
                  question: t("organizer.individual.income.step4.question3"),
                  children: radio({
                    name: "taxPayer_VehicleAvailableForPersonalUse",
                    label: t("organizer.individual.income.step4.label4"),
                    value:
                      data[
                        findIndexData(
                          `taxPayer_VehicleAvailableForPersonalUse`,
                          data,
                        )
                      ].answer,
                  }),
                })} */}
                                                {questionContainer({
                  key: "taxPayer_VehicleAvailableForPersonalUse",
                  question: t("organizer.individual.income.step4.question3"),
                  required:true,
                  children: radio({
                    name: "taxPayer_VehicleAvailableForPersonalUse",
                    radioButtons: dataRadio,
                    required: true,
                    message: "Select Yes/No",
                    value:
                      data[
                        findIndexData(
                          "taxPayer_VehicleAvailableForPersonalUse",
                          data,
                        )
                      ]?.answer,
                  }),
                })}
                <Divider />

                {/* {questionContainer({
                  key: "taxPayer_AnotherVehicleAvailableForPersonalUse",
                  question: t("organizer.individual.income.step4.question4"),
                  children: radio({
                    name: "taxPayer_AnotherVehicleAvailableForPersonalUse",
                    value:
                      data[
                        findIndexData(
                          `taxPayer_AnotherVehicleAvailableForPersonalUse`,
                          data,
                        )
                      ].answer,
                  }),
                })} */}
                                {questionContainer({
                  key: "taxPayer_AnotherVehicleAvailableForPersonalUse",
                  question: t("organizer.individual.income.step4.question4"),
                  required:true,
                  children: radio({
                    name: "taxPayer_AnotherVehicleAvailableForPersonalUse",
                    radioButtons: dataRadio,
                    required: true,
                    message: "Select Yes/No",
                    value:
                      data[
                        findIndexData(
                          "taxPayer_AnotherVehicleAvailableForPersonalUse",
                          data,
                        )
                      ]?.answer,
                  }),
                })}

                <Divider />
                {/* {questionContainer({
                  key: "taxPayer_HaveWrittenEvidenceToSupportDeduction",
                  question: t("organizer.individual.income.step4.question5"),
                  children: radio({
                    name: "taxPayer_HaveWrittenEvidenceToSupportDeduction",
                    value:
                      data[
                        findIndexData(
                          `taxPayer_HaveWrittenEvidenceToSupportDeduction`,
                          data,
                        )
                      ].answer,
                  }),
                })} */}
                                                {questionContainer({
                  key: "taxPayer_HaveWrittenEvidenceToSupportDeduction",
                  question: t("organizer.individual.income.step4.question5"),
                  required:true,
                  children: radio({
                    name: "taxPayer_HaveWrittenEvidenceToSupportDeduction",
                    radioButtons: dataRadio,
                    required: true,
                    message: "Select Yes/No",
                    value:
                      data[
                        findIndexData(
                          "taxPayer_HaveWrittenEvidenceToSupportDeduction",
                          data,
                        )
                      ]?.answer,
                  }),
                })}

                
                <Divider />
                {questionContainer({
                  key: "taxPayer_ParkingExpensesAndTolls",
                  question: (
                    <p>
                      <Trans
                        i18nKey="organizer.individual.income.step4.question6"
                        values={{
                          info: "Do not include <br /> at place of employment",
                        }}
                        components={[
                          <span className={styles.additionalInfo}>text</span>,
                        ]}
                      />
                    </p>
                  ),
                  children: input({
                    name: "taxPayer_ParkingExpensesAndTolls",
                  }),
                })}
                <Divider />
                {questionContainer({
                  key: "taxPayer_TotalMilesDrivenThisYear",
                  required:true,
                  question: (


                      <p>
                        <Trans
                          i18nKey="organizer.individual.income.step4.question7"
                          values={{
                            info: "Include all mileage –<br /> personal, commuting and business",
                          }}
                          components={[
                            <span className={styles.additionalInfo}>text</span>,
                          ]}
                        />
  
                      <span style={{ color: 'red' }}>*</span>
                      </p>
       
                  ),
                  children: input({
                    name: "taxPayer_TotalMilesDrivenThisYear",
                    required: true,
                    message:"Enter total miles driven during the year.",
                    pattern: {
                      value: /^\d{1,6}$/,
                      message: "6 number allowed",
                    },
                    placeholder: "12,500",
                  }),
                })}
              </>
            )}
            <Checkbox
              className={styles.marginBottom}
              onChange={() => {
                setShowSpouse(!showSpouse);
              }}
            >
              {showSpouse
                ? t("organizer.individual.income.step6.remove_spouse")
                : t("organizer.individual.income.step6.add_spouse")}
            </Checkbox>
            {showSpouse && (
              <div className={styles.marginBottom}>
                {questionContainer({
                  key: "spouse_HaveVehicleExpensesFromBusinessOrRealEstate",
                  question: t("organizer.individual.income.step4.question1"),
                  children: radio({
                    name: "spouse_HaveVehicleExpensesFromBusinessOrRealEstate",
                    radioButtons: radioButtons,
                    required: true,
                  }),
                })}
                <Divider />
                {data[
                  findIndexData(
                    data[
                      findIndexData(
                        "spouse_HaveVehicleExpensesFromBusinessOrRealEstate",
                        data,
                      )
                    ].question,
                    data,
                  )
                ]?.answer && (
                  <>
                    {questionContainer({
                      key: "spouse_VehicleMake",
                      question: t(
                        "organizer.individual.income.step4.question5",
                      ),
                      subClass: styles.questionSubClass,
                      children: manyInput([
                        { key: "spouse_VehicleMake", value: "Make" },
                        { key: "spouse_VehicleModel", value: "Model" },
                        { key: "spouse_VehicleYear", value: "Year" },
                      ]),
                    })}
                    {questionContainer({
                      key: "spouse_VehicleMake",
                      question: t(
                        "organizer.individual.income.step4.question3",
                      ),
                      subClass: styles.questionSubClass,
                      children: checkbox({
                        name: "spouse_VehicleAvailableForPersonalUse",
                        label: t("organizer.individual.income.step4.label4"),
                        value:
                          data[
                            findIndexData(
                              `taxPayer_HaveWrittenEvidenceToSupportDeduction`,
                              data,
                            )
                          ].answer,
                      }),
                    })}
                    
                    <Divider />
                    {questionContainer({
                      key: "spouse_AnotherVehicleAvailableForPersonalUse",
                      question: t(
                        "organizer.individual.income.step4.question4",
                      ),
                      subClass: styles.questionSubClass,
                      children: checkbox({
                        name: "spouse_AnotherVehicleAvailableForPersonalUse",
                        label: t("organizer.individual.income.step4.label4"),
                        value:
                          data[
                            findIndexData(
                              `spouse_AnotherVehicleAvailableForPersonalUse`,
                              data,
                            )
                          ].answer,
                      }),
                    })}
                    <Divider />
                    {questionContainer({
                      key: "spouse_HaveWrittenEvidenceToSupportDeduction",
                      question: t(
                        "organizer.individual.income.step4.question5",
                      ),
                      subClass: styles.questionSubClass,
                      children: checkbox({
                        name: "spouse_HaveWrittenEvidenceToSupportDeduction",
                        label: t("organizer.individual.income.step4.label4"),
                        value:
                          data[
                            findIndexData(
                              "spouse_HaveWrittenEvidenceToSupportDeduction",
                              data,
                            )
                          ].answer,
                      }),
                    })}
                    <Divider />
                    {questionContainer({
                      key: "spouse_ParkingExpensesAndTolls",
                      question: (
                        <p>
                          <Trans
                            i18nKey="organizer.individual.income.step4.question6"
                            values={{
                              info: "Do not include at <br /> place of employment",
                            }}
                            components={[
                              <span className={styles.additionalInfo}>
                                text
                              </span>,
                            ]}
                          />
                        </p>
                      ),
                      subClass: styles.questionSubClass,
                      children: input({
                        name: "spouse_ParkingExpensesAndTolls",
                      }),
                    })}
                    <Divider />
                    {questionContainer({
                      key: "spouse_TotalMilesDrivenThisYear",
                      question: (
                        <p>
                          <Trans
                            i18nKey="organizer.individual.income.step4.question7"
                            values={{
                              info: "Include all mileage – personal, <br /> commuting and business",
                            }}
                            components={[
                              <span className={styles.additionalInfo}>
                                text
                              </span>,
                            ]}
                          />
                        </p>
                      ),
                      subClass: styles.questionSubClass,
                      children: input({
                        name: "spouse_TotalMilesDrivenThisYear",
                        required: true,
                        pattern: {
                          value: /^\d{6}$/,
                          message: "6 number allowed",
                        },
                      }),
                    })}
                  </>
                )}
              </div>
            )}
            <Divider />
            <>
              {(data[
                findIndexData(
                  "taxPayer_HaveVehicleExpensesFromBusinessOrRealEstate",
                  data,
                )
              ]?.answer ||
                data[
                  findIndexData(
                    "spouse_HaveVehicleExpensesFromBusinessOrRealEstate",
                    data,
                  )
                ]?.answer) && (
                <>
                  <OrganizerQuestionCard
                    data={
                      taxPayerAccountType[
                        findIndexData(
                          "taxPayer_HaveVehicleOperatingExpense",
                          taxPayerAccountType,
                        )
                      ]
                    }
                    question={t("organizer.individual.income.step4.question8")}
                    onAlert={() => {
                      const newData = [...taxPayerAccountType];
                      newData[
                        findIndexData(
                          "businessMilesTableInfo",
                          taxPayerAccountType,
                        )
                      ] = {
                        ...taxPayerAccountType[
                          findIndexData(
                            "businessMilesTableInfo",
                            taxPayerAccountType,
                          )
                        ],
                        reminder:
                          !taxPayerAccountType[
                            findIndexData(
                              "businessMilesTableInfo",
                              taxPayerAccountType,
                            )
                          ].reminder,
                      };
                      setTaxPayerAccountType(newData);
                    }}
                    onMessage={(comment: string) => {
                      const newData = [...taxPayerAccountType];
                      newData[
                        findIndexData(
                          "businessMilesTableInfo",
                          taxPayerAccountType,
                        )
                      ] = {
                        ...taxPayerAccountType[
                          findIndexData(
                            "businessMilesTableInfo",
                            taxPayerAccountType,
                          )
                        ],
                        message: comment,
                      };
                      setTaxPayerAccountType(newData);
                    }}
                    className={styles.questionContainer}
                    subClass={styles.questionSubClass}
                  >
                    <Table
                      bordered
                      dataSource={originData}
                      columns={columnsTable1}
                      pagination={false}
                      scroll={{ x: 1070 }}
                      style={{ width: "50vw", marginBottom: 30 }}
                      footer={() => {
                        return (
                          <>
                            <Button
                              type={"link"}
                              text={t(
                                "organizer.individual.income.step4.add_filed",
                              )}
                              onClick={handleAdd}
                            />
                            {tableCount > 2 && (
                              <Button
                                type={"link"}
                                text={t(
                                  "organizer.individual.income.step4.remove_filed",
                                )}
                                onClick={handleRemove}
                              />
                            )}
                          </>
                        );
                      }}
                    />
                  </OrganizerQuestionCard>
                  <h3 className={styles.title}>
                    {t("organizer.individual.income.step4.sub_title")}
                  </h3>
                  <OrganizerQuestionCard
                    data={
                      taxPayerAccountType[
                        findIndexData(
                          "vehicleOperatingAndExpensesTableInfo",
                          taxPayerAccountType,
                        )
                      ]
                    }
                    question={t("organizer.individual.income.step4.question9")}
                    onAlert={() => {
                      const newData = [...taxPayerAccountType];
                      newData[
                        findIndexData(
                          "vehicleOperatingAndExpensesTableInfo",
                          taxPayerAccountType,
                        )
                      ] = {
                        ...taxPayerAccountType[
                          findIndexData(
                            "vehicleOperatingAndExpensesTableInfo",
                            taxPayerAccountType,
                          )
                        ],
                        reminder:
                          !taxPayerAccountType[
                            findIndexData(
                              "vehicleOperatingAndExpensesTableInfo",
                              taxPayerAccountType,
                            )
                          ].reminder,
                      };
                      setTaxPayerAccountType(newData);
                    }}
                    onMessage={(comment: string) => {
                      const newData = [...taxPayerAccountType];
                      newData[
                        findIndexData(
                          "vehicleOperatingAndExpensesTableInfo",
                          taxPayerAccountType,
                        )
                      ] = {
                        ...taxPayerAccountType[
                          findIndexData(
                            "vehicleOperatingAndExpensesTableInfo",
                            taxPayerAccountType,
                          )
                        ],
                        message: comment,
                      };
                      setTaxPayerAccountType(newData);
                    }}
                    className={styles.questionContainer}
                    subClass={styles.questionSubClass}
                  >
                    <Table
                      bordered
                      dataSource={tableVheicle}
                      columns={columnsTable2}
                      pagination={false}
                      scroll={{ x: 1030 }}
                      style={{ width: "50vw" }}
                    />
                  </OrganizerQuestionCard>
                </>
              )}
            </>
          </div>
        </div>
        <CircularDirection
          hasLeft
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </>
  );
};

export default Step4;

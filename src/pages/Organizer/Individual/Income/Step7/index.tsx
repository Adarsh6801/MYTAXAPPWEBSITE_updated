import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox, Form, Divider } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import CircularDirection from "../../../../../components/CircularDirection";
import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import { radio, upload } from "../../../../../components/Module";

import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../helpers/format";
import { getPdfUrl } from "../../../../../helpers/file";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { taxPayer, spouse, radioButtons, DATA_KEY } from "./index.constants";
import { IFormInfo, IQuestionContainer } from "./index.props";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step7 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const [showSpouse, setShowSpouse] = useState(false);
  const [data, setData] = useState<IOrganizerStepProps[]>([
    ...addQuoteIdOrganizer(taxPayer, Number(quoteId)),
    ...addQuoteIdOrganizer(spouse, Number(quoteId)),
  ]);

  const dataOrgnaizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrgnaizer) {
      const stepData = dataOrgnaizer.filter((el: any) => {
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

      resultData.length >= DATA_KEY.length && setData(resultData);
    }
  }, [dataOrgnaizer]);

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
        childrenClassName={styles.context}
        className={styles.container}
      >
        {children}
      </OrganizerQuestionCard>
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

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);

    const index: number = findIndexData(name, data);
    const newData = [...data];

    newData[index] = {
      ...data[index],
      question: data[index].question,
      answer: value[name],
      isFile: data[index].isFile,
      files: data[index].isFile ? value[name].fileList : null,
    };

    setData([...newData]);
  };

  // TODO: any change interface
  const formInfo = (dataFomrInfo: IFormInfo[]) => {
    return (
      <div>
        {dataFomrInfo.map((item: any, index: number) => {
          if (item.isRadio) {
            return (
              <div key={index}>
                {questionContainer({
                  key: item.uploadKey,
                  question: item.title,
                  children: radio({
                    name: item.uploadKey,
                    radioButtons: radioButtons,
                  }),
                })}
                {data[findIndexData(item.uploadKey, data)].answer &&
                  upload({
                    key: item.attach.names[0],
                    label: "",
                    data: data,
                    dispatch: dispatch,
                    onClick: (index = 0) => {
                      data[findIndexData(item.attach.names[index], data)]
                        .files[0].id
                        ? dispatch(
                            downloadFile(
                              data[
                                findIndexData(item.attach.names[index], data)
                              ].files[index].id,
                              data[
                                findIndexData(item.attach.names[index], data)
                              ].files[index].name,
                            ),
                          )
                        : null;
                    },
                    onRemove: (index = 0) => {
                      const newData = [...data];
                      const newFileList = [
                        ...data[
                          findIndexData(item.attach.names[0], data)
                        ].files.slice(0, index),
                        ...data[
                          findIndexData(item.attach.names[0], data)
                        ].files.slice(index + 1),
                      ];
                      newData[findIndexData(item.attach.names[0], data)].files =
                        newFileList;

                      setData([...newData]);
                    },
                  })}
                <Divider />
              </div>
            );
          }

          const { names, isHave, haveSoon } = item.attach;
          const [name, checkboxDontHave = "", checkboxHaveSoon = ""] = names;

          return (
            <div key={index}>
              {questionContainer({
                key: item.uploadKey,
                question: item.title,
                children: upload({
                  key: item.uploadKey,
                  label: "",
                  data: data,
                  dispatch: dispatch,
                  onClick: (index = 0) => {
                    data[findIndexData(name, data)].files[index].id
                      ? dispatch(
                          downloadFile(
                            data[findIndexData(name, data)].files[index].id,
                            data[findIndexData(name, data)].files[index].name,
                          ),
                        )
                      : null;
                  },
                  onRemove: (index = 0) => {
                    const newData = [...data];
                    const newFileList = [
                      ...data[findIndexData(name, data)].files.slice(0, index),
                      ...data[findIndexData(name, data)].files.slice(index + 1),
                    ];
                    newData[findIndexData(name, data)].files = newFileList;

                    setData([...newData]);
                  },
                }),
              })}
              {isHave && (
                <Form.Item
                  name={checkboxDontHave}
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>
                    {t("organizer.individual.income.step7.i_dont_have")}
                  </Checkbox>
                </Form.Item>
              )}
              {haveSoon && (
                <Form.Item name={checkboxHaveSoon} valuePropName="checked">
                  <Checkbox>
                    {t("organizer.individual.income.step7.have_soon")}
                  </Checkbox>
                </Form.Item>
              )}
              <Divider />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <p>
        <Trans
          i18nKey="organizer.individual.income.step7.description"
          values={{ note: "Note:" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={onValuesChange}
        requiredMark={false}
      >
        <div>
          {formInfo([
            {
              uploadKey: "taxPayer_1099INTOrDIVFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question1"
                    values={{ init: "1099 INT", div: "DIV form" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/1099INT.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                      <a
                        href={getPdfUrl("assets/pdf/1099DIV.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: ["taxPayer_1099INTOrDIVFormDocument"],
                isHave: false,
                haveSoon: false,
              },
              isRadio: false,
            },
            {
              uploadKey: "taxPayerRealEstate_ProvideAny1099ks",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question11"
                    values={{ ks: "1099-Ks" }}
                    components={[<span>text</span>]}
                  />
                </p>
              ),
              attach: {
                names: ["taxPayerRealEstate_ProvideAny1099ks"],
                isHave: false,
                haveSoon: false,
              },
              isRadio: false,
            },
            {
              uploadKey: "taxPayer_1099BFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question2"
                    values={{ bForm: "1099 B form" }}
                    components={[<span>text</span>]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_1099BFormDocument",
                  "taxPayer_DoNotHave1099BFormDocument",
                  "taxPayer_DoNotHave1099BFormDocument",
                ],
                isHave: true,
                haveSoon: false,
              },
              isRadio: false,
            },
            {
              uploadKey: "taxPayer_HaveVirtualOrCryptoCurrencyTransactions",
              title: t("organizer.individual.income.step7.question3"),
              isRadio: true,
              attach: {
                names: [
                  "taxPayer_HaveVirtualOrCryptoCurrencyTransactions_Document",
                ],
                isHave: false,
                haveSoon: false,
              },
            },
            {
              uploadKey: "taxPayer_1099RFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question4"
                    values={{ rForm: "1099 R form" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/1099R.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_1099RFormDocument",
                  "taxPayer_DoNotHave1099RFormDocument",
                  "taxPayer_DoNotReceivedYet1099RFormDocument",
                ],
                isHave: true,
                haveSoon: true,
              },
              isRadio: false,
            },

            {
              uploadKey: "taxPayer_1099SSAFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question5"
                    values={{ ssa: " 1099 SSA form" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/1099.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_1099SSAFormDocument",
                  "taxPayer_DoNotHave1099SSAFormDocument",
                  "taxPayer_DoNotReceivedYet1099SSAFormDocument",
                ],
                isHave: true,
                haveSoon: true,
              },
              isRadio: false,
            },

            {
              uploadKey: "taxPayer_1099GFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question6"
                    values={{ gForm: "1099 G form" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/1099G.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_1099GFormDocument",
                  "taxPayer_DoNotHave1099GFormDocument",
                  "taxPayer_DoNotReceivedYet1099GFormDocument",
                ],
                isHave: true,
                haveSoon: true,
              },
              isRadio: false,
            },

            {
              uploadKey: "taxPayer_ScheduleK1FormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question7"
                    values={{ scheduleForm: "Schedule K-1 form" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/f1065sk1.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_ScheduleK1FormDocument",
                  "taxPayer_DoNotHaveScheduleK1FormDocument",
                  "taxPayer_DoNotReceivedYetScheduleK1FormDocument",
                ],
                isHave: true,
                haveSoon: true,
              },
              isRadio: false,
            },

            {
              uploadKey: "taxPayer_1099SFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question8"
                    values={{ sFromat: "form 1099S" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/1099S.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_1099SFormDocument",
                  "taxPayer_DoNotHave1099SFormDocument",
                  "taxPayer_DoNotReceivedYet1099SFormDocument",
                ],
                isHave: true,
                haveSoon: true,
              },
              isRadio: false,
            },

            {
              uploadKey: "taxPayer_ReceiveAnyOtherTypeOfIncome",
              title: t("organizer.individual.income.step7.question9"),
              isRadio: true,
              attach: {
                names: ["taxPayer_ReceiveAnyOtherTypeOfIncome_Document"],
                isHave: false,
                haveSoon: false,
              },
            },

            {
              uploadKey: "taxPayer_W2GFormDocument",
              title: (
                <p>
                  <Trans
                    i18nKey="organizer.individual.income.step7.question10"
                    values={{ wForm: "W-2G from" }}
                    components={[
                      <a
                        href={getPdfUrl("assets/pdf/w2.pdf")}
                        target="_blank"
                        className={styles.link}
                      >
                        text
                      </a>,
                    ]}
                  />
                </p>
              ),
              attach: {
                names: [
                  "taxPayer_W2GFormDocument",
                  "taxPayer_DoNotHaveW2GFormDocument",
                  "taxPayer_DoNotReceivedYetW2GFormDocument",
                ],
                isHave: true,
                haveSoon: true,
              },
              isRadio: false,
            },
          ])}

          <Checkbox
            className={styles.marginBottom}
            onChange={() => {
              setShowSpouse(!showSpouse);
            }}
          >
            {showSpouse
              ? t("organizer.individual.income.step7.remove_spouse")
              : t("organizer.individual.income.step7.add_spouse")}
          </Checkbox>
          {showSpouse &&
            formInfo([
              {
                uploadKey: "spouse_1099INTOrDIVFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question1"
                      values={{ init: "1099 INT", div: "DIV form" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/1099INT.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                        <a
                          href={getPdfUrl("assets/pdf/1099DIV.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: ["spouse_1099INTOrDIVFormDocument"],
                  isHave: false,
                  haveSoon: false,
                },
                isRadio: false,
              },
              {
                uploadKey: "spouseRealEstate_ProvideAny1099ks",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question1"
                      values={{ init: "1099 INT", div: "DIV form" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/1099INT.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                        <a
                          href={getPdfUrl("assets/pdf/1099DIV.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: ["spouseRealEstate_ProvideAny1099ks"],
                  isHave: false,
                  haveSoon: false,
                },
                isRadio: false,
              },
              {
                uploadKey: "spouse_1099BFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question2"
                      values={{ bForm: "1099 B form" }}
                      components={[<span>text</span>]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_1099BFormDocument",
                    "spouse_DoNotHave1099BFormDocument",
                  ],
                  isHave: true,
                  haveSoon: false,
                },
                isRadio: false,
              },
              {
                uploadKey: "spouse_HaveVirtualOrCryptoCurrencyTransactions",
                title: t("organizer.individual.income.step7.question3"),
                attach: {
                  names: [
                    "spouse_HaveVirtualOrCryptoCurrencyTransactions_Document",
                  ],
                  isHave: false,
                  haveSoon: false,
                },
                isRadio: true,
              },
              {
                uploadKey: "spouse_1099RFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question4"
                      values={{ rForm: "1099 R form" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/1099R.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_1099RFormDocument",
                    "spouse_DoNotHave1099RFormDocument",
                    "spouse_DoNotReceivedYet1099RFormDocument",
                  ],
                  isHave: true,
                  haveSoon: true,
                },
                isRadio: false,
              },

              {
                uploadKey: "spouse_1099SSAFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question5"
                      values={{ ssa: " 1099 SSA form" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/1099.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_1099SSAFormDocument",
                    "spouse_DoNotHave1099SSAFormDocument",
                    "spouse_DoNotReceivedYet1099SSAFormDocument",
                  ],
                  isHave: true,
                  haveSoon: true,
                },
                isRadio: false,
              },

              {
                uploadKey: "spouse_1099GFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question6"
                      values={{ gForm: "1099 G form" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/1099G.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_1099GFormDocument",
                    "spouse_DoNotHave1099GFormDocument",
                    "spouse_DoNotReceivedYet1099GFormDocument",
                  ],
                  isHave: true,
                  haveSoon: true,
                },
                isRadio: false,
              },

              {
                uploadKey: "spouse_ScheduleK1FormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question7"
                      values={{ scheduleForm: "Schedule K-1 form" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/f1065sk1.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_ScheduleK1FormDocument",
                    "spouse_DoNotHaveScheduleK1FormDocument",
                    "spouse_DoNotReceivedYetScheduleK1FormDocument",
                  ],
                  isHave: true,
                  haveSoon: true,
                },
                isRadio: false,
              },

              {
                uploadKey: "spouse_1099SFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question8"
                      values={{ sFromat: "form 1099S" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/1099S.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_1099SFormDocument",
                    "spouse_DoNotHave1099SFormDocument",
                    "spouse_DoNotReceivedYet1099SFormDocument",
                  ],
                  isHave: true,
                  haveSoon: true,
                },
                isRadio: false,
              },
              {
                uploadKey: "spouse_ReceiveAnyOtherTypeOfIncome",
                title: t("organizer.individual.income.step7.question9"),
                isRadio: true,
                attach: {
                  names: ["spouse_ReceiveAnyOtherTypeOfIncome_Document"],
                  isHave: false,
                  haveSoon: false,
                },
              },

              {
                uploadKey: "spouse_W2GFormDocument",
                title: (
                  <p>
                    <Trans
                      i18nKey="organizer.individual.income.step7.question10"
                      values={{ wForm: "W-2G from" }}
                      components={[
                        <a
                          href={getPdfUrl("assets/pdf/w2.pdf")}
                          target="_blank"
                          className={styles.link}
                        >
                          text
                        </a>,
                      ]}
                    />
                  </p>
                ),
                attach: {
                  names: [
                    "spouse_W2GFormDocument",
                    "spouse_DoNotHaveW2GFormDocument",
                    "spouse_DoNotReceivedYetW2GFormDocument",
                  ],
                  isHave: true,
                  haveSoon: true,
                },
                isRadio: false,
              },
            ])}
        </div>
        <CircularDirection
          hasLeft
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default Step7;

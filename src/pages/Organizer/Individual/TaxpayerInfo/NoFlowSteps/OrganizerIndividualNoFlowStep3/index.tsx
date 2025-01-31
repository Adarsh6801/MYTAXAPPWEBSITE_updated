import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Radio, Space } from "antd";
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
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../../helpers/format";
import {
  disabledDateFuture,
  disabledDatePast,
} from "../../../../../../helpers/date";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../../redux/conversationSlice";
import { dataPicker, input, upload } from "../../../../../../components/Module";
import {
  dataTaxpayerQuestion,
  TAX_PAYER_NAMES_DRIVER_LICENSE,
  SPOUSE_NAMES_DRIVER_LICENSE,
  DATA_KEY,
} from "./index.constants";

import { ReactComponent as Calendar } from "../../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const OrganizerIndividualNoFlowStep3 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
  const [form] = Form.useForm();

  const [fieldName, setFiledName] = useState("");
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );
  const dataOrgnaizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    (fieldName === "taxPayerDontHaveDriversLicense" ||
      fieldName === "taxPayerHaveDriversLicenseButCanNotProvideImage" ||
      fieldName === "spouseHaveDriversLicenseButCanNotProvideImage_NoFlow" ||
      fieldName === "spouseDontHaveDriversLicense_NoFlow") &&
      restField(fieldName);
  }, [fieldName]);

  useEffect(() => {
    if (dataOrgnaizer) {
      const stepData = dataOrgnaizer.filter((el: any, i: number) => {
        return (
          !!DATA_KEY.find(item => {
            return el.question.includes(item);
          }) &&
          dataOrgnaizer.filter(
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
  }, [dataOrgnaizer]);

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
      nextStep();
    } catch (e) {}
  };

  const restField = (name: string) => {
    let newObject = [...data];
    const resetName: string[] = [];
    const dataKeys = Object.entries(data);
    const propertyIndex = findIndexData(name, data);
    const isTaxPayer = name.includes("taxPayer") ? true : false;
    dataKeys.forEach((item, index) => {
      if (
        index > propertyIndex &&
        item[1].question.includes("taxPayer") === isTaxPayer
      ) {
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

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);

    const result =
      name ===
      ("spouseDriversLicenseIssuedDate_NoFlow" ||
        "spouseDriversLicenseExpiresDate_NoFlow" ||
        "taxPayerDriversLicenseExpiresDate" ||
        "taxPayerDriversLicenseIssuedDate")
        ? moment(value[name]).format(DEFAULT_DATE_FORMAT)
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
        className={styles.questionContainer}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const alternateForm = (idVerification: DataOfKey) => {
    return (
      <div>
        <p className={styles.radio}>
          {t("organizer.individual.no_flow.step3.description")}
        </p>
        {upload({
          key: idVerification,
          label: t("organizer.individual.no_flow.step3.form_id_verification"),
          data: data,
          multiple: true,
          dispatch: dispatch,
          onClick: (index = 0) => {
            dispatch(
              downloadFile(
                data[findIndexData(idVerification, data)].files[index].id,
                data[findIndexData(idVerification, data)].files[index].name,
              ),
            );
          },
          onRemove: (index = 0) => {
            const newData = [...data];
            const newFileList = [
              ...data[findIndexData(idVerification, data)].files.slice(
                0,
                index,
              ),
              ...data[findIndexData(idVerification, data)].files.slice(
                index + 1,
              ),
            ];
            newData[findIndexData(idVerification, data)].files = newFileList;

            setData([...newData]);
          },
        })}
      </div>
    );
  };

  const driversLicense = (
    driversLicenseNumber: DataOfKey,
    state: DataOfKey,
    issuedDate: DataOfKey,
    expires: DataOfKey,
  ) => {
    return (
      <div>
        {questionContainer({
          key: driversLicenseNumber,
          children: input({
            name: driversLicenseNumber,
            label: t("organizer.individual.no_flow.step3.drivers_license"),
          }),
        })}

        {questionContainer({
          key: driversLicenseNumber,
          children: input({
            name: driversLicenseNumber,
            label: t("organizer.individual.no_flow.step3.drivers_license"),
          }),
        })}
        {questionContainer({
          key: state,
          children: input({
            name: state,
            label: t("organizer.individual.no_flow.step3.state"),
          }),
        })}
        <div className={styles.dataPickerContainer}>
          {questionContainer({
            key: issuedDate,
            children: dataPicker({
              name: issuedDate,
              label: t("organizer.individual.no_flow.step3.issued_date"),
              icon: <Calendar />,
              disabledDate: disabledDateFuture,
              defaultValue: data[findIndexData(issuedDate, data)].answer,
            }),
          })}
          <div className={styles.zipCode}>
            {questionContainer({
              key: expires,
              children: dataPicker({
                name: expires,
                label: t("organizer.individual.no_flow.step3.expires"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue: data[findIndexData(expires, data)].answer,
              }),
            })}
          </div>
        </div>
      </div>
    );
  };

  const formInfo = (names: any, title: string) => {
    const {
      imageDriversLicense,
      hasDriversLicense,
      idVerification,
      taxPayerHaveDriversLicenseButCanNotProvideImage,
      spouseHaveDriversLicenseButCanNotProvideImage,
      state,
      issuedDate,
      expires,
    } = names;
    let form;

    if (
      hasDriversLicense === "taxPayerDontHaveDriversLicense" &&
      data[findIndexData("taxPayerDontHaveDriversLicense", data)]
    ) {
      form =
        data[findIndexData("taxPayerDontHaveDriversLicense", data)].answer === 1
          ? alternateForm(idVerification)
          : driversLicense(
              taxPayerHaveDriversLicenseButCanNotProvideImage,
              state,
              issuedDate,
              expires,
            );
    } else {
      form =
        data[findIndexData("spouseDontHaveDriversLicense_NoFlow", data)]
          .answer === 1
          ? alternateForm(idVerification)
          : driversLicense(
              spouseHaveDriversLicenseButCanNotProvideImage,
              state,
              issuedDate,
              expires,
            );
    }
    return (
      <div>
        <p className={styles.title}>{title}</p>
        <div>
          {upload({
            key: imageDriversLicense,
            label: t("organizer.individual.no_flow.step3.images_drivers"),
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[findIndexData(imageDriversLicense, data)].files[index]
                    .id,
                  data[findIndexData(imageDriversLicense, data)].files[index]
                    .name,
                ),
              );
            },
            onRemove: (index = 0) => {
              const newData = [...data];
              const newFileList = [
                ...data[findIndexData(imageDriversLicense, data)].files.slice(
                  0,
                  index,
                ),
                ...data[findIndexData(imageDriversLicense, data)].files.slice(
                  index + 1,
                ),
              ];
              newData[findIndexData(imageDriversLicense, data)].files =
                newFileList;

              setData([...newData]);
            },
          })}
          {data[findIndexData(imageDriversLicense, data)].files === null && (
            <Space direction="vertical">
              <Form.Item name={hasDriversLicense}>
                <Radio.Group className={styles.radio}>
                  <Radio value={1}>
                    {t(
                      "organizer.individual.no_flow.step3.dont_have_drivers_license",
                    )}
                  </Radio>
                  <Radio value={2}>
                    {t("organizer.individual.no_flow.step3.provide_image")}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
          )}
        </div>
        {data[findIndexData(hasDriversLicense, data)] &&
          data[findIndexData(hasDriversLicense, data)].files !== null &&
          form}
      </div>
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
      <div className={styles.container}>
        {formInfo(
          TAX_PAYER_NAMES_DRIVER_LICENSE,
          t("organizer.individual.no_flow.step3.taxpayer"),
        )}
        {formInfo(
          SPOUSE_NAMES_DRIVER_LICENSE,
          t("organizer.individual.no_flow.step3.spouse"),
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

export default OrganizerIndividualNoFlowStep3;

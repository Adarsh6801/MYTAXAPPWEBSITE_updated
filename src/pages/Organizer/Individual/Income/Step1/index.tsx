import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import _ from "lodash";

import CircularDirection from "../../../../../components/CircularDirection";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { checkbox, upload } from "../../../../../components/Module";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getClassNames,
  getCurrentType,
} from "../../../../../helpers/format";

import { dataTaxpayerQuestion, DATA_KEY } from "./index.constants";

import styles from "./index.module.css";

const noop = () => {};

const Step1 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [spouse, setSpouse] = useState(false);
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
    const index: number = +findIndexData(name, data);
    const newData = [...data];

    newData[index] = {
      ...data[index],
      answer: value[name],
      message: "",
      reminder: false,
      isFile: data[index].isFile,
      files: data[index].isFile ? value[name].fileList : null,
    };
    setData([...newData]);
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
        <div className={getClassNames(styles.subContainer, styles.marginTop)}>
          <p>{t("organizer.individual.income.step1.taxpayer")}</p>
          {upload({
            key: "taxPayer_W2FormFile",
            label: t("organizer.individual.income.step1.question"),
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[findIndexData("taxPayer_W2FormFile", data)].files[index]
                    .id,
                  data[findIndexData("taxPayer_W2FormFile", data)].files[index]
                    .name,
                ),
              );
            },
            onRemove: (index = 0) => {
              const newData = [...data];
              const newFileList = [
                ...data[findIndexData("taxPayer_W2FormFile", data)].files.slice(
                  0,
                  index,
                ),
                ...data[findIndexData("taxPayer_W2FormFile", data)].files.slice(
                  index + 1,
                ),
              ];
              newData[findIndexData("taxPayer_W2FormFile", data)].files =
                newFileList;

              setData([...newData]);
            },
          })}
          <Form.Item
            name={"taxPayer_DoNotHaveMoreW2Form"}
            valuePropName="checked"
            noStyle
          >
            <Checkbox className={styles.marginLeft}>
              {t("organizer.individual.income.step1.not_have_any_more")}
            </Checkbox>
          </Form.Item>
          <Form.Item
            name={"taxPayer_HaveMoreRemindLater"}
            valuePropName="checked"
            noStyle
          >
            <Checkbox className={styles.marginLeft}>
              {t("organizer.individual.income.step1.remind_me_later")}
            </Checkbox>
          </Form.Item>
        </div>
        <div className={styles.subContainer}>
          <Checkbox
            onChange={() => {
              setSpouse(!spouse);
            }}
          >
            {t("organizer.individual.income.step1.add_spouse")}
          </Checkbox>
          {spouse && (
            <>
              <p>{t("organizer.individual.income.step1.spouse")}</p>
              {upload({
                key: "spouse_W2FormFile",
                label: t("organizer.individual.income.step1.question"),
                data: data,
                dispatch: dispatch,
                onClick: (index = 0) => {
                  dispatch(
                    downloadFile(
                      data[findIndexData("spouse_W2FormFile", data)].files[
                        index
                      ].id,
                      data[findIndexData("spouse_W2FormFile", data)].files[
                        index
                      ].name,
                    ),
                  );
                },
                onRemove: (index = 0) => {
                  const newData = [...data];
                  const newFileList = [
                    ...data[
                      findIndexData("spouse_W2FormFile", data)
                    ].files.slice(0, index),
                    ...data[
                      findIndexData("spouse_W2FormFile", data)
                    ].files.slice(index + 1),
                  ];
                  newData[findIndexData("spouse_W2FormFile", data)].files =
                    newFileList;

                  setData([...newData]);
                },
              })}
              {checkbox({
                name: "spouse_DoNotHaveMoreW2Form",
                label: t("organizer.individual.income.step1.not_have_any_more"),
                style: styles.marginLeft,
                value:
                  data[findIndexData(`spouse_DoNotHaveMoreW2Form`, data)]
                    .answer,
              })}
              {checkbox({
                name: "spouse_HaveMoreRemindLater",
                label: t("organizer.individual.income.step1.remind_me_later"),
                value:
                  data[findIndexData(`spouse_HaveMoreRemindLater`, data)]
                    .answer,
                style: styles.marginLeft,
              })}
            </>
          )}
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
  );
};

export default Step1;

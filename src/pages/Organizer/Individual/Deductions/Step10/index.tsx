import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import Button from "../../../../../components/Button";
import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../helpers/format";
import { TAXPAYER_TAX_PREPARATION } from "../../../../../constants/routes";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import { radio, upload } from "../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { makeTaxPreparationJobStatusInForReview } from "../../../../../redux/taxPreparationSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step10 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const { prevStep = noop, onStepSubmit = noop } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [showSpouse, setShowSpouse] = useState(false);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
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

  const onFinish = async () => {
    try {
      await dispatch(setIndividualOrganizer(data));
      await dispatch(
        makeTaxPreparationJobStatusInForReview({
          quoteId: Number(quoteId),
        }),
      );
      onStepSubmit(data);
      navigate(TAXPAYER_TAX_PREPARATION);
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
      files: newData[index].isFile ? value[name].fileList : null,
    };

    setData([...newData]);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children, required } = dataQuestion;
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
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (keys: IFormInfo) => {
    const { accountPayer, largestBalance } = keys;
    return (
      <div>
        {questionContainer({
          key: accountPayer.key,
          question: t("organizer.deductions.step10.question1"),
          required:true,
          children: (
            <>{radio({ name: accountPayer.key, radioButtons: radioButtons,required:true, })}</>
          ),
        })}
        {data[findIndexData(accountPayer.key, data)].answer &&
          questionContainer({
            key: largestBalance.key,
            question: t("organizer.deductions.step10.question2"),
            required:true,
            children: upload({
              key: largestBalance.key,
            required:true,
              data: data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData(largestBalance.key, data)].files[index]
                      .id,
                    data[findIndexData(largestBalance.key, data)].files[index]
                      .name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[findIndexData(largestBalance.key, data)].files.slice(
                    0,
                    index,
                  ),
                  ...data[findIndexData(largestBalance.key, data)].files.slice(
                    index + 1,
                  ),
                ];
                newData[findIndexData(largestBalance.key, data)].files =
                  newFileList;

                setData([...newData]);
              },
            }),
          })}
      </div>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      onValuesChange={onValuesChange}
      requiredMark={false}
      layout="vertical"
    >
      <div>
        {formInfo({
          accountPayer: {
            key: "taxPayer_ForeignAccounts_HasForeignBankAccounts",
          },
          largestBalance: {
            key: "taxPayer_ForeignAccounts_UploadForeignBankStatementDocument",
          },
        })}
      </div>
      <div>
        <Checkbox
          className={styles.marginBottom}
          onChange={() => {
            setShowSpouse(!showSpouse);
          }}
        >
          {showSpouse
            ? t("organizer.deductions.step5.remove_spouse")
            : t("organizer.deductions.step5.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {formInfo({
              accountPayer: {
                key: "spouse_ForeignAccounts_HasForeignBankAccounts",
              },
              largestBalance: {
                key: "spouse_ForeignAccounts_UploadForeignBankStatementDocument",
              },
            })}
          </div>
        )}
      </div>
      <div className={styles.btnContainer}>
        <CircularDirection hasRight={false} onClickLeft={prevStep} />
        <Button
          type="primary"
          htmlType={"submit"}
          text="Done"
          size="middle"
          className={styles.btn}
        />
      </div>
    </Form>
  );
};

export default Step10;

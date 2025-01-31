import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Checkbox,
  Divider,
  Input,
  DatePicker,
  Tooltip,
  Table,
  Space,
  Modal,
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import Select from "../../../../components/Select";
import RadioGroup from "../../../../components/RadioGroup";
import Decline from "../../../../components/Decline";
import Button from "../../../../components/Button";
import Loading from "../../../../components/Loading";
import {
  findIndexByValue,
  getClassNames,
  getCurrentType,
  sortByType,
} from "../../../../helpers/format";
import { useCurrentWidth } from "../../../../hooks/dimensions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getIndividualOrganizer } from "../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../redux/conversationSlice";
import { getAccountantTaxPreparations } from "../../../../redux/taxPreparationSlice";
import { DEFAULT_DATE_FORMAT } from "../../../../constants/format";
import { QUESTION_TYPE_ANSWER } from "../../../../constants/settings";
import { ORGANIZER_CATEGORY_ID } from "../../../../constants/organizer";
import {
  CATEGORY_ID_FILTER,
  CATEGORY_ID_TITLE,
  dataState,
  DATA_BY_KEY,
  INITIAL_DATA,
  radioButtons,
  selectData,
} from "./index.constants";
import { IAllTables } from "./index.props";

import { ReactComponent as Calendar } from "../../../../assets/svgs/calendar.svg";
import { ReactComponent as Filter } from "../../../../assets/svgs/filter.svg";
import { ReactComponent as Attach } from "../../../../assets/svgs/attach.svg";
import { ReactComponent as NoData } from "../../../../assets/svgs/no-data.svg";
import styles from "./index.module.css";
import { utc } from "../../../../helpers/date";

const TaxPayerInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
  const [quoteJobType, setQuoteJobType] = useState("Personal");
  const {
    individualOrganizerData,
    businessOrganizerSlice,
    quotes,
    individualOrganizerLoading,
    businessOrganizerLoading,
    quotesLoading,
  } = useSelector((state: RootState) => {
    return {
      individualOrganizerData: state.individualOrganizer.data,
      businessOrganizerSlice: state.businessOrganizer.data,
      quotes: state.taxPreparation.accountantData,
      individualOrganizerLoading: state.individualOrganizer.loading,
      businessOrganizerLoading: state.businessOrganizer.loading,
      quotesLoading: state.taxPreparation.loading,
    };
  });

  useEffect(() => {
    if (quotes) {
      const filteredQuotes = quotes.filter(
        item => item.quoteId === Number(quoteId),
      );

      if (filteredQuotes.length > 0) {
        setQuoteJobType(filteredQuotes[0].jobType);
      }
    }
  }, [quotes]);

  const [categoryIdData, setCategoryIdData] = useState<string>(
    CATEGORY_ID_FILTER.taxPayer,
  );
  const [newData, setNewData] = useState<any>(INITIAL_DATA);
  const [data, setData] = useState<any>(
    quoteJobType === "Personal"
      ? individualOrganizerData
      : businessOrganizerSlice,
  );
  const [dataPdf, setDataPDf] = useState<any>(
    quoteJobType === "Personal"
      ? individualOrganizerData
      : businessOrganizerSlice,
  );
  const [toggleFilter, setToggleFilter] = useState(false);

  const width = useCurrentWidth();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    individualOrganizerData && quoteJobType === "Personal"
      ? onChangeCategory(CATEGORY_ID_FILTER.taxPayer)
      : dataUpdated(individualOrganizerData);
    individualOrganizerData && quoteJobType === "Personal"
      ? onChangeCategory(CATEGORY_ID_FILTER.taxPayer)
      : dataUpdated(individualOrganizerData, true);
  }, [individualOrganizerData]);

  const typeSwitcherPdf = (answer: any, answerTypeId: any, question: any) => {
    if (answer == "null") {
      return "N/A";
    }

    switch (answerTypeId) {
      case QUESTION_TYPE_ANSWER.string: {
        return answer.toString();
      }
      case QUESTION_TYPE_ANSWER.number: {
        return answer.toString();
      }
      case QUESTION_TYPE_ANSWER.date: {
        return moment(answer).format(DEFAULT_DATE_FORMAT).toString();
      }
      case QUESTION_TYPE_ANSWER.checkbox: {
        return `${
          DATA_BY_KEY.hasOwnProperty(question)
            ? DATA_BY_KEY[question][
                findIndexByValue(answer, DATA_BY_KEY[question], question)
              ].label
            : radioButtons[findIndexByValue(answer, radioButtons, question)]
                .label
        }`;
      }
      case QUESTION_TYPE_ANSWER.radio: {
        return `${
          radioButtons[findIndexByValue(answer, radioButtons, question)].label
        }`;
      }
    }
  };

  const generatePdfOfTaxPreparation = () => {
    const values_all_types: string[][] = [];
    const all_tables: IAllTables[] = [];
    const quote = quotes?.filter(item => item.quoteId === Number(quoteId))[0];
    const doc = new jsPDF();
    doc.setFontSize(10);
    if (dataPdf !== undefined) {
      for (const [key] of Object.entries(CATEGORY_ID_TITLE)) {
        if (dataPdf[key] && dataPdf[key].length > 0) {
          dataPdf[key].forEach((item: any) => {
            if (
              item.answerTypeId !== QUESTION_TYPE_ANSWER.json &&
              item.answerTypeId !== QUESTION_TYPE_ANSWER.file
            ) {
              const text = doc
                .setFontSize(12)
                .splitTextToSize(`${item.questionTitle}`, 180);
              const res =
                `${typeSwitcherPdf(
                  item.answer,
                  item.answerTypeId,
                  item.question,
                )}` || "-";
              values_all_types.push([text, res]);
            }
            if (item.answerTypeId === QUESTION_TYPE_ANSWER.json) {
              const valueData = JSON.parse(item.answer.data).filter(
                (el: string) => el,
              );
              const keys: string[] = [];
              const tableTitle: string[] = [];
              JSON.parse(item.answer.columns).forEach((el: any) => {
                if (el.hasOwnProperty("children")) {
                  keys.push(...el.children.map((item: any) => item.dataIndex));
                  tableTitle.push(
                    ...el.children.map((item: any) => item.title),
                  );
                } else {
                  keys.push(el.dataIndex);
                  tableTitle.push(el.title);
                }
              });
              const values: string[][] = [];
              valueData.forEach((obj: any) => {
                const value: string[] = [];
                Object.entries(obj)
                  .filter(([key]) => keys.includes(key))
                  .forEach(el => {
                    value.push(el[1] !== "" ? `${el[1]}` : "-");
                  });
                values.push(value);
              });
              all_tables.push({ key: tableTitle, value: values });
            }
          });
        }
      }
    }

    autoTable(doc, {
      head: [["label", "value"]],
      body: values_all_types,
    });

    all_tables.forEach((el: IAllTables) => {
      autoTable(doc, {
        head: [el.key],
        body: el.value,
      });
    });

    doc.save(
      `${
        quote?.taxpayerFirstName +
        " " +
        quote?.taxpayerLastName +
        "-" +
        quote?.jobType
      }.pdf`,
    );
  };

  const init = async () => {
    await dispatch(getAccountantTaxPreparations());
    await dispatch(
      getIndividualOrganizer({
        quoteId: Number(quoteId),
        forSpouse: false,
      }),
    );
  };

  const dataUpdated = (filterData: any, forPdf: boolean = false) => {
    if (filterData !== undefined) {
      const dataRes = JSON.parse(JSON.stringify(newData));
      filterData.forEach((item: any, index: number) => {
        const itemCurrentType = getCurrentType(item);

        if (itemCurrentType.answer === null && !itemCurrentType.isFile) {
          return;
        }
        switch (item.categoryId) {
          case ORGANIZER_CATEGORY_ID.businessEntityTaxReturn:
            dataRes[ORGANIZER_CATEGORY_ID.businessEntityTaxReturn].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.principalShareholders:
            dataRes[ORGANIZER_CATEGORY_ID.principalShareholders].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.additionalInformation:
            dataRes[ORGANIZER_CATEGORY_ID.additionalInformation].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.questionsRelatedToAllCorporations:
            dataRes[
              ORGANIZER_CATEGORY_ID.questionsRelatedToAllCorporations
            ].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.questionsRelatedToPartnerships:
            dataRes[ORGANIZER_CATEGORY_ID.questionsRelatedToPartnerships].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem:
            dataRes[ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.businessAssetSalesAndDisposition:
            dataRes[
              ORGANIZER_CATEGORY_ID.businessAssetSalesAndDisposition
            ].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold:
            dataRes[ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.bankReconcilation:
            dataRes[ORGANIZER_CATEGORY_ID.bankReconcilation].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.expenses:
            dataRes[ORGANIZER_CATEGORY_ID.expenses].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.taxpayerInformation1:
            dataRes[ORGANIZER_CATEGORY_ID.taxpayerInformation1].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.priorYearReturnCopy:
            dataRes[ORGANIZER_CATEGORY_ID.priorYearReturnCopy].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.addressAsOfDec31:
            dataRes[ORGANIZER_CATEGORY_ID.addressAsOfDec31].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.addressChanges:
            dataRes[ORGANIZER_CATEGORY_ID.addressChanges].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.filingStatusChanges:
            dataRes[ORGANIZER_CATEGORY_ID.filingStatusChanges].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.estimatedTaxesPaid:
            dataRes[ORGANIZER_CATEGORY_ID.estimatedTaxesPaid].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.dependents:
            dataRes[ORGANIZER_CATEGORY_ID.dependents].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses:
            dataRes[ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.educationExpenses:
            dataRes[ORGANIZER_CATEGORY_ID.educationExpenses].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.w2Form:
            dataRes[ORGANIZER_CATEGORY_ID.w2Form].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.selfEmployer:
            dataRes[ORGANIZER_CATEGORY_ID.selfEmployer].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses:
            dataRes[ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.realEstateRental:
            dataRes[ORGANIZER_CATEGORY_ID.realEstateRental].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.income:
            dataRes[ORGANIZER_CATEGORY_ID.income].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.homeMortgageINterest:
            dataRes[ORGANIZER_CATEGORY_ID.homeMortgageINterest].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.taxesPaid:
            dataRes[ORGANIZER_CATEGORY_ID.taxesPaid].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.cashCharitableContributions:
            dataRes[ORGANIZER_CATEGORY_ID.cashCharitableContributions].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.healthCoverage:
            dataRes[ORGANIZER_CATEGORY_ID.healthCoverage].push(itemCurrentType);
            break;
          case ORGANIZER_CATEGORY_ID.medicalExpenses:
            dataRes[ORGANIZER_CATEGORY_ID.medicalExpenses].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.hSADistributions:
            dataRes[ORGANIZER_CATEGORY_ID.hSADistributions].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.educationalExpenses:
            dataRes[ORGANIZER_CATEGORY_ID.educationalExpenses].push(
              itemCurrentType,
            );
            break;
          case ORGANIZER_CATEGORY_ID.foreignAccounts:
            dataRes[ORGANIZER_CATEGORY_ID.foreignAccounts].push(
              itemCurrentType,
            );
            break;
        }
      });

      filterData && !forPdf && setData(dataRes);
      if (filterData && forPdf) {
        setDataPDf(dataRes);
      }
    }
  };

  const searchOrganizer = (e: any) => {
    const result = individualOrganizerData.filter((item: any) => {
      return item.questionTitle
        ? item.questionTitle.includes(e.target.value)
        : null;
    });
    dataUpdated(result);
  };

  const onChangeFilter = (e: any) => {
    if (quoteJobType === "Personal") {
      e.length > 0 &&
        dataUpdated(
          sortByType(
            individualOrganizerData.filter((item: any) =>
              JSON.parse(categoryIdData).includes(item.categoryId),
            ),
            e,
          ),
        );

      e.length === 0 &&
        dataUpdated(
          individualOrganizerData.filter((item: any) =>
            JSON.parse(categoryIdData).includes(item.categoryId),
          ),
        );
    } else {
      e.length > 0 && dataUpdated(sortByType(individualOrganizerData, e));

      e.length === 0 && dataUpdated(individualOrganizerData);
    }
  };

  const onChangeCategory = (categoryIdData: any) => {
    setNewData({ ...INITIAL_DATA });

    setCategoryIdData(categoryIdData);
    dataUpdated(
      individualOrganizerData.filter((item: any) =>
        JSON.parse(categoryIdData).includes(item.categoryId),
      ),
    );
    dataUpdated(individualOrganizerData, true);
  };

  const radio = (data: any) => {
    const { value, origin } = data;
    return (
      <RadioGroup
        size={45}
        defaultValue={value}
        data={origin}
        direction="horizontal"
        value={value}
        disabled={true}
      />
    );
  };

  const upload = (files: any = []) => {
    return (
      <>
        {files.length > 0 ? (
          files.map((item: any, index: number) => {
            return (
              <Tooltip
                title={`Click to download ${item && item.name}`}
                key={index}
              >
                <Button
                  type="text"
                  icon={<Attach />}
                  className={styles.attachedItemBtn}
                  onClick={() => {
                    files && dispatch(downloadFile(item.id, item.name));
                  }}
                />
              </Tooltip>
            );
          })
        ) : (
          <p>{t("expert_preparation.empty_file")}</p>
        )}
      </>
    );
  };

  const input = (data: any) => {
    const { value, text = "" } = data;
    return (
      <div className={styles.inputContainer}>
        <Input className={styles.marginBottom} defaultValue={value} readOnly />
        <p className={styles.promptText}>{text}</p>
      </div>
    );
  };

  const dataPicker = (data: any) => {
    return <p>{utc(data, DEFAULT_DATE_FORMAT)}</p>;
  };

  const checkbox = (data: any) => {
    const { value = false, text = "" } = data;
    return (
      <Checkbox className={styles.marginBottom} defaultChecked={value} disabled>
        {text}
      </Checkbox>
    );
  };

  const question = (info: any, children: JSX.Element) => {
    const { question, key, data } = info;
    return (
      <OrganizerQuestionCard
        key={key}
        question={question}
        disabled={true}
        data={data}
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const select = (data: any) => {
    const { selectData, value } = data;

    return (
      <Select
        data={selectData}
        defaultValue={value}
        className={styles.radioContentContainer}
        disabled
      />
    );
  };

  const table = (data: any) => {
    const { value } = data;
    return (
      <>
        <Table
          columns={JSON.parse(value?.columns)}
          dataSource={JSON.parse(value.data)}
          scroll={{ x: 1070 }}
          style={{ width: "50vw" }}
          pagination={false}
        />
      </>
    );
  };

  const typeSwitcher = (data: any) => {
    const {
      key,
      value,
      answerTypeId,
      questionText,
      files,
      categoryId,
      itemData,
    } = data;

    switch (answerTypeId) {
      case QUESTION_TYPE_ANSWER.file:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          upload(itemData.files),
        );
      case QUESTION_TYPE_ANSWER.string:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          input({ value: value }),
        );
      case QUESTION_TYPE_ANSWER.number:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          <p>{value}</p>,
          // select({
          //   value: value,
          //   selectData: DATA_BY_KEY.hasOwnProperty(key)
          //     ? DATA_BY_KEY[key]
          //     : dataState,
          // }),
        );
      case QUESTION_TYPE_ANSWER.date:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          dataPicker({ value: value }),
        );
      case QUESTION_TYPE_ANSWER.checkbox:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          checkbox({
            value: !!value,
            origin: DATA_BY_KEY.hasOwnProperty(key)
              ? DATA_BY_KEY[key]
              : radioButtons,
          }),
        );
      case QUESTION_TYPE_ANSWER.radio:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          radio({
            default: value,
            value: value,
            origin: DATA_BY_KEY.hasOwnProperty(key)
              ? DATA_BY_KEY[key]
              : radioButtons,
          }),
        );
      case QUESTION_TYPE_ANSWER.json:
        return question(
          {
            key: key,
            question: questionText,
            categoryId: categoryId,
            data: itemData,
          },
          table({
            value: value,
          }),
        );
    }
  };

  const renderData = () => {
    return (
      data &&
      Object.entries(CATEGORY_ID_TITLE).map(
        ([key, value]: any, index: number) => {
          return (
            <div key={`${key.title}${index}`}>
              {data[key] && data[key].length > 0 && (
                <Decline
                  key={index}
                  title={value.title}
                  icon={<img src={value.icon} />}
                >
                  {data[key].map((item: any, index: number) =>
                    typeSwitcher({
                      key: item.question,
                      answerTypeId: item.answerTypeId,
                      categoryId: item.categoryId,
                      value: item.answer,
                      initialData: item.initialData,
                      questionText: item.questionTitle,
                      itemData: item,
                    }),
                  )}
                </Decline>
              )}
            </div>
          );
        },
      )
    );
  };

  return (
    <>
      {individualOrganizerLoading &&
      businessOrganizerLoading &&
      quotesLoading ? (
        <Loading type="secondary" />
      ) : (
        <>
          <div className={styles.searchContainer}>
            <Space wrap>
              <Input
                placeholder="Search thе organizer"
                prefix={<UserOutlined />}
                className={styles.searchInput}
                onChange={searchOrganizer}
              />
              <Button
                text="Download PDF"
                onClick={() => {
                  generatePdfOfTaxPreparation();
                }}
              />
            </Space>
          </div>
          <div className={styles.subjectContainer}>
            <div className={styles.marginRight}>
              {quoteJobType === "Personal" && (
                <div className={styles.typeContainer}>
                  <div
                    className={getClassNames(
                      styles.linkContainer,
                      categoryIdData === CATEGORY_ID_FILTER.taxPayer &&
                        styles.activeLinkContainer,
                    )}
                  >
                    <p
                      onClick={() => {
                        onChangeCategory(CATEGORY_ID_FILTER.taxPayer);
                      }}
                    >
                      Taxpayer info
                    </p>
                  </div>
                  <div
                    className={getClassNames(
                      styles.linkContainer,
                      categoryIdData === CATEGORY_ID_FILTER.income &&
                        styles.activeLinkContainer,
                    )}
                  >
                    <p
                      onClick={() => {
                        onChangeCategory(CATEGORY_ID_FILTER.income);
                      }}
                    >
                      Income
                    </p>
                  </div>
                  <div
                    className={getClassNames(
                      styles.linkContainer,
                      categoryIdData === CATEGORY_ID_FILTER.deducation &&
                        styles.activeLinkContainer,
                    )}
                  >
                    <p
                      onClick={() => {
                        onChangeCategory(CATEGORY_ID_FILTER.deducation);
                      }}
                    >
                      Deductions
                    </p>
                  </div>
                </div>
              )}
              <div className={styles.selectContainer}>
                <p className={styles.marginBottom}>Section</p>
                <Select
                  data={selectData}
                  defaultValue={selectData[0]}
                  onChange={onChangeCategory}
                />
              </div>
              <div>
                <div
                  className={styles.filterContainer}
                  onClick={() => {
                    width < 768
                      ? setToggleFilter(!toggleFilter)
                      : setToggleFilter(false);
                  }}
                >
                  <Filter />
                  <p>{toggleFilter ? "Apply filters" : "Show"}</p>
                </div>

                <Checkbox.Group
                  className={getClassNames(
                    toggleFilter && styles.hide,
                    styles.containerCheckbox,
                  )}
                  onChange={onChangeFilter}
                >
                  <Checkbox value={2} className={styles.checkboxItemContainer}>
                    Fields with comments
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </div>
            <div>
              <h3 className={styles.subTitle}>Previous Tax return</h3>
              <Divider />
              {data && individualOrganizerData.length > 0 ? (
                <div id="ddd">{renderData()}</div>
              ) : (
                <div className={styles.noAppointmentContainer}>
                  <NoData className={styles.noAppointment} />
                  <p className={styles.noAppointmentText}>Empty Request</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaxPayerInfo;

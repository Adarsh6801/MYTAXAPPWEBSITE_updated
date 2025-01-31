import _ from "lodash";
import moment from "moment";

import { QUESTION_TYPE_ANSWER } from "../constants/organizer";

export const getClassNames = (...args: Array<string | boolean | undefined>) => {
  const filteredArgs = args.filter(arg => !!arg);
  const classNames = filteredArgs.join(" ");

  return classNames;
};

export const findIndexData = (key: string, data: any = []) =>
  data.findIndex((item: any) => item.question === key);

export const findIndexByValue = (value: string, data: any = [], key: any) =>
  data.findIndex((item: any) => item.value == value);

export const getDynamicDataCount = (key: string, data: any = []) => {
  return data.filter((item: any) => item.question.includes(key)).length;
};

export const addQuoteIdOrganizer = (data: any, quoteId = 0) => {
  return data.map((el: any) => ({ quoteId: quoteId, ...el }));
};

export const sortByType = (data: any, type: number[]) => {
  const newData: any = [];
  type.forEach(el => {
    if (el === 2) {
      newData.push(
        ...data.filter(
          (item: any) => item.message !== null && item.message !== "null",
        ),
      );
    } else if (el === 3) {
      newData.push(...data.filter((item: any) => item.answer === "null"));
    } else if (el === 1) {
      newData.push(
        ...data.filter(
          (item: any) => !(item.answer === "null" && item.message !== null),
        ),
      );
    }
  });
  return newData;
};

export const filterByCategory = (data: any, type: number) => {
  return data.filter(
    (item: any) => !(item.answer === "null" && item.message !== null),
  );
};

export const getBase64FormattedImage = (image?: string) => {
  if (!image) return;

  return `data:image/jpeg;base64, ${image}`;
};

export const getCurrentType = (data: any) => {
  switch (data.answerTypeId) {
    case QUESTION_TYPE_ANSWER.string:
      return {
        ...data,
        answer: data.answer === "null" ? null : data.answer,
        message: data.message === "null" ? null : data.message,
      };
    case QUESTION_TYPE_ANSWER.boolean:
      return {
        ...data,
        answer: JSON.parse(data.answer),
        message: data.message === "null" ? null : data.message,
      };
    case QUESTION_TYPE_ANSWER.checkbox:
      return {
        ...data,
        answer:
          data.answer === "NaN" || data.answer === "null"
            ? null
            : JSON.parse(data.answer),
        message: data.message === "null" ? null : data.message,
      };
    case QUESTION_TYPE_ANSWER.radio:
      return {
        ...data,
        answer: JSON.parse(data.answer),
        message: data.message === "null" ? null : data.message,
      };
    case QUESTION_TYPE_ANSWER.number:
      return {
        ...data,
        answer:
          data.answer === "NaN" || data.answer === "null"
            ? null
            : Number(data.answer),
        message: data.message === "null" ? null : data.message,
      };
    case QUESTION_TYPE_ANSWER.date:
      return {
        ...data,
        answer: data.answer === "null" ? null : moment(data.answer),
        message: data.message === "null" ? null : data.message,
      };
    case QUESTION_TYPE_ANSWER.json:
      return {
        ...data,
        answer: JSON.parse(data.answer),
        message: data.message === "null" ? null : data.message,
      };
    default:
      return {
        ...data,
        message: data.message === "null" ? null : data.message,
      };
  }
};

export const getVariableTypeForFormDataSerialization = (
  value: any,
): "file" | "object" | "array" | "value" => {
  if (value instanceof File || value instanceof Blob) {
    return "file";
  }

  if (value instanceof Array) {
    return "array";
  }

  if (value instanceof Object) {
    return "object";
  }

  return "value";
};

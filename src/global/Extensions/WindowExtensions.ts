import { isEmpty, isNull, isUndefined } from "lodash";
import { getVariableTypeForFormDataSerialization } from "../../helpers/format";

// eslint-disable-next-line
window.noop = function () {};

window.isNullOrUndefined = function (value: any) {
  return isNull(value) || isUndefined(value);
};

window.isNullOrUndefinedOrEmpty = function (value: any) {
  return isNullOrUndefined(value) || isEmpty(value);
};

window.formSerializer = function (value: any, name = ""): FormData {
  const formData = new FormData();
  let currentPath = name;

  switch (getVariableTypeForFormDataSerialization(value)) {
    case "object":
      Object.keys(value).forEach(key => {
        const prevPath = currentPath;
        currentPath += currentPath ? `.${key}` : key;

        formSerializer(value[key], currentPath).forEach((value, key) => {
          formData.append(key, value);
        });

        currentPath = prevPath;
      });
      break;

    case "array":
      value.forEach((x: any, index: number) => {
        const prevPath = currentPath;
        currentPath += `[${index}]`;

        formSerializer(x, currentPath).forEach((value, key) => {
          formData.append(key, value);
        });

        currentPath = prevPath;
      });
      break;

    default:
      formData.append(currentPath, value);
      break;
  }

  return formData;
};

export {};

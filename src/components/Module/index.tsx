import { Fragment } from "react";
import { Form, Input, Tooltip, Upload, DatePicker, Checkbox ,message  } from "antd";

import RadioGroup from "../RadioGroup";
import Select from "../Select";
import Button from "../Button";
import OrganizerQuestionCard from "../OrganizerQuestionCard";
import { findIndexData, getClassNames } from "../../helpers/format";
import {
  IDataCheckbox,
  IDataPicker,
  IInput,
  IRadio,
  ISelect,
  IUpload,
  IInputMask
} from "../../pages/Organizer/Individual/index.props";
import { IQuestionContainer } from "./index.props";
import { dummyRequest } from "../../helpers/file";
import { deleteUploadFile } from "../../redux/documentSlice";
import { DEFAULT_DATE_FORMAT } from "../../constants/format";

import { ReactComponent as Attach } from "../../assets/svgs/attach.svg";
import { ReactComponent as Delete } from "../../assets/svgs/delete.svg";
import styles from "./index.module.css";
import { MaskedInput } from "antd-mask-input";
import { UploadFile } from "antd/es/upload/interface";

const PHONE_MASK = "(000) 000-0000[ 0000]"; // Example mask for US phone numbers


export const input = (data: IInput) => {
  const {
    name,
    label,
    text,
    defaultValue = null,
    placeholder,
    textStyle,
    formStyles,
    inputStyle,
    hasMargin = false,
    key,
    required = false,
    message,
    minLength,
    maxLength,
    minLengthMessage,
    maxLengthMessage,
    isNumericOnly = false,
    customOnChange,
    pattern,
    maskedInputPhone,
  } = data;
  
  console.log(maskedInputPhone, "maskedInputPhone");
  const handleChange = (e:any) => {
    let value = e.target.value;
    console.log(value, "vvvvvvvvvvvvvvvvvvvveeeeeee" ,e.unmaskedValue);
    console.log("hiiiiiiiiiiiiiiiiii");

    if (isNumericOnly) {
      value = value.replace(/[^0-9]/g, "");
    }
    if(maskedInputPhone){
      // value = e.unmaskedValue;
      
    }

    e.target.value = value;

    if (customOnChange) {
      customOnChange(e);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumericOnly && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${label || name} is required.`,
    });
  }
  if (pattern?.value) {
    rules.push({
      pattern: pattern?.value,
      message: pattern?.message,
    });
  }

  return (
    <Fragment key={key}>
      <Form.Item
        name={name}
        label={
          label ? (
            <span>
              {label}
              {required && <span style={{ color: 'red' }}>*</span>}
            </span>
          ) : null
        }
        className={getClassNames(hasMargin && styles.marginBottom, formStyles)}
        rules={rules}
      >
        {maskedInputPhone ? (
          <MaskedInput
            mask={PHONE_MASK}
            className={getClassNames(inputStyle)}
            value={defaultValue} // Ensure it's undefined if not needed
            onChange={handleChange}
            placeholder={placeholder || "(xxx) xxx-xxxx"} 
          />
        ) : (
          <Input
            className={getClassNames(inputStyle)}
            placeholder={placeholder}
            value={defaultValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        )}
      </Form.Item>
      {text && (
        <p className={getClassNames(styles.promptText, textStyle)}>{text}</p>
      )}
    </Fragment>
  );
};
export const radio = (data: IRadio) => {
  const {
    name,
    radioButtons,
    value = null,
    direction = "horizontal",
    defaultValue = null,
    required = false, // New required property
    message, // Optional custom validation message
    onChange,
  } = data;

  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${name || name} is required.`,
    });
  }

  return (
    <Form.Item name={name} initialValue={value} rules={rules}>
      <RadioGroup
        size={45}
        data={radioButtons}
        value={value}
        defaultValue={defaultValue}
        direction={direction}
        onChange={onChange}
      />
    </Form.Item>
  );
};

// export const upload = (dataUpload: IUpload) => {
//   const {
//     key,
//     label,
//     index,
//     buttonText = "Attach",
//     multiple = true,
//     maxCount = 20,
//     data,
//     onClick,
//     onRemove,
//     dispatch,
//     required=false
//   } = dataUpload;
//   return (
//     <div className={styles.uploadContainer}>
//       <Form.Item name={key} label={label} valuePropName="file">
//         <Upload
//           accept="image/png,image/jpeg,image/jpg,application/pdf,application/doc,application/xlsx,application/docx"
//           customRequest={dummyRequest}
//           showUploadList={false}
//           maxCount={maxCount}
//           multiple={multiple}
//         >
//           <Button icon={<Attach />} text={buttonText} type="ghost" />
//         </Upload>
//       </Form.Item>
//       {data[findIndexData(key, data)]?.files &&
//         data[findIndexData(key, data)]?.files.length > 0 &&
//         data[findIndexData(key, data)]?.files.map(
//           (item: any, index: number) => {
//             return (
//               <div key={index} className={styles.uploadFileContainer}>
//                 <Tooltip
//                   key={`conversation_file_${index}`}
//                   title={`Click to download ${
//                     data[findIndexData(key, data)].files[index].name
//                   }`}
//                 >
//                   <Button
//                     type="text"
//                     icon={<Attach />}
//                     className={styles.attachedItemBtn}
//                     onClick={() => {
//                       data[findIndexData(key, data)].files[index]?.id &&
//                         onClick(index);
//                     }}
//                   />
//                 </Tooltip>
//                 <Tooltip key={`conversation_file_${index}`} title={"Remove"}>
//                   <Button
//                     type="text"
//                     icon={<Delete />}
//                     className={styles.attachedItemBtn}
//                     onClick={async () => {
//                       try {
//                         await dispatch(
//                           deleteUploadFile(
//                             data[findIndexData(key, data)].files[index]?.id,
//                           ),
//                         );
//                         onRemove(index);
//                       } catch (error) {
//                         //TODO: setError;
//                       }
//                     }}
//                   />
//                 </Tooltip>
//               </div>
//             );
//           },
//         )}
//     </div>
//   );
// };

export const upload = (dataUpload: IUpload) => {
  const {
    key,
    label,
    index,
    buttonText = "Attach",
    multiple = true,
    maxCount = 20,
    data,
    onClick,
    onRemove,
    dispatch,
    required = false,
    allowedFileTypes = [], // Allow passing allowed file types
  } = dataUpload;

  const rules = [];
  
  // Required validation
  if (required) {
    rules.push({
      validator: async (_: any, value: string | any[]) => {
        if (!value || value.length === 0) {
          return Promise.reject(new Error("File is required."));
        }
        return Promise.resolve();
      },
    });
  }




  const beforeUpload = (file: UploadFile) => {
    // Check file type
    if(!file.type || !file.size) return;

    const isAllowedType = allowedFileTypes.length > 0
      ? allowedFileTypes.includes(file.type)
      : ["image/png", "image/jpeg", "image/jpg", "application/pdf", "application/doc", "application/xlsx", "application/docx"].includes(file.type);

    if (!isAllowedType) {
      message.error(`Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}`);
      return Upload.LIST_IGNORE; // Skip file upload
    }

    // Check file size (for example, max size 5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024; // Example size limit 5MB
    if (file.size > maxSize) {
      message.error("File size exceeds the limit of 5MB.");
      return Upload.LIST_IGNORE; // Skip file upload
    }

    return true; // File is valid, allow upload
  };

  // Convert allowed file types to a string format
  let allowedFileTypesString = "";
  if (allowedFileTypes && allowedFileTypes.length > 0) {
    allowedFileTypesString = allowedFileTypes.join(",");
  }

  return (
    <div className={styles.uploadContainer}>
      <Form.Item name={key} label={label} valuePropName="file" rules={rules}>
        <Upload
          accept={allowedFileTypesString.length > 0 ? allowedFileTypesString : "image/png,image/jpeg,image/jpg,application/pdf,application/doc,application/xlsx,application/docx"}
          customRequest={dummyRequest}
          showUploadList={false}
          maxCount={maxCount}
          multiple={multiple}
          beforeUpload={beforeUpload}
        >
          <Button icon={<Attach />} text={buttonText} type="ghost" />
        </Upload>
      </Form.Item>
      {data[findIndexData(key, data)]?.files &&
        data[findIndexData(key, data)]?.files.length > 0 &&
        data[findIndexData(key, data)]?.files.map((item: any, index: number) => {
          return (
            <div key={index} className={styles.uploadFileContainer}>
              <Tooltip
                key={`conversation_file_${index}`}
                title={`Click to download ${data[findIndexData(key, data)].files[index].name}`}
              >
                <Button
                  type="text"
                  icon={<Attach />}
                  className={styles.attachedItemBtn}
                  onClick={() => {
                    data[findIndexData(key, data)].files[index]?.id && onClick(index);
                  }}
                />
              </Tooltip>
              <Tooltip key={`conversation_file_${index}`} title={"Remove"}>
                <Button
                  type="text"
                  icon={<Delete />}
                  className={styles.attachedItemBtn}
                  onClick={async () => {
                    try {
                      await dispatch(deleteUploadFile(data[findIndexData(key, data)].files[index]?.id));
                      onRemove(index);
                    } catch (error) {
                      // Handle error (e.g., setError)
                    }
                  }}
                />
              </Tooltip>
            </div>
          );
        })}
    </div>
  );
};



export const select = (dataSelect: ISelect) => {
  const {
    name,
    label,
    data,
    styleSelect,
    placeholder,
    required,
    message,
    minLength,
    maxLength,
    minLengthMessage,
    maxLengthMessage,
  } = dataSelect;

  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${label || name} is required.`,
    });
  }
  if (minLength) {
    rules.push({
      min: minLength,
      message:
        minLengthMessage ||
        `${label || name} must be at least ${minLength} characters.`,
    });
  }
  if (maxLength) {
    rules.push({
      max: maxLength,
      message:
        maxLengthMessage ||
        `${label || name} must be at most ${maxLength} characters.`,
    });
  }

  return (
    <Form.Item 
      name={name} 
      label={
        label ? (
          <span>
            {label}
            {required && <span style={{ color: 'red' }}>*</span>}
          </span>
        ) : null
      }
      rules={rules}
    >
      <Select
        data={data}
        className={getClassNames(styles.radioContentContainer, styleSelect)}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};



export const dataPicker = (dataPicker: IDataPicker) => {
  const {
    name,
    label,
    icon,
    disabledDate = false,
    defaultValue = "",
    required,
    minLength,
    maxLength,
    message = false,
    minLengthMessage,
    maxLengthMessage,
  } = dataPicker;

  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${label || name} is required.`,
    });
  }
  if (minLength) {
    rules.push({
      min: minLength,
      message:
        minLengthMessage ||
        `${label || name} must be at least ${minLength} characters.`,
    });
  }
  if (maxLength) {
    rules.push({
      max: maxLength,
      message:
        maxLengthMessage ||
        `${label || name} must be at most ${maxLength} characters.`,
    });
  }

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <DatePicker
        suffixIcon={icon}
        format={DEFAULT_DATE_FORMAT}
        defaultValue={defaultValue}
        disabledDate={disabledDate}
        placeholder="MM/DD/YYYY"
      />
    </Form.Item>
  );
};

export const checkbox = (dataCheckbox: IDataCheckbox) => {
  const { name, label, value, style, required } = dataCheckbox;
  const rules = [];

  if (required) {
    rules.push({
      required: true,
      message: `${label || name} is required.`, // Ensuring it's a string
    });
  }

  return (
    <Form.Item
      name={name}
      valuePropName="checked"
      className={styles.checkboxContainer}
      rules={rules}
    >
      <Checkbox className={style} value={!!value}>
        {label}
      </Checkbox>
    </Form.Item>
  );
};


export const questionContainer = (dataQuestion: IQuestionContainer) => {
  const { question, key, data, onAlert, onMessage, children } = dataQuestion;
  const index: number = findIndexData(key, data);
  return (
    <OrganizerQuestionCard
      question={question}
      data={data[index]}
      onAlert={onAlert}
      onMessage={onMessage}
      childrenClassName={styles.context}
      className={styles.container}
    >
      {children}
    </OrganizerQuestionCard>
  );
};

// Function to handle the SSN input format
export const ssnInput = (data: IInput) => {
  const {
    name,
    label,
    text,
    defaultValue = '',
    placeholder,
    textStyle,
    formStyles,
    inputStyle,
    hasMargin = false,
    key,
    required = false,
    message,
    isNumericOnly = false,
    customOnChange,
    pattern,
  } = data;

  // Handle input changes and format the value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (isNumericOnly) {
      value = value.replace(/[^0-9]/g, ''); // Allow only numbers
    }

    // Format the value (e.g., as a phone number or SSN)
    value = formatPhoneNumber(value);

    e.target.value = value;

    if (customOnChange) {
      customOnChange(e);
    }
  };

  // Prevent non-numeric characters in numeric-only fields
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumericOnly && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Validation rules
  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${label || name} is required.`,
    });
  }
  if (pattern?.value) {
    rules.push({
      pattern: pattern?.value,
      message: pattern?.message,
    });
  }

  return (
    <Fragment key={key}>
      <Form.Item
        name={name}
        label={label}
        className={getClassNames(hasMargin && styles.marginBottom, formStyles)}
        rules={rules}
      >
        <Input
          className={getClassNames(inputStyle)}
          placeholder={placeholder || "(xxx) xxx-xxxx"} // Default placeholder format for phone numbers
          value={defaultValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </Form.Item>
      {text && <p className={getClassNames(styles.promptText, textStyle)}>{text}</p>}
    </Fragment>
  );
};

// function to support the ssnInput
const formatPhoneNumber = (value: string) => {
  // Remove non-digit characters
  if(!value) return '';
  let formattedValue = value.replace(/\D/g, '');

  // Format as XXX-XXX-XXXX
  if (formattedValue.length <= 3) {
    formattedValue = formattedValue;
  } else if (formattedValue.length <= 6) {
    formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
  } else {
    formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 6)}-${formattedValue.slice(6, 10)}`;
  }

  return formattedValue;
};

export const phoneNumberInput = (data: IInput) => {
  const {
    name,
    label,
    text,
    defaultValue = '',
    placeholder,
    textStyle,
    formStyles,
    inputStyle,
    hasMargin = false,
    key,
    required = false,
    message,
    isNumericOnly = false,
    customOnChange,
    pattern,
  } = data;

  // Function to format the phone number
  const formatPhoneNumber = (value: string) => {
    if(!value) return '';
    value = value.replace(/[^\d]/g, '');  // Remove non-numeric characters
    if (value.length <= 3) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    return value;
  };

  // Handle input changes and format the value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (isNumericOnly) {
      value = value.replace(/[^0-9]/g, '');  // Allow only numbers
    }
    value = formatPhoneNumber(value);  // Format as phone number
    e.target.value = value;

    if (customOnChange) {
      customOnChange(e);
    }
  };

  // Validation rules
  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${label || name} is required.`,
    });
  }
  if (pattern?.value) {
    rules.push({
      pattern: pattern?.value,
      message: pattern?.message,
    });
  }

  return (
    <Fragment key={key}>
      <Form.Item
        name={name}
        label={label}
        className={formStyles}  // Use formStyles if needed
        rules={rules}
      >
        <Input
          className={inputStyle}  // Use inputStyle if needed
          placeholder={placeholder || "(XXX) XXX-XXXX"}  // Default placeholder format for phone numbers
          value={defaultValue}
          onChange={handleChange}
        />
      </Form.Item>
      {text && <p className={textStyle}>{text}</p>}
    </Fragment>
  );
};

export const InputMask = (data: IInputMask) => {
  const {
    name,
    label,
    text,
    defaultValue = null,
    placeholder,
    textStyle,
    formStyles,
    inputStyle,
    hasMargin = false,
    key,
    required = false,
    message,
    minLength,
    maxLength,
    minLengthMessage,
    maxLengthMessage,
    isNumericOnly = false,
    customOnChange,
    pattern,
    maskedInputPhone,
    maskFormat
  } = data;
  
  console.log(maskedInputPhone, "maskedInputPhone");
  const handleChange = (e:any) => {
    let value = e.target.value;
    console.log(value, "vvvvvvvvvvvvvvvvvvvveeeeeee" ,e.unmaskedValue);
    console.log("hiiiiiiiiiiiiiiiiii");

    if (isNumericOnly) {
      value = value.replace(/[^0-9]/g, "");
    }


    e.target.value = value;

    if (customOnChange) {
      customOnChange(e);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumericOnly && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: message || `${label || name} is required.`,
    });
  }
  if (pattern?.value) {
    rules.push({
      pattern: pattern?.value,
      message: pattern?.message,
    });
  }

  return (
    <Fragment key={key}>
      <Form.Item
        name={name}
        label={
          label ? (
            <span>
              {label}
              {required && <span style={{ color: 'red' }}>*</span>}
            </span>
          ) : null
        }
        className={getClassNames(hasMargin && styles.marginBottom, formStyles)}
        rules={rules}
      >
     
          <MaskedInput
            mask={maskFormat}
            className={getClassNames(inputStyle)}
            // value={'(815) 702-0282'} // Ensure it's undefined if not needed
            onChange={handleChange}
            placeholder={placeholder || "(xxx) xxx-xxxx"}
            maskOptions={{overwrite: false ,}}
            
          />
      </Form.Item>
      {text && (
        <p className={getClassNames(styles.promptText, textStyle)}>{text}</p>
      )}
    </Fragment>
  );
};
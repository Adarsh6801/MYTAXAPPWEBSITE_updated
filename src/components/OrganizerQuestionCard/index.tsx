import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Popover, Typography } from "antd";
import _ from "lodash";

import Button from "../Button";
import { getClassNames } from "../../helpers/format";
import { IOrganizerQuestionContainer } from "./index.props";
import { getPdfUrl } from "../../helpers/file";

import { ReactComponent as Comment } from "../../assets/svgs/comment.svg";
import { ReactComponent as Alert } from "../../assets/svgs/alert.svg";
import styles from "./index.module.css";
const { Paragraph } = Typography;
const noop = () => {};

const OrganizerQuestionCard = (props: IOrganizerQuestionContainer) => {
  const {
    question = "",
    data,
    disabled = false,
    children,
    onAlert = noop,
    onMessage = noop,
    className,
    childrenClassName,
    subClass,
    questionClassName,
    required,
  } = props;
  console.log(required, "requiredrequiredrequiredrequiredrequiredrequired");

  const { t } = useTranslation();
  const [tooltipStr, setTooltipStr] = useState(data?.message);

  const handlerChange = (message: string) => {
    setTooltipStr(message);
    onMessage(message);
  };

  const content = () => {
    return (
      <Paragraph editable={{ tooltip: false, onChange: handlerChange }}>
        {tooltipStr || data?.message}
      </Paragraph>
    );
  };

  return (
    <div className={getClassNames(styles.container, className)}>
      <div
        className={getClassNames(
          !!question ? styles.subContainer : styles.subContainerMinMax,
          subClass,
        )}
      >
        <div className={styles.iconContainer}>
          {!disabled && (
            <Button
              type={"link"}
              icon={<Alert fill={data?.reminder ? "#6581EB" : "#d9e0f9"} />}
              className={styles.button}
              onClick={onAlert}
            />
          )}
          <Popover
            placement="top"
            title={t("organizer.individual.yes_flow.step1.comment")}
            content={content}
            trigger="click"
          >
            <Button
              type={"link"}
              icon={<Comment fill={data?.message ? "#6581EB" : "#d9e0f9"} />}
              className={styles.button}
            />
          </Popover>
        </div>
        {!!question && _.isString(question) ? (
          <p className={getClassNames(styles.question, questionClassName)}>
            {!!data?.url ? (
              <a href={getPdfUrl(data?.url)} target="_blank">
                {question}
              </a>
            ) : (
              <>
                {question}
                {required && <span style={{ color: "red" }}>*</span>}
              </>
            )}
          </p>
        ) : (
          question
        )}
      </div>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
};

export default OrganizerQuestionCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";

import { IOrganizerContainerProps } from "./index.props";
import { TAXPAYER_QUOTES } from "../../constants/routes";
import { getClassNames } from "../../helpers/format";

import { ReactComponent as LogoWithText } from "../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const noop = () => {};

const OrganizerContainer = (props: IOrganizerContainerProps) => {
  const {
    label,
    contentClassName,
    groups,
    justifyContent,
    onNextStep = noop,
    onPrevStep = noop,
  } = props;
  const [step, setStep] = useState(0);
  const uniqueGroups = [
    ...(new Set(groups.map(item => item.groupName)) as any),
  ];
  const currentUniqueGroup = uniqueGroups.findIndex(
    groupName => groupName === groups[step].groupName,
  );

  useEffect(() => {
    sessionStorage.setItem("steps", JSON.stringify([]));
  }, []);

  useEffect(() => {
    const steps = [];
    steps.push(...JSON.parse(sessionStorage.getItem("steps") || "[]"));

    if (!steps.includes(step)) {
      steps.push(step);
      sessionStorage.setItem("steps", JSON.stringify(steps));
    }
  }, [step]);

  const nextStep = () => {
    if (step < groups.length - 1) {
      setStep(step + 1);
      onNextStep(step + 1);
    }
  };

  const prevStep = () => {
    const lastSteps = JSON.parse(sessionStorage.getItem("steps") || "[]");
    const removeStep = lastSteps.pop();

    sessionStorage.setItem("steps", JSON.stringify(lastSteps));

    if (step > 0) {
      setStep(lastSteps[lastSteps.length - 1]);
      onPrevStep(removeStep);
    }
  };

  const goTo = (page: number) => {
    const availablePage = page > groups.length - 1 ? groups.length - 1 : page;

    setStep(availablePage);
  };

  const renderStepper = () => {
    return (
      <ul className={styles.points}>
        {uniqueGroups.map((name, index) => (
          <li key={`point_${index}`}>
            <span
              className={getClassNames(
                styles.point,
                index <= currentUniqueGroup && styles.activePoint,
              )}
            />
            <p
              className={getClassNames(
                styles.groupName,
                index <= currentUniqueGroup && styles.activeGroup,
              )}
            >
              {name}
            </p>

            {index < uniqueGroups.length - 1 && (
              <span
                className={getClassNames(
                  styles.line,
                  index + 1 <= currentUniqueGroup && styles.activeLine,
                )}
              />
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide} />
      <aside className={styles.sidebar}>
        <Link to={TAXPAYER_QUOTES} className={styles.logoContainer}>
          <LogoWithText />
        </Link>

        <div className={styles.pointsContainer}>{renderStepper()}</div>
      </aside>

      <section
        className={getClassNames(
          styles.content,
          justifyContent === "center" && styles.contentCenter,
          justifyContent === "right" && styles.contentRight,
          contentClassName,
        )}
      >
        {label}

        <div className={styles.titleContainer}>
          {groups[step].stepIcon}
          <h1 className={styles.title}>{groups[step].stepTitle}</h1>
        </div>

        <Divider className={styles.divider} />

        {React.cloneElement(groups[step].component, {
          nextStep,
          prevStep,
          goTo,
        })}
      </section>
    </div>
  );
};

export default OrganizerContainer;

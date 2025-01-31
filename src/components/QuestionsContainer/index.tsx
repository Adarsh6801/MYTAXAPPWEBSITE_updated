import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { IQuestionsContainerProps } from "./index.props";
import { TAXPAYER_PROFILE_PAGE } from "../../constants/routes";
import { getClassNames } from "../../helpers/format";

import { ReactComponent as LogoWithText } from "../../assets/svgs/logo.svg";
import Gift from "../../assets/svgs/gift-big.svg";
import styles from "./index.module.css";

const noop = () => {};

const QuestionsContainer: React.FC<IQuestionsContainerProps> = forwardRef(
  (props, ref) => {
    const {
      contentClassName,
      steps,
      justifyContent = "left",
      onNextStep = noop,
      onPrevStep = noop,
    } = props;
    const [step, setStep] = useState(0);
    const points = steps.filter(item => item.type !== undefined);
    const stepsCount = steps.filter(item => item.type === "step").length;
    const currentStep = steps.filter(
      (item, index) => item.type === "step" && index <= step,
    ).length;
    const emptyStepsCount = steps.filter(
      (item, index) => item.type === undefined && index <= step,
    ).length;

    const nextStep = () => {
      if (step < steps.length - 1) {
        setStep(step + 1);
        onNextStep(step + 1);
      }
    };

    const prevStep = () => {
      if (step > 0) {
        setStep(step - 1);
        onPrevStep(step - 1);
      }
    };

    const stepNumberToString = (value: number) => {
      if (value < 10) {
        return `0${value}`;
      }

      return value.toString();
    };

    const renderStepper = () => {
      return (
        <ul className={styles.points}>
          {points.map((item, index) => (
            <li key={`point_${index}`}>
              <span
                className={getClassNames(
                  item.type === "step" ? styles.point : styles.gift,
                  item.type === "step" &&
                    index <= step - emptyStepsCount &&
                    styles.activePoint,
                  item.type === "gift" &&
                    index <= step - emptyStepsCount &&
                    styles.activeGift,
                )}
              />

              {index < points.length - 1 && (
                <span
                  className={getClassNames(
                    styles.line,
                    index + 1 <= step - emptyStepsCount && styles.activeLine,
                  )}
                />
              )}
            </li>
          ))}
        </ul>
      );
    };

    useImperativeHandle(ref, () => ({
      resetStep(step?: number) {
        if (step) {
          setStep(step);
        } else {
          setStep(0);
        }
      },
    }));

    return (
      <div className={styles.container}>
        <div className={styles.leftSide} />
        <aside className={styles.sidebar}>
          <Link to={TAXPAYER_PROFILE_PAGE} className={styles.logoContainer}>
            <LogoWithText />
          </Link>

          <h2
            className={styles.mobileStepCounter}
            style={
              steps[step].type === undefined ? { display: "none" } : undefined
            }
          >
            {stepNumberToString(currentStep)}
            <span>/{stepNumberToString(stepsCount)}</span>
          </h2>

          <div
            className={styles.pointsContainer}
            style={
              steps[step].type === undefined ? { display: "none" } : undefined
            }
          >
            {renderStepper()}

            {steps[step].type === "gift" ? (
              <img src={Gift} className={styles.stepGift} alt="Gift" />
            ) : (
              <h1 className={styles.stepCounter}>
                {stepNumberToString(currentStep)}
                <span>/{stepNumberToString(stepsCount)}</span>
              </h1>
            )}
          </div>
        </aside>

        <section
          className={getClassNames(
            styles.content,
            justifyContent === "center" && styles.contentCenter,
            justifyContent === "right" && styles.contentRight,
            contentClassName,
          )}
        >
          {React.cloneElement(steps[step].component, {
            nextStep,
            prevStep,
          })}
        </section>
      </div>
    );
  },
);

export default QuestionsContainer;

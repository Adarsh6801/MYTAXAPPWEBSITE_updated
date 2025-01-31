import { Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../redux/store";

import GiftInfoCard from "../../../../../../../components/GiftInfoCard";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IStepGiftInfoProps } from "./index.props";

import GiftImg from "../../../../../../../assets/images/gift-img.png";
import styles from "./index.module.css";

const noop = () => {};

const StepGiftInfo = (props: IStepGiftInfoProps) => {
  const { onNextClick = noop, prevStep = noop } = props;
  const { loading } = useSelector((state: RootState) => {
    return state.auth;
  });

  return (
    <div className={styles.container}>
      <GiftInfoCard
        img={GiftImg}
        title={"Houston, He Had a Problem"}
        description={`Astronaut Jack Swigert, the command module
             pilot for Apollo 13, got the assignment at the last minute 
             because of health issues another astronaut was experiencing. In the rush, 
             Swigert neglected to file his taxes. According to the transcript of the moment he realized his mistake,
             the crew on the ground thought he was joking, but Swigert was seriously asking how to file an extension.`}
      />
      <div className={styles.buttonContainer}>
        <Space size={10}>
          <CircularDirection
            diameter={48}
            disabled={loading}
            className={styles.test}
            onClickRight={onNextClick}
            onClickLeft={prevStep}
          />
        </Space>
      </div>
    </div>
  );
};

export default StepGiftInfo;

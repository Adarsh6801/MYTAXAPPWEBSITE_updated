import { ILogoProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import LogoName from "../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const Logo = (props: ILogoProps) => {
  const { className } = props;

  return (
    <img
      src={LogoName}
      className={getClassNames(styles.img, className)}
      alt="MyTaxApp logo"
    />
  );
};

export default Logo;

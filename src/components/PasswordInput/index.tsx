import { Input } from "antd";
import { PasswordProps } from "antd/lib/input";

import { PASSWORD_LENGTH } from "../../constants/settings";

import { ReactComponent as OpenEye } from "../../assets/svgs/open-eye.svg";
import { ReactComponent as ClosedEye } from "../../assets/svgs/closed-eye.svg";

const PasswordInput = (props: PasswordProps) => {
  return (
    <Input.Password
      type="password"
      maxLength={PASSWORD_LENGTH}
      iconRender={visible => (visible ? <OpenEye /> : <ClosedEye />)}
      {...props}
    />
  );
};

export default PasswordInput;

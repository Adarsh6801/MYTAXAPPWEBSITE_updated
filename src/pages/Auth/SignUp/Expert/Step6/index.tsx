import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Upload } from "antd";

import Button from "../../../../../components/Button";
import CircularDirection from "../../../../../components/CircularDirection";
import { IExpertStep6FormData } from "./index.props";
import { IExpertStepsProps } from "../index.props";
import { getBase64 } from "../../../../../helpers/file";

import styles from "./index.module.css";

const noop = () => {};

const Step6 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;
  const [image, setImage] = useState<any>();
  const [images, setImages] = useState<any>({
    loading: false,
    imageUrl: "",
  });

  const onFinish = (values: IExpertStep6FormData) => {
    const newValue = {
      ...values,
      photo: images.file,
    };
    onStepSubmit(newValue);
    nextStep();
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setImages({ loading: true, imageUrl: "", file: {} });
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImages({
          imageUrl: imageUrl,
          loading: false,
          file: info.file.originFileObj,
        });
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      setImage(file);
      onSuccess("ok");
    }, 0);
  };

  const initialValues: IExpertStep6FormData = {
    photo: state?.photo,
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.set_up_profile")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h1 className={styles.title}>{t("expert.step6.question")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item name="photo">
          <div className={styles.uploadImageWrapper}>
            <div className={styles.imgContainer}>
              {images.imageUrl && (
                <img src={images.imageUrl} className={styles.img} />
              )}
            </div>
            <div className={styles.textContainer}>
              <p className={styles.label}>{t("expert.step6.label")}</p>
              <Upload
                showUploadList={false}
                accept=".png,.jpeg,.jpg"
                customRequest={dummyRequest}
                onChange={handleChange}
              >
                <Button text={"Upload"} type={"primary"} />
              </Upload>
            </div>
          </div>
        </Form.Item>
        <CircularDirection
          onClickLeft={prevStep}
          rightButton={{
            htmlType: "submit",
          }}
        />
      </Form>
    </div>
  );
};

export default Step6;

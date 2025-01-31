import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Wrapper from "../../../components/Wrapper";
import { IMainBlogSection } from "./index.interfaces";
import Button from "../../../components/Button";
import { BLOG_PAGE } from "../../../constants/routes";
import { getBase64FormattedImage } from "../../../helpers/format";

import Scissors from "../../../assets/svgs/scissors-mask1.svg";
import styles from "./index.module.css";

const MainBlogSection = (props: IMainBlogSection) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, shortDescription, image, title, tags = [] } = props;

  return (
    <header className={styles.container}>
      <Wrapper>
        <div className={styles.content}>
          <img
            src={getBase64FormattedImage(image)}
            className={styles.img}
            alt="Blog"
          />

          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{shortDescription}</p>

            <div className={styles.tags}>
              {tags.map((x, i) => (
                <Tag key={`tag_${i}`} className={styles.tag}>
                  {x}
                </Tag>
              ))}
            </div>

            <Button
              type="primary"
              text={t("blog.read_article")}
              onClick={() => navigate(BLOG_PAGE.replace(":id", id.toString()))}
              className={styles.btn}
            />
          </div>
        </div>
      </Wrapper>

      <img src={Scissors} className={styles.mask} alt="Scissors" />
    </header>
  );
};

export default MainBlogSection;

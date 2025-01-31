import { useTranslation } from "react-i18next";
import { Col, Row, Space, Tag } from "antd";
import { FacebookShareButton, TwitterShareButton } from "react-share";

import Wrapper from "../../../components/Wrapper";
import { IBlogContentSectionProps } from "./index.interfaces";

import { ReactComponent as Facebook } from "../../../assets/svgs/social-media/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/svgs/social-media/twitter.svg";
import Scissors from "../../../assets/svgs/scissors-mask1.svg";
import styles from "./index.module.css";
import { getBase64FormattedImage } from "../../../helpers/format";

const BlogContentSection = (props: IBlogContentSectionProps) => {
  const { t } = useTranslation();
  const { content, image, tip, tags = [], title, createdDate } = props;

  return (
    <header className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <p className={styles.tip}>{tip}</p>

        <div className={styles.dateAndTitle}>
          <h2 className={styles.title}>{title}</h2>
          <p>{createdDate}</p>
        </div>

        {tags.any() && (
          <div className={styles.tags}>
            {tags.map((x, i) => (
              <Tag key={`tag_${i}`} className={styles.tag}>
                {x}
              </Tag>
            ))}
          </div>
        )}

        <img
          src={getBase64FormattedImage(image)}
          className={styles.img}
          alt="Blog bg"
        />

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className={styles.socials}>
          <p style={{ margin: 0 }}>{t("blog.share_article")}</p>
          <FacebookShareButton
            url={window.location.href}
            quote={title}
            hashtag={tags.map(x => "#" + x).join(" ")}
            className={styles.icon}
          >
            <Facebook />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title={title}
            hashtags={tags}
            className={styles.icon}
          >
            <Twitter />
          </TwitterShareButton>
        </div>
      </Wrapper>

      <img src={Scissors} className={styles.mask} alt="Scissors" />
    </header>
  );
};

export default BlogContentSection;

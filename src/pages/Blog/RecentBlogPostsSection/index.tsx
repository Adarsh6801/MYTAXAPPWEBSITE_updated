import { useTranslation } from "react-i18next";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useNavigate } from "react-router";

import { IRecentBlogPostsSectionProps } from "./index.interfaces";
import { BLOG_PAGE } from "../../../constants/routes";

import { ReactComponent as ShortArrow } from "../../../assets/svgs/short-arrow-left.svg";
import { ReactComponent as LongArrow } from "../../../assets/svgs/long-arrow-right.svg";
import styles from "./index.module.css";
import { getBase64FormattedImage } from "../../../helpers/format";

const RecentBlogPostsSection = (props: IRecentBlogPostsSectionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollContainer = useScrollContainer();
  const { blogs = [], onClick } = props;

  const onRightClick = () => {
    const div = document.getElementById("scrollContainer");

    if (div) {
      div.scrollTo({
        left: (div.scrollLeft += 300),
        behavior: "smooth",
      });
    }
  };

  const onLeftClick = () => {
    const div = document.getElementById("scrollContainer");

    if (div) {
      div.scrollTo({
        left: (div.scrollLeft -= 300),
        behavior: "smooth",
      });
    }
  };

  return blogs.any() ? (
    <section className={styles.container} onClick={onClick}>
      <div className={styles.header}>
        <h4 className={styles.title}>{t("blog.recent_post")}</h4>

        <div className={styles.arrows}>
          <ShortArrow onClick={onLeftClick} />
          <LongArrow onClick={onRightClick} />
        </div>
      </div>

      <div
        id="scrollContainer"
        ref={scrollContainer.ref}
        className={styles.scrollContainer}
      >
        {blogs.map((x, i) => (
          <div
            key={`blog_${i}`}
            className={styles.blogContainer}
            onClick={() => navigate(BLOG_PAGE.replace(":id", x.id.toString()))}
          >
            <img
              className={styles.img}
              src={getBase64FormattedImage(x.image)}
              alt="Recent Blog"
            />

            <div className={styles.content}>
              <h4 className={styles.recentBlogTitle}>{x.title}</h4>
              <p className={styles.description}>{x.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;
};

export default RecentBlogPostsSection;

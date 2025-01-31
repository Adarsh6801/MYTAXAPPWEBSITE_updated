import { useNavigate } from "react-router";

import Wrapper from "../../../components/Wrapper";
import { IBlogListProps } from "./index.interfaces";
import { BLOG_PAGE } from "../../../constants/routes";
import { getBase64FormattedImage } from "../../../helpers/format";

import styles from "./index.module.css";

const BlogList = (props: IBlogListProps) => {
  const navigate = useNavigate();
  const { blogs = [] } = props;

  return (
    <div className={styles.container}>
      <Wrapper>
        <div className={styles.list}>
          {blogs.map((x, i) => (
            <div
              key={`blog_${i}`}
              onClick={() =>
                navigate(BLOG_PAGE.replace(":id", x.id.toString()))
              }
              className={styles.content}
            >
              <img
                className={styles.img}
                src={getBase64FormattedImage(x.image)}
                alt="Blog"
              />

              <h4 className={styles.title}>{x.title}</h4>
              <p className={styles.description}>{x.shortDescription}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default BlogList;

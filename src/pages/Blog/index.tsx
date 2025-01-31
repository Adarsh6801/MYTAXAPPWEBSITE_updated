import { useEffect } from "react";
import { useParams } from "react-router";

import BlogContentSection from "./BlogContentSection";
import ProfileFooter from "../../components/ProfileFooter";
import LandingNavbar from "../../components/LandingNavbar";
import RecentBlogPostsSection from "./RecentBlogPostsSection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlog, fetchBlogs } from "../../redux/blogSlice";
import Loading from "../../components/Loading";
import { utc } from "../../helpers/date";
import { DEFAULT_DATE_FORMAT } from "../../constants/format";
import { BlogTypeEnum } from "../../constants/blog";
import { getLandingUserType } from "../../helpers/storage";

const Blog = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams();
  const { loading, blog, blogs = [] } = useAppSelector(state => state.blog);
  const recentBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
    )
    .filter(x => x.id !== blog?.id)
    .slice(0, 10);

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlog(Number(blogId)));
    }
  }, [blogId]);

  useEffect(() => {
    const landingUserType = getLandingUserType();
    const typeEnum =
      landingUserType === "taxpayer"
        ? BlogTypeEnum.TaxPayer
        : BlogTypeEnum.Accountant;

    if (!blogs.any()) {
      dispatch(fetchBlogs(typeEnum));
    }
  }, []);

  return (
    <>
      <LandingNavbar />
      <BlogContentSection
        tip={blog?.tip ?? ""}
        title={blog?.title ?? ""}
        tags={blog?.tags}
        content={blog?.content ?? ""}
        image={blog?.image ?? ""}
        createdDate={utc(blog?.createdDate, DEFAULT_DATE_FORMAT)}
      />
      <RecentBlogPostsSection blogs={recentBlogs} />
      <ProfileFooter />

      {loading && <Loading type="primary" />}
    </>
  );
};

export default Blog;
